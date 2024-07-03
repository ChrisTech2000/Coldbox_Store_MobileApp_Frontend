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

const NAVIGATOR_HEADER_TITLES: Record<MainTabStackRoutePaths, string | undefined> = {
  RootMainTabStack: 'Coldtivate',
  ProduceDetails: 'Produce Details',
};

const Stack = createNativeStackNavigator<MainTabStackRoutes>();

export default function MainTabStack() {
  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;
    // eslint-disable-next-line react/prop-types
    const produce = props.route.params?.produce;

    return {
      ...props,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={produce ? produce.movementCode : NAVIGATOR_HEADER_TITLES[routeName]}
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
