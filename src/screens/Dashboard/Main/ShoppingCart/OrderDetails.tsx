import { CurrencyStandardization } from 'currency-format-utils';
import React, { useCallback, useState } from 'react';
import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Divider } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import type { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';

import AddCouponBottomSheet from './components/AddCouponBottomSheet';
import ListCouponsBottomSheet from './components/ListCouponsBottomSheet';
import OrderDetailsCard from './components/OrderDetailsCard';
import OrderPickupMethod from './components/OrderPickupMethod';

function OrderDetails(props: ShoppingCartStackRouteProps<'OrderDetails'>) {
  const { t } = useTranslationUtils();
  const cartData = useCartStore((store) => store.cartData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onPay = useCallback(async (evt: GestureResponderEvent) => {
    evt.stopPropagation();
    setIsSubmitting(true);
    const result = await MarketplaceService.checkoutWithPaystack();

    if (result.authorizationUrl) {
      setIsSubmitting(false);
      props.navigation.navigate('PaystackPayment', {
        url: result.authorizationUrl,
        orderId: result.orderId,
      });
    }
  }, []);

  // const cartDataByCoolingUnit = useMemo(() => {
        // TODO: group data by cooling unit
  // }, []);
  
  if (!cartData) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView tw="p-4 bg-white" showsVerticalScrollIndicator={false}>
      <View tw="flex-1 pb-8 space-y-6">
        <View>
          <OrderDetailsCard
            heading={t('Dashboard.ShoppingCart.orderHeader')}
            totalLabel={t('Dashboard.ShoppingCart.total')}
            produceWeight={cartData?.items?.reduce(
              (acc, curr) => (acc += curr.orderedProduceWeight),
              0
            )}
            subtotal={cartData.totalProduceAmount}
            discount={cartData.totalDiscountAmount}
            coolingFees={cartData.totalCoolingFeesAmount}
            paymentFees={cartData.totalPaymentFeesAmount}
            total={cartData.totalAmount}
          />
        </View>
        <View>
          {/** TODO: integrate pickup methods */}
          <OrderPickupMethod />
        </View>

        <View tw="flex-row items-center space-x-1">
          <Text tw="text-lg">{t('Dashboard.ShoppingCart.couponQuestion')}</Text>
          <TouchableOpacity
            onPress={() => emitter.emit(APP_EVENTS.DISPATCH_ADD_COUPON_IN_CART_MODAL)}
          >
            <Text tw="text-lg text-green-primary">{t('Dashboard.ShoppingCart.redeem')}</Text>
          </TouchableOpacity>
        </View>

        <View tw="flex-col w-full mt-6">
          <View tw="flex-row items-center justify-between">
            <Text tw="text-lg">{t('Dashboard.ShoppingCart.totalToPay')}</Text>
            <Text tw="text-lg">
              {CurrencyStandardization.currencyCode({
                code: 'NGN', // TODO: get value from somewhere
                value: cartData.totalAmount,
              }).getValueFormated()}
            </Text>
          </View>
          <Divider tw="bg-zinc-400 my-3" />
          <Button
            tw="w-5/6 self-center my-4"
            mode="contained"
            uppercase
            onPress={onPay}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              t('Dashboard.ShoppingCart.pay')
            )}
          </Button>
        </View>
      </View>

      <AddCouponBottomSheet />
      <ListCouponsBottomSheet />
    </ScrollView>
  );
}

export default withSafeArea(
  withErrorBoundary(OrderDetails, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
