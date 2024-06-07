import React from 'react';
import { View } from 'react-native';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import type { AuthRouteProps } from '#navigation/Auth';

export default function SignIn(props: AuthRouteProps<'SignIn'>) {
  const { navigation } = props;

  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>Sign In Screen</Text>
      <Button
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('PasswordRecovery');
        }}
      >
        <Text>Go to Password Recovery</Text>
      </Button>
    </View>
  );
}
