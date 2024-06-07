import React from 'react';
import { View } from 'react-native';

import { Text } from '#ui/components/Text';

export default function AppInfo() {
  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>App Info Screen</Text>
    </View>
  );
}
