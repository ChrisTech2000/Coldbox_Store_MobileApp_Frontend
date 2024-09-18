import React, { useCallback } from 'react';
import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationProp,
  type MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import MarketplaceRoot from '#screens/Dashboard/Main/Marketplace';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import MarketplaceListingsHeader from './components/MarketplaceListingsHeader';
import { StyleSheet } from 'react-native';

export type MarketplaceListingTabsRoutes = {
  All: undefined;
  Favorites: undefined;
};

export type MarketplaceListingTabsRoutePaths = keyof MarketplaceListingTabsRoutes;
export type MarketplaceListingTabsRouteProps<Path extends MarketplaceListingTabsRoutePaths> =
  MaterialTopTabNavigationProp<MarketplaceListingTabsRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<MarketplaceListingTabsRoutes, MarketplaceListingTabsRoutePaths>;
  navigation: MaterialTopTabNavigationProp<
    MarketplaceListingTabsRoutes,
    MarketplaceListingTabsRoutePaths
  >;
}) => MaterialTopTabNavigationOptions;

const TAB_HEADERS: Record<
  MarketplaceListingTabsRoutePaths,
  {
    iconName?: string;
    translationPath: TranslationPaths;
  }
> = {
  All: { iconName: undefined, translationPath: 'navigation.dashboard.MarketplaceAllTab' },
  Favorites: {
    iconName: 'star-outline',
    translationPath: 'navigation.dashboard.MarketplaceFavoritesTab',
  },
};

const TopTabs = createMaterialTopTabNavigator<MarketplaceListingTabsRoutes>();

export default function MarketplaceListingTabs() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeMeta = TAB_HEADERS[props.route.name];

    const hasIcon = typeof routeMeta.iconName === 'string';

    return {
      ...props,
      tabBarLabel: t(routeMeta.translationPath),
      tabBarIndicatorStyle: {
        backgroundColor: paperTheme.colors.secondary,
      },
      tabBarStyle: {
        backgroundColor: colors.white,
        elevation: 0,
        shadowOpacity: 0,
        shadowOffset: undefined,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: colors.zinc[400],
      },
      tabBarLabelStyle: {
        ...paperTheme.fonts.labelMedium,
        fontSize: 14,
      },
      tabBarItemStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      tabBarIcon: hasIcon
        ? (iconProps) => <Icon {...iconProps} name={routeMeta.iconName!} size={22} />
        : undefined,
    };
  }, []);

  return (
    <TopTabs.Navigator screenOptions={screenOptions} tabBar={MarketplaceListingsHeader}>
      <TopTabs.Screen name="All" component={MarketplaceRoot} />
      <TopTabs.Screen name="Favorites" component={MarketplaceRoot} />
    </TopTabs.Navigator>
  );
}
