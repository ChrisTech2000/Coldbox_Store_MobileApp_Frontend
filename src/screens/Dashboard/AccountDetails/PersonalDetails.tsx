import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { AccountDetailsRouteProps } from '#navigation/Dashboard/AccountDetails';
import { useTranslationUtils } from '#i18n/utils';
import RBAC from '#common/RBAC';
import InAppNotifications from '#common/InAppNotifications';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import ColdtivateService from '#services/ColdtivateService';

import FormManager, { type FormValues } from './components/FormManager';
import NameFields from './modules/NameFields';
import ContactFields from './modules/ContactFields';
import GenderField from './modules/GenderField';
import DeleteAccountAction from './components/DeleteAccountAction';

function PersonalDetails(props: AccountDetailsRouteProps<'PersonalDetails'>) {
  const { userId, farmerId, ...initialFormValues } = props.route.params;

  const { t } = useTranslationUtils();
  const { guard } = RBAC.useRBAC();
  const toast = InAppNotifications.useToast();

  const setUser = useAuthStore((store) => store.setUser);
  const patchFarmer = useDashboardStore((store) => store.patchFarmer);

  async function onSubmit(values: FormValues) {
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

      if (guard('STORE', 'FarmerDetails')) {
        const farmerDatum = await ColdtivateService.updateFarmer({
          farmerId,
          country: values.country,
          parentName: values.parentName,
          updateUser: true,
        });

        patchFarmer({
          farmerCountry: farmerDatum.country,
          farmerParentName: farmerDatum.parentName,
        });
      }

      toast.show(t('Dashboard.AccountDetails.toasts.success'), {
        type: 'md_success',
        style: { marginBottom: 50 },
      });
    } catch (exception) {
      console.error(exception);
    }
  }

  return (
    <FormManager onSubmit={onSubmit} initialValues={{ ...initialFormValues, location: '' }}>
      {({ submitHandler, isSubmitting, hasChanges }) => (
        <KeyboardAwareScrollView
          tw="h-full p-3"
          contentContainerStyle="flex-1 justify-between"
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <NameFields />
            <GenderField />
            <ContactFields />
            <RBAC.ProtectedResource action="VIEW" subject="FarmerFields">
              <View tw="w-full bg-zinc-200 flex-row items-center justify-between space-x-2 p-3 rounded-md my-1.5">
                <Text variant="TitleSmall" tw="flex-shrink" numberOfLines={2}>
                  {t('Dashboard.AccountDetails.fields.userCode')}
                </Text>
                <Text variant="TitleSmall">{initialFormValues.userCode}</Text>
              </View>
            </RBAC.ProtectedResource>
          </View>

          <View tw="flex flex-row items-center justify-evenly">
            <DeleteAccountAction />
            <Button
              tw="w-[48%]"
              mode="contained"
              onPress={submitHandler}
              icon={isSubmitting ? undefined : 'check-circle-outline'}
              disabled={!hasChanges}
              uppercase
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                t('Dashboard.Management.CompanyDetails.actions.save')
              )}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      )}
    </FormManager>
  );
}

export default withSafeArea(PersonalDetails, ['bottom'], true);
