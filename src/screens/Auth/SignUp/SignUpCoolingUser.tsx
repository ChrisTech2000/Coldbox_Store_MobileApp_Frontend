import { getAllISOCodes } from 'iso-country-currency';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, Path, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator, Checkbox, Text, TextInput } from 'react-native-paper';

import type { AuthRouteProps } from '#navigation/Auth';
import type { SignUpAsCoolingUserResponse } from '#types/api.responses';
import { useTranslationUtils } from '#i18n/utils';
import AuthService from '#services/AuthService';
import { EAppGender, MAP_APP_GENDER_TO_API } from '#types/global';
import InAppNotifications from '#common/InAppNotifications';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { EAccountProfile } from '../SignIn';
import { SignUpFormSelectLg } from './components/SignUpFormSelectLg';
import { SignUpFormSelectMd } from './components/SignUpFormSelectMd';
import {
  GENDERS,
  getLanguageCode,
  LANGUAGES,
  SignUpAsCoolingUserSchema,
  SignUpCoolingUserSchemaType,
} from './schemas';
import { customCountrySort } from './utils';
import phoneNumberCodes from '#constants/phoneNumberCodes';

const allCountries = getAllISOCodes();
const allCountryNames = allCountries.map((code) => code.countryName);

function SignUpCoolingUser(props: AuthRouteProps<'SignUpCoolingUser'>) {
  const { navigation } = props;
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<SignUpCoolingUserSchemaType>({
    resolver: zodResolver(() => SignUpAsCoolingUserSchema(t)),
  });

  ////////////// SIGN UP COOLING USER
  const [search, setSearch] = useState<string>('');
  const [hidePass, setHidePass] = useState<boolean>(true);
  const [hideConfirmPass, setHideConfirmPass] = useState<boolean>(true);
  const [isCountriesModalOpen, setIsCountriesModalOpen] = useState<boolean>(false);
  const [isGenderModalOpen, setIsGenderModalOpen] = useState<boolean>(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);

  const selectedCountry = watch('country');
  const selectedGender = watch('gender');
  const selectedLanguage = watch('language');
  const termsAgreement = watch('terms');

  const countries = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return allCountryNames
      .filter((country) => country.toLowerCase().includes(lowerSearch))
      .sort(customCountrySort);
  }, [search]);

  const closeCountryModal = useCallback(() => {
    setIsCountriesModalOpen(!isCountriesModalOpen);
    if (search) setSearch('');
  }, [search, isCountriesModalOpen]);

  const closeGenderModal = useCallback(() => {
    setIsGenderModalOpen(!isGenderModalOpen);
  }, [isGenderModalOpen]);

  const closeLanguageModal = useCallback(() => {
    setIsLanguageModalOpen(!isLanguageModalOpen);
  }, [isLanguageModalOpen]);

  const setGenderValue = useCallback((val: string) => {
    setValue('gender', val as EAppGender);
    clearErrors('gender');
  }, []);

  const setLanguageValue = useCallback((val: string) => {
    setValue('language', val);
    clearErrors('language');
  }, []);

  const onSubmit: SubmitHandler<SignUpCoolingUserSchemaType> = useCallback(async (data) => {
    const {
      firstName,
      lastName,
      phone,
      password: { password },
      gender,
      country,
      language,
    } = data;

    let result: SignUpAsCoolingUserResponse | undefined = undefined;

    try {
      result = await AuthService.signUpAsCoolingUser({
        user: {
          firstName,
          lastName,
          phone,
          password,
          language: getLanguageCode(language, t),
          country,
          gender: MAP_APP_GENDER_TO_API[gender],
        },
      });
    } catch (exception) {
      console.error(exception);
      toast.show(t('Auth.SignUp.toasts.error'), { type: 'md_danger', style: { marginBottom: 55 } });
    }

    if (result) {
      navigation.navigate('SignIn', { accountProfile: EAccountProfile.FARMER });
    }
  }, []);

  return (
    <KeyboardAwareScrollView
      tw="flex-1 h-full"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
      <Text tw="mx-4 text-5xl font-bold self-center text-center py-4 mb-4" numberOfLines={2}>
        {t('Auth.SignUp.welcome')}
      </Text>

      {/** SIGNUP COMPANY */}
      <Text tw="mb-2 px-4 text-xl font-bold">{t('Auth.SignUp.SignUpCoolingUser.header')}</Text>

      {/** COUNTRY */}
      <SignUpFormSelectLg<SignUpCoolingUserSchemaType>
        form={{
          control,
          fieldName: t(
            'Auth.SignUp.commonForm.countryFieldName'
          ) as Path<SignUpCoolingUserSchemaType>,
          required: true,
          error: !!errors.country,
          currentValue: selectedCountry ?? '',
        }}
        isModalOpen={isCountriesModalOpen}
        search={search}
        closeModal={closeCountryModal}
        onSelectCallback={(previous, next) => {
          let prevDial = '';
          let newDial = '';
          for (const item of phoneNumberCodes) {
            if ((prevDial && newDial) || (!previous && newDial)) break;
            if (previous && item.name === previous) prevDial = item.dialCode;
            if (item.name === next) newDial = item.dialCode;
          }
          const phoneValue = getValues('phone');
          if (!phoneValue) {
            setValue('phone', newDial);
          } else {
            const newValue = phoneValue.includes(prevDial)
              ? phoneValue.replace(prevDial, newDial)
              : [newDial, phoneValue].join('');
            setValue('phone', newValue);
          }
        }}
        setSearch={setSearch}
        data={countries}
      />
      {errors.country && (
        <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
          {errors.country.message?.toString()}
        </Text>
      )}

      {/** PHONE */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={`${t('Auth.SignUp.commonForm.phoneLabel')}*`}
            onChangeText={onChange}
            value={value}
            error={errors.phone}
          />
        )}
        name="phone"
      />

      {/** FIRST NAME */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={`${t('Auth.SignUp.commonForm.firstNameLabel')}*`}
            onChangeText={onChange}
            value={value}
            error={errors.firstName}
          />
        )}
        name="firstName"
      />

      {/** LAST NAME */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={`${t('Auth.SignUp.commonForm.lastNameLabel')}*`}
            onChangeText={onChange}
            value={value}
            error={errors.lastName}
          />
        )}
        name="lastName"
      />

      {/** LANGUAGES */}
      <SignUpFormSelectMd<SignUpCoolingUserSchemaType>
        form={{
          fieldName: t(
            'Auth.SignUp.SignUpCoolingUser.languageFieldName'
          ) as Path<SignUpCoolingUserSchemaType>,
          required: true,
          error: !!errors.language,
          currentValue: selectedLanguage,
          setCurrentValue: setLanguageValue,
        }}
        isModalOpen={isLanguageModalOpen}
        closeModal={closeLanguageModal}
        data={LANGUAGES(t)}
      />
      {errors.language && (
        <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
          {errors.language.message?.toString()}
        </Text>
      )}

      {/** GENDER */}
      <SignUpFormSelectMd<SignUpCoolingUserSchemaType>
        form={{
          fieldName: t(
            'Auth.SignUp.commonForm.genderFieldName'
          ) as Path<SignUpCoolingUserSchemaType>,
          required: true,
          error: !!errors.gender,
          currentValue: selectedGender,
          setCurrentValue: setGenderValue,
        }}
        isModalOpen={isGenderModalOpen}
        closeModal={closeGenderModal}
        data={GENDERS(t)}
      />
      {errors.gender && (
        <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
          {errors.gender.message?.toString()}
        </Text>
      )}

      {/** PASSWORD */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={`${t('Auth.SignUp.commonForm.passwordLabel')}*`}
            onChangeText={onChange}
            value={value}
            secureTextEntry={hidePass}
            error={errors.password?.password}
            right={
              <TextInput.Icon
                icon={hidePass ? 'eye' : 'eye-off'}
                onPress={() => setHidePass(!hidePass)}
              />
            }
          />
        )}
        name="password.password"
      />

      {/** CONFIRM PASSWORD */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={`${t('Auth.SignUp.commonForm.confirmPasswordLabel')}*`}
            onChangeText={onChange}
            value={value}
            secureTextEntry={hideConfirmPass}
            error={errors.password?.confirmPassword}
            right={
              <TextInput.Icon
                icon={hideConfirmPass ? 'eye' : 'eye-off'}
                onPress={() => setHideConfirmPass(!hideConfirmPass)}
              />
            }
          />
        )}
        name="password.confirmPassword"
      />

      {/** TERMS */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <View tw="flex flex-row items-center max-w-[85%] mx-4 my-2 space-x-2">
            <View tw="border border-green-primary rounded-md scale-75">
              <Checkbox
                onPress={() => {
                  onChange(!value);
                }}
                status={value ? 'checked' : 'unchecked'}
              />
            </View>

            <Text>
              {t('Auth.SignUp.commonForm.terms.agree')}&nbsp;
              <Text tw="underline" onPress={() => props.navigation.navigate('LicenseAgreement')}>
                {t('Auth.SignUp.commonForm.terms.license')}
              </Text>
              ,&nbsp;
              <Text tw="underline" onPress={() => props.navigation.navigate('PrivacyPolicy')}>
                {t('Auth.SignUp.commonForm.terms.privacy')}
              </Text>
              &nbsp;
              <Text>{t('Auth.SignUp.commonForm.terms.and')}</Text>&nbsp;
              <Text tw="underline" onPress={() => props.navigation.navigate('ComsolTerms')}>
                {t('Auth.SignUp.commonForm.terms.comsol')}
              </Text>
            </Text>
          </View>
        )}
        name="terms"
      />

      {/** SUBMIT */}
      <Button
        tw="w-[95%] self-center border-2 my-2"
        mode="contained"
        uppercase
        onPress={handleSubmit(onSubmit)}
        disabled={!termsAgreement || isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          t('Auth.SignUp.commonForm.submit')
        )}
      </Button>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(SignUpCoolingUser, ['bottom'], true);
