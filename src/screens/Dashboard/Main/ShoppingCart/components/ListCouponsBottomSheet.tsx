import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native';
import { Icon, Portal } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import * as BottomSheet from '#ui/components/BottomSheet';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';
import reportCrash from '#ui/lib/reportCrash';

export default function ListCouponsBottomSheet() {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const [cartData, fetchCart] = useCartStore((store) => [store.cartData, store.fetchCart]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [modalRef, modalActions] = BottomSheet.useBottomSheet();
  useAppEventListener(APP_EVENTS.DISPATCH_LIST_COUPONS_IN_CART_MODAL, modalActions.open);

  const onDeleteCoupon = useCallback(
    async (code: string) => {
      try {
        setIsSubmitting(true);
        const result = await MarketplaceService.clearCoupon(code);

        if (result) {
          await fetchCart();
          modalActions.close();
          toast.show(t('actions.done'), { type: 'md_success' });
        }
      } catch (error) {
        toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
        reportCrash(error as Error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [modalActions]
  );

  const filteredItems = useMemo(
    () =>
      cartData?.items?.filter(
        (item, index, self) =>
          item.relCouponCode &&
          index === self.findIndex((i) => i.relCouponCode === item.relCouponCode)
      ) ?? [],
    [cartData?.items]
  );

  return (
    <Portal>
      <BottomSheet.Root ref={modalRef}>
        <BottomSheet.Content tw="pt-2.5 space-y-3.5">
          <Text tw="text-xl">{t('Dashboard.ShoppingCart.discountsApplied')}</Text>
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.relCouponCode ?? ''}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View tw="flex flex-row items-center justify-between p-4 border border-gray-300 rounded-lg mb-3">
                <View tw="flex flex-row space-x-2">
                  <Text tw="text-base font-bold uppercase">{item.relCouponCode}</Text>
                </View>
                <TouchableOpacity
                  onPress={async (evt) => {
                    evt.stopPropagation();
                    await onDeleteCoupon(item.relCouponCode ?? '');
                  }}
                  disabled={isSubmitting}
                >
                  <Icon source="trash-can-outline" size={24} color={colors.red[700]} />
                </TouchableOpacity>
              </View>
            )}
          />
        </BottomSheet.Content>
        <BottomSheet.Footer>
          <Button
            mode="contained"
            tw="w-5/6"
            uppercase
            onPress={(evt) => {
              evt.stopPropagation();
              modalActions.close();
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              t('Dashboard.ShoppingCart.gotItButton')
            )}
          </Button>
        </BottomSheet.Footer>
      </BottomSheet.Root>
    </Portal>
  );
}
