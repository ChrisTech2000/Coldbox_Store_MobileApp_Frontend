import React, { useCallback } from 'react';
import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';

import MarketPriceTrend from '#screens/Dashboard/Main/MarketPrice/Trend';
import MarketPriceRanking from '#screens/Dashboard/Main/MarketPrice/Ranking';
import { paperTheme } from '#ui/lib/theme';

export type MarketPriceTabsRoutes = {
  PriceTrend: undefined;
  PriceRanking: undefined;
};

export type MarketPriceTabsRoutePaths = keyof MarketPriceTabsRoutes;
export type MarketPriceTabsRouteProps<Path extends MarketPriceTabsRoutePaths> =
  BottomTabScreenProps<MarketPriceTabsRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<MarketPriceTabsRoutes, MarketPriceTabsRoutePaths>;
  navigation: BottomTabNavigationProp<MarketPriceTabsRoutes, MarketPriceTabsRoutePaths>;
}) => MaterialTopTabNavigationOptions;

const TAB_TITLE: Record<MarketPriceTabsRoutePaths, string | undefined> = {
  PriceTrend: 'Price trend',
  PriceRanking: 'Price ranking',
};

const TopTabs = createMaterialTopTabNavigator<MarketPriceTabsRoutes>();

export default function MarketPriceTabs() {
  const screenOptions: ScreenOptions = useCallback(
    (props) => ({
      ...props,
      // eslint-disable-next-line react/prop-types
      tabBarLabel: TAB_TITLE[props.route.name],
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
    }),
    []
  );

  return (
    <TopTabs.Navigator screenOptions={screenOptions}>
      <TopTabs.Screen name="PriceTrend" component={MarketPriceTrend} />
      <TopTabs.Screen name="PriceRanking" component={MarketPriceRanking} />
    </TopTabs.Navigator>
  );
}
