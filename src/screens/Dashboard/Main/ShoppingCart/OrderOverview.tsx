import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { CurrencyStandardization } from 'currency-format-utils';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, Divider, Icon } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';
import { CoolingUnit, EPickUpMethod, EPricingType } from '#types/global';

import DeliveryInformationBottomSheet from './components/DeliveryInformationBottomSheet';
import OrderDetailsCard from './components/OrderDetailsCard';

function OrderOverview(props: ShoppingCartStackRouteProps<'OrderOverview'>) {
  const { t } = useTranslationUtils();
  // eslint-disable-next-line
  const navigation = useNavigation<NavigationProp<any>>();
  const [fetchCart, coolingUnits] = useCartStore((store) => [
    store.fetchCart,
    store.allCoolingUnits,
  ]);

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

  // const [locations, setLocations] = useState<Map<number, string>>(new Map());

  // const fetchLocation = useCallback(
  //   async (locationId: number, companyId: number) => {
  //     if (locations.has(locationId)) {
  //       return locations.get(locationId); // Return cached address
  //     }

  //     try {
  //       const location = await ColdtivateService.getLocation({
  //         locationId,
  //         companyId,
  //       });

  //       const address = `${location.street ? location.street + ' ' : ''}${location.streetNumber ? location.streetNumber + ', ' : ''} ${location.city}${location.latitude ? ` (${location.latitude}, ${location.longitude})` : ''}`;
  //       setLocations((prev) => new Map(prev).set(locationId, address));
  //       return address;
  //     } catch (error) {
  //       console.error('Error fetching location:', error);
  //       return 'Error fetching address';
  //     }
  //   },
  //   [locations]
  // );

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

  if (isLoading || isLoadingCrops || !data.items?.length) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <React.Fragment>
      <ScrollView tw="px-4 bg-white" showsVerticalScrollIndicator={false}>
        <View tw="pt-14 pb-24">
          <View tw="flex-1 pb-8 space-y-6">
            <View tw="items-center justify-center space-y-1.5 py-4">
              <MaterialCommunityIcon
                name="checkbox-marked-circle-outline"
                color={paperTheme.colors.primary}
                size={65}
              />
              <Text tw="text-2xl">{t('Dashboard.ShoppingCart.thankYouMessage')}</Text>
            </View>

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
                      total={item?.items?.reduce((acc, curr) => (acc += curr.totalAmount), 0)}
                    />
                  </View>
                );
              }}
            />

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
                    const locationAddress = '';

                    return (
                      <View tw="mb-4">
                        <Text tw="text-base ml-1">{coolingUnit?.name ?? ''}</Text>
                        <View tw="flex flex-row items-center space-x-2 my-1 ml-1">
                          <MaterialIcon
                            name="location-pin"
                            size={18}
                            color={paperTheme.colors.primary}
                          />
                          <Text>{locationAddress}</Text>
                        </View>
                        <View tw="p-4 border border-gray-300 rounded-xl">
                          <View tw="flex flex-row items-center justify-between">
                            <Text tw="text-base">
                              {item.pickupMethod === EPickUpMethod.PICK_UP_SAME_DAY
                                ? t('Dashboard.ShoppingCart.pickUpToday')
                                : ''}
                              {item.pickupMethod === EPickUpMethod.DELIVERY
                                ? t('Dashboard.ShoppingCart.delivery')
                                : ''}
                              {item.pickupMethod === EPickUpMethod.KEEP_IN_STORAGE
                                ? t(
                                    coolingUnit?.commonPricingType?.type ===
                                      EPricingType.PERIODICITY
                                      ? 'Dashboard.ShoppingCart.keepInStorageDailyRate'
                                      : 'Dashboard.ShoppingCart.keepInStorageFixedRate',
                                    {
                                      price: CurrencyStandardization.currencyCode({
                                        code: 'NGN', // TODO: get value from somewhere
                                        value: coolingUnit?.commonPricingType?.value ?? 0,
                                      }).getValueFormated(),
                                    }
                                  )
                                : ''}
                            </Text>
                            {item.pickupMethod === EPickUpMethod.DELIVERY ? (
                              <Touchable
                                onPress={(evt) => {
                                  evt.stopPropagation();
                                  emitter.emit(
                                    APP_EVENTS.DISPATCH_SHOPPING_CART_DELIVERY_INFORMATION,
                                    {
                                      orderId: props.route.params.orderId,
                                      coolingUnitId: item.coolingUnitId,
                                    }
                                  );
                                }}
                              >
                                <Text tw="text-base text-green-primary">
                                  {t('Dashboard.ShoppingCart.viewContacts')}
                                </Text>
                              </Touchable>
                            ) : null}
                          </View>
                          {item.pickupMethod === EPickUpMethod.DELIVERY ? (
                            <Text tw="text-sm text-gray-500 mt-2">
                              {t('Dashboard.ShoppingCart.deliveryInfo', {
                                value: CurrencyStandardization.currencyCode({
                                  code: 'NGN',
                                  value: coolingUnit?.commonPricingType?.value ?? 0,
                                }).getValueFormated(),
                              })}
                            </Text>
                          ) : null}
                        </View>
                      </View>
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
                          }).getValueFormated()}
                          {t('Dashboard.ShoppingCart.perKg')}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
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

      <View tw="border-t border-solid border-zinc-400 absolute left-0 bottom-0 items-center justify-center w-full py-5 bg-white">
        <Button
          mode="outlined"
          tw="w-10/12"
          onPress={(evt) => {
            evt.stopPropagation();
            fetchCart();
            navigation.navigate('MarketplaceRoot');
          }}
        >
          {t('Dashboard.ShoppingCart.gotItButton')}
        </Button>
      </View>
    </React.Fragment>
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
  withErrorBoundary(OrderOverview, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
