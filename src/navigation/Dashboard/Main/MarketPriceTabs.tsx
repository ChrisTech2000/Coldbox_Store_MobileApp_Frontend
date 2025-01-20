import React, { useCallback } from 'react';
import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';

import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import MarketPriceTrend from '#screens/Dashboard/Main/MarketPrice/Trend';
import MarketPriceRanking from '#screens/Dashboard/Main/MarketPrice/Ranking';

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

const TAB_HEADERS: Record<MarketPriceTabsRoutePaths, TranslationPaths | undefined> = {
  PriceTrend: 'navigation.bottomTabs.PriceTrend',
  PriceRanking: 'navigation.bottomTabs.PriceRanking',
};

const TopTabs = createMaterialTopTabNavigator<MarketPriceTabsRoutes>();

export default function MarketPriceTabs() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
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
    };
  }, []);

  return (
    <TopTabs.Navigator screenOptions={screenOptions}>
      <TopTabs.Screen name="PriceTrend" component={MarketPriceTrend} />
      <TopTabs.Screen name="PriceRanking" component={MarketPriceRanking} />
    </TopTabs.Navigator>
  );
}
