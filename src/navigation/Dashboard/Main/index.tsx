import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
  type BottomTabNavigationProp,
  type BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  type NavigatorScreenParams,
  type RouteProp,
} from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useShallow } from 'zustand/react/shallow';

import RBAC from '#common/RBAC';
import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';

import NavigatorHeader from '../../components/NavigatorHeader';
import BottomNavigation from '../components/BottomNavigation';
import { BOTTOM_NAV_ROUTES_SCOPE, useDashboardHeader } from '../lib/dashboardHeaderFactory';
import CoolingUnitsTabs, { CoolingUnitsTabsRoutes } from './CoolingUnitsTabs';
import HistoryTabStack, { HistoryTabStackRoutes } from './HistoryTabStack';
import MainTabStack, { MainTabStackRoutes } from './MainTabStack';
import MarketPriceTabs from './MarketPriceTabs';
import AnalyticsStack from './AnalyticsStack';
import ShoppingCartStack, { type ShoppingCartStackRoutes } from './ShoppingCartStack';
import MarketplaceStack, { MarketplaceRoutes } from './Marketplace/MarketplaceStack';

export type DashboardMainRoutes = {
  Dashboard: NavigatorScreenParams<MainTabStackRoutes> | undefined;
  History:
    | {
        screen?: keyof HistoryTabStackRoutes;
        params?: HistoryTabStackRoutes['MarketSurveyStack'] | HistoryTabStackRoutes['EditCheckIn'];
      }
    | undefined;
  MarketPrice: undefined;
  CoolingUnits:
    | {
        screen?: keyof CoolingUnitsTabsRoutes;
      }
    | undefined;
  Analytics: undefined;
  ShoppingCart: {
    screen: keyof ShoppingCartStackRoutes;
    params?: ShoppingCartStackRoutes | ShoppingCartStackRoutes;
  };
  Marketplace:
    | {
        screen: keyof MarketplaceRoutes;
      }
    | undefined;
};

export type DashboardMainRoutePaths = keyof DashboardMainRoutes;
export type DashboardMainRouteProps<Path extends DashboardMainRoutePaths> = BottomTabScreenProps<
  DashboardMainRoutes,
  Path
>;

type ScreenOptions = (props: {
  route: RouteProp<DashboardMainRoutes, DashboardMainRoutePaths>;
  navigation: BottomTabNavigationProp<DashboardMainRoutes, 'Dashboard', undefined>;
}) => BottomTabNavigationOptions;

const TAB_METADATA: Record<
  DashboardMainRoutePaths,
  { tabBarIcon: string; translationPath: TranslationPaths } | undefined
> = {
  Dashboard: { tabBarIcon: 'basket-outline', translationPath: 'navigation.bottomTabs.Dashboard' },
  History: { tabBarIcon: 'calendar-outline', translationPath: 'navigation.bottomTabs.History' },
  MarketPrice: {
    tabBarIcon: 'tag-outline',
    translationPath: 'navigation.bottomTabs.MarketPrice',
  },
  CoolingUnits: {
    tabBarIcon: 'coolant-temperature',
    translationPath: 'navigation.bottomTabs.CoolingUnits',
  },
  Analytics: { tabBarIcon: 'chart-line', translationPath: 'navigation.bottomTabs.Analytics' },
  ShoppingCart: undefined,
  Marketplace: { tabBarIcon: 'store-outline', translationPath: 'navigation.dashboard.Marketplace' },
};

const Tab = createBottomTabNavigator<DashboardMainRoutes>();

export default function DashboardMainBottomTabs() {
  const { guard } = RBAC.useRBAC();

  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();
  const dashboardHeaderFactory = useDashboardHeader();

  const screenOptions: ScreenOptions = useCallback(
    (props) => {
      // eslint-disable-next-line react/prop-types
      const routeName = props.route.name;

      // eslint-disable-next-line react/prop-types
      const focusedRoute = getFocusedRouteNameFromRoute(props.route);
      const showHeader =
        focusedRoute !== 'RootMainTabStack' &&
        routeName !== 'Dashboard' &&
        focusedRoute !== 'RootHistoryTabStack' &&
        routeName !== 'History' &&
        focusedRoute !== 'Analytics' &&
        routeName !== 'Analytics' &&
        routeName !== 'ShoppingCart' &&
        routeName !== 'Marketplace';

      // eslint-disable-next-line
      // @ts-ignore
      const showBottomNav = !focusedRoute || BOTTOM_NAV_ROUTES_SCOPE.includes(focusedRoute);
      const translationPath = TAB_METADATA[routeName]?.translationPath;
      const tabBarIconName = TAB_METADATA[routeName]?.tabBarIcon;

      return {
        ...props,
        headerShown: showHeader,
        tabBarStyle: { display: showBottomNav ? 'flex' : 'none' },
        tabBarLabel: typeof translationPath === 'string' ? t(translationPath) : undefined,
        tabBarIcon:
          typeof tabBarIconName === 'string'
            ? (iconProps) => <Icon name={tabBarIconName} {...iconProps} />
            : undefined,
        header: (headerProps) => (
          <NavigatorHeader
            {...headerProps}
            routeTitle={t('navigation.bottomTabs.RootMainTabStack', {
              firstName: user?.firstName ?? '',
            })}
            {...dashboardHeaderFactory()}
          />
        ),
      };
    },
    [user?.firstName, dashboardHeaderFactory]
  );

  const navToMarketplace = guard('VIEW', 'MarketplaceListing');
  const navToShoppingCart = guard('NAVIGATE', 'MarketplaceShoppingCart');

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={screenOptions}
      tabBar={BottomNavigation}
    >
      <Tab.Screen name="Dashboard" component={MainTabStack} />
      <Tab.Screen name="Analytics" component={AnalyticsStack} />
      {navToMarketplace ? <Tab.Screen name="Marketplace" component={MarketplaceStack} /> : null}
      <Tab.Screen name="History" component={HistoryTabStack} />
      <Tab.Screen name="MarketPrice" component={MarketPriceTabs} />
      <Tab.Screen name="CoolingUnits" component={CoolingUnitsTabs} />
      {navToShoppingCart ? <Tab.Screen name="ShoppingCart" component={ShoppingCartStack} /> : null}
    </Tab.Navigator>
  );
}
