import { zodResolver } from '@hookform/resolvers/zod';
import { currencies as _currencies } from 'currencies.json';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, TextInput } from 'react-native-paper';
import { z } from 'zod';

import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { getAllISOCodes } from 'iso-country-currency';
import { SignUpFormSelect } from './components/SignUpFormSelect';
import { customCountrySort } from './utils';

enum EGender {
  FEMALE = 'Female',
  MALE = 'Male',
  OTHER = 'Other',
}

const allCountries = getAllISOCodes();
const allCountryNames = allCountries.map((code) => code.countryName);

const Schema = z.object({
  companyName: z.string().min(1),
  country: z.string().optional(),
  currency: z.string().min(1),
  email: z.string().email().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z
    .string()
    .regex(/^\+\d{1,3}\s?\d{1,14}$/, {
      message: 'Invalid phone number format',
    })
    .optional(),
  gender: z.enum([EGender.FEMALE, EGender.MALE, EGender.OTHER]),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
});

export type SignUpSchemaType = z.infer<typeof Schema>;

function SignUpCompany() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    // clearErrors,
    // formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(Schema),
  });

  ////////////// SIGN UP COMPANY
  const [isCountriesModalOpen, setIsCountriesModalOpen] = useState<boolean>(false);
  const [isCurrenciesModalOpen, setIsCurrenciesModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const selectedCountry = watch('country');
  const selectedCurrency = watch('currency');

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
      }
    }
  }, [selectedCountry]);

  return (
    <KeyboardAwareScrollView tw="flex-1 h-full">
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
          <TextInput
            tw="w-full text-base bg-white rounded-sm mb-3 h-12"
            label={'Company Name*'}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="companyName"
      />

      {/** COUNTRY */}
      <SignUpFormSelect
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
      <SignUpFormSelect
        form={{
          control,
          fieldName: 'currency',
          required: true,
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

      {/** SIGNUP EMPLOYEE */}
      <Text tw="mt-4 mb-2 px-4 text-xl font-bold">Sign Up Registered Employee</Text>

      {/** EMAIL */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={'Email*'}
            onChangeText={onChange}
            value={value}
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
          <TextInput
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={'First Name*'}
            onChangeText={onChange}
            value={value}
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
          <TextInput
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={'Last Name*'}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />

      {/** GENDER */}

      {/** PHONE */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={'Phone Number (with country code)'}
            onChangeText={onChange}
            value={value}
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
          <TextInput
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={'Password*'}
            onChangeText={onChange}
            value={value}
            secureTextEntry={hidePass ? true : false}
            right={<TextInput.Icon icon="eye" onPress={() => setHidePass(!hidePass)} />}
          />
        )}
        name="password"
      />

      {/** CONFIRM PASSWORD */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
            label={'Confirm Password*'}
            onChangeText={onChange}
            value={value}
            secureTextEntry={hideConfirmPass ? true : false}
            right={<TextInput.Icon icon="eye" onPress={() => setHideConfirmPass(!hidePass)} />}
          />
        )}
        name="confirmPassword"
      />

      <Button
        tw="w-[95%] self-center border-2 rounded-sm my-2"
        mode="contained"
        uppercase
        onPress={handleSubmit(onSubmit)}
      >
        Sign Up
      </Button>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(SignUpCompany);
