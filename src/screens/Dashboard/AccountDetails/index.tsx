import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import { EApiGender, ERoles } from '#types/global';
import { LanguageStorage, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import type { TranslationLocales } from '#i18n/constants';
import RBAC from '#common/RBAC';

import FormManager, { type FormValues } from './components/FormManager';
import NameFields from './modules/NameFields';
import LanguageField from './modules/LanguageField';
import ContactFields from './modules/ContactFields';
import GenderField from './modules/GenderField';
import LocationField from './modules/Location';
import CountryField from './modules/CountryField';
import DeleteAccountAction from './components/DeleteAccountAction';

import type { AccountDetailsRouteProps } from '#navigation/Dashboard/AccountDetails';
import InAppNotifications from '#common/InAppNotifications';

function AccountDetails(props: AccountDetailsRouteProps<'Root'>) {
  const user = useAuthStore(useShallow((store) => store.user));
  const [farmerParentName, farmerUserCode, farmerCountry, farmerId] = useDashboardStore(
    useShallow((store) => [
      store.farmerParentName,
      store.farmerUserCode,
      store.farmerCountry,
      store.farmerId,
    ])
  );

  const setUser = useAuthStore((store) => store.setUser);
  const patchFarmer = useDashboardStore((store) => store.patchFarmer);
  const { t } = useTranslationUtils();
  const { guard } = RBAC.useRBAC();
  const toast = InAppNotifications.useToast();

  async function onSubmit(values: FormValues) {
    if (!user) return; // safe guard
    try {
      const userDatum = await ColdtivateService.updateUser({
        userId: user.id,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        email: values.email,
        gender: values.gender,
        language: values.language,
      });

      setUser({ ...userDatum, role: user.role });

      if (guard('STORE', 'FarmerDetails')) {
        if (!farmerId) return; // safe guard
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

  function buildInitialValues(): FormValues {
    return {
      kind: user?.role ?? ERoles.COOLING_USER,
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      language: (user?.language as TranslationLocales) ?? LanguageStorage.read(),
      phone: user?.phone ?? '',
      email: user?.email ?? '',
      gender: user?.gender ?? EApiGender.OTHER,
      parentName: farmerParentName ?? '',
      userCode: farmerUserCode ?? '',
      country: farmerCountry ?? '',
      location: '', // @Note: this is not even implemented in the web app
    };
  }

  return (
    <FormManager onSubmit={onSubmit} initialValues={buildInitialValues()}>
      {({ submitHandler, isSubmitting }) => (
        <KeyboardAwareScrollView
          tw="h-full pt-5 mx-4"
          keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          showsVerticalScrollIndicator={false}
        >
          <NameFields />
          <LanguageField />
          <ContactFields />
          <GenderField />

          <RBAC.ProtectedResource action="VIEW" subject="FarmerFields">
            <LocationField />
            <CountryField />
            <View tw="w-full bg-zinc-200 flex-row items-center justify-between space-x-2 p-3 rounded-md my-1.5">
              <Text variant="TitleSmall" tw="flex-shrink" numberOfLines={2}>
                {t('Dashboard.AccountDetails.fields.userCode')}
              </Text>
              <Text variant="TitleSmall">{farmerUserCode}</Text>
            </View>
          </RBAC.ProtectedResource>

          <View tw="space-y-4 mt-4">
            <RBAC.ProtectedResource action="VIEW" subject="FarmerFields">
              <Button
                tw="w-full mb-4"
                mode="outlined"
                onPress={(evt) => {
                  evt.stopPropagation();
                  if (!farmerId) return; // safe guard
                  props.navigation.navigate('CoolingUsersSurvey', { farmerId });
                }}
                icon="newspaper"
                uppercase
              >
                {t('navigation.history.BaseSurvey')}
              </Button>
            </RBAC.ProtectedResource>

            <DeleteAccountAction />

            <Button
              tw="w-full mb-6"
              mode="contained"
              onPress={submitHandler}
              icon={isSubmitting ? undefined : 'check-circle-outline'}
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

export default withSafeArea(AccountDetails);
