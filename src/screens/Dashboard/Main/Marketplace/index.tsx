import React from 'react';
import { View, Text } from 'react-native';

import { withSafeArea } from '#ui/primitives/withSafeArea';

function MarketplaceRoot() {
  return (
    <View tw="flex-1 items-center justify-center bg-white">
      <Text>Marketplace Root</Text>
    </View>
  );
}

export default withSafeArea(MarketplaceRoot);
