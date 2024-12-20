import { useIsFocused } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  type GestureResponderEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  RefreshControl,
  ScrollView as RNScrollView,
  View,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlashList } from '@shopify/flash-list';
import isArray from 'lodash/isArray';
import moize from 'moize';
import ms from 'ms';

import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
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
import { stringToHash } from '#ui/lib/hash';
import type { CartItem, CoolingUnit } from '#types/global';
import type { GetAllCropsResponse } from '#types/api.responses';

import { formatCurrencyWithSymbol } from '../Dashboard/CheckIn/utils';
import CropsBottomSheet from './components/CropsBottomSheet';
import { ESortingOptions, SortingMenu, useSortingStore } from './Sorting';

type Status = 'payment-pending' | 'cancelled' | 'paid' | 'payment-expired';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const ESTIMATED_LIST_SIZE = {
  height: DEVICE_HEIGHT,
  width: DEVICE_WIDTH - 32, // px-4 -> 16px * 2 (RNScrollView L&R)
} as const;

const COLORS: Record<Status, string> = {
  paid: 'border-green-600 text-green-600',
  'payment-pending': 'border-blue-400 text-blue-400',
  cancelled: 'border-red-600 text-red-600',
  'payment-expired': 'border-orange-600 text-orange-600',
};

function OrdersRoot(props: OrdersRouteProps<'OrdersRoot'>) {
  const { t } = useTranslationUtils();
  const colors = useTailwindColors();
  const { sorting } = useSortingStore();
  const scrollRef = useRef<RNScrollView>(null);
  const [crops, addRefreshDataFn] = useDashboardStore((store) => [
    store.allCrops ?? [],
    store.addRefreshDataFn,
  ]);
  const allUnits = useCartStore((store) => store.allCoolingUnits);

  const [isSortingModalOpen, setIsSortingModalOpen] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  const { data, isLoading, isValidating, refetch } = useApiCall(
    'getOrders',
    MarketplaceService.getOrders,
    undefined,
    { defaultData: undefined }
  );

  const sortedData = useMemo(() => {
    if (!data || !isArray(data)) return [];
    const multiplier = sorting === ESortingOptions.MOST_RECENT ? -1 : 1;
    return data
      .map((item) => ({ ...item, timestamp: new Date(item.createdAt).getTime() }))
      .sort((a, b) => multiplier * (a.timestamp - b.timestamp));
  }, [data, sorting]);

  const cropsAndUnitsData = useMemo(() => ({ crops, allUnits }), [crops, allUnits]);

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

  useEffect(() => {
    addRefreshDataFn(refetch);
  }, []);

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
        tw="px-4 p-4 bg-white"
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={isValidating} onRefresh={async () => await refetch()} />
        }
      >
        <View tw="pb-32">
          <View tw="flex-row items-center justify-between pb-3">
            <Text variant="TextMedium" tw="text-lg">
              {t('navigation.bottomTabs.History')}
            </Text>

            <SortingMenu
              isModalVisible={isSortingModalOpen}
              setIsModalVisible={setIsSortingModalOpen}
            />
          </View>
          <FlashList
            estimatedItemSize={30}
            estimatedListSize={ESTIMATED_LIST_SIZE}
            data={sortedData}
            extraData={cropsAndUnitsData}
            keyExtractor={(item) => `orders-history-list-item-#${item.id}`}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, extraData }) => {
              const _extraData = extraData as typeof cropsAndUnitsData;

              const { contextualCropNames, contextualUnitNames } = _getRowDatums(
                item.items,
                _extraData.crops,
                _extraData?.allUnits
              );

              const total =
                item.totalColdtivateAmount +
                item.totalCoolingFeesAmount +
                item.totalPaymentFeesAmount +
                item.totalProduceAmount -
                item.totalDiscountAmount;

              return (
                <Touchable
                  tw="flex-row items-center border border-solid border-zinc-300 rounded-md p-3 my-2"
                  onPress={(evt) => {
                    evt.stopPropagation();
                    props.navigation.navigate('OrdersDetails', {
                      orderId: item.id,
                      isTabsView: true,
                    });
                  }}
                >
                  <View tw="w-[90%] space-y-2">
                    <View tw="flex-row items-center">
                      <Text variant="TextMedium" tw="text-base w-[50%]">
                        {t('Dashboard.MyOrders.sort.date')}
                      </Text>
                      <Text tw="text-base text-zinc-500">
                        {dateFmt(item.createdAt, 'dd/MM/yyyy')}
                      </Text>
                    </View>

                    <View tw="flex-row items-center">
                      <Touchable
                        tw="flex flex-row w-[50%] items-center space-x-1"
                        onPress={() => emitter.emit(APP_EVENTS.DISPATCH_CROPS_BOTTOM_SHEET, item)}
                      >
                        <Text variant="TextMedium" tw="text-base">
                          {t('Dashboard.MyOrders.cropType')}
                        </Text>
                        <MaterialCommunityIcon
                          name="information-outline"
                          size={18}
                          color={colors.green.primary}
                        />
                      </Touchable>
                      <Text tw="text-base text-zinc-500 w-40" numberOfLines={1}>
                        {contextualCropNames.join(', ')}
                      </Text>
                    </View>

                    <View tw="flex-row items-center">
                      <Text variant="TextMedium" tw="text-base w-[50%]">
                        {t('Dashboard.MyOrders.coolingUnit')}
                      </Text>
                      <Text tw="text-base text-zinc-500 w-40" numberOfLines={2}>
                        {contextualUnitNames.join(', ')}
                      </Text>
                    </View>

                    <View tw="flex-row items-center">
                      <Text variant="TextMedium" tw="text-base w-[50%]">
                        {t('Dashboard.MyOrders.orderTotal')}
                      </Text>
                      <Text tw="text-base text-zinc-500">
                        {formatCurrencyWithSymbol(
                          'NGN', // TODO: get value from somewhere
                          total
                        )}
                      </Text>
                    </View>

                    <View tw="flex-row items-center">
                      <Text variant="TextMedium" tw="text-base w-[50%]">
                        {t('Dashboard.MyOrders.ownedBy')}
                      </Text>
                      <Text tw="text-base text-zinc-500">
                        {item.ownedOnBehalfOfCompanyId
                          ? t('Dashboard.Analytics.company')
                          : t('Dashboard.MyOrders.you')}
                      </Text>
                    </View>

                    <View
                      tw={cn(
                        'self-end px-1 py-0.5 border rounded-lg',
                        COLORS[item.status as Status]
                      )}
                    >
                      <Text tw={COLORS[item.status as Status]}>
                        {t(`Dashboard.MyOrders.status.${item.status as Status}`)}
                      </Text>
                    </View>
                  </View>
                  <MaterialCommunityIcon name="chevron-right" size={28} color={colors.gray[700]} />
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

      <_PortalsWrapper />
    </View>
  );
}

function _getRowDatums(
  cartData: Array<CartItem>,
  crops: Array<GetAllCropsResponse> = [],
  units: Array<CoolingUnit> = []
) {
  const { cropNames, unitNames } = cartData.reduce(
    (acc, elm) => {
      acc.cropNames.add(_getNameById(elm.relCropId, crops));
      acc.unitNames.add(_getNameById(elm.relCoolingUnitId, units));
      return acc;
    },
    { cropNames: new Set<string>(), unitNames: new Set<string>() }
  );

  return {
    contextualCropNames: Array.from(cropNames).filter(Boolean),
    contextualUnitNames: Array.from(unitNames).filter(Boolean),
  };
}

const _getNameById = moize(
  (id: number, list: Array<{ id: number; name: string }>) =>
    list.find((item) => item.id === id)?.name ?? '',
  {
    maxAge: ms('6 seconds'),
    isSerialized: true,
    serializer: (args) => [stringToHash(JSON.stringify(args))],
  }
);

function _PortalsWrapper() {
  const isFocused = useIsFocused();
  if (!isFocused) return null;
  return (
    <React.Fragment>
      <CropsBottomSheet />
    </React.Fragment>
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
