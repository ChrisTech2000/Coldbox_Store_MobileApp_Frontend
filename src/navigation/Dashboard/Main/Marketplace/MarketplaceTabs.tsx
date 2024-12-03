/* eslint-disable react/prop-types */
import type { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { RouteProp } from '@react-navigation/native';
import React, { useCallback } from 'react';

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

export default function MarketplaceTabs() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
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
      swipeEnabled: false,
    };
  }, []);

  // TODO: add stack for my sales
  return (
    <TopTabs.Navigator screenOptions={screenOptions}>
      <TopTabs.Screen name="Marketplace" component={MarketplaceRoot} />
      <TopTabs.Screen name="MyOrders" component={OrdersStack} />
      <TopTabs.Screen name="MySales" component={SalesStack} />
    </TopTabs.Navigator>
  );
}
