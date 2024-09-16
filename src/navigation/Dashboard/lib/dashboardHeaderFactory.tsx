import React, { useCallback } from 'react';
import { View } from 'react-native';
import { type NavigationProp, DrawerActions, useNavigation } from '@react-navigation/native';
import { Appbar, Badge } from 'react-native-paper';

import type { NavigationHeaderProps } from '#navigation/components/NavigatorHeader';
import RBAC from '#common/RBAC';

import { useRightDrawerStore } from '../index';
import type { CoolingUnitsTabsRoutePaths } from '../Main/CoolingUnitsTabs';
import type { DashboardMainRoutePaths, DashboardMainRoutes } from '../Main';
import type { MainTabStackRoutePaths } from '../Main/MainTabStack';
import type { MarketPriceTabsRoutePaths } from '../Main/MarketPriceTabs';
import type { HistoryTabStackRoutePaths } from '../Main/HistoryTabStack';
import type { AnalyticsStackRoutePaths } from '../Main/AnalyticsStack';

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

function _buildRightContent(notificationCount: number, goToShoppingCart?: () => void) {
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
          <Badge visible tw="absolute top-1.5 right-1.5">
            4
          </Badge>
        </View>
      ) : null}
    </View>
  );
}

export function useDashboardHeader() {
  const { guard } = RBAC.useRBAC();
  const { dispatch, navigate } = useNavigation<NavigationProp<DashboardMainRoutes>>();

  const newNotificationsCount = useNotifications().data.newNotificationsCount;

  return useCallback(
    (goBackFunc?: () => void): NavigationHeaderProps => {
      const showShoppingCart = guard('VIEW', 'MarketplaceShoppingCart');
      return {
        leftContent: _buildLeftContent(dispatch, goBackFunc),
        rightContent: _buildRightContent(
          newNotificationsCount,
          showShoppingCart ? () => navigate('ShoppingCart', { screen: 'Root' }) : undefined
        ),
      };
    },
    [newNotificationsCount]
  );
}

export type DashboardHeaderFactory = ReturnType<typeof useDashboardHeader>;

type BottomNavRoutePaths =
  | DashboardMainRoutePaths
  | MainTabStackRoutePaths
  | HistoryTabStackRoutePaths
  | MarketPriceTabsRoutePaths
  | CoolingUnitsTabsRoutePaths
  | AnalyticsStackRoutePaths;

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
];
