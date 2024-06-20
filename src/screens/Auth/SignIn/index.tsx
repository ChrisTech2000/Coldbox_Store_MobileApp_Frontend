import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';

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

function SignIn(props: AuthRouteProps<'SignIn'>) {
  const { navigation } = props;
  const [activeProfile, setActiveProfile] = useState<EAccountProfile>(EAccountProfile.EMPLOYEE);

  return (
    <View tw="flex-1 items-center justify-center">
      <Logo width={IMG_SIZE} height={IMG_SIZE} tw="mb-4 mt-[-32]" />
      <Text tw="mb-2 text-xl font-bold">Sign In</Text>
      <View tw="w-full flex flex-row justify-between mb-2 px-4">
        <View tw="items-center">
          <AccountCard
            isActive={activeProfile === EAccountProfile.EMPLOYEE}
            onPress={() => setActiveProfile(EAccountProfile.EMPLOYEE)}
          >
            <Employee width={ACCOUNT_TYPE_SIZE} height={ACCOUNT_TYPE_SIZE} />
          </AccountCard>
          <Text tw="mt-4 text-xs">Registered</Text>
          <Text tw="text-xs">Employee</Text>
        </View>
        <View tw="items-center">
          <AccountCard
            isActive={activeProfile === EAccountProfile.OPERATOR}
            onPress={() => setActiveProfile(EAccountProfile.OPERATOR)}
          >
            <Operator width={ACCOUNT_TYPE_SIZE} height={ACCOUNT_TYPE_SIZE} />
          </AccountCard>
          <Text tw="mt-4 text-xs">Operator</Text>
        </View>
        <View tw="items-center">
          <AccountCard
            isActive={activeProfile === EAccountProfile.FARMER}
            onPress={() => setActiveProfile(EAccountProfile.FARMER)}
          >
            <Farmer width={ACCOUNT_TYPE_SIZE} height={ACCOUNT_TYPE_SIZE} />
          </AccountCard>
          <Text tw="mt-4 text-xs">Cooling</Text>
          <Text tw="text-xs">User</Text>
        </View>
      </View>

      <Divider tw="w-full mb-2" />
      <Text tw="text-xs max-w-[95%]">{ACCOUNT_DESCRIPTIONS[activeProfile]}</Text>
      <Divider tw="w-full my-2" />

      {/** @NOTE that currently this component is responsible for an error being thrown. There is already a PR that should be included in the next version */}
      <TextInput
        tw="w-[95%] px-4 bg-white border rounded-sm mb-2 h-12"
        label={`${activeProfile === EAccountProfile.EMPLOYEE && 'Email/'}Phone Number`}
        left={<TextInput.Icon icon="phone" />}
      />
      <Text tw="text-xs w-[95%] mb-2 px-3">
        Please provide valid {activeProfile === EAccountProfile.EMPLOYEE ? 'email/' : ''}phone
        number (with country code).{' '}
      </Text>
      <TextInput
        tw="w-[95%] px-4 bg-white border rounded-sm mb-2 h-12"
        label="Password"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        left={<TextInput.Icon icon="lock" />}
      />

      <Button
        tw="w-[95%] border-2 rounded-sm mb-2"
        mode="contained"
        uppercase
        onPress={(evt) => {
          evt.stopPropagation();
          // TODO: implement API call
        }}
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
