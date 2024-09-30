import React, { useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useSWRConfig } from 'swr';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import CouponService from '#services/CouponService';
import { paperTheme } from '#ui/lib/theme';

import CouponModal from './components/CouponModal';
import RevokeCouponModal from './components/RevokeCouponModal';

// TODO → add text content to translations
function ActiveCouponsTab() {
  const { mutate } = useSWRConfig();

  const modalRef = useRef<Modalize>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { data } = useApiCall('getCouponList', CouponService.getCouponList, undefined, {
    defaultData: { nodes: [] },
  });

  const selectedCoupon = useRef<number | null>(null);

  return (
    <React.Fragment>
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
                    <Text variant="TitleMedium" tw="text-lg">
                      {item.code}
                    </Text>
                  </View>
                  <Text tw="text-lg text-zinc-500">
                    -&nbsp;{item.discountPercentage * 100}&#37;
                  </Text>
                </View>
                <Button
                  tw="w-1/4"
                  mode="text"
                  textColor={paperTheme.colors.error}
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    selectedCoupon.current = item.id;
                    setIsModalVisible(true);
                  }}
                >
                  Revoke
                </Button>
              </View>
            )}
          />
        </View>
      </ScrollView>

      <RevokeCouponModal
        visible={isModalVisible}
        onChangeVisible={setIsModalVisible}
        onConfirm={async () => {
          setIsModalVisible(false);
          if (typeof selectedCoupon.current === 'number') {
            try {
              await CouponService.revokeCoupon(selectedCoupon.current);
              await mutate(getQueryKey('getCouponList'));
            } catch (exception) {
              console.error(exception);
            }
          }
        }}
      />

      <CouponModal
        modalRef={modalRef}
        onSubmit={async (values) => {
          try {
            await CouponService.createCoupon({
              code: values.code,
              discountPercentage: Math.min(values.percentage / 100, 1.0),
            });
            await mutate(getQueryKey('getCouponList'));
            modalRef.current?.close();
          } catch (exception) {
            console.error(exception);
          }
        }}
      />

      <View tw="w-full bottom-0 left-0 py-6 items-center bg-zinc-50 border-t border-solid border-zinc-400">
        <Button
          tw="w-5/6"
          mode="outlined"
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            modalRef.current?.open();
          }}
        >
          Add Coupon
        </Button>
      </View>
    </React.Fragment>
  );
}

export default withSafeArea(ActiveCouponsTab, ['bottom'], true);
