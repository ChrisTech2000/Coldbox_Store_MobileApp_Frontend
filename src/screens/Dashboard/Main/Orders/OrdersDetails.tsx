import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Divider } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import { OrdersRouteProps } from '#navigation/Dashboard/Main/OrdersStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { EOrderStatus } from '#types/global';

import DeliveryInformationBottomSheet, {
  type DeliveryInformationDatum,
} from '../ShoppingCart/components/DeliveryInformationBottomSheet';
import OrderDetailsCard from '../ShoppingCart/components/OrderDetailsCard';
import { CurrencyStandardization } from 'currency-format-utils';

function OrdersDetails(props: OrdersRouteProps<'OrdersDetails'>) {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const scrollRef = useRef<ScrollView>(null);

  const [showButton, setShowButton] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, isLoading } = useApiCall(
    'getOrder',
    MarketplaceService.getOrder,
    props.route.params.orderId,
    {
      defaultData: undefined,
    }
  );

  const { data: crops, isLoading: isLoadingCrops } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    {
      defaultData: [],
    }
  );

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setShowButton(yOffset > 100);
  }, []);

  const scrollToTop = useCallback(
    (evt: GestureResponderEvent) => {
      evt.stopPropagation();
      scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    },
    [scrollRef.current]
  );

  const onPay = useCallback(
    async (evt: GestureResponderEvent) => {
      evt.stopPropagation();

      try {
        setIsSubmitting(true);
        const result = await MarketplaceService.payWithPaystack(props.route.params.orderId);
        setIsSubmitting(false);

        if (result.authorizationUrl) {
          props.navigation.navigate('PaystackPayment', {
            url: result.authorizationUrl,
            orderId: props.route.params.orderId,
          });
        }
      } catch (error) {
        setIsSubmitting(false);
        toast.show(t('navigation.error.errorMessage'), {
          type: 'md_danger',
        });
      }
    },
    [props.route.params.orderId]
  );

  if (isLoading || isLoadingCrops) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1">
      <ScrollView
        tw="px-4 pt-4 bg-white"
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollRef}
      >
        <View tw="pb-32 space-y-6">
          <View>
            <OrderDetailsCard
              heading={t('Dashboard.ShoppingCart.orderHeader')}
              totalLabel={t('Dashboard.ShoppingCart.total')}
              produceWeight={data.items?.reduce(
                (acc, curr) => (acc += curr.orderedProduceWeight),
                0
              )}
              subtotal={data.totalProduceAmount}
              discount={data.totalDiscountAmount}
              coolingFees={data.totalCoolingFeesAmount}
              paymentFees={data.totalPaymentFeesAmount}
              total={data.totalAmount}
            />
          </View>

          <View tw="flex-col space-y-5">
            <Text tw="text-base text-green-primary font-bold">
              {t('Dashboard.ShoppingCart.pickupMethods')}
            </Text>
            <View tw="border border-solid border-zinc-300 rounded-xl px-4 py-2.5 space-y-1">
              <View tw="flex-row items-center justify-between">
                <Text tw="text-base font-bold">Delivery</Text>
                <Touchable
                  tw="p-2"
                  onPress={(evt) => {
                    evt.stopPropagation();
                    emitter.emit(APP_EVENTS.DISPATCH_SHOPPING_CART_DELIVERY_INFORMATION, [
                      {
                        companyName: 'Mosano',
                        phoneNumber: '+0123456789',
                      },
                      {
                        companyName: 'Lorem Ipsum',
                        phoneNumber: '+0123456789',
                      },
                    ] satisfies Array<DeliveryInformationDatum>);
                  }}
                >
                  <Text tw="text-base text-green-primary">View contact(s)</Text>
                </Touchable>
              </View>
            </View>
          </View>

          <View tw="space-y-5">
            <Text tw="text-base text-green-primary font-bold">
              {t('Dashboard.ShoppingCart.produce')}
            </Text>
            <FlatList
              data={data.items}
              keyExtractor={(_, itemIdx) => `discount-coupons-active-tab-list-item-#${itemIdx}`}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const crop = crops?.find((c) => c.id === item.relCropId);
                return (
                  <View tw="border border-solid border-zinc-300 rounded-md p-3 mb-2">
                    <View tw="flex-row items-start justify-between">
                      <View tw="flex-col items-start">
                        <Text tw="text-lg font-bold">{crop?.name}</Text>
                        <Text tw="text-zinc-500">{item.relCheckInMovementCode}</Text>
                      </View>
                      <FastImage
                        tw="w-24 h-20"
                        resizeMode="contain"
                        source={{ uri: `${API_BASE_URL}media/${crop?.image}` }}
                      />
                    </View>
                    <Divider tw="bg-gray-400 my-2" />
                    <View tw="flex-row items-center justify-between py-1.5">
                      <Text tw="font-bold">
                        {item.orderedProduceWeight}
                        {t('Dashboard.ProduceDetails.kilogram')}
                      </Text>
                      <Text tw="font-bold">
                        {CurrencyStandardization.currencyCode({
                          code: 'NGN', // TODO: get value from somewhere
                          value: item.producePricePerKg.toFixed(2),
                        }).getValueFormated()}{' '}
                        {t('Dashboard.ShoppingCart.perKg')}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          {data.status === EOrderStatus.PAYMENT_PENDING ? (
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
          ) : null}
        </View>
      </ScrollView>

      <_PortalsWrapper />
      {showButton ? (
        <View tw="absolute top-8 right-[35%] ">
          <SkiaShadow blur={4} dx={1} dy={6} color={colors.zinc[200]} borderRadius={20}>
            <Touchable tw="bg-green-50 p-3 rounded-full shadow-lg" onPress={scrollToTop}>
              <Text tw="px-2 text-green-primary">{t('Dashboard.MyOrders.backToTopButton')}</Text>
            </Touchable>
          </SkiaShadow>
        </View>
      ) : null}
    </View>
  );
}

function _PortalsWrapper() {
  const isFocused = useIsFocused();
  if (!isFocused) return null;
  return (
    <React.Fragment>
      <DeliveryInformationBottomSheet />
    </React.Fragment>
  );
}

export default withSafeArea(
  withErrorBoundary(OrdersDetails, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
