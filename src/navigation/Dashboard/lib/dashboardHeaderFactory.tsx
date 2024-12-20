import { type NavigationProp, DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';
import { Appbar, Badge } from 'react-native-paper';

import type { NavigationHeaderProps } from '#navigation/components/NavigatorHeader';
import useCartStore from '#stores/shoppingCart';

import { DrawerOverlay } from '#screens/Dashboard/Tutorial/DrawerOverlay';
import { ECommonTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { useRightDrawerStore } from '../index';
import type { DashboardMainRoutePaths, DashboardMainRoutes } from '../Main';
import type { AnalyticsStackRoutePaths } from '../Main/AnalyticsStack';
import type { CoolingUnitsTabsRoutePaths } from '../Main/CoolingUnitsTabs';
import type { HistoryTabStackRoutePaths } from '../Main/HistoryTabStack';
import type { MainTabStackRoutePaths } from '../Main/MainTabStack';
import type { MarketplaceRoutePaths } from '../Main/Marketplace/MarketplaceStack';
import type { MarketPriceTabsRoutePaths } from '../Main/MarketPriceTabs';
import type { OrdersRoutePaths } from '../Main/OrdersStack';
import { useNotifications } from './notifications';

function _HeaderLeftContent<Params extends Record<string, unknown>, Path extends string>(props: {
  dispatch: NavigationProp<Params, Path>['dispatch'];
  goBackFunc?: () => void;
  onLayout?: (evt: LayoutChangeEvent) => void;
}) {
  const { dispatch, goBackFunc, onLayout } = props;

  if (typeof goBackFunc === 'function') {
    return <Appbar.BackAction size={26} onPress={goBackFunc} />;
  }

  return (
    <Appbar.Action
      onLayout={onLayout}
      icon="menu"
      size={26}
      onPress={() => dispatch(DrawerActions.openDrawer())}
    />
  );
}

function _NotificationBadge(props: { count: number }) {
  const { count } = props;

  const hasNotifications = !!count && count > 0;

  return (
    <View tw="relative">
      <Appbar.Action
        icon="bell-outline"
        size={26}
        onPress={() => useRightDrawerStore.getState().toggle()}
        disabled={!hasNotifications}
      />
      <Badge visible={hasNotifications} tw="absolute top-1.5 right-1.5">
        {count}
      </Badge>
    </View>
  );
}

function _CartBadge(props: { count: number; onPress: () => void }) {
  const { count, onPress } = props;
  return (
    <View tw="relative">
      <Appbar.Action icon="cart-outline" size={27} onPress={onPress} />
      <Badge visible={count > 0} tw="absolute top-1.5 right-1.5">
        {count}
      </Badge>
    </View>
  );
}

function _HeaderRightContent(props: {
  notificationCount: number;
  cartItemsCount: number;
  goToShoppingCart?: () => void;
}) {
  const { notificationCount, cartItemsCount, goToShoppingCart } = props;
  return (
    <View tw="flex-row items-center space-x-1.5">
      <_NotificationBadge count={notificationCount} />
      {typeof goToShoppingCart === 'function' ? (
        <_CartBadge count={cartItemsCount} onPress={goToShoppingCart} />
      ) : null}
    </View>
  );
}

export function useDashboardHeader() {
  const { dispatch, navigate } = useNavigation<NavigationProp<DashboardMainRoutes>>();

  const newNotificationsCount = useNotifications().data.newNotificationsCount;
  const cartItemsCount = useCartStore((store) => store.cartData)?.items?.length ?? 0;

  const { onLayout } = useWalkthroughStep({
    number: ECommonTutorialSteps.OPEN_DRAWER_STEP,
    OverlayComponent: DrawerOverlay,
  });

  return useCallback(
    (opts?: { goBackFunc?: () => void; showShoppingCart?: boolean }): NavigationHeaderProps => ({
      leftContent: (
        <_HeaderLeftContent dispatch={dispatch} goBackFunc={opts?.goBackFunc} onLayout={onLayout} />
      ),
      rightContent: (
        <_HeaderRightContent
          notificationCount={newNotificationsCount}
          cartItemsCount={cartItemsCount}
          goToShoppingCart={
            opts?.showShoppingCart ? () => navigate('ShoppingCart', { screen: 'Root' }) : undefined
          }
        />
      ),
    }),
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
  'OrdersRoot',
  'OrdersDetails',
  'RootAnalytics',
];
