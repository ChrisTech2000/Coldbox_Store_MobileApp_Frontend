import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';

function CoolingUnitsMaps() {
  return (
    <View tw="flex-1 items-center justify-center">
      <Text>Cooling Units Maps Screen</Text>
    </View>
  );
}

export default withSafeArea(CoolingUnitsMaps);
