import React from 'react';
import { FlatList, View } from 'react-native';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useCouponStore } from './store';

// TODO → add text content to translations
function RevokedCouponsTab() {
  const coupons = useCouponStore((store) => store.coupons);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View tw="px-3 pt-3 pb-8">
        <FlatList
          data={coupons.filter((coupon) => !coupon.isActive)}
          keyExtractor={(_, itemIdx) => `discount-coupons-active-tab-list-item-#${itemIdx}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View tw="w-full p-5 flex-row items-center justify-between border border-solid border-zinc-300 rounded-2xl my-2">
              <View tw="flex-row items-center space-x-6">
                <View tw="min-w-[20%]">
                  <Text variant="TitleMedium" tw="text-lg text-zinc-500">
                    {item.code}
                  </Text>
                </View>
                <Text tw="text-lg text-zinc-500">-&nbsp;{item.percentage}&#37;</Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

export default withSafeArea(RevokedCouponsTab);
