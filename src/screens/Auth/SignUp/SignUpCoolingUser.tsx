import { getAllISOCodes } from 'iso-country-currency';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator, Checkbox, Text, TextInput } from 'react-native-paper';

import InAppNotifications from '#common/InAppNotifications';
import phoneNumberCodes from '#constants/phoneNumberCodes';
import { useTranslationUtils } from '#i18n/utils';
import type { AuthRouteProps } from '#navigation/Auth';
import AuthService from '#services/AuthService';
import { CustomError } from '#services/utils/ErrorUtil';
import type { SignUpAsCoolingUserResponse } from '#types/api.responses';
import { MAP_APP_GENDER_TO_API } from '#types/global';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import reportCrash from '#ui/lib/reportCrash';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import launchArgs from '../../../constants/launch.args';
import { EAccountProfile } from '../SignIn';
import { SignUpFormSelectLg } from './components/SignUpFormSelectLg';
import { SignUpFormSelectMd } from './components/SignUpFormSelectMd';
import {
  GENDER_CODES,
  GENDERS,
  LANGUAGE_CODES,
  LANGUAGES,
  SignUpAsCoolingUserSchema,
  SignUpCoolingUserSchemaType,
} from './schemas';
import { customCountrySort } from './utils';

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
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<SignUpCoolingUserSchemaType>({
    resolver: zodResolver(() => SignUpAsCoolingUserSchema(t)),
  });

  ////////////// SIGN UP COOLING USER
  const [search, setSearch] = useState<string>('');
  const [hidePass, setHidePass] = useState<boolean>(true);
  const [hideConfirmPass, setHideConfirmPass] = useState<boolean>(true);

  const termsAgreement = watch('terms');

  const countries = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return allCountryNames
      .filter((country) => country.toLowerCase().includes(lowerSearch))
      .sort(customCountrySort);
  }, [search]);

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
          language,
          country,
          gender: MAP_APP_GENDER_TO_API[gender],
        },
      });
    } catch (exception) {
      if (exception instanceof CustomError && exception.originalError.response.status >= 500) {
        toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
      } else {
        toast.show(t('Auth.SignUp.toasts.error'), {
          type: 'md_danger',
          style: { marginBottom: 55 },
        });
      }
      reportCrash(exception as Error);
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
        testID="country-select"
        items={countries}
        label={t('Auth.SignUp.commonForm.countryFieldName')}
        name="country"
        control={control}
        search={search}
        setSearch={setSearch}
        onValueChange={(previous, next) => {
          const prevDial = previous
            ? phoneNumberCodes.find((item) => item.name === previous)?.dialCode || ''
            : '';
          const newDial = phoneNumberCodes.find((item) => item.name === next)?.dialCode || '';

          const phoneValue = getValues('phone');
          const newValue = !phoneValue
            ? newDial
            : phoneValue.includes(prevDial)
              ? phoneValue.replace(prevDial, newDial)
              : `${newDial}${phoneValue}`;

          setValue('phone', newValue);
        }}
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
        label={t('Auth.SignUp.SignUpCoolingUser.languageFieldName')}
        name="language"
        control={control}
        items={LANGUAGES}
        translateItemLabel={(item) => LANGUAGE_CODES[item as keyof typeof LANGUAGE_CODES]}
        required
        testID="language-select"
      />
      {errors.language && (
        <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
          {errors.language.message?.toString()}
        </Text>
      )}

      {/** GENDER */}
      <SignUpFormSelectMd<SignUpCoolingUserSchemaType>
        testID="gender-select"
        label={t('Auth.SignUp.commonForm.genderFieldName')}
        name="gender"
        control={control}
        items={GENDERS}
        translateItemLabel={(item) => GENDER_CODES[item as keyof typeof GENDER_CODES]}
        enableScroll={false}
        required
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
            secureTextEntry={hidePass && !launchArgs.isE2E}
            error={errors.password?.password}
            right={
              <TextInput.Icon
                testID="password-eye-icon"
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
            secureTextEntry={hideConfirmPass && !launchArgs.isE2E}
            error={errors.password?.confirmPassword}
            right={
              <TextInput.Icon
                testID="password-eye-icon"
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
                testID="terms-checkbox"
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
