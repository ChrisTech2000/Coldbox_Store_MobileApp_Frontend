import React from 'react';
import { FlatList, View } from 'react-native';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useApiCall } from '#services/hooks/useAPiCall';
import CouponService from '#services/CouponService';

function RevokedCouponsTab() {
  const { data } = useApiCall(
    'getCouponList',
    CouponService.getCouponList,
    { revoked: 'only' },
    {
      defaultData: { nodes: [] },
    }
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View tw="px-3 pt-3 pb-8">
        <FlatList
          data={data.nodes}
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
                <Text tw="text-lg text-zinc-500">-&nbsp;{item.discountPercentage * 100}&#37;</Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

export default withSafeArea(RevokedCouponsTab, ['bottom'], true);
