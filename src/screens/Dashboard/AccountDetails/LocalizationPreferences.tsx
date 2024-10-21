import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
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
import LocationField from './modules/Location';
import CountryField from './modules/CountryField';
import LanguageField from './modules/LanguageField';

function LocalizationPreferences(props: AccountDetailsRouteProps<'LocalizationPreferences'>) {
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
        <React.Fragment>
          <KeyboardAwareScrollView
            tw="h-full"
            contentContainerStyle="flex-1 justify-between"
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            showsVerticalScrollIndicator={false}
          >
            <View tw="px-3 pt-3 pb-8">
              <CountryField />
              <LocationField />
              <LanguageField />
            </View>
          </KeyboardAwareScrollView>

          <View tw="bottom-0 right-0 w-full items-center bg-white border-t-0.5 border-gray-600 border-solid">
            <Button
              tw="w-4/5 my-4"
              mode="contained"
              onPress={submitHandler}
              disabled={!hasChanges}
              uppercase
            >
              {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.save')}
            </Button>
          </View>
        </React.Fragment>
      )}
    </FormManager>
  );
}

export default withSafeArea(LocalizationPreferences, ['bottom'], true);
