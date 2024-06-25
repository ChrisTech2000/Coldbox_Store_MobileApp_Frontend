import { zodResolver } from '@hookform/resolvers/zod';
import { getAllISOCodes } from 'iso-country-currency';
import React, { useCallback, useMemo, useState } from 'react';
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
import { LANGUAGES, SignUpAsCoolingUserSchema } from './schemas';
import { customCountrySort } from './utils';

const allCountries = getAllISOCodes();
const allCountryNames = allCountries.map((code) => code.countryName);

type SignUpSchemaType = z.infer<typeof SignUpAsCoolingUserSchema>;

function SignUpCoolingUser() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpAsCoolingUserSchema),
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
    setValue('gender', val as EGender);
    clearErrors('gender');
  }, []);

  const setLanguageValue = useCallback((val: string) => {
    setValue('language', val);
    clearErrors('language');
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
      <SignUpFormSelectLg<SignUpSchemaType>
        form={{
          control,
          fieldName: 'country',
          required: true,
          error: !!errors.country,
          currentValue: selectedCountry ?? '',
        }}
        isModalOpen={isCountriesModalOpen}
        search={search}
        closeModal={closeCountryModal}
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
            label={'Phone Number (with country code)*'}
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

      {/** LANGUAGES */}
      <SignUpFormSelectMd<SignUpSchemaType>
        form={{
          fieldName: 'language',
          required: true,
          error: !!errors.language,
          currentValue: selectedLanguage,
          setCurrentValue: setLanguageValue,
        }}
        isModalOpen={isLanguageModalOpen}
        closeModal={closeLanguageModal}
        data={LANGUAGES}
      />
      {errors.language && (
        <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
          {errors.language.message?.toString()}
        </Text>
      )}

      {/** GENDER */}
      <SignUpFormSelectMd<SignUpSchemaType>
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
        disabled={!termsAgreement}
      >
        Sign Up
      </Button>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(SignUpCoolingUser);
