import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';

import type { AccountDetailsRouteProps } from '#navigation/Dashboard/AccountDetails';
import { useTranslationUtils } from '#i18n/utils';
import InAppNotifications from '#common/InAppNotifications';
import RBAC from '#common/RBAC';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';
import reportCrash from '#ui/lib/reportCrash';
import { waitFor } from '#ui/lib/waitFor';
import { useToggle } from '#ui/hooks/useToggle';

import FormManager, { type FormValues } from './components/FormManager';
import LocationField from './modules/Location';
import CountryField from './modules/CountryField';
import LanguageField from './modules/LanguageField';

function LocalizationPreferences(props: AccountDetailsRouteProps<'LocalizationPreferences'>) {
  const { userId, farmerId, ...initialFormValues } = props.route.params;

  const toast = InAppNotifications.useToast();
  const { t, mutate: changeLanguage } = useTranslationUtils();
  const { guard } = RBAC.useRBAC();
  const { mutate } = useSWRConfig();

  const setUser = useAuthStore((store) => store.setUser);
  const patchFarmer = useDashboardStore((store) => store.patchFarmer);

  const [isProcessing, toggleProcessing] = useToggle(false);

  async function onSubmit(values: FormValues) {
    const userDatum = await ColdtivateService.updateUser({
      userId,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
      gender: values.gender,
      language: values.language,
    });

    if (guard('VIEW', 'FarmerFields')) {
      const farmerDatum = await ColdtivateService.updateFarmer({
        farmerId,
        country: values.country,
        parentName: values.parentName,
        updateUser: true,
      });

      await mutate(getQueryKey('getFarmerByUserId', userId)); // revalidation

      patchFarmer({
        farmerCountry: farmerDatum.country,
        farmerParentName: farmerDatum.parentName,
      });
    }

    setUser({ ...userDatum, role: values.kind });
  }

  return (
    <FormManager onSubmit={onSubmit} initialValues={{ ...initialFormValues, location: '' }}>
      {({ submitHandler, hasChanges, selectedLanguage }) => (
        <React.Fragment>
          <KeyboardAwareScrollView
            tw="flex-1"
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            showsVerticalScrollIndicator={false}
          >
            <View tw="px-3 pb-8">
              <RBAC.ProtectedResource action="VIEW" subject="FarmerFields">
                <CountryField />
                <LocationField />
              </RBAC.ProtectedResource>
              <LanguageField />
            </View>
          </KeyboardAwareScrollView>

          <HideWithKeyboardView tw="bottom-0 right-0 w-full items-center bg-white border-t-0.5 border-gray-600 border-solid">
            <Button
              tw="w-4/5 my-4"
              mode="contained"
              onPress={async (evt) => {
                evt.stopPropagation();
                toggleProcessing();
                submitHandler()
                  .then(async () => {
                    await waitFor(800);
                    await changeLanguage(selectedLanguage);
                    toast.show(t('Dashboard.AccountDetails.toasts.success'), {
                      type: 'md_success',
                      style: { marginBottom: 50 },
                    });
                    props.navigation.goBack();
                  })
                  .catch((exception) => {
                    reportCrash(exception as Error);
                    toast.show(t('navigation.error.serverErrorMessage'), {
                      type: 'md_danger',
                      style: { marginBottom: 55 },
                    });
                  })
                  .finally(toggleProcessing);
              }}
              disabled={!hasChanges || isProcessing}
              uppercase
            >
              {isProcessing ? <ActivityIndicator size="small" color="white" /> : t('actions.save')}
            </Button>
          </HideWithKeyboardView>
        </React.Fragment>
      )}
    </FormManager>
  );
}

export default withSafeArea(LocalizationPreferences, ['bottom'], true);
