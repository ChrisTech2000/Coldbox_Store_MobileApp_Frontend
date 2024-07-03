import React, { useCallback } from 'react';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackNavigationOptions,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

import DashboardMain from '#screens/Dashboard/Main/Dashboard';
import ProduceDetails from '#screens/Dashboard/Main/Dashboard/ProduceDetails';
import { DashboardProduce } from '#types/global';

import type { TranslationPaths } from '#i18n/index';
import { useAuthStore } from '#stores/auth';
import { useTranslationUtils } from '#i18n/utils';

import NavigatorHeader, { type NavigationHeaderProps } from '../../components/NavigatorHeader';
import { dashboardHeaderFactory } from '../lib/dashboardHeaderFactory';

export type MainTabStackRoutes = {
  RootMainTabStack: undefined;
  ProduceDetails: { produce: DashboardProduce };
};

export type MainTabStackRoutePaths = keyof MainTabStackRoutes;
export type MainTabStackRouteProps<Path extends MainTabStackRoutePaths> = NativeStackScreenProps<
  MainTabStackRoutes,
  Path
>;

type ScreenOptions = (props: {
  route: RouteProp<MainTabStackRoutes, MainTabStackRoutePaths>;
  navigation: NativeStackNavigationProp<MainTabStackRoutes, MainTabStackRoutePaths>;
}) => NativeStackNavigationOptions;

const NAVIGATOR_HEADERS: Record<MainTabStackRoutePaths, TranslationPaths | undefined> = {
  RootMainTabStack: 'navigation.bottomTabs.RootMainTabStack',
  ProduceDetails: 'navigation.bottomTabs.ProduceDetails',
};

const Stack = createNativeStackNavigator<MainTabStackRoutes>();

export default function MainTabStack() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;
    // eslint-disable-next-line react/prop-types
    const produce = props.route.params?.produce;
    const firstName = useAuthStore.getState().user?.firstName;

    const translationPath = NAVIGATOR_HEADERS[routeName];
    const datums = produce ? { produceCode: produce.movementCode } : { firstName };
    const routeTitle = translationPath ? t(translationPath, datums) : undefined;

    return {
      ...props,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={routeTitle}
          // eslint-disable-next-line react/prop-types
          {..._renderContentFactory(routeName, props.navigation)}
        />
      ),
      gestureDirection: 'vertical',
      animationDuration: 180,
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="RootMainTabStack" screenOptions={screenOptions}>
      <Stack.Screen name="RootMainTabStack" component={DashboardMain} />
      <Stack.Screen name="ProduceDetails" component={ProduceDetails} />
    </Stack.Navigator>
  );
}

function _renderContentFactory(
  routeName: MainTabStackRoutePaths,
  navigation: NativeStackNavigationProp<MainTabStackRoutes, MainTabStackRoutePaths>
): NavigationHeaderProps {
  switch (routeName) {
    case 'ProduceDetails':
      return {
        leftContent: <Appbar.BackAction onPress={navigation.goBack} size={22} />,
      };
    default:
      return dashboardHeaderFactory(navigation);
  }
}
