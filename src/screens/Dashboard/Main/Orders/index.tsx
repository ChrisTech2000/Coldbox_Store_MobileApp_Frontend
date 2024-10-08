import { CurrencyStandardization } from 'currency-format-utils';
import isArray from 'lodash/isArray';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView as RNScrollView,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import type { OrdersRouteProps } from '#navigation/Dashboard/Main/OrdersStack';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useDashboardStore } from '#stores/dashboard';
import useCartStore from '#stores/shoppingCart';

import { ESortingOptions, SortingMenu, useSortingStore } from './Sorting';

function OrdersRoot(props: OrdersRouteProps<'OrdersRoot'>) {
  const { t } = useTranslationUtils();
  const { sorting } = useSortingStore();
  const scrollRef = useRef<RNScrollView>(null);
  const crops = useDashboardStore((store) => store.allCrops ?? []);
  const allUnits = useCartStore((store) => store.allCoolingUnits);

  const [isSortingModalOpen, setIsSortingModalOpen] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  const { data, isLoading, isValidating, refetch } = useApiCall(
    'getOrders',
    MarketplaceService.getOrders,
    {},
    {
      defaultData: undefined,
    }
  );

  const sortedData = useMemo(() => {
    if (!data || !isArray(data)) return [];
    return [...data].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sorting === ESortingOptions.MOST_RECENT ? dateB - dateA : dateA - dateB;
    });
  }, [data, sorting]);

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

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1">
      <RNScrollView
        tw="px-4 pt-3 bg-white"
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={isValidating} onRefresh={async () => await refetch()} />
        }
      >
        <View tw="pb-32">
          <View tw="flex-row items-center justify-between">
            <Text variant="TextMedium" tw="text-lg">
              {t('navigation.bottomTabs.History')}
            </Text>

            <SortingMenu
              isModalVisible={isSortingModalOpen}
              setIsModalVisible={setIsSortingModalOpen}
            />
          </View>
          <FlatList
            data={sortedData}
            keyExtractor={(item) => `orders-history-list-item-#${item.id}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const _crops = item.items.map(
                (i) => crops.find((c) => c.id === i.relCropId)?.name ?? ''
              );
              const _coolingUnits = item.items.map(
                (i) => allUnits?.find((c) => c.id === i.relCoolingUnitId)?.name ?? ''
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
                      <Text tw="text-base text-zinc-500">
                        {dateFmt(item.createdAt, 'dd/MM/yyyy')}
                      </Text>
                    </View>
                    <View tw="flex-row items-center">
                      <Text variant="TextMedium" tw="text-base w-[50%]">
                        {t('Dashboard.MyOrders.orderId')}
                      </Text>
                      <Text tw="text-base text-zinc-500">{item.id}</Text>
                    </View>
                    <View tw="flex-row items-center">
                      <Text variant="TextMedium" tw="text-base w-[50%]">
                        {t('Dashboard.MyOrders.cropType')}
                      </Text>
                      <Text tw="text-base text-zinc-500" numberOfLines={1}>
                        {[...new Set(_crops)].join(', ')}
                      </Text>
                    </View>
                    <View tw="flex-row items-center">
                      <Text variant="TextMedium" tw="text-base w-[50%]">
                        {t('Dashboard.MyOrders.coolingUnit')}
                      </Text>
                      <Text tw="text-base text-zinc-500" numberOfLines={1}>
                        {[...new Set(_coolingUnits)].join(', ')}
                      </Text>
                    </View>
                    <View tw="flex-row items-center">
                      <Text variant="TextMedium" tw="text-base w-[50%]">
                        {t('Dashboard.MyOrders.orderTotal')}
                      </Text>
                      <Text tw="text-base text-zinc-500">
                        {CurrencyStandardization.currencyCode({
                          code: 'NGN', // TODO: get value from somewhere
                          value: item.totalAmount,
                        }).getValueFormated()}
                      </Text>
                    </View>
                  </View>
                  <MaterialCommunityIcon name="chevron-right" size={28} />
                </Touchable>
              );
            }}
          />
        </View>
      </RNScrollView>
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

export default withSafeArea(
  withErrorBoundary(OrdersRoot, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
