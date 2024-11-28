import { currencies as _currencies } from 'currencies.json';
import { getAllISOCodes } from 'iso-country-currency';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator, Checkbox, Portal, Text, TextInput, Dialog } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import type { AuthRouteProps } from '#navigation/Auth';
import type { SignUpAsCompanyResponse } from '#types/api.responses';
import Danger from '#assets/icons/danger.svg';
import { LanguageStorage, useTranslationUtils } from '#i18n/utils';
import AuthService from '#services/AuthService';
import { MAP_APP_GENDER_TO_API } from '#types/global';
import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import InAppNotifications from '#common/InAppNotifications';

import { currenciesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';
import { SignUpFormSelectLg } from './components/SignUpFormSelectLg';
import { SignUpFormSelectMd } from './components/SignUpFormSelectMd';
import { GENDERS, SignUpAsCompanySchema, SignUpCompanySchemaType } from './schemas';
import { customCountrySort } from './utils';
import phoneNumberCodes from '#constants/phoneNumberCodes';

const allCountries = getAllISOCodes();
const allCountryNames = allCountries.map((code) => code.countryName);

function SignUpCompany(props: AuthRouteProps<'SignUpCompany'>) {
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
  } = useForm<SignUpCompanySchemaType>({
    resolver: zodResolver(() => SignUpAsCompanySchema(t)),
  });

  ////////////// SIGN UP COMPANY
  const [search, setSearch] = useState<string>('');

  const selectedCountry = watch('country');
  const termsAgreement = watch('terms');

  const countries = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return allCountryNames
      .filter((country) => country.toLowerCase().includes(lowerSearch))
      .sort(customCountrySort);
  }, [search]);

  const currencies = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return _currencies
      .filter((currency) => currency.name.toLowerCase().includes(lowerSearch))
      .sort((a, b) => a.code.localeCompare(b.code))
      .map((currency) => currency.name);
  }, [search]);

  ////////////// SIGN UP EMPLOYEE
  const [hidePass, setHidePass] = useState<boolean>(true);
  const [hideConfirmPass, setHideConfirmPass] = useState<boolean>(true);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false);

  const phoneNumber = watch('phone');

  ////////////// ACTIONS
  const onSubmit: SubmitHandler<SignUpCompanySchemaType> = useCallback(async (data) => {
    const {
      firstName,
      lastName,
      phone,
      email,
      password: { password },
      gender,
      companyName: name,
      country,
      currency,
    } = data;

    let result: SignUpAsCompanyResponse | undefined = undefined;

    try {
      result = await AuthService.signUpAsCompany({
        user: {
          firstName,
          lastName,
          phone,
          email,
          password,
          gender: MAP_APP_GENDER_TO_API[gender],
        },
        company: {
          name,
          country,
          currency: currenciesDict().getCodeByName(currency) ?? 'NGN',
          language: LanguageStorage.read(),
          crop: [],
        },
      });
    } catch (exception) {
      console.error(exception);
      toast.show(t('Auth.SignUp.toasts.error'), { type: 'md_danger', style: { marginBottom: 55 } });
    }

    if (result) {
      closePhoneWarningModal();
      navigation.navigate('SignIn');
    }
  }, []);

  const checkPhoneNumber = useCallback(async () => {
    if (!phoneNumber) {
      setIsPhoneModalOpen(true);
    } else {
      await handleSubmit(onSubmit)();
    }
  }, [phoneNumber]);

  const closePhoneWarningModal = useCallback(() => {
    setIsPhoneModalOpen(false);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const currency = allCountries.find(
        (country) => selectedCountry === country.countryName
      )?.currency;

      if (currency) {
        const currencyName = _currencies.find((c) => c.code === currency)?.name;
        setValue('currency', currencyName ?? '');
        clearErrors('currency');
      }
    }
  }, [selectedCountry]);

  return (
    <KeyboardAwareScrollView
      tw="h-full mt-4"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
      <Text tw="mx-4 text-5xl font-bold self-center text-center py-4 mb-4" numberOfLines={2}>
        {t('Auth.SignUp.welcome')}
      </Text>

      {/** SIGNUP COMPANY */}
      <Text tw="mb-2 px-4 text-xl font-bold">{t('Auth.SignUp.SignUpCompany.companyHeader')}</Text>

      {/** COMPANY NAME */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            tw="w-full text-base bg-white rounded-sm mb-3 h-12"
            label={`${t('Auth.SignUp.SignUpCompany.companyNameLabel')}*`}
            onChangeText={onChange}
            value={value}
            error={errors.companyName}
          />
        )}
        name="companyName"
      />

      {/** COUNTRY */}
      <SignUpFormSelectLg<SignUpCompanySchemaType>
        items={countries}
        name="country"
        control={control}
        label={t('Auth.SignUp.commonForm.countryFieldName')}
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

      {/** CURRENCY */}
      <SignUpFormSelectLg<SignUpCompanySchemaType>
        items={currencies}
        name="currency"
        control={control}
        label={t('Auth.SignUp.SignUpCompany.currencyFieldName')}
        search={search}
        setSearch={setSearch}
        computedDisplayValue={(value) => {
          if (!value) return '';
          const currency = _currencies.find((currency) => currency.name === value);
          if (typeof currency === 'undefined') return '';
          return `${currency.symbol} - ${value}`;
        }}
      />
      {errors.currency && (
        <Text tw="text-xs text-red-600 mt-[-2] pl-3 w-[95%]">
          {errors.currency.message?.toString()}
        </Text>
      )}

      {/** SIGNUP EMPLOYEE */}
      <Text tw="mt-4 mb-2 px-4 text-xl font-bold">{t('Auth.SignUp.SignUpCompany.userHeader')}</Text>

      {/** EMAIL */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={`${t('Auth.SignUp.SignUpCompany.emailLabel')}*`}
            onChangeText={onChange}
            value={value}
            autoCorrect={false}
            autoCapitalize="none"
            error={errors.email}
          />
        )}
        name="email"
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

      {/** GENDER */}
      <SignUpFormSelectMd
        items={GENDERS(t)}
        name="gender"
        control={control}
        label={t('Auth.SignUp.commonForm.genderFieldName')}
        enableScroll={false}
      />
      {errors.gender && (
        <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
          {errors.gender.message?.toString()}
        </Text>
      )}

      {/** PHONE */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={t('Auth.SignUp.commonForm.phoneLabel')}
            onChangeText={onChange}
            value={value}
            error={errors.phone}
          />
        )}
        name="phone"
      />

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
            error={errors.password?.confirmPassword}
            secureTextEntry={hideConfirmPass}
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
        onPress={handleSubmit(checkPhoneNumber)}
        disabled={!termsAgreement || isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          t('Auth.SignUp.commonForm.submit')
        )}
      </Button>

      {/** USER WITHOUT PHONE MODAL */}
      <Portal>
        <Dialog
          visible={isPhoneModalOpen}
          onDismiss={closePhoneWarningModal}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Icon icon={() => <Danger width={45} height={45} />} />
          <Dialog.Title tw="text-center mt-0">Warning</Dialog.Title>
          <Dialog.Content>
            <Text tw="text-center mb-4">{t('Auth.SignUp.SignUpCompany.modal.warning')}</Text>
            {[
              t('Auth.SignUp.SignUpCompany.modal.reasons.1'),
              t('Auth.SignUp.SignUpCompany.modal.reasons.2'),
            ].map((item) => (
              <View key={item} tw="flex flex-row space-x-1 items-center">
                <Icon name="fiber-manual-record" size={8} />
                <Text>{item}</Text>
              </View>
            ))}
            <View tw="mt-5 space-y-2">
              <Button
                tw="border-2 border-green-primary"
                mode="contained"
                uppercase
                onPress={handleSubmit(onSubmit)}
                icon="close-circle-outline"
                contentStyle="flex flex-row-reverse items-center"
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  t('Auth.SignUp.SignUpCompany.modal.buttons.continue')
                )}
              </Button>
              <Button
                tw="border-2 border-green-primary"
                mode="contained"
                uppercase
                onPress={closePhoneWarningModal}
                icon="phone"
                contentStyle="flex flex-row-reverse items-center"
              >
                {t('Auth.SignUp.SignUpCompany.modal.buttons.addPhone')}
              </Button>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(SignUpCompany, ['bottom'], true);
