import React from 'react';
import { type NavigationProp, DrawerActions, useNavigation } from '@react-navigation/native';
import { Appbar, Badge } from 'react-native-paper';

import type { NavigationHeaderProps } from '#navigation/components/NavigatorHeader';

import { useRightDrawerStore } from '../index';
import type { CoolingUnitsTabsRoutePaths } from '../Main/CoolingUnitsTabs';
import type { MainTabStackRoutePaths } from '../Main/MainTabStack';
import type { MarketPriceTabsRoutePaths } from '../Main/MarketPriceTabs';
import type { HistoryTabStackRoutePaths } from '../Main/HistoryTabStack';
import type { AnalyticsStackRoutePaths } from '../Main/AnalyticsStack';

import { useNotifications } from './notifications';

function _dashboardHeaderFactory<Params extends Record<string, unknown>, Path extends string>(
  dispatch: NavigationProp<Params, Path>['dispatch'],
  notificationCount?: number
): NavigationHeaderProps {
  return {
    leftContent: (
      <Appbar.Action icon="menu" size={26} onPress={() => dispatch(DrawerActions.openDrawer())} />
    ),
    rightContent: (
      <React.Fragment>
        <Appbar.Action
          icon="bell-outline"
          size={25}
          onPress={() => useRightDrawerStore.getState().toggle()}
        />
        <Badge visible={!!notificationCount && notificationCount > 0} tw="absolute top-2 right-2">
          {notificationCount}
        </Badge>
      </React.Fragment>
    ),
  };
}

export function useDashboardHeader() {
  const navigation = useNavigation();
  const { data } = useNotifications();

  return function dashboardHeaderFactory() {
    const newNotificationsCount = data.filter((item) => !item.seen).length;
    return _dashboardHeaderFactory(navigation.dispatch, newNotificationsCount);
  };
}

export type DashboardHeaderFactory = ReturnType<typeof useDashboardHeader>;

type BottomNavRoutePaths =
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
