/* eslint-disable react/prop-types */
import type { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { RouteProp } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { create } from 'zustand';

import MarketplaceRoot from '#screens/Dashboard/Main/Marketplace';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import OrdersStack from '../OrdersStack';
import SalesStack from '../SalesStack';

export type MarketplaceTabsRoutes = {
  Marketplace: undefined;
  MyOrders: undefined;
  MySales: undefined;
};

export type MarketplaceTabsRoutePaths = keyof MarketplaceTabsRoutes;
export type MarketplaceTabsRouteProps<Path extends MarketplaceTabsRoutePaths> =
  BottomTabScreenProps<MarketplaceTabsRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<MarketplaceTabsRoutes, MarketplaceTabsRoutePaths>;
  navigation: BottomTabNavigationProp<MarketplaceTabsRoutes, MarketplaceTabsRoutePaths>;
}) => MaterialTopTabNavigationOptions;

const TAB_HEADERS: Record<MarketplaceTabsRoutePaths, TranslationPaths | undefined> = {
  Marketplace: 'navigation.dashboard.Marketplace',
  MyOrders: 'navigation.dashboard.MyOrders',
  MySales: 'navigation.dashboard.MySales',
};

const TopTabs = createMaterialTopTabNavigator<MarketplaceTabsRoutes>();

export const useMarketplaceNavigationConstraints = create<{
  isSwipeEnabled: boolean;
  toggle: (value?: boolean) => void;
}>((set) => ({
  isSwipeEnabled: false,
  toggle: (value) => set((state) => ({ isSwipeEnabled: value ?? !state.isSwipeEnabled })),
}));

export default function MarketplaceTabs() {
  const { t } = useTranslationUtils();
  const isSwipeEnabled = useMarketplaceNavigationConstraints((store) => store.isSwipeEnabled);

  const screenOptions: ScreenOptions = useCallback(
    (props) => {
      const routeName = props.route.name;
      const translationPath = TAB_HEADERS[routeName];
      const routeTitle = translationPath ? t(translationPath) : undefined;

      return {
        ...props,
        tabBarLabel: routeTitle,
        tabBarIndicatorStyle: {
          backgroundColor: paperTheme.colors.secondary,
        },
        tabBarStyle: {
          backgroundColor: paperTheme.colors.background,
        },
        tabBarLabelStyle: {
          color: paperTheme.colors.secondary,
          ...paperTheme.fonts.labelMedium,
        },
        swipeEnabled: routeName !== 'Marketplace' || isSwipeEnabled,
      };
    },
    [isSwipeEnabled]
  );

  // TODO: add stack for my sales
  return (
    <TopTabs.Navigator screenOptions={screenOptions}>
      <TopTabs.Screen name="Marketplace" component={MarketplaceRoot} />
      <TopTabs.Screen name="MyOrders" component={OrdersStack} />
      <TopTabs.Screen name="MySales" component={SalesStack} />
    </TopTabs.Navigator>
  );
}

export function useMarketplaceSwipe(filtersLength: number) {
  const [isSwipeEnabled, setSwipeEnabled] = useMarketplaceNavigationConstraints((store) => [
    store.isSwipeEnabled,
    store.toggle,
  ]);

  const resetTimeout = useRef<NodeJS.Timeout | null>(null);

  const debouncedHandleSwipeDisable = useDebouncedCallback(
    useCallback(() => {
      if (!isSwipeEnabled) return; // safe guard
      setSwipeEnabled(false);
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
      resetTimeout.current = setTimeout(() => {
        setSwipeEnabled(true);
        resetTimeout.current = null;
      }, 500);
    }, [isSwipeEnabled]),
    100
  );

  const debouncedHandleSwipeEnable = useDebouncedCallback(
    useCallback(() => {
      if (isSwipeEnabled) return; // safe guard
      setSwipeEnabled(true);
      if (resetTimeout.current) {
        clearTimeout(resetTimeout.current);
        resetTimeout.current = null;
      }
    }, [isSwipeEnabled]),
    100
  );

  useEffect(() => {
    if (filtersLength === 0 && !isSwipeEnabled) {
      setSwipeEnabled(true);
    }
    return () => {
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
    };
  }, [filtersLength, isSwipeEnabled, setSwipeEnabled]);

  return {
    isSwipeEnabled,
    debouncedHandleSwipeDisable,
    debouncedHandleSwipeEnable,
  };
}
