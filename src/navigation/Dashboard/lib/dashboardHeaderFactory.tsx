import React from 'react';
import { DrawerActions, NavigationProp } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

import type { NavigationHeaderProps } from '#navigation/components/NavigatorHeader';
import type { MainTabStackRoutePaths } from '../Main/MainTabStack';
import type { MarketPriceTabsRoutePaths } from '../Main/MarketPriceTabs';
import type { CoolingUnitsTabsRoutePaths } from '../Main/CoolingUnitsTabs';
import { useRightDrawerStore } from '../index';

export function dashboardHeaderFactory<Params extends Record<string, unknown>, Path extends string>(
  navigation: NavigationProp<Params, Path>
): NavigationHeaderProps {
  return {
    leftContent: (
      <Appbar.Action
        icon="menu"
        size={26}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    ),
    rightContent: (
      <Appbar.Action
        icon="bell-outline"
        size={25}
        onPress={() => useRightDrawerStore.getState().toggle()}
      />
    ),
  };
}

type BottomNavRoutePaths =
  | MainTabStackRoutePaths
  | MarketPriceTabsRoutePaths
  | CoolingUnitsTabsRoutePaths;

export const BOTTOM_NAV_ROUTES_SCOPE: Array<BottomNavRoutePaths> = [
  'RootMainTabStack',
  'PriceTrend',
  'PriceRanking',
  'Planner',
  'RoomConditions',
  'CratesInfo',
];
