import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';

function CropList() {
  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>Analytics Screen</Text>
    </View>
  );
}

export default withSafeArea(CropList);
