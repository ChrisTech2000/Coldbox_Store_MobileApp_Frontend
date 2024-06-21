import React, { useCallback, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '#ui/components/Button';
import type { AuthRouteProps } from '#navigation/Auth';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import Logo from '#assets/images/coldtivate_logo.svg';
import Employee from '#assets/icons/employee.svg';
import Operator from '#assets/icons/operator.svg';
import Farmer from '#assets/icons/farmer.svg';
import { AccountCard } from './components/AccountCard';

const IMG_SIZE = Dimensions.get('screen').width / 2.5;
const ACCOUNT_TYPE_SIZE = Dimensions.get('screen').width / 5;

// TODO: check if we have profiles available in the BE
enum EAccountProfile {
  FARMER = 'farmer',
  EMPLOYEE = 'employee',
  OPERATOR = 'operator',
}

const ACCOUNT_DESCRIPTIONS = {
  [EAccountProfile.EMPLOYEE]:
    'Part of the cold room provider management team. A registered employee can register the company in the app and invite other employees to join. Registered employees can log in with email or phone number.',
  [EAccountProfile.OPERATOR]:
    'Employee physically present at the cold room and managing its check-in, check-out operations. Operators can be invited by registered employees to join the company. Operators can log in with a phone number.',
  [EAccountProfile.FARMER]:
    'The cold room user. Farmers, traders, retailers who have access to a smartphone can log in here. Cold room users without a smartphone can access the information of the app by visiting a cold room and interacting with the operator.',
};

const schema = z
  .object({
    activeProfile: z.enum([
      EAccountProfile.EMPLOYEE,
      EAccountProfile.FARMER,
      EAccountProfile.OPERATOR,
    ]),
    user: z.string(),
    password: z.string().min(1, {
      message: 'Password is required.',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.user.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        path: ['user'],
        minimum: 1,
        type: 'string',
        inclusive: true,
        message:
          data.activeProfile === EAccountProfile.EMPLOYEE
            ? 'An email or phone number is required.'
            : 'Phone number is required',
      });
    }
  });

function SignIn(props: AuthRouteProps<'SignIn'>) {
  const { navigation } = props;

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      activeProfile: EAccountProfile.EMPLOYEE,
      user: '',
      password: '',
    },
  });

  const [hidePass, setHidePass] = useState<boolean>(true);

  const activeProfile = watch('activeProfile');

  const onSubmit = useCallback(() => {
    // TODO: Implement API call here
  }, []);

  return (
    <View tw="flex-1 items-center justify-center">
      <Logo width={IMG_SIZE} height={IMG_SIZE} tw="mb-4 mt-[-32]" />
      <Text tw="mb-2 text-xl font-bold">Sign In</Text>
      <View tw="w-full flex flex-row justify-between mb-2 px-4">
        <View tw="items-center">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <AccountCard
                isActive={activeProfile === EAccountProfile.EMPLOYEE}
                onPress={() => {
                  clearErrors();
                  onChange(EAccountProfile.EMPLOYEE);
                }}
              >
                <Employee width={ACCOUNT_TYPE_SIZE} height={ACCOUNT_TYPE_SIZE} />
              </AccountCard>
            )}
            name="activeProfile"
          />
          <Text tw="mt-4 text-xs">Registered</Text>
          <Text tw="text-xs">Employee</Text>
        </View>
        <View tw="items-center">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <AccountCard
                isActive={activeProfile === EAccountProfile.OPERATOR}
                onPress={() => {
                  clearErrors();
                  onChange(EAccountProfile.OPERATOR);
                }}
              >
                <Operator width={ACCOUNT_TYPE_SIZE} height={ACCOUNT_TYPE_SIZE} />
              </AccountCard>
            )}
            name="activeProfile"
          />
          <Text tw="mt-4 text-xs">Operator</Text>
        </View>
        <View tw="items-center">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange } }) => (
              <AccountCard
                isActive={activeProfile === EAccountProfile.FARMER}
                onPress={() => {
                  clearErrors();
                  onChange(EAccountProfile.FARMER);
                }}
              >
                <Farmer width={ACCOUNT_TYPE_SIZE} height={ACCOUNT_TYPE_SIZE} />
              </AccountCard>
            )}
            name="activeProfile"
          />

          <Text tw="mt-4 text-xs">Cooling</Text>
          <Text tw="text-xs">User</Text>
        </View>
      </View>

      <Divider tw="w-full mb-2" />
      <Text tw="text-xs max-w-[95%]">{ACCOUNT_DESCRIPTIONS[activeProfile]}</Text>
      <Divider tw="w-full my-2" />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            tw="w-[95%] px-4 bg-white border rounded-sm mb-2 h-12"
            label={`${activeProfile === EAccountProfile.EMPLOYEE ? 'Email/' : ''}Phone Number`}
            left={<TextInput.Icon icon="phone" />}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="user"
      />
      {errors.user && (
        <Text tw="text-xs text-red-600 mt-[-2] pl-3 w-[95%]">
          {errors.user.message?.toString()}
        </Text>
      )}
      <Text tw="text-xs w-[95%] my-2 px-3">
        Please provide valid {activeProfile === EAccountProfile.EMPLOYEE ? 'email/' : ''}phone
        number (with country code).{' '}
      </Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            tw="w-[95%] px-4 bg-white border rounded-sm mb-2 h-12"
            label="Password"
            secureTextEntry={hidePass ? true : false}
            right={<TextInput.Icon icon="eye" onPress={() => setHidePass(!hidePass)} />}
            left={<TextInput.Icon icon="lock" />}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
      />
      {errors.password && (
        <Text tw="text-xs text-red-600 mt-[-2] mb-2 pl-3 w-[95%]">
          {errors.password.message?.toString()}
        </Text>
      )}

      <Button
        tw="w-[95%] border-2 rounded-sm mb-2"
        mode="contained"
        uppercase
        onPress={handleSubmit(onSubmit)}
      >
        Log In
      </Button>
      <Button
        mode="text"
        rippleColor="white"
        labelStyle="text-xs"
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('PasswordRecovery');
        }}
      >
        Forgot Password
      </Button>
    </View>
  );
}

export default withSafeArea(SignIn);
