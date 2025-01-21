import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { ActivityIndicator, Portal } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Text } from '#ui/components/Text';
import { useAppEventListener } from '#ui/lib/emitter';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';
import reportCrash from '#ui/lib/reportCrash';

export default function AddCouponBottomSheet() {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const setCart = useCartStore((store) => store.setCart);

  const [value, setValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const modalRef = useRef<Modalize>(null);

  useAppEventListener('DISPATCH_ADD_COUPON_IN_CART_MODAL', () => {
    modalRef.current?.open();
  });

  const submit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const result = await MarketplaceService.applyCoupon(value);

      if (result) {
        setCart(result.cart);
        modalRef.current?.close();
        toast.show(t('actions.done'), { type: 'md_success' });
      }
    } catch (error) {
      toast.show(t('navigation.error.errorMessage'), {
        type: 'md_danger',
      });
      reportCrash(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  }, [value]);

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
          <Text tw="text-base">{t('Dashboard.Management.Coupons.code')}</Text>
          <Input
            tw="bg-white border rounded-sm"
            placeholder={t('Dashboard.ShoppingCart.couponPlaceholder')}
            value={value}
            onChangeText={(val) => setValue(val)}
          />
        </View>

        <View tw="flex flex-row w-full justify-evenly py-5 border-t border-solid border-zinc-300 mb-4">
          <Button
            mode="contained"
            tw="w-5/6"
            uppercase
            onPress={submit}
            disabled={!value || isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              t('Dashboard.ShoppingCart.redeemCoupon')
            )}
          </Button>
        </View>
      </Modalize>
    </Portal>
  );
}
