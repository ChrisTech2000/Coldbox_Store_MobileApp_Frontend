import React from 'react';
import { View } from 'react-native';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import { Text } from '#ui/components/Text';

function ComsolAgreement() {
  return (
    <View tw="flex-1 items-center justify-center">
      <Text>Comsol Agreement Screen</Text>
    </View>
  );
}

export default withSafeArea(ComsolAgreement);
