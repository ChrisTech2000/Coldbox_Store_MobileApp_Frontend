import React from 'react';
import { View } from 'react-native';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import { Text } from '#ui/components/Text';

function PrivacyPolicy() {
  return (
    <View tw="flex-1 items-center justify-center">
      <Text>Privacy Policy Screen</Text>
    </View>
  );
}

export default withSafeArea(PrivacyPolicy);
