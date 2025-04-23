import Clipboard from '@react-native-clipboard/clipboard';
import { useIsFocused } from '@react-navigation/native';
import { CurrencyStandardization } from 'currency-format-utils';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Divider, Icon } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { API_BASE_URL } from '#constants/environment';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { OrdersRouteProps } from '#navigation/Dashboard/Main/OrdersStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';
import { CoolingUnit, EOrderStatus } from '#types/global';
import reportCrash from '#ui/lib/reportCrash';

import colors from 'tailwindcss/colors';
import DeliveryInformationBottomSheet from '../ShoppingCart/components/DeliveryInformationBottomSheet';
import OrderDetailsCard from '../ShoppingCart/components/OrderDetailsCard';
import { PickupDetailsCard } from '../ShoppingCart/components/PickupDetailsCard';
import PaymentPendingBottomSheet from './components/PaymentPendingBottomSheet';
import { useDashboardStore } from '#stores/dashboard';
import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { DEFAULT_CROP_VALUES } from '../Marketplace/utils';
import { cn } from '#ui/lib/cn';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';
import { useManagementStore } from '#stores/management';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-4',
  ios: 'mx-4',
});

function OrdersDetails(props: OrdersRouteProps<'OrdersDetails'>) {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const scrollRef = useRef<ScrollView>(null);
  const coolingUnits = useCartStore((store) => store.allCoolingUnits);
  const colors = useTailwindColors();
  const refreshDataFunctions = useDashboardStore((store) => store.refreshData);

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
    if (!order?.items) return [];

    const groupedData = order.items.reduce(
      (acc, item) => {
        const coolingUnit = coolingUnits?.find((c) => c.id === item.relCoolingUnitId);
        if (!coolingUnit) return acc;

        if (!acc[coolingUnit.id]) {
          acc[coolingUnit.id] = [];
        }
        acc[coolingUnit.id].push(item);
        return acc;
      },
      {} as Record<string, typeof order.items>
    );

    return Object.entries(groupedData).map(([coolingUnit, items]) => ({
      coolingUnit,
      items,
    }));
  }, [order, coolingUnits]);

  const unitsMap = useMemo(
    () => new Map(coolingUnits?.map((coolingUnit) => [coolingUnit.id, coolingUnit])),
    [coolingUnits]
  );

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

  if (isLoading || isLoadingCrops) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
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
            keyExtractor={(_, itemIdx) => `discount-coupons-active-tab-list-item-#${itemIdx}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: { coolingUnit, items } }) => {
              const heading = unitsMap.get(Number(coolingUnit))?.name ?? '';
              return (
                <View tw="mb-4">
                  <OrderDetailsCard
                    heading={heading}
                    totalLabel={t('Dashboard.ShoppingCart.total')}
                    produceWeight={items?.reduce(
                      (acc, curr) => (acc += curr.orderedProduceWeight),
                      0
                    )}
                    currency={order?.currency ?? DEFAULT_CURRENCY_CODE}
                    subtotal={items?.reduce((acc, curr) => (acc += curr.produceAmount), 0)}
                    discount={items?.reduce((acc, curr) => (acc += curr.discountAmount), 0)}
                    total={items?.reduce((acc, curr) => (acc += curr.totalAmount), 0)}
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
                keyExtractor={(item, index) => `cooling-unit-${item.coolingUnitId}-dm-${index}`}
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

          <View tw="space-y-5">
            <Text tw="text-base text-green-primary font-bold">
              {t('Dashboard.ShoppingCart.produce')}
            </Text>
            <FlatList
              data={order.items}
              keyExtractor={(_, itemIdx) => `discount-coupons-active-tab-list-item-#${itemIdx}`}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const crop = cropDatums.get(item.relCropId);
                return (
                  <ProduceCard
                    crop={{
                      name: crop?.name ?? DEFAULT_CROP_VALUES.name,
                      image: crop?.image ?? DEFAULT_CROP_VALUES.imageUri,
                    }}
                    currency={order.currency ?? DEFAULT_CURRENCY_CODE}
                    producePricePerKg={item.producePricePerKg}
                    weight={item.orderedProduceWeight}
                    ownedByUserId={!order.ownedOnBehalfOfCompanyId ? item.ownedByUserId : null}
                    ownedOnBehalfOfCompanyId={order.ownedOnBehalfOfCompanyId ?? null}
                  />
                );
              }}
            />
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

function ProduceCard(props: {
  ownedOnBehalfOfCompanyId: number | null;
  ownedByUserId: number | null;
  currency: string;
  crop: { name: string; image: string };
  weight: number;
  producePricePerKg: number;
}) {
  const { t } = useTranslationUtils();

  const { data: ownerCompany } = useApiCall(
    'getCompanyById',
    ColdtivateService.getCompanyById,
    props.ownedOnBehalfOfCompanyId!,
    {
      defaultData: undefined,
      skip: !props.ownedOnBehalfOfCompanyId,
    }
  );

  const { data: companyContacts } = useApiCall(
    'listDeliveryContacts',
    MarketplaceService.listDeliveryContacts,
    ownerCompany.id,
    {
      skip: !ownerCompany.id,
      defaultData: [],
    }
  );

  const { data: owner } = useApiCall(
    'getFarmerByUserId',
    ColdtivateService.getFarmerByUserId,
    props.ownedByUserId!,
    {
      defaultData: undefined,
      skip: !props.ownedByUserId,
    }
  );

  return (
    <View tw="border border-solid border-zinc-300 rounded-md p-3 mb-2">
      <View tw="flex-row items-start justify-between">
        <View tw="flex-col items-start">
          <Text tw="text-lg font-bold">{props.crop?.name ?? DEFAULT_CROP_VALUES.name}</Text>
          <Text tw="text-zinc-500">
            {t('Dashboard.Marketplace.owner')}:{' '}
            {owner?.[0]
              ? `${owner[0].user.firstName} ${owner[0].user.lastName}`
              : (ownerCompany?.name ?? '')}
          </Text>
          {owner?.[0] && owner[0].user.isPhonePublic ? (
            <Touchable
              tw="flex-row items-center justify-center space-x-1.5 mt-2"
              rippleColor={colors.zinc[200]}
              onPress={(evt) => {
                evt.stopPropagation();
                Clipboard.setString(owner?.[0].user.phone);
              }}
            >
              <Text tw="text-zinc-500">{owner?.[0].user.phone}</Text>
              <MaterialCommunityIcon
                name="content-copy"
                size={16}
                color={paperTheme.colors.primary}
              />
            </Touchable>
          ) : ownerCompany && companyContacts?.[0]?.phone ? (
            <Touchable
              tw="flex-row items-center justify-center space-x-1.5 mt-2"
              rippleColor={colors.zinc[200]}
              onPress={(evt) => {
                evt.stopPropagation();
                Clipboard.setString(companyContacts?.[0]?.phone);
              }}
            >
              <Text tw="text-zinc-500">{companyContacts?.[0]?.phone}</Text>
              <MaterialCommunityIcon
                name="content-copy"
                size={16}
                color={paperTheme.colors.primary}
              />
            </Touchable>
          ) : null}
        </View>
        <FastImage
          tw="w-24 h-20"
          resizeMode="contain"
          source={{
            uri: `${API_BASE_URL}media/${props.crop?.image ?? DEFAULT_CROP_VALUES.imageUri}`,
          }}
        />
      </View>
      <Divider tw="bg-gray-400 my-2" />
      <View tw="flex-row items-center justify-between py-1.5">
        <Text tw="font-bold">
          {props.weight}
          {t('Dashboard.ProduceDetails.kilogram')}
        </Text>
        <Text tw="font-bold">
          {CurrencyStandardization.currencyCode({
            code: props.currency ?? DEFAULT_CURRENCY_CODE,
            value: props.producePricePerKg.toFixed(2),
          }).getValueFormated()}{' '}
          {t('Dashboard.ShoppingCart.perKg')}
        </Text>
      </View>
    </View>
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
