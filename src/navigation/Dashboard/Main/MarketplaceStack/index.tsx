import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import NavigatorHeader from '#navigation/components/NavigatorHeader';
import { useDashboardHeader } from '#navigation/Dashboard/lib/dashboardHeaderFactory';

import MarketplaceListingTabs from './ListingTabs';

export type MarketplaceRoutes = {
  MarketplaceRoot: undefined;
  MarketplaceFilters: undefined;
};

export type MarketplaceRoutePaths = keyof MarketplaceRoutes;

export type MarketplaceRouteProps<Path extends MarketplaceRoutePaths> = NativeStackScreenProps<
  MarketplaceRoutes,
  Path
>;

export const NAVIGATOR_HEADERS: Record<MarketplaceRoutePaths, TranslationPaths> = {
  MarketplaceRoot: 'navigation.dashboard.Marketplace',
  MarketplaceFilters: 'navigation.dashboard.MarketplaceFilters',
};

type ScreenOptions = (props: {
  route: RouteProp<MarketplaceRoutes, MarketplaceRoutePaths>;
  navigation: NativeStackNavigationProp<MarketplaceRoutes, MarketplaceRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<MarketplaceRoutes>();

export default function MarketplaceStack() {
  const { t } = useTranslationUtils();
  const dashboardHeaderFactory = useDashboardHeader();

  const screenOptions: ScreenOptions = useCallback(
    (props) => ({
      ...props,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          // eslint-disable-next-line react/prop-types
          routeTitle={t(NAVIGATOR_HEADERS[props.route.name])}
          {...dashboardHeaderFactory()}
        />
      ),
    }),
    []
  );

  return (
    <Stack.Navigator initialRouteName="MarketplaceRoot" screenOptions={screenOptions}>
      <Stack.Screen name="MarketplaceRoot" component={MarketplaceListingTabs} />
    </Stack.Navigator>
  );
}
