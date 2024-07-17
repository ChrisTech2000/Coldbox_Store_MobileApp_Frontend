import React from 'react';
import { View } from 'react-native';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Text } from '#ui/components/Text';

function MarketSurvey() {
  return (
    <View tw="flex-1 items-center justify-center space-y-4">
      <Text>markét surbiiii Screen</Text>
    </View>
  );
}

export default withSafeArea(MarketSurvey);
