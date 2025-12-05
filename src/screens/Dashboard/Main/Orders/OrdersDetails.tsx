import { useIsFocused } from '@react-navigation/native';
import { CurrencyStandardization } from 'currency-format-utils';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { ActivityIndicator, Divider, Icon } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import reportCrash from '#ui/lib/reportCrash';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { cropTranslationLookup, getDefaultCropValues } from '#i18n/transl/misc/crops';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { OrdersRouteProps } from '#navigation/Dashboard/Main/OrdersStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import useCartStore from '#stores/shoppingCart';
import { CoolingUnit, EOrderStatus } from '#types/global';

import DeliveryInformationBottomSheet from '../ShoppingCart/components/DeliveryInformationBottomSheet';
import OrderDetailsCard from '../ShoppingCart/components/OrderDetailsCard';
import { PickupDetailsCard } from '../ShoppingCart/components/PickupDetailsCard';
import { groupCartItemsByCoolingUnitAndCrop } from '../ShoppingCart/utils/groupCartItems';
import PaymentPendingBottomSheet from './components/PaymentPendingBottomSheet';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-4',
  ios: 'mx-4',
});

function OrdersDetails(props: OrdersRouteProps<'OrdersDetails'>) {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const scrollRef = useRef<ScrollView>(null);
  const colors = useTailwindColors();
  const refreshDataFunctions = useDashboardStore((store) => store.refreshData);

  const [coolingUnits, isCoolingUnitsLoading, coolingUnitsError, fetchCoolingUnits] = useCartStore(
    (store) => [
      store.allCoolingUnits,
      store.isCoolingUnitsLoading,
      store.coolingUnitsError,
      store.fetchCoolingUnits,
    ]
  );

  const [showButton, setShowButton] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));
  const farmerCountry = useDashboardStore(useShallow((store) => store.farmerCountry));

  const locale = LanguageManager.read();

  const {
    data: order,
    isLoading,
    refetch,
  } = useApiCall('getOrder', MarketplaceService.getOrder, props.route.params.orderId, {
    defaultData: undefined,
  });

  const { data: crops, isLoading: isLoadingCrops } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined,
    { defaultData: [] }
  );

  useEffect(() => {
    if (!coolingUnits && !isCoolingUnitsLoading) {
      fetchCoolingUnits();
    }
  }, [coolingUnits, isCoolingUnitsLoading, fetchCoolingUnits]);

  const cropDatums = useMemo(() => {
    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();
    return new Map(
      crops.map((crop) => [
        crop.id,
        {
          name: find(translationMap, {
            name: crop.name,
            country: companyCountry || farmerCountry || undefined,
            locale,
          }),
          image: crop.image,
        },
      ])
    );
  }, [crops, companyCountry, farmerCountry, locale]);

  const orderDataByCoolingUnit = useMemo(() => {
    if (!coolingUnits?.length) return [];
    return groupCartItemsByCoolingUnitAndCrop(order?.items, coolingUnits);
  }, [order?.items, coolingUnits]);

  const unitsMap = useMemo(() => {
    if (!coolingUnits?.length) return new Map();
    return new Map(coolingUnits.map((coolingUnit) => [coolingUnit.id, coolingUnit]));
  }, [coolingUnits]);

  const onPay = useCallback(
    async (evt: GestureResponderEvent) => {
      evt.stopPropagation();

      try {
        setIsSubmitting(true);

        const result = await MarketplaceService.payWithPaystack(props.route.params.orderId);

        if (result.authorizationUrl) {
          setIsSubmitting(false);
          // eslint-disable-next-line
          // @ts-ignore
          props.navigation.navigate('PaystackPayment', {
            url: result.authorizationUrl,
            orderId: props.route.params.orderId,
          });
        }

        emitter.emit(APP_EVENTS.DISPATCH_INVALIDATE_MARKETPLACE_LISTING);
        refreshDataFunctions.forEach((fn) => fn());
      } catch (error) {
        setIsSubmitting(false);
        toast.show(t('navigation.error.errorMessage'), {
          type: 'md_danger',
        });
        reportCrash(error as Error);
      }
    },
    [props.route.params.orderId, refreshDataFunctions]
  );

  const onCancel = useCallback(
    async (evt: GestureResponderEvent) => {
      evt.stopPropagation();

      try {
        setIsSubmitting(true);

        await MarketplaceService.cancelOrder(props.route.params.orderId);
        await refetch();
        toast.show(t('actions.update-success'), { type: 'md_success' });

        emitter.emit(APP_EVENTS.DISPATCH_INVALIDATE_MARKETPLACE_LISTING);
        refreshDataFunctions.forEach((fn) => fn());
      } catch (error) {
        toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
        reportCrash(error as Error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [props.route.params.orderId, refreshDataFunctions]
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

  if (isLoading || isLoadingCrops || isCoolingUnitsLoading) {
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

  return (
    <View tw="flex-1 bg-white">
      {props.route.params.isTabsView ? (
        <Touchable
          onPress={props.navigation.goBack}
          tw="flex flex-row space-x-1 mt-4 pl-2 bg-white items-center"
        >
          <MaterialCommunityIcon
            name={LanguageManager.isRTL ? 'chevron-right' : 'chevron-left'}
            size={20}
            color={colors.gray[700]}
          />

          <Text tw="text-base">{t('actions.back')}</Text>
        </Touchable>
      ) : null}

      <ScrollView
        tw={cn('pt-4 bg-white', HORIZONTAL_SPACING)}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollRef}
      >
        <View tw="pb-32 space-y-4">
          <Text tw="text-base text-green-primary font-bold">{t('Dashboard.MyOrders.title')}</Text>
          <FlatList
            data={orderDataByCoolingUnit}
            keyExtractor={(item) => `order-cooling-unit-${item.coolingUnit.id}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: coolingUnitGroup }) => {
              const heading = coolingUnitGroup.coolingUnit.name;
              const cropsBreakdown = coolingUnitGroup.crops.map((cropGroup) => {
                const crop = cropDatums.get(cropGroup.cropId);
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
                    currency={order?.currency ?? DEFAULT_CURRENCY_CODE}
                    subtotal={coolingUnitGroup.subtotal}
                    discount={coolingUnitGroup.discount}
                    total={coolingUnitGroup.total}
                  />
                </View>
              );
            }}
          />

          {order.status === EOrderStatus.PAYMENT_PENDING ? (
            <Button
              tw="w-full self-center my-4 border-blue-400 rounded-lg"
              labelStyle="text-blue-400"
              rippleColor={colors.blue[50]}
              mode="outlined"
              onPress={(evt) => {
                evt.stopPropagation();
                emitter.emit(APP_EVENTS.DISPATCH_PAYMENT_PENDING_BOTTOM_SHEET, {
                  onPay,
                  onCancel,
                });
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color={colors.blue[400]} />
              ) : (
                t('Dashboard.MyOrders.status.payment-pending')
              )}
            </Button>
          ) : null}

          <View tw="flex-col space-y-5">
            <Text tw="text-base text-green-primary font-bold">
              {t('Dashboard.ShoppingCart.pickupMethods')}
            </Text>

            {order.pickupDetails?.length ? (
              <FlatList
                data={order.pickupDetails}
                keyExtractor={(item, index) => `pickup-${item.coolingUnitId}-${index}`}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  const coolingUnit = unitsMap.get(item.coolingUnitId) as CoolingUnit;
                  return (
                    <PickupDetailsCard
                      coolingUnit={coolingUnit}
                      orderId={props.route.params.orderId}
                      companyId={
                        order.items.find((item) => item.relCoolingUnitId === coolingUnit?.id)
                          ?.relCompanyId as number
                      }
                      pickupMethod={item.pickupMethod}
                    />
                  );
                }}
              />
            ) : null}
          </View>

          <View>
            <Divider tw="bg-zinc-400 my-3" />

            <View tw="flex-row items-center justify-between h-8">
              <Text tw="text-base">{t('Dashboard.ShoppingCart.marketFees')}</Text>
              <View tw="flex-row items-center space-x-1">
                <Icon source="plus" size={16} color={paperTheme.colors.scrim} />
                <Text tw="text-base">
                  {CurrencyStandardization.currencyCode({
                    code: order.currency ?? DEFAULT_CURRENCY_CODE,
                    value: order.totalColdtivateAmount,
                  }).getValueFormated()}
                </Text>
              </View>
            </View>

            <View tw="flex-row items-center justify-between h-8">
              <Text tw="text-base">{t('Dashboard.ShoppingCart.paymentFees')}</Text>
              <View tw="flex-row items-center space-x-1">
                <Icon source="plus" size={16} color={paperTheme.colors.scrim} />
                <Text tw="text-base">
                  {CurrencyStandardization.currencyCode({
                    code: order.currency ?? DEFAULT_CURRENCY_CODE,
                    value: order.totalPaymentFeesAmount,
                  }).getValueFormated()}
                </Text>
              </View>
            </View>

            <View tw="flex-row items-center justify-between">
              <Text tw="text-lg">{t('Dashboard.ShoppingCart.totalToPay')}</Text>
              <Text tw="text-lg">
                {CurrencyStandardization.currencyCode({
                  code: order.currency ?? DEFAULT_CURRENCY_CODE,
                  value: order.totalAmount,
                }).getValueFormated()}
              </Text>
            </View>
          </View>
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
      <PaymentPendingBottomSheet />
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
