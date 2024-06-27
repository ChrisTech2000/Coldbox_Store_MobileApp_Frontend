import { zodResolver } from '@hookform/resolvers/zod';
import { currencies as _currencies } from 'currencies.json';
import { getAllISOCodes } from 'iso-country-currency';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox, Portal, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { z } from 'zod';

import Danger from '#assets/icons/danger.svg';
import { APP_LOCALES } from '#i18n/constants';
import AuthService from '#services/AuthService';
import { EAppGender, MAP_APP_GENDER_TO_API } from '#types/global';
import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Modal } from '#ui/components/Modal';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { AuthRouteProps } from 'navigation/Auth';

import { SignUpFormSelectLg } from './components/SignUpFormSelectLg';
import { SignUpFormSelectMd } from './components/SignUpFormSelectMd';
import { SignUpAsCompanySchema } from './schemas';
import { customCountrySort } from './utils';

const allCountries = getAllISOCodes();
const allCountryNames = allCountries.map((code) => code.countryName);

const REASONS_TO_ADD_PHONE = [{ key: 'Resetting account' }, { key: 'Receiving sms receipts' }];

export type SignUpSchemaType = z.infer<typeof SignUpAsCompanySchema>;

function SignUpCompany(props: AuthRouteProps<'SignUpCompany'>) {
  const { navigation } = props;
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpAsCompanySchema),
  });

  ////////////// SIGN UP COMPANY
  const [isCountriesModalOpen, setIsCountriesModalOpen] = useState<boolean>(false);
  const [isCurrenciesModalOpen, setIsCurrenciesModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const selectedCountry = watch('country');
  const selectedCurrency = watch('currency');
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

  const closeCountryModal = useCallback(() => {
    setIsCountriesModalOpen(!isCountriesModalOpen);
    if (search) setSearch('');
  }, [search, isCountriesModalOpen]);

  const closeCurrenciesModal = useCallback(() => {
    setIsCurrenciesModalOpen(!isCurrenciesModalOpen);
    if (search) setSearch('');
  }, [search, isCurrenciesModalOpen]);

  ////////////// SIGN UP EMPLOYEE
  const [hidePass, setHidePass] = useState<boolean>(true);
  const [hideConfirmPass, setHideConfirmPass] = useState<boolean>(true);
  const [isGenderModalOpen, setIsGenderModalOpen] = useState<boolean>(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState<boolean>(false);

  const selectedGender = watch('gender');
  const phoneNumber = watch('phone');

  const closeGenderModal = useCallback(() => {
    setIsGenderModalOpen(!isGenderModalOpen);
  }, [isGenderModalOpen]);

  const setGenderValue = useCallback((val: string) => {
    setValue('gender', val as EAppGender);
    clearErrors('gender');
  }, []);

  ////////////// ACTIONS
  const onSubmit: SubmitHandler<SignUpSchemaType> = useCallback(async (data) => {
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

    const result = await AuthService.signUpAsCompany({
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
        currency,
        language: APP_LOCALES.ENGLISH, // TODO: fix
        crop: [],
      },
    });

    if (result) {
      navigation.navigate('SignIn');
    }
  }, []);

  const checkPhoneNumber = useCallback(() => {
    if (!phoneNumber) {
      setIsPhoneModalOpen(true);
    } else {
      handleSubmit(onSubmit);
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
    <KeyboardAwareScrollView tw="flex-1 h-full" keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
      <Text tw="mb-4 text-5xl font-bold self-center text-center">Welcome to Coldtivate</Text>

      {/** SIGNUP COMPANY */}
      <Text tw="mb-2 px-4 text-xl font-bold">Sign Up Company</Text>

      {/** COMPANY NAME */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            tw="w-full text-base bg-white rounded-sm mb-3 h-12"
            label={'Company Name*'}
            onChangeText={onChange}
            value={value}
            error={errors.companyName}
          />
        )}
        name="companyName"
      />

      {/** COUNTRY */}
      <SignUpFormSelectLg<SignUpSchemaType>
        form={{
          control,
          fieldName: 'country',
          currentValue: selectedCountry ?? '',
        }}
        isModalOpen={isCountriesModalOpen}
        search={search}
        closeModal={closeCountryModal}
        setSearch={setSearch}
        data={countries}
      />

      {/** CURRENCY */}
      <SignUpFormSelectLg<SignUpSchemaType>
        form={{
          control,
          fieldName: 'currency',
          required: true,
          error: !!errors.currency,
          currentValue: selectedCurrency
            ? `${_currencies.find((c) => c.name === selectedCurrency)?.symbol ?? ''}-${selectedCurrency}`
            : '',
        }}
        isModalOpen={isCurrenciesModalOpen}
        search={search}
        closeModal={closeCurrenciesModal}
        setSearch={setSearch}
        data={currencies}
      />
      {errors.currency && (
        <Text tw="text-xs text-red-600 mt-[-2] pl-3 w-[95%]">
          {errors.currency.message?.toString()}
        </Text>
      )}

      {/** SIGNUP EMPLOYEE */}
      <Text tw="mt-4 mb-2 px-4 text-xl font-bold">Sign Up Registered Employee</Text>

      {/** EMAIL */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={'Email*'}
            onChangeText={onChange}
            value={value}
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
            label={'First Name*'}
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
            label={'Last Name*'}
            onChangeText={onChange}
            value={value}
            error={errors.lastName}
          />
        )}
        name="lastName"
      />

      {/** GENDER */}
      <SignUpFormSelectMd
        form={{
          fieldName: 'gender',
          required: true,
          error: !!errors.gender,
          currentValue: selectedGender,
          setCurrentValue: setGenderValue,
        }}
        isModalOpen={isGenderModalOpen}
        closeModal={closeGenderModal}
        data={[EAppGender.FEMALE, EAppGender.MALE, EAppGender.OTHER]}
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
            label={'Phone Number (with country code)'}
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
            label={'Password*'}
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
            label={'Confirm Password*'}
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
              I agree to Coldtivate User License Agreement, Privacy Policy and COMSOL Terms of Use
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
        disabled={!termsAgreement}
      >
        Sign Up
      </Button>

      {/** USER WITHOUT PHONE MODAL */}
      <Portal>
        <Modal tw="w-2/3" visible={isPhoneModalOpen} onDismiss={closePhoneWarningModal}>
          <View tw="w-full items-center mx-16 bg-white rounded-sm py-1 max-h-80">
            <Text tw="text-lg font-bold mb-1 mt-2">Warning</Text>
            <Danger tw="max-h-16 mb-1" />
            <Text tw="text-center mb-2">
              If you register without a phone some functionalities will not work:
            </Text>
            {REASONS_TO_ADD_PHONE.map((item) => (
              <View key={item.key} tw="flex flex-row space-x-1 items-center">
                <Icon name="fiber-manual-record" size={8} />
                <Text>{item.key}</Text>
              </View>
            ))}
            <Button
              tw="border-2 border-green-primary mt-4 mb-2"
              mode="contained"
              uppercase
              onPress={handleSubmit(onSubmit)}
              icon="close-circle-outline"
              contentStyle="flex flex-row-reverse items-center"
            >
              Continue Anyway
            </Button>
            <Button
              tw="border-2 border-green-primary mb-2"
              mode="contained"
              uppercase
              onPress={closePhoneWarningModal}
              icon="phone"
              contentStyle="flex flex-row-reverse items-center"
            >
              Add Phone
            </Button>
          </View>
        </Modal>
      </Portal>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(SignUpCompany);
