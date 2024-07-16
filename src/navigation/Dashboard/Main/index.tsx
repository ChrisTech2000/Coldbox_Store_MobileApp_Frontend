import React, { useCallback } from 'react';
import {
  type BottomTabNavigationProp,
  type BottomTabScreenProps,
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, type RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import History from '#screens/Dashboard/Main/History';
import Analytics from '#screens/Dashboard/Main/Analytics';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';

import BottomNavigation from '../components/BottomNavigation';
import NavigatorHeader from '../../components/NavigatorHeader';
import { BOTTOM_NAV_ROUTES_SCOPE, dashboardHeaderFactory } from '../lib/dashboardHeaderFactory';
import MainTabStack from './MainTabStack';
import MarketPriceTabs from './MarketPriceTabs';
import CoolingUnitsTabs from './CoolingUnitsTabs';

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
    const showHeader = focusedRoute !== 'RootMainTabStack' && routeName !== 'Dashboard';
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
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="MarketPrice" component={MarketPriceTabs} />
      <Tab.Screen name="CoolingUnits" component={CoolingUnitsTabs} />
      <Tab.Screen name="Analytics" component={Analytics} />
    </Tab.Navigator>
  );
}
