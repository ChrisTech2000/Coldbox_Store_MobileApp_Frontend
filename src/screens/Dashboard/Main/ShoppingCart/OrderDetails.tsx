import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GestureResponderEvent, Platform, TouchableOpacity, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
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
import { getDefaultCropValues } from '#i18n/transl/misc/crops';
import { useTranslationUtils } from '#i18n/utils';
import type { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';
import { useTranslatedCrops } from '#screens/Dashboard/Management/CompanyDetails/utils';
import MarketplaceService from '#services/MarketplaceService';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import useCartStore from '#stores/shoppingCart';
import { useDashboardStore } from '#stores/dashboard';
import { EPickUpMethod, EPricingType } from '#types/global';
import reportCrash from '#ui/lib/reportCrash';
import { cn } from '#ui/lib/cn';

import { CART_MINIMUM_VALUE } from '.';
import AddCouponBottomSheet from './components/AddCouponBottomSheet';
import DeliveryInformationBottomSheet from './components/DeliveryInformationBottomSheet';
import ListCouponsBottomSheet from './components/ListCouponsBottomSheet';
import OrderDetailsCard from './components/OrderDetailsCard';
import OrderPickupMethod from './components/OrderPickupMethod';
import { OwnershipModal } from './components/OwnershipModal';
import { groupCartItemsByCoolingUnitAndCrop } from './utils/groupCartItems';
import { formatCurrencyWithSymbol } from '../Dashboard/CheckIn/utils';
import { DEFAULT_CURRENCY_CODE } from '#constants/general';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-4',
  ios: 'mx-4',
});

function OrderDetails(props: ShoppingCartStackRouteProps<'OrderDetails'>) {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();
  const toast = InAppNotifications.useToast();
  const user = useAuthStore((store) => store.user);
  const company = useManagementStore((store) => store.company);

  const [
    cartData,
    coolingUnits,
    isCoolingUnitsLoading,
    coolingUnitsError,
    fetchCoolingUnits,
    recomputeCart,
  ] = useCartStore((store) => [
    store.cartData,
    store.allCoolingUnits,
    store.isCoolingUnitsLoading,
    store.coolingUnitsError,
    store.fetchCoolingUnits,
    store.recomputeCart,
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const cropsResult = useDashboardStore((store) => store.allCrops);

  const crops = useTranslatedCrops(cropsResult ?? []);

  useEffect(() => {
    if (!coolingUnits && !isCoolingUnitsLoading) {
      fetchCoolingUnits();
    }
  }, [coolingUnits, isCoolingUnitsLoading, fetchCoolingUnits]);

  const onPay = useCallback(
    async (evt: GestureResponderEvent) => {
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

        await recomputeCart(toast, t);
        const result = await MarketplaceService.checkoutWithPaystack();

        if (result.authorizationUrl) {
          setIsSubmitting(false);
          props.navigation.navigate('PaystackPayment', {
            url: result.authorizationUrl,
            orderId: result.orderId,
            coolingUnitIds,
          });
        }
      } catch (exception) {
        setIsSubmitting(false);
        toast.show(t('navigation.error.serverErrorMessage'), {
          type: 'md_danger',
        });
        reportCrash(exception as Error);
      }
    },
    [t]
  );

  const cartDataByCoolingUnit = useMemo(() => {
    if (!coolingUnits?.length) return [];
    return groupCartItemsByCoolingUnitAndCrop(cartData?.items, coolingUnits);
  }, [cartData?.items, coolingUnits]);

  const unitsMap = useMemo(() => {
    if (!coolingUnits?.length) return new Map();
    return new Map(coolingUnits.map((coolingUnit) => [coolingUnit.id, coolingUnit]));
  }, [coolingUnits]);

  const cropsMap = useMemo(() => new Map(crops?.map((crop) => [crop.id, crop])), [crops]);

  if (!cartData || isCoolingUnitsLoading) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (coolingUnitsError || !coolingUnits?.length) {
    return (
      <View tw="flex-1 items-center justify-center mt-4 px-6 space-y-4">
        <GenericError retry={fetchCoolingUnits} />
      </View>
    );
  }

  const allCoolingUnitsHavePickUpMethod = cartData.items?.every((item) =>
    cartData.pickupDetails.some((pickup) => pickup.coolingUnitId === item.relCoolingUnitId)
  );
  const orderDisabled =
    cartData.totalProduceAmount - cartData.totalDiscountAmount < CART_MINIMUM_VALUE;

  return (
    <ScrollView tw={cn('py-4 bg-white', HORIZONTAL_SPACING)} showsVerticalScrollIndicator={false}>
      <View tw="flex-1 pb-8 space-y-6">
        <FlashList
          data={cartDataByCoolingUnit}
          keyExtractor={(item) => `cooling-unit-${item.coolingUnit.id}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={200}
          renderItem={({ item: coolingUnitGroup }) => {
            const heading = coolingUnitGroup.coolingUnit.name;
            const cropsBreakdown = coolingUnitGroup.crops.map((cropGroup) => {
              const crop = cropsMap.get(cropGroup.cropId);
              const cropName = crop?.name ?? getDefaultCropValues(t).name;
              return {
                cropName,
                weight: cropGroup.totalWeight,
                amount: cropGroup.totalAmount,
              };
            });

            return (
              <View tw="mb-4">
                <OrderDetailsCard
                  heading={heading}
                  totalLabel={t('Dashboard.ShoppingCart.total')}
                  crops={cropsBreakdown}
                  currency={cartData?.currency ?? DEFAULT_CURRENCY_CODE}
                  subtotal={coolingUnitGroup.subtotal}
                  discount={coolingUnitGroup.discount}
                  total={coolingUnitGroup.total}
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
            <FlashList
              data={cartData.pickupDetails}
              keyExtractor={(item) => `pickup-${item.coolingUnitId}`}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              estimatedItemSize={120}
              renderItem={({ item }) => {
                const coolingUnit = unitsMap.get(item.coolingUnitId);

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
                                  DEFAULT_CURRENCY_CODE,
                                  coolingUnit?.commonPricingType?.value ?? 0
                                ),
                              }
                            )
                          : ''}
                      </Text>
                      {item.pickupMethod === EPickUpMethod.DELIVERY ? (
                        <Touchable
                          hitSlop={{ top: 20, bottom: 20, left: 10, right: 10 }}
                          onPress={(evt) => {
                            evt.stopPropagation();
                            emitter.emit(APP_EVENTS.DISPATCH_SHOPPING_CART_DELIVERY_INFORMATION, {
                              coolingUnitId: coolingUnit?.id,
                              companyId: cartData.items.find(
                                (item) => item.relCoolingUnitId === coolingUnit?.id
                              )?.relCompanyId as number,
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
                  cartData.currency ?? DEFAULT_CURRENCY_CODE,
                  cartData.totalColdtivateAmount
                )}
              </Text>
            </View>
          </View>

          <View tw="flex-row items-center justify-between h-8">
            <Text tw="text-base">{t('Dashboard.ShoppingCart.paymentFees')}</Text>
            <View tw="flex-row items-center space-x-1">
              <Icon source="plus" size={16} color={paperTheme.colors.scrim} />
              <Text tw="text-base">
                {formatCurrencyWithSymbol(
                  cartData.currency ?? DEFAULT_CURRENCY_CODE,
                  cartData.totalPaymentFeesAmount
                )}
              </Text>
            </View>
          </View>

          <View tw="flex-row items-center justify-between">
            <Text tw="text-lg">{t('Dashboard.ShoppingCart.totalToPay')}</Text>
            <Text tw="text-lg">
              {formatCurrencyWithSymbol(
                cartData.currency ?? DEFAULT_CURRENCY_CODE,
                cartData.totalAmount
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
