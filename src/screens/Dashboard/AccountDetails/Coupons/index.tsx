import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { paperTheme } from '#ui/lib/theme';

function CouponsRoot() {
  return (
    <View tw="py-3 flex-1 flex-col items-center justify-between">
      <View tw="w-30 h-30" />

      <View tw="items-center space-y-3.5">
        <View tw="h-36 w-36 items-center justify-center rounded-full bg-zinc-100">
          <Icon name="ticket-percent-outline" size={60} color={paperTheme.colors.primary} />
        </View>
        <Text tw="text-base">No coupons has been added yet</Text>
      </View>

      <Button
        tw="w-5/6 my-4"
        mode="outlined"
        uppercase
        onPress={(evt) => {
          evt.stopPropagation();
          // TODO -> open bottom sheet
        }}
      >
        Add Coupon
      </Button>
    </View>
  );
}

export default withSafeArea(CouponsRoot);
