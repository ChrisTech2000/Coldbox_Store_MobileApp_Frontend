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
import { LanguageStorage } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import type { TranslationLocales } from '#i18n/constants';

import FormManager, { type FormValues } from './components/FormManager';
import NameFields from './modules/NameFields';
import LanguageField from './modules/LanguageField';
import ContactFields from './modules/ContactFields';
import GenderField from './modules/GenderField';
import LocationField from './modules/Location';
import CountryField from './modules/CountryField';

function AccountDetails() {
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

  async function onSubmit(values: FormValues) {
    if (!user?.id || !farmerId) return; // safe guard
    try {
      const { kind, ...rest } = values;

      const userDatum = await ColdtivateService.updateUser({
        userId: user.id,
        firstName: rest.firstName,
        lastName: rest.lastName,
        phone: rest.phone,
        email: rest.email,
        gender: rest.gender,
        language: rest.language,
      });

      setUser({ ...userDatum, role: user.role });

      if (kind === ERoles.COOLING_USER) {
        const farmerDatum = await ColdtivateService.updateFarmer({
          farmerId,
          country: rest.country,
          parentName: rest.parentName,
          updateUser: true,
        });

        patchFarmer({
          farmerCountry: farmerDatum.country,
          farmerParentName: farmerDatum.parentName,
        });
      }
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

  const isCoolingUser = user?.role === ERoles.COOLING_USER;

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
          <ContactFields includeEmail={!isCoolingUser} />
          <GenderField />

          {isCoolingUser ? (
            <React.Fragment>
              <LocationField />
              <CountryField />
              <View tw="w-full bg-zinc-200 flex-row items-center justify-between p-3 rounded-md my-1.5">
                <Text variant="TitleSmall">Cooling User Import Code</Text>
                <Text variant="TitleSmall">{farmerUserCode}</Text>
              </View>
            </React.Fragment>
          ) : null}

          <Button
            tw="w-full mt-4"
            mode="contained"
            onPress={submitHandler}
            icon={isSubmitting ? undefined : 'check-circle-outline'}
            uppercase
          >
            {isSubmitting ? <ActivityIndicator size="small" color="white" /> : 'Save Changes'}
          </Button>
        </KeyboardAwareScrollView>
      )}
    </FormManager>
  );
}

export default withSafeArea(AccountDetails);
