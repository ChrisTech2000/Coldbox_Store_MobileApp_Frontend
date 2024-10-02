import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, Divider } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
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

import DeliveryInformationBottomSheet from './components/DeliveryInformationBottomSheet';
import OrderDetailsCard from './components/OrderDetailsCard';

function OrderOverview(props: ShoppingCartStackRouteProps<'OrderOverview'>) {
  const { t } = useTranslationUtils();
  // eslint-disable-next-line
  const navigation = useNavigation<NavigationProp<any>>();

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

            <View>
              <OrderDetailsCard
                heading={t('Dashboard.ShoppingCart.orderOverview')}
                totalLabel="Order total"
                produceWeight={data.items?.reduce(
                  (acc, curr) => (acc += curr.orderedProduceWeight),
                  0
                )}
                subtotal={data.totalProduceAmount}
                discount={0} // TODO: implement discount coupons
                coolingFees={data.totalCoolingFeesAmount}
                paymentFees={data.totalPaymentFeesAmount}
                total={data.totalAmount}
              />
            </View>

            {/* <View tw="flex-col space-y-5">
              <Text tw="text-base text-green-primary font-bold">
                {t('Dashboard.ShoppingCart.pickupMethods')}
              </Text>
              <View tw="border border-solid border-zinc-300 rounded-xl px-4 py-2.5 space-y-1">
                <View tw="flex-row items-center justify-between">
                  <Text tw="text-base font-bold">{t('Dashboard.ShoppingCart.delivery')}</Text>
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
                    <Text tw="text-base text-green-primary">
                      {t('Dashboard.ShoppingCart.viewContacts')}
                    </Text>
                  </Touchable>
                </View>
              </View>
            </View> */}

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
                    <View tw="border border-solid border-zinc-300 rounded-md p-3">
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
                          ${item.producePricePerKg.toFixed(2)} {t('Dashboard.ShoppingCart.perKg')}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
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
            emitter.emit(APP_EVENTS.DISPATCH_CART_REVALIDATION);
            navigation.navigate('Main', {
              screen: 'Orders',
              params: {
                screen: 'OrdersRoot',
              },
            });
          }}
        >
          {t('Dashboard.ShoppingCart.consultOrders')}
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
