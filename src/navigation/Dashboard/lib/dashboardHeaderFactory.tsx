import { type NavigationProp, DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Appbar, Badge } from 'react-native-paper';

import RBAC from '#common/RBAC';
import type { NavigationHeaderProps } from '#navigation/components/NavigatorHeader';
import { useApiCall } from '#services/hooks/useAPiCall';
import MarketplaceService from '#services/MarketplaceService';
import { useAppEventListener } from '#ui/lib/emitter';

import { useRightDrawerStore } from '../index';
import type { DashboardMainRoutePaths, DashboardMainRoutes } from '../Main';
import type { AnalyticsStackRoutePaths } from '../Main/AnalyticsStack';
import type { CoolingUnitsTabsRoutePaths } from '../Main/CoolingUnitsTabs';
import type { HistoryTabStackRoutePaths } from '../Main/HistoryTabStack';
import type { MainTabStackRoutePaths } from '../Main/MainTabStack';
import type { MarketplaceRoutePaths } from '../Main/MarketplaceStack';
import type { MarketPriceTabsRoutePaths } from '../Main/MarketPriceTabs';
import type { OrdersRoutePaths } from '../Main/OrdersStack';
import { useNotifications } from './notifications';

function _buildLeftContent<Params extends Record<string, unknown>, Path extends string>(
  dispatch: NavigationProp<Params, Path>['dispatch'],
  goBackFunc?: () => void
) {
  if (typeof goBackFunc === 'function') {
    return <Appbar.BackAction size={26} onPress={() => goBackFunc?.()} />;
  }
  return (
    <Appbar.Action icon="menu" size={26} onPress={() => dispatch(DrawerActions.openDrawer())} />
  );
}

function _buildRightContent(
  notificationCount: number,
  cartItemsCount: number,
  goToShoppingCart?: () => void
) {
  return (
    <View tw="flex-row items-center space-x-1.5">
      <View tw="relative">
        <Appbar.Action
          icon="bell-outline"
          size={26}
          onPress={() => useRightDrawerStore.getState().toggle()}
        />
        <Badge
          visible={!!notificationCount && notificationCount > 0}
          tw="absolute top-1.5 right-1.5"
        >
          {notificationCount}
        </Badge>
      </View>
      {typeof goToShoppingCart === 'function' ? (
        <View tw="relative">
          <Appbar.Action icon="cart-outline" size={27} onPress={() => goToShoppingCart()} />
          <Badge visible={cartItemsCount > 0} tw="absolute top-1.5 right-1.5">
            {cartItemsCount}
          </Badge>
        </View>
      ) : null}
    </View>
  );
}

export function useDashboardHeader() {
  const { guard } = RBAC.useRBAC();
  const { dispatch, navigate } = useNavigation<NavigationProp<DashboardMainRoutes>>();

  const { data, refetch } = useApiCall(
    'getCart',
    MarketplaceService.getCart,
    {},
    {
      defaultData: undefined,
    }
  );

  const newNotificationsCount = useNotifications().data.newNotificationsCount;
  const cartItemsCount = data?.items?.length ?? 0;

  useAppEventListener('DISPATCH_CART_REVALIDATION', () => {
    refetch();
  });

  return useCallback(
    (goBackFunc?: () => void): NavigationHeaderProps => {
      const showShoppingCart = guard('VIEW', 'MarketplaceShoppingCart');
      return {
        leftContent: _buildLeftContent(dispatch, goBackFunc),
        rightContent: _buildRightContent(
          newNotificationsCount,
          cartItemsCount,
          showShoppingCart ? () => navigate('ShoppingCart', { screen: 'Root' }) : undefined
        ),
      };
    },
    [newNotificationsCount, cartItemsCount]
  );
}

export type DashboardHeaderFactory = ReturnType<typeof useDashboardHeader>;

type BottomNavRoutePaths =
  | DashboardMainRoutePaths
  | MainTabStackRoutePaths
  | HistoryTabStackRoutePaths
  | MarketPriceTabsRoutePaths
  | CoolingUnitsTabsRoutePaths
  | AnalyticsStackRoutePaths
  | MarketplaceRoutePaths
  | OrdersRoutePaths;

export const BOTTOM_NAV_ROUTES_SCOPE: Array<BottomNavRoutePaths> = [
  'RootMainTabStack',
  'RootHistoryTabStack',
  'PriceTrend',
  'PriceRanking',
  'Planner',
  'RoomConditions',
  'CratesInfo',
  'Maps',
  'Analytics',
  'Marketplace',
  'MarketplaceRoot',
  'Orders',
  'OrdersRoot',
  'OrdersDetails',
];
