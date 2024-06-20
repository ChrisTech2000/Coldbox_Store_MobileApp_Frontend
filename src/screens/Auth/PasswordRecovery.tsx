import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';

function PasswordRecovery() {
  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>Password Recovery Screen</Text>
    </View>
  );
}

export default withSafeArea(PasswordRecovery);
