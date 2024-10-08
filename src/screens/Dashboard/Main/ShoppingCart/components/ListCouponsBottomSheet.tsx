import React, { useCallback, useRef } from 'react';
import { FlatList, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Divider, Icon, Portal } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { useAppEventListener } from '#ui/lib/emitter';

import { useTranslationUtils } from '#i18n/utils';
import colors from 'tailwindcss/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ListCouponsBottomSheet() {
  const { t } = useTranslationUtils();

  const modalRef = useRef<Modalize>(null);

  const onDeleteCoupon = useCallback(() => {}, []);

  useAppEventListener('DISPATCH_LIST_COUPONS_IN_CART_MODAL', () => {
    modalRef.current?.open();
  });

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        adjustToContentHeight
        withHandle={false}
      >
        <View tw="w-full items-center justify-center h-10">
          <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
        </View>

        <View tw="px-4 pb-4 pt-2.5 space-y-3.5">
          <Text tw="text-xl">{t('Dashboard.ShoppingCart.discountsApplied')}</Text>
          <FlatList
            data={[{ code: '20OFF', percentage: '20%' }]}
            keyExtractor={(item) => item.code}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
              <View tw="flex flex-row items-center justify-between p-4 border border-gray-300 rounded-lg">
                <View tw="flex flex-row space-x-2">
                  <Text tw="text-base font-bold uppercase">{item.code}</Text>
                  <Text tw="text-base text-gray-400 uppercase">{item.percentage}</Text>
                </View>
                <TouchableOpacity onPress={onDeleteCoupon}>
                  <Icon source="trash-can-outline" size={24} color={colors.red[700]} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View tw="flex flex-row w-full justify-evenly py-5 border-t border-solid border-zinc-300 mb-4">
          <Button mode="contained" tw="w-5/6" uppercase onPress={() => modalRef.current?.close()}>
            {t('Dashboard.ShoppingCart.gotItButton')}
          </Button>
        </View>
      </Modalize>
    </Portal>
  );
}
