import React from 'react';
import { View, Text } from 'react-native';

import { withSafeArea } from '#ui/primitives/withSafeArea';

function MarketplaceFilters() {
  return (
    <View tw="flex-1 items-center justify-center bg-white">
      <Text>Marketplace Filters</Text>
    </View>
  );
}

export default withSafeArea(MarketplaceFilters);
