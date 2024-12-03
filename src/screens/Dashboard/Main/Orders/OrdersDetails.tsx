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
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Divider, Icon } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
import { useTranslationUtils } from '#i18n/utils';
import { OrdersRouteProps } from '#navigation/Dashboard/Main/OrdersStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';
import { CoolingUnit, EOrderStatus } from '#types/global';

import colors from 'tailwindcss/colors';
import DeliveryInformationBottomSheet from '../ShoppingCart/components/DeliveryInformationBottomSheet';
import OrderDetailsCard from '../ShoppingCart/components/OrderDetailsCard';
import { PickupDetailsCard } from '../ShoppingCart/components/PickupDetailsCard';
import PaymentPendingBottomSheet from './components/PaymentPendingBottomSheet';

function OrdersDetails(props: OrdersRouteProps<'OrdersDetails'>) {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const scrollRef = useRef<ScrollView>(null);
  const coolingUnits = useCartStore((store) => store.allCoolingUnits);
  const colors = useTailwindColors();

  const [showButton, setShowButton] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, isLoading, refetch } = useApiCall(
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

  const orderDataByCoolingUnit = useMemo(() => {
    if (!data?.items) return [];

    const groupedData = data.items.reduce(
      (acc, item) => {
        const coolingUnit = coolingUnits?.find((c) => c.id === item.relCoolingUnitId);

        if (!coolingUnit) return acc;

        if (!acc[coolingUnit.name]) {
          acc[coolingUnit.name] = [];
        }
        acc[coolingUnit.name].push(item);
        return acc;
      },
      {} as Record<string, typeof data.items>
    );

    return Object.entries(groupedData).map(([coolingUnit, items]) => ({
      coolingUnit,
      items,
    }));
  }, [data, coolingUnits]);

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
      } catch (error) {
        setIsSubmitting(false);
        toast.show(t('navigation.error.errorMessage'), {
          type: 'md_danger',
        });
      }
    },
    [props.route.params.orderId]
  );

  const onCancel = useCallback(
    async (evt: GestureResponderEvent) => {
      evt.stopPropagation();

      try {
        setIsSubmitting(true);

        await MarketplaceService.cancelOrder(props.route.params.orderId);
        refetch();
        setIsSubmitting(false);
        toast.show(t('actions.update-success'), {
          type: 'md_success',
        });
      } catch (error) {
        setIsSubmitting(false);
        toast.show(t('navigation.error.errorMessage'), {
          type: 'md_danger',
        });
      }
    },
    [props.route.params.orderId]
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
          <MaterialCommunityIcon name="chevron-left" size={20} color={colors.gray[700]} />

          <Text tw="text-base">{t('actions.back')}</Text>
        </Touchable>
      ) : null}

      <ScrollView
        tw="px-4 pt-4 bg-white"
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

          {data.status === EOrderStatus.PAYMENT_PENDING ? (
            <Button
              tw="w-full self-center my-4 border-blue-400 rounded-lg"
              labelStyle="text-blue-400"
              rippleColor={colors.blue[50]}
              mode="outlined"
              onPress={() =>
                emitter.emit(APP_EVENTS.DISPATCH_PAYMENT_PENDING_BOTTOM_SHEET, {
                  onPay,
                  onCancel,
                })
              }
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

            {data.pickupDetails?.length ? (
              <FlatList
                data={data.pickupDetails}
                keyExtractor={(item, index) => `cooling-unit-${item.coolingUnitId}-dm-${index}`}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  const coolingUnit = coolingUnits?.find(
                    (cu) => cu.id === item.coolingUnitId
                  ) as CoolingUnit;

                  return (
                    <PickupDetailsCard
                      coolingUnit={coolingUnit}
                      orderId={props.route.params.orderId}
                      companyId={
                        data.items.find((item) => item.relCoolingUnitId === coolingUnit.id)
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
              data={data.items}
              keyExtractor={(_, itemIdx) => `discount-coupons-active-tab-list-item-#${itemIdx}`}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const crop = crops?.find((c) => c.id === item.relCropId);
                return (
                  <ProduceCard
                    crop={{ name: crop?.name ?? '', image: crop?.image ?? '' }}
                    producePricePerKg={item.producePricePerKg}
                    weight={item.orderedProduceWeight}
                    ownedByUserId={!data.ownedOnBehalfOfCompanyId ? item.ownedByUserId : null}
                    ownedOnBehalfOfCompanyId={data.ownedOnBehalfOfCompanyId ?? null}
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
                    code: 'NGN', // TODO: get value from somewhere
                    value: data.totalPaymentFeesAmount + data.totalColdtivateAmount,
                  }).getValueFormated()}
                </Text>
              </View>
            </View>

            <View tw="flex-row items-center justify-between">
              <Text tw="text-lg">{t('Dashboard.ShoppingCart.totalToPay')}</Text>
              <Text tw="text-lg">
                {CurrencyStandardization.currencyCode({
                  code: 'NGN', // TODO: get value from somewhere
                  value: data.totalAmount,
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
          <Text tw="text-lg font-bold">{props.crop.name}</Text>
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
          source={{ uri: `${API_BASE_URL}media/${props.crop.image}` }}
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
            code: 'NGN', // TODO: get value from somewhere
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
