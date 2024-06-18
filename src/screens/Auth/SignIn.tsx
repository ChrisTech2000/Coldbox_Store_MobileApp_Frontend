import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import type { AuthRouteProps } from '#navigation/Auth';

export default function SignIn(props: AuthRouteProps<'SignIn'>) {
  const { navigation } = props;

  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>Sign In Screen</Text>
      <Button
        mode="contained"
        onPress={(evt) => {
          evt.stopPropagation();
          navigation.navigate('PasswordRecovery');
        }}
      >
        Go to Password Recovery
      </Button>
    </View>
  );
}
