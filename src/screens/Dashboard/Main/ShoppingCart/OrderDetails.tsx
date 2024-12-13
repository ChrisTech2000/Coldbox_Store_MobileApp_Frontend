import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Divider, Icon } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import RBAC from '#common/RBAC';
import { useTranslationUtils } from '#i18n/utils';
import type { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';
import MarketplaceService from '#services/MarketplaceService';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import useCartStore from '#stores/shoppingCart';
import { EPickUpMethod, EPricingType } from '#types/global';

import { CART_MINIMUM_VALUE } from '.';
import AddCouponBottomSheet from './components/AddCouponBottomSheet';
import DeliveryInformationBottomSheet from './components/DeliveryInformationBottomSheet';
import ListCouponsBottomSheet from './components/ListCouponsBottomSheet';
import OrderDetailsCard from './components/OrderDetailsCard';
import OrderPickupMethod from './components/OrderPickupMethod';
import { OwnershipModal } from './components/OwnershipModal';
import { formatCurrencyWithSymbol } from '../Dashboard/CheckIn/utils';

function OrderDetails(props: ShoppingCartStackRouteProps<'OrderDetails'>) {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();
  const toast = InAppNotifications.useToast();
  const user = useAuthStore((store) => store.user);
  const company = useManagementStore((store) => store.company);

  const [cartData, coolingUnits] = useCartStore((store) => [store.cartData, store.allCoolingUnits]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onPay = useCallback(async (evt: GestureResponderEvent) => {
    evt.stopPropagation();
    setIsSubmitting(true);
    try {
      const coolingUnitIds =
        cartData?.items?.reduce((acc, current) => {
          if (!acc.includes(current.relCoolingUnitId)) {
            acc.push(current.relCoolingUnitId);
          }
          return acc;
        }, [] as number[]) ?? [];

      const result = await MarketplaceService.checkoutWithPaystack();

      if (result.authorizationUrl) {
        setIsSubmitting(false);
        props.navigation.navigate('PaystackPayment', {
          url: result.authorizationUrl,
          orderId: result.orderId,
          coolingUnitIds,
        });
      }
    } catch (e) {
      setIsSubmitting(false);
      toast.show(t('navigation.error.errorMessage'), {
        type: 'md_danger',
      });
    }
  }, []);

  const cartDataByCoolingUnit = useMemo(() => {
    if (!cartData?.items) return [];

    const groupedData = cartData.items.reduce(
      (acc, item) => {
        const coolingUnit = coolingUnits?.find((c) => c.id === item.relCoolingUnitId);

        if (!coolingUnit) return acc;

        if (!acc[coolingUnit.name]) {
          acc[coolingUnit.name] = [];
        }
        acc[coolingUnit.name].push(item);
        return acc;
      },
      {} as Record<string, typeof cartData.items>
    );

    return Object.entries(groupedData).map(([coolingUnit, items]) => ({
      coolingUnit,
      items,
    }));
  }, [cartData, coolingUnits]);

  if (!cartData) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  const allCoolingUnitsHavePickUpMethod = cartData.items?.every((item) =>
    cartData.pickupDetails.some((pickup) => pickup.coolingUnitId === item.relCoolingUnitId)
  );

  const orderDisabled =
    cartData.totalProduceAmount - cartData.totalDiscountAmount + cartData.totalCoolingFeesAmount <
    CART_MINIMUM_VALUE;

  const total =
    cartData.totalColdtivateAmount +
    cartData.totalCoolingFeesAmount +
    cartData.totalPaymentFeesAmount +
    cartData.totalProduceAmount -
    cartData.totalDiscountAmount;

  return (
    <ScrollView tw="p-4 bg-white" showsVerticalScrollIndicator={false}>
      <View tw="flex-1 pb-8 space-y-6">
        <FlatList
          data={cartDataByCoolingUnit}
          keyExtractor={(_, itemIdx) => `discount-coupons-active-tab-list-item-#${itemIdx}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View tw="mb-4">
                <OrderDetailsCard
                  heading={item.coolingUnit}
                  totalLabel={t('Dashboard.ShoppingCart.total')}
                  produceWeight={item?.items?.reduce(
                    (acc, curr) => (acc += curr.orderedProduceWeight),
                    0
                  )}
                  subtotal={item?.items?.reduce((acc, curr) => (acc += curr.produceAmount), 0)}
                  discount={item?.items?.reduce((acc, curr) => (acc += curr.discountAmount), 0)}
                  coolingFees={item?.items?.reduce(
                    (acc, curr) => (acc += curr.coolingFeesAmount),
                    0
                  )}
                  total={item?.items?.reduce(
                    (acc, curr) =>
                      (acc += curr.produceAmount + curr.coolingFeesAmount - curr.discountAmount),
                    0
                  )} // TODO: fix in BE
                />
              </View>
            );
          }}
        />

        <RBAC.ProtectedResource action="SET" subject="MarketplaceBuyerOption">
          <Button
            mode="outlined"
            tw="border border-green-primary mb-8"
            onPress={() => setIsModalOpen(true)}
          >
            {t('Dashboard.ShoppingCart.ownership', {
              name: cartData?.ownedOnBehalfOfCompanyId
                ? `${user?.firstName ?? ''} ${user?.lastName ?? ''}`
                : (company?.name ?? ''),
            })}
          </Button>
        </RBAC.ProtectedResource>

        <View>
          <OrderPickupMethod
            data={cartData?.items?.flatMap((item) => ({
              unit: item.relCoolingUnitId,
              company: item.relCompanyId,
            }))}
          />

          {cartData.pickupDetails?.length ? (
            <FlatList
              data={cartData.pickupDetails}
              keyExtractor={(item, index) => `cooling-unit-${item.coolingUnitId}-dm-${index}`}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const coolingUnit = coolingUnits?.find((cu) => cu.id === item.coolingUnitId);

                return (
                  <View tw="mb-4">
                    <Text tw="text-base">{coolingUnit?.name ?? ''}</Text>
                    <Touchable
                      tw="flex flex-row items-center justify-between mt-1 p-4 border border-gray-300 rounded-xl"
                      onPress={() => emitter.emit(APP_EVENTS.DISPATCH_PICK_UP_METHODS_SELECTION)}
                    >
                      <Text tw="text-base">
                        {item.pickupMethod === EPickUpMethod.PICK_UP_SAME_DAY
                          ? t('Dashboard.ShoppingCart.pickUpToday')
                          : ''}
                        {item.pickupMethod === EPickUpMethod.DELIVERY
                          ? t('Dashboard.ShoppingCart.delivery')
                          : ''}
                        {item.pickupMethod === EPickUpMethod.KEEP_IN_STORAGE
                          ? t(
                              coolingUnit?.commonPricingType?.type === EPricingType.PERIODICITY
                                ? 'Dashboard.ShoppingCart.keepInStorageDailyRate'
                                : 'Dashboard.ShoppingCart.keepInStorageFixedRate',
                              {
                                price: formatCurrencyWithSymbol(
                                  'NGN', // TODO: get value from somewhere
                                  coolingUnit?.commonPricingType?.value ?? 0
                                ),
                              }
                            )
                          : ''}
                      </Text>
                      {item.pickupMethod === EPickUpMethod.DELIVERY ? (
                        <Touchable
                          onPress={(evt) => {
                            evt.stopPropagation();
                            emitter.emit(APP_EVENTS.DISPATCH_SHOPPING_CART_DELIVERY_INFORMATION, {
                              coolingUnitId: coolingUnit?.id,
                            });
                          }}
                        >
                          <Text tw="text-base text-green-primary">
                            {t('Dashboard.ShoppingCart.viewContacts')}
                          </Text>
                        </Touchable>
                      ) : null}

                      <Icon source="pencil" size={17} color={colors.green.primary} />
                    </Touchable>
                  </View>
                );
              }}
            />
          ) : null}
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
          <View tw="flex-row items-center justify-between h-8">
            <Text tw="text-base">{t('Dashboard.ShoppingCart.marketFees')}</Text>
            <View tw="flex-row items-center space-x-1">
              <Icon source="plus" size={16} color={paperTheme.colors.scrim} />
              <Text tw="text-base">
                {formatCurrencyWithSymbol(
                  'NGN', // TODO: get value from somewhere
                  cartData.totalPaymentFeesAmount + cartData.totalColdtivateAmount
                )}
              </Text>
            </View>
          </View>

          <View tw="flex-row items-center justify-between">
            <Text tw="text-lg">{t('Dashboard.ShoppingCart.totalToPay')}</Text>
            <Text tw="text-lg">
              {formatCurrencyWithSymbol(
                'NGN', // TODO: get value from somewhere
                total
              )}
            </Text>
          </View>
          <Divider tw="bg-zinc-400 my-3" />
          <Button
            tw="w-5/6 self-center my-4"
            mode="contained"
            uppercase
            onPress={onPay}
            disabled={isSubmitting || orderDisabled || !allCoolingUnitsHavePickUpMethod}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              t('Dashboard.ShoppingCart.pay')
            )}
          </Button>
          {orderDisabled ? (
            <Text tw="text-red-700 self-center mb-4">
              {t('Dashboard.ShoppingCart.errors.minimumCartValue')}
            </Text>
          ) : null}
        </View>
      </View>

      <AddCouponBottomSheet />
      <ListCouponsBottomSheet />
      <_PortalsWrapper />
      <OwnershipModal isVisible={isModalOpen} close={() => setIsModalOpen(false)} />
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

function _PortalsWrapper() {
  const isFocused = useIsFocused();
  if (!isFocused) return null;
  return (
    <React.Fragment>
      <DeliveryInformationBottomSheet />
    </React.Fragment>
  );
}
