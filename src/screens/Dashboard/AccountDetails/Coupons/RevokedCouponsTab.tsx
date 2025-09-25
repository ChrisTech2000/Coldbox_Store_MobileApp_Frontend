import React from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { CouponStatusTabsRouteProps } from '#navigation/Dashboard/AccountDetails/CouponSettings/CouponStatusTabs';
import CouponService from '#services/CouponService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useManagementStore } from '#stores/management';

function RevokedCouponsTab(props: CouponStatusTabsRouteProps<'Revoked'>) {
  const company = useManagementStore((store) => store.company);

  // eslint-disable-next-line
  // @ts-ignore
  const isManagementStack = props?.route?.params?.source === 'Management';

  const { data: coupons } = useApiCall(
    'getCouponList',
    CouponService.getCouponList,
    {
      revoked: 'only',
      ownedOnBehalfOfCompanyId: isManagementStack ? (company?.id as number) : undefined,
    },
    {
      defaultData: { nodes: [] },
      skip: isManagementStack,
    }
  );

  const { data: companyCoupons } = useApiCall(
    'getCompanyCouponList',
    CouponService.getCouponList,
    {
      revoked: 'only',
      ownedOnBehalfOfCompanyId: isManagementStack ? (company?.id as number) : undefined,
    },
    {
      defaultData: { nodes: [] },
      skip: !isManagementStack,
    }
  );

  const data = isManagementStack ? companyCoupons : coupons;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View tw="px-3 pt-3 pb-8">
        <FlashList
          data={data.nodes}
          keyExtractor={(item) => `revoked-coupon-${item.id}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={92}
          renderItem={({ item }) => (
            <View tw="w-full p-5 flex-row items-center justify-between border border-solid border-zinc-300 rounded-2xl my-2">
              <View tw="flex-1 flex-row items-center space-x-3">
                <View tw="min-w-[35%] max-w-[85%]">
                  <Text variant="TitleMedium" tw="text-lg text-zinc-500">
                    {item.code}
                  </Text>
                </View>
                <Text tw="text-lg text-zinc-500">
                  -&nbsp;{(item.discountPercentage * 100).toFixed(0)}&#37;
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

export default withSafeArea(RevokedCouponsTab, ['bottom'], true);
