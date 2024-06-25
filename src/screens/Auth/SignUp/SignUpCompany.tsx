import { zodResolver } from '@hookform/resolvers/zod';
import { currencies as _currencies } from 'currencies.json';
import { getAllISOCodes } from 'iso-country-currency';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox, Text, TextInput } from 'react-native-paper';
import { z } from 'zod';

import { EGender } from '#types/auth';
import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { SignUpFormSelectLg } from './components/SignUpFormSelectLg';
import { SignUpFormSelectMd } from './components/SignUpFormSelectMd';
import { SignUpAsCompanySchema } from './schemas';
import { customCountrySort } from './utils';

const allCountries = getAllISOCodes();
const allCountryNames = allCountries.map((code) => code.countryName);

export type SignUpSchemaType = z.infer<typeof SignUpAsCompanySchema>;

function SignUpCompany() {
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

  const selectedGender = watch('gender');

  const closeGenderModal = useCallback(() => {
    setIsGenderModalOpen(!isGenderModalOpen);
  }, [isGenderModalOpen]);

  const setGenderValue = useCallback((val: string) => {
    setValue('gender', val as EGender);
    clearErrors('gender');
  }, []);

  ////////////// ACTIONS
  const onSubmit = useCallback(() => {
    // TODO: Implement API call here
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
        data={[EGender.FEMALE, EGender.MALE, EGender.OTHER]}
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
        tw="w-[95%] self-center border-2 rounded-sm my-2"
        mode="contained"
        uppercase
        onPress={handleSubmit(onSubmit)}
        disabled={!termsAgreement}
      >
        Sign Up
      </Button>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(SignUpCompany);
