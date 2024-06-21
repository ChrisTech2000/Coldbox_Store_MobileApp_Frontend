import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { z } from 'zod';
import { currencies as _currencies } from 'currencies.json';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { SignUpFormSelect } from './components/SignUpFormSelect';
import { getAllISOCodes } from 'iso-country-currency';
import { customCountrySort } from './utils';

enum EGender {
  FEMALE = 'Female',
  MALE = 'Male',
  OTHER = 'Other',
}

const allCountries = getAllISOCodes().map((code) => code.countryName);

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
    // handleSubmit,
    watch,
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
    return allCountries
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

  return (
    <ScrollView tw="flex-1 h-full">
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
            tw="w-full text-base bg-white rounded-sm mb-2 h-12"
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
          currentValue: selectedCountry,
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
          currentValue: `${_currencies.find((c) => c.name === selectedCurrency)?.symbol ?? ''}${selectedCurrency ? '-' : ''}${selectedCurrency}`,
        }}
        isModalOpen={isCurrenciesModalOpen}
        search={search}
        closeModal={closeCurrenciesModal}
        setSearch={setSearch}
        data={currencies}
      />

      {/** SIGNUP COMPANY */}
      <Text tw="mt-4 mb-2 px-4 text-xl font-bold">Sign Up Registered Employee</Text>

      {/** Email*/}
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
    </ScrollView>
  );
}

export default withSafeArea(SignUpCompany);
