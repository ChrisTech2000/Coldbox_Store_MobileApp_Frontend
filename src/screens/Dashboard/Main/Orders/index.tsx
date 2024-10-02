import React from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from 'tailwindcss/colors';

import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import type { OrdersRouteProps } from '#navigation/Dashboard/Main/OrdersStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';

function OrdersRoot(props: OrdersRouteProps<'OrdersRoot'>) {
  const { t } = useTranslationUtils();

  const { data, isLoading } = useApiCall(
    'getOrders',
    MarketplaceService.getOrders,
    {},
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

  const { data: coolingUnits, isLoading: isLoadingUnits } = useApiCall(
    'getCoolingUnits',
    ColdtivateService.getCoolingUnits,
    {},
    {
      defaultData: [],
    }
  );

  if (isLoading || isLoadingCrops || isLoadingUnits) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView tw="px-4 pt-3 bg-white" showsVerticalScrollIndicator={false}>
      <View tw="pb-32">
        <View tw="flex-row items-center justify-between">
          <Text variant="TextMedium" tw="text-lg">
            {t('navigation.bottomTabs.History')}
          </Text>
          <Touchable
            tw="flex-row items-center justify-center space-x-1 py-1.5 pl-2.5 pr-1"
            rippleColor={colors.zinc[200]}
            onPress={(evt) => {
              evt.stopPropagation();
              // TODO
            }}
          >
            {/** TODO: add selector and sorting functionality */}
            <Text tw="text-base text-green-primary">Most recent</Text>
            <MaterialIcon name="arrow-drop-down" size={26} color={paperTheme.colors.primary} />
          </Touchable>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => `orders-history-list-item-#${item.id}`}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const _crops = item.items.map(
              (i) => crops.find((c) => c.id === i.relCropId)?.name ?? ''
            );
            const _coolingUnits = item.items.map(
              (i) => coolingUnits?.find((c) => c.id === i.relCoolingUnitId)?.name ?? ''
            );

            return (
              <Touchable
                tw="flex-row items-center border border-solid border-zinc-300 rounded-md p-3 my-2"
                onPress={(evt) => {
                  evt.stopPropagation();
                  props.navigation.navigate('OrdersDetails', { orderId: item.id });
                }}
              >
                <View tw="w-[90%]">
                  <View tw="flex-row items-center">
                    <Text variant="TextMedium" tw="text-base w-[50%]">
                      {t('Dashboard.MyOrders.sort.date')}
                    </Text>

                    {/* <Text tw="text-base text-zinc-500">{dateFmt(item, 'dd/mm/yyyy')}</Text> */}
                  </View>
                  <View tw="flex-row items-center">
                    <Text variant="TextMedium" tw="text-base w-[50%]">
                      {t('Dashboard.MyOrders.sort.orderId')}
                    </Text>
                    <Text tw="text-base text-zinc-500">{item.id}</Text>
                  </View>
                  <View tw="flex-row items-center">
                    <Text variant="TextMedium" tw="text-base w-[50%]">
                      {t('Dashboard.MyOrders.sort.cropType')}
                    </Text>
                    <Text tw="text-base text-zinc-500">{_crops.join(', ')}</Text>
                  </View>
                  <View tw="flex-row items-center">
                    <Text variant="TextMedium" tw="text-base w-[50%]">
                      {t('Dashboard.MyOrders.sort.coolingUnit')}
                    </Text>
                    <Text tw="text-base text-zinc-500">{_coolingUnits.join(', ')}</Text>
                  </View>
                  <View tw="flex-row items-center">
                    <Text variant="TextMedium" tw="text-base w-[50%]">
                      {t('Dashboard.MyOrders.sort.orderTotal')}
                    </Text>
                    <Text tw="text-base text-zinc-500">${item.totalAmount}</Text>
                  </View>
                </View>
                <MaterialCommunityIcon name="chevron-right" size={28} />
              </Touchable>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

export default withSafeArea(
  withErrorBoundary(OrdersRoot, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
