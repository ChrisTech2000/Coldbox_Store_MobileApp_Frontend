import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import * as BottomSheet from '#ui/components/BottomSheet';

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

  const [modalRef, modalActions] = BottomSheet.useBottomSheet();
  useAppEventListener(APP_EVENTS.DISPATCH_ADD_COUPON_IN_CART_MODAL, modalActions.open);

  const submit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const result = await MarketplaceService.applyCoupon(value);

      if (result) {
        setCart(result.cart);
        modalActions.close();
        toast.show(t('actions.done'), { type: 'md_success' });
      }
    } catch (error) {
      toast.show(t('navigation.error.serverErrorMessage'), {
        type: 'md_danger',
      });
      reportCrash(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  }, [value, modalActions]);

  return (
    <BottomSheet.Root ref={modalRef}>
      <BottomSheet.Content tw="pt-2.5 space-y-3.5">
        <Text tw="text-base">{t('Dashboard.Management.Coupons.code')}</Text>
        <Input
          tw="bg-white border rounded-sm"
          placeholder={t('Dashboard.ShoppingCart.couponPlaceholder')}
          value={value}
          onChangeText={setValue}
        />
      </BottomSheet.Content>
      <BottomSheet.Footer>
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
      </BottomSheet.Footer>
    </BottomSheet.Root>
  );
}
