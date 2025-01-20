import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import AnalyticsBase from '#screens/Dashboard/Main/Analytics';
import Methodology from '#screens/Dashboard/Main/Analytics/Methodology';

import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import NavigatorHeader, { NavigationHeaderProps } from '#navigation/components/NavigatorHeader';
import { useAuthStore } from '#stores/auth';

import { useDashboardHeader, type DashboardHeaderFactory } from '../lib/dashboardHeaderFactory';

export type AnalyticsStackRoutes = {
  RootAnalytics: undefined;
  Methodology: undefined;
};

export type AnalyticsStackRoutePaths = keyof AnalyticsStackRoutes;

export type AnalyticsStackRouteProps<Path extends AnalyticsStackRoutePaths> =
  NativeStackScreenProps<AnalyticsStackRoutes, Path>;

export const NAVIGATOR_HEADERS: Record<AnalyticsStackRoutePaths, TranslationPaths | undefined> = {
  RootAnalytics: 'navigation.bottomTabs.Analytics',
  Methodology: 'navigation.analytics.methodology',
};

type ScreenOptions = (props: {
  route: RouteProp<AnalyticsStackRoutes, AnalyticsStackRoutePaths>;
  navigation: NativeStackNavigationProp<AnalyticsStackRoutes, AnalyticsStackRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<AnalyticsStackRoutes>();

export default function AnalyticsStack() {
  const { t } = useTranslationUtils();
  const dashboardHeaderFactory = useDashboardHeader();

  const screenOptions: ScreenOptions = useCallback(
    (props) => {
      // eslint-disable-next-line react/prop-types
      const routeName = props.route.name;

      const firstName = useAuthStore.getState().user?.firstName;

      const translationPath = NAVIGATOR_HEADERS[routeName];
      let routeTitle: string | undefined;
      if (routeName === 'RootAnalytics') {
        routeTitle = t('navigation.bottomTabs.RootMainTabStack', { firstName });
      } else {
        routeTitle = translationPath ? t(translationPath) : undefined;
      }

      return {
        ...props,
        header: (headerProps) => (
          <NavigatorHeader
            {...headerProps}
            routeTitle={routeTitle}
            // eslint-disable-next-line react/prop-types
            {..._renderContentFactory(routeName, props.navigation, dashboardHeaderFactory)}
          />
        ),
        gestureDirection: 'vertical',
        animationDuration: 180,
      };
    },
    [dashboardHeaderFactory]
  );

  return (
    <Stack.Navigator initialRouteName="RootAnalytics" screenOptions={screenOptions}>
      <Stack.Screen name="RootAnalytics" component={AnalyticsBase} />
      <Stack.Screen name="Methodology" component={Methodology} />
    </Stack.Navigator>
  );
}

function _renderContentFactory(
  routeName: AnalyticsStackRoutePaths,
  navigation: NativeStackNavigationProp<AnalyticsStackRoutes, AnalyticsStackRoutePaths>,
  dashboardHeaderFactory: DashboardHeaderFactory
): NavigationHeaderProps {
  switch (routeName) {
    case 'Methodology':
      return {
        leftContent: <Appbar.BackAction onPress={navigation.goBack} size={22} />,
      };
    default:
      return dashboardHeaderFactory();
  }
}
