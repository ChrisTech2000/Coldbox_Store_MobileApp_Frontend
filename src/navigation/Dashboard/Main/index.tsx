import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
  type BottomTabNavigationProp,
  type BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, type RouteProp } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AnalyticsBase from '#screens/Dashboard/Main/Analytics';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';

import NavigatorHeader from '../../components/NavigatorHeader';
import BottomNavigation from '../components/BottomNavigation';
import { BOTTOM_NAV_ROUTES_SCOPE, dashboardHeaderFactory } from '../lib/dashboardHeaderFactory';
import CoolingUnitsTabs from './CoolingUnitsTabs';
import HistoryTabStack from './HistoryTabStack';
import MainTabStack from './MainTabStack';
import MarketPriceTabs from './MarketPriceTabs';

export type DashboardMainRoutes = {
  Dashboard: undefined;
  History: undefined;
  MarketPrice: undefined;
  CoolingUnits: undefined;
  Analytics: undefined;
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
  { tabBarIcon: string; translationPath: TranslationPaths }
> = {
  Dashboard: { tabBarIcon: 'basket-outline', translationPath: 'navigation.bottomTabs.Dashboard' },
  History: { tabBarIcon: 'calendar-outline', translationPath: 'navigation.bottomTabs.History' },
  MarketPrice: {
    tabBarIcon: 'store-outline',
    translationPath: 'navigation.bottomTabs.MarketPrice',
  },
  CoolingUnits: {
    tabBarIcon: 'coolant-temperature',
    translationPath: 'navigation.bottomTabs.CoolingUnits',
  },
  Analytics: { tabBarIcon: 'chart-line', translationPath: 'navigation.bottomTabs.Analytics' },
};

const Tab = createBottomTabNavigator<DashboardMainRoutes>();

export default function DashboardMainBottomTabs() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;

    // eslint-disable-next-line react/prop-types
    const focusedRoute = getFocusedRouteNameFromRoute(props.route);
    const showHeader =
      focusedRoute !== 'RootMainTabStack' &&
      routeName !== 'Dashboard' &&
      focusedRoute !== 'RootHistoryTabStack' &&
      routeName !== 'History';
    // eslint-disable-next-line
    // @ts-ignore
    const showBottomNav = !focusedRoute || BOTTOM_NAV_ROUTES_SCOPE.includes(focusedRoute);

    const translationPath = TAB_METADATA[routeName].translationPath;

    const firstName = useAuthStore.getState().user?.firstName;
    const routeTitle = t('navigation.bottomTabs.RootMainTabStack', { firstName });

    return {
      ...props,
      headerShown: showHeader,
      tabBarStyle: { display: showBottomNav ? 'flex' : 'none' },
      tabBarLabel: t(translationPath),
      tabBarIcon: (iconProps) => <Icon name={TAB_METADATA[routeName].tabBarIcon} {...iconProps} />,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={routeTitle}
          // eslint-disable-next-line react/prop-types
          {...dashboardHeaderFactory(props.navigation)}
        />
      ),
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={screenOptions}
      tabBar={BottomNavigation}
    >
      <Tab.Screen name="Dashboard" component={MainTabStack} />
      <Tab.Screen name="History" component={HistoryTabStack} />
      <Tab.Screen name="MarketPrice" component={MarketPriceTabs} />
      <Tab.Screen name="CoolingUnits" component={CoolingUnitsTabs} />
      <Tab.Screen name="Analytics" component={AnalyticsBase} />
    </Tab.Navigator>
  );
}
