import React from 'react';
import { View } from 'react-native';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import { Text } from '#ui/components/Text';

function ComsolAbout() {
  return (
    <View tw="flex-1 items-center justify-center">
      <Text>Comsol About Screen</Text>
    </View>
  );
}

export default withSafeArea(ComsolAbout);
