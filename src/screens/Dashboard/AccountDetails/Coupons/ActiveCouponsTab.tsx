import React, { useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useShallow } from 'zustand/react/shallow';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { paperTheme } from '#ui/lib/theme';

import CouponModal from './components/CouponModal';
import { useCouponStore } from './store';
import RevokeCouponModal from './components/RevokeCouponModal';

// TODO → add text content to translations
function ActiveCouponsTab() {
  const modalRef = useRef<Modalize>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const selectedCoupon = useRef<string | null>(null);

  const coupons = useCouponStore(useShallow((store) => store.coupons));

  return (
    <React.Fragment>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View tw="px-3 pt-3 pb-8">
          <FlatList
            data={coupons.filter((coupon) => coupon.isActive)}
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
                  <Text tw="text-lg text-zinc-500">-&nbsp;{item.percentage}&#37;</Text>
                </View>
                <Button
                  tw="w-1/4"
                  mode="text"
                  textColor={paperTheme.colors.error}
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    // TODO → replace this in the future
                    selectedCoupon.current = item.code;
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
        onConfirm={() => {
          setIsModalVisible(false);
          // TODO → replace this in the future
          if (typeof selectedCoupon.current === 'string') {
            useCouponStore.getState().toggle(selectedCoupon.current);
          }
        }}
      />

      <CouponModal
        modalRef={modalRef}
        onSubmit={(values) => {
          modalRef.current?.close();
          // TODO → replace this with api call
          useCouponStore.getState().append({
            ...values,
            isActive: true,
          });
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

export default withSafeArea(ActiveCouponsTab);
