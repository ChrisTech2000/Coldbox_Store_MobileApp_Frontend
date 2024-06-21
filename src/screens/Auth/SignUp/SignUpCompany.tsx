import { zodResolver } from '@hookform/resolvers/zod';
import { currencies as _currencies } from 'currencies.json';
import { getAllISOCodes } from 'iso-country-currency';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox, Text, TextInput } from 'react-native-paper';
import validator from 'validator';
import { z } from 'zod';

import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { SignUpFormSelectLg } from './components/SignUpFormSelectLg';
import { SignUpFormSelectMd } from './components/SignUpFormSelectMd';
import { customCountrySort } from './utils';
import { EGender } from '#types/auth';

const allCountries = getAllISOCodes();
const allCountryNames = allCountries.map((code) => code.countryName);

const Schema = z
  .object({
    companyName: z.string().min(1, { message: 'Company Name is mandatory.' }),
    country: z.string().optional(),
    currency: z.string().min(1, { message: 'Currency selection is mandatory.' }),
    email: z.string().email().min(1, { message: 'Email is mandatory.' }),
    firstName: z.string().min(1, { message: 'First Name is mandatory.' }),
    lastName: z.string().min(1, { message: 'Last Name is mandatory.' }),
    phone: z.string().refine(validator.isMobilePhone).optional(),
    gender: z
      .enum([EGender.FEMALE, EGender.MALE, EGender.OTHER])
      .refine((gender) => !!gender, { message: 'Gender selection is mandatory.' }),
    password: z
      .string()
      .refine((pass) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass), {
        message:
          'Your password needs to be at least 8 characters long, contain one uppercase and one lowercase letters, and a number',
      }),
    confirmPassword: z.string(),
    terms: z
      .boolean()
      .refine((terms) => !terms, { message: 'You need to agree to the Terms of Use.' }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords do not match.',
        path: ['confirmPassword'],
      });
    }
  });

type SignUpSchemaType = z.infer<typeof Schema>;

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
  const [isGenderModalOpen, setIsGenderModalOpen] = useState<boolean>(false);

  const selectedGender = watch('gender');

  const closeGenderModal = useCallback(() => {
    setIsGenderModalOpen(!isGenderModalOpen);
  }, [isGenderModalOpen]);

  const setGenderValue = useCallback((val: string) => {
    setValue('gender', val as EGender);
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
      <SignUpFormSelectLg
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
      <SignUpFormSelectLg
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
      <SignUpFormSelectMd
        form={{
          fieldName: 'gender',
          required: true,
          currentValue: selectedGender,
          setCurrentValue: setGenderValue,
        }}
        isModalOpen={isGenderModalOpen}
        closeModal={closeGenderModal}
        data={[EGender.FEMALE, EGender.MALE, EGender.OTHER]}
      />

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
            secureTextEntry={hidePass}
            right={
              <TextInput.Icon
                icon={hidePass ? 'eye' : 'eye-off'}
                onPress={() => setHidePass(!hidePass)}
              />
            }
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
            secureTextEntry={hideConfirmPass}
            right={
              <TextInput.Icon
                icon={hideConfirmPass ? 'eye' : 'eye-off'}
                onPress={() => setHideConfirmPass(!hideConfirmPass)}
              />
            }
          />
        )}
        name="confirmPassword"
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
                  console.log(value);
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
      >
        Sign Up
      </Button>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(SignUpCompany);
