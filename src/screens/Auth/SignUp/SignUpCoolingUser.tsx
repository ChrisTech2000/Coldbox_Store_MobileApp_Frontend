import { zodResolver } from '@hookform/resolvers/zod';
import { getAllISOCodes } from 'iso-country-currency';
import React, { useCallback, useMemo, useState } from 'react';
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

// TODO: get languages from BE
const LANGUAGES = ['English', 'Hindi', 'Oriya', 'Gujarati', 'French', 'Portuguese'];

const allCountries = getAllISOCodes();
const allCountryNames = allCountries.map((code) => code.countryName);

const Schema = z
  .object({
    country: z.string().optional(),
    firstName: z.string().min(1, { message: 'First Name is mandatory.' }),
    lastName: z.string().min(1, { message: 'Last Name is mandatory.' }),
    phone: z.string().refine(validator.isMobilePhone).optional(),
    language: z
      .string()
      .refine((lang) => !lang || !LANGUAGES.includes(lang), { message: 'Language is mandatory.' }),
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

function SignUpCoolingUser() {
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
    setValue('gender', val as EGender);
  }, []);

  const setLanguageValue = useCallback((val: string) => {
    setValue('language', val);
  }, []);

  const onSubmit = useCallback(() => {
    // TODO: Implement API call here
  }, []);

  return (
    <KeyboardAwareScrollView tw="flex-1 h-full" keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
      <Text tw="mb-4 text-5xl font-bold self-center text-center">Welcome to Coldtivate</Text>

      {/** SIGNUP COMPANY */}
      <Text tw="mb-2 px-4 text-xl font-bold">Sign Up Cooling User</Text>

      {/** COUNTRY */}
      <SignUpFormSelectLg
        form={{
          control,
          fieldName: 'country',
          required: true,
          currentValue: selectedCountry ?? '',
        }}
        isModalOpen={isCountriesModalOpen}
        search={search}
        closeModal={closeCountryModal}
        setSearch={setSearch}
        data={countries}
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
            label={'Phone Number (with country code)*'}
            onChangeText={onChange}
            value={value}
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

      {/** LANGUAGES */}
      <SignUpFormSelectMd
        form={{
          fieldName: 'language',
          required: true,
          currentValue: selectedLanguage,
          setCurrentValue: setLanguageValue,
        }}
        isModalOpen={isLanguageModalOpen}
        closeModal={closeLanguageModal}
        data={LANGUAGES}
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

export default withSafeArea(SignUpCoolingUser);
