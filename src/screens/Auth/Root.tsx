import React from 'react';
import { View } from 'react-native';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import type { AuthRouteProps } from '#navigation/Auth';

export default function AuthRoot(props: AuthRouteProps<'Root'>) {
  const { navigation } = props;

  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>Auth Root Screen</Text>
      <Button
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('SignIn');
        }}
      >
        <Text>Go to Sign In</Text>
      </Button>
      <Button
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('SignUpCompany');
        }}
      >
        <Text>Sign up as Company</Text>
      </Button>
      <Button
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('SignUpCoolingUser');
        }}
      >
        <Text>Sign up as Cooling User</Text>
      </Button>
      <Button
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('AppInfo');
        }}
      >
        <Text>Go to App Info</Text>
      </Button>
    </View>
  );
}
