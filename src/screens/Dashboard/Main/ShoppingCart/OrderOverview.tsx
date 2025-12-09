import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import { Platform, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, Divider, Icon } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import { cn } from '#ui/lib/cn';

import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { getDefaultCropValues } from '#i18n/transl/misc/crops';
import { useTranslationUtils } from '#i18n/utils';
import { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';
import { useTranslatedCrops } from '#screens/Dashboard/Management/CompanyDetails/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import useCartStore from '#stores/shoppingCart';
import { useDashboardStore } from '#stores/dashboard';
import { CoolingUnit } from '#types/global';

import DeliveryInformationBottomSheet from './components/DeliveryInformationBottomSheet';
import OrderDetailsCard from './components/OrderDetailsCard';
import { PickupDetailsCard } from './components/PickupDetailsCard';
import { groupCartItemsByCoolingUnitAndCrop } from './utils/groupCartItems';

import { formatCurrencyWithSymbol } from '../Dashboard/CheckIn/utils';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-4',
  ios: 'mx-4',
});

function OrderOverview(props: ShoppingCartStackRouteProps<'OrderOverview'>) {
  const { t } = useTranslationUtils();
  const [fetchCart, coolingUnits, isCoolingUnitsLoading, coolingUnitsError, fetchCoolingUnits] =
    useCartStore((store) => [
      store.fetchCart,
      store.allCoolingUnits,
      store.isCoolingUnitsLoading,
      store.coolingUnitsError,
      store.fetchCoolingUnits,
    ]);

  const { data: order, isLoading } = useApiCall(
    'getOrder',
    MarketplaceService.getOrder,
    props.route.params.orderId,
    { defaultData: undefined }
  );

  useEffect(() => {
    if (!coolingUnits && !isCoolingUnitsLoading) {
      fetchCoolingUnits();
    }
  }, [coolingUnits, isCoolingUnitsLoading, fetchCoolingUnits]);

  const cropsResult = useDashboardStore((store) => store.allCrops);

  const crops = useTranslatedCrops(cropsResult ?? []);

  const orderDataByCoolingUnit = useMemo(() => {
    if (!coolingUnits?.length) return [];
    return groupCartItemsByCoolingUnitAndCrop(order?.items, coolingUnits);
  }, [order?.items, coolingUnits]);

  const unitsMap = useMemo(() => {
    if (!coolingUnits?.length) return new Map();
    return new Map(coolingUnits.map((coolingUnit) => [coolingUnit.id, coolingUnit]));
  }, [coolingUnits]);

  const cropsMap = useMemo(() => new Map(crops?.map((crop) => [crop.id, crop])), [crops]);

  if (isLoading || isCoolingUnitsLoading) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (coolingUnitsError || !coolingUnits?.length || !order.items?.length) {
    return (
      <View tw="flex-1 items-center justify-center mt-4 px-6 space-y-4">
        <GenericError retry={fetchCoolingUnits} />
      </View>
    );
  }

  return (
    <React.Fragment>
      <ScrollView tw={cn('bg-white', HORIZONTAL_SPACING)} showsVerticalScrollIndicator={false}>
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
              <Text tw="text-base text-green-primary font-bold">
                {t('Dashboard.MyOrders.title')}
              </Text>
              <Text tw="text-gray-500 mt-0.5">
                {t('Dashboard.ShoppingCart.orderOverviewSubtitle')}
              </Text>
            </View>

            <FlashList
              data={orderDataByCoolingUnit}
              keyExtractor={(item) => `overview-cooling-unit-${item.coolingUnit.id}`}
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
                      currency={order?.currency ?? DEFAULT_CURRENCY_CODE}
                      subtotal={coolingUnitGroup.subtotal}
                      discount={coolingUnitGroup.discount}
                      total={coolingUnitGroup.total}
                    />
                  </View>
                );
              }}
            />

            <View tw="flex-col space-y-5">
              <Text tw="text-base text-green-primary font-bold">
                {t('Dashboard.ShoppingCart.pickupMethods')}
              </Text>

              {order.pickupDetails?.length ? (
                <FlashList
                  data={order.pickupDetails}
                  keyExtractor={(item) => `overview-pickup-${item.coolingUnitId}`}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  estimatedItemSize={120}
                  renderItem={({ item }) => {
                    const coolingUnit = unitsMap.get(item.coolingUnitId) as CoolingUnit;

                    return (
                      <PickupDetailsCard
                        coolingUnit={coolingUnit}
                        orderId={props.route.params.orderId}
                        companyId={
                          order.items.find((item) => item.relCoolingUnitId === coolingUnit.id)
                            ?.relCompanyId as number
                        }
                        pickupMethod={item.pickupMethod}
                      />
                    );
                  }}
                />
              ) : null}
            </View>
          </View>
          <View>
            <Divider tw="bg-zinc-400 my-3" />

            <View tw="flex-row items-center justify-between h-8">
              <Text tw="text-base">{t('Dashboard.ShoppingCart.marketFees')}</Text>
              <View tw="flex-row items-center space-x-1">
                <Icon source="plus" size={16} color={paperTheme.colors.scrim} />
                <Text tw="text-base">
                  {formatCurrencyWithSymbol(
                    order.currency ?? DEFAULT_CURRENCY_CODE,
                    order.totalColdtivateAmount
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
                    order.currency ?? DEFAULT_CURRENCY_CODE,
                    order.totalPaymentFeesAmount
                  )}
                </Text>
              </View>
            </View>

            <View tw="flex-row items-center justify-between">
              <Text tw="text-lg">{t('Dashboard.ShoppingCart.totalToPay')}</Text>
              <Text tw="text-lg">
                {formatCurrencyWithSymbol(
                  order.currency ?? DEFAULT_CURRENCY_CODE,
                  order.totalAmount
                )}
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
            props.navigation.popToTop();
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
