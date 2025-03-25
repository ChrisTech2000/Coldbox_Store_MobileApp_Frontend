import React, { useCallback } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import colors from 'tailwindcss/colors';
import { useSWRConfig } from 'swr';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { AccountDetailsRouteProps } from '#navigation/Dashboard/AccountDetails';
import { useTranslationUtils } from '#i18n/utils';
import RBAC from '#common/RBAC';
import InAppNotifications from '#common/InAppNotifications';
import { useAuthStore } from '#stores/auth';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';
import reportCrash from '#ui/lib/reportCrash';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';

import FormManager, { type FormValues } from './components/FormManager';
import NameFields from './modules/NameFields';
import ContactFields from './modules/ContactFields';
import GenderField from './modules/GenderField';

function PersonalDetails(props: AccountDetailsRouteProps<'PersonalDetails'>) {
  const { userId, ...initialFormValues } = props.route.params;

  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const { guard } = RBAC.useRBAC();
  const { mutate } = useSWRConfig();

  const setUser = useAuthStore((store) => store.setUser);

  const onSubmit = useCallback(async function (values: FormValues) {
    try {
      const userDatum = await ColdtivateService.updateUser({
        userId,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        gender: values.gender,
        language: values.language,
      });

      setUser({ ...userDatum, role: values.kind });

      // cooling users only
      if (guard('VIEW', 'FarmerFields')) {
        await mutate(getQueryKey('getFarmerByUserId', userId)); // revalidation
      }

      toast.show(t('Dashboard.AccountDetails.toasts.success'), {
        type: 'md_success',
        style: { marginBottom: 50 },
      });

      props.navigation.goBack();
    } catch (exception) {
      reportCrash(exception as Error);
    }
  }, []);

  return (
    <FormManager onSubmit={onSubmit} initialValues={{ ...initialFormValues, location: '' }}>
      {({ submitHandler, isSubmitting, hasChanges }) => (
        <React.Fragment>
          <KeyboardAwareScrollView
            tw="flex-1"
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            showsVerticalScrollIndicator={false}
          >
            <View tw="px-3 pb-8">
              <NameFields />
              <GenderField />
              <ContactFields />
              <RBAC.ProtectedResource action="VIEW" subject="FarmerFields">
                {!!initialFormValues.userCode && (
                  <Touchable
                    tw="w-full bg-zinc-200 flex-row items-center justify-between space-x-2 p-3 rounded-md mt-3"
                    rippleColor={colors.zinc[300]}
                    onPress={(evt) => {
                      evt.stopPropagation();
                      Clipboard.setString(initialFormValues.userCode);
                    }}
                  >
                    <Text variant="TitleSmall" tw="flex-shrink" numberOfLines={2}>
                      {t('Dashboard.AccountDetails.fields.userCode')}
                    </Text>
                    <Text variant="TitleSmall">{initialFormValues.userCode}</Text>
                  </Touchable>
                )}
              </RBAC.ProtectedResource>
            </View>
          </KeyboardAwareScrollView>

          <HideWithKeyboardView tw="bottom-0 right-0 w-full items-center bg-white border-t-0.5 border-gray-600 border-solid">
            <Button
              tw="w-4/5 my-4"
              mode="contained"
              onPress={submitHandler}
              disabled={!hasChanges || isSubmitting}
              uppercase
            >
              {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.save')}
            </Button>
          </HideWithKeyboardView>
        </React.Fragment>
      )}
    </FormManager>
  );
}

export default withSafeArea(PersonalDetails, ['bottom'], true);
