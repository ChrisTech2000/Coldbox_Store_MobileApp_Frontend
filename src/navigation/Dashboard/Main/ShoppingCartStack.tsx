import React, { useCallback } from 'react';
import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';

import ShoppingCart from '#screens/Dashboard/Main/ShoppingCart';
import OrderDetails from '#screens/Dashboard/Main/ShoppingCart/OrderDetails';

import { useDashboardHeader } from '../lib/dashboardHeaderFactory';

import NavigatorHeader from '#navigation/components/NavigatorHeader';

export type ShoppingCartStackRoutes = {
  Root: undefined;
  OrderDetails: undefined;
};

export type ShoppingCartStackRoutePaths = keyof ShoppingCartStackRoutes;

export type ShoppingCartStackRouteProps<Path extends ShoppingCartStackRoutePaths> =
  NativeStackScreenProps<ShoppingCartStackRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<ShoppingCartStackRoutes, ShoppingCartStackRoutePaths>;
  navigation: NativeStackNavigationProp<ShoppingCartStackRoutes, ShoppingCartStackRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<ShoppingCartStackRoutes>();

export default function ShoppingCartStack() {
  const dashboardHeaderFactory = useDashboardHeader();

  const screenOptions: ScreenOptions = useCallback(
    (props) => ({
      ...props,
      headerShown: true,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle="Shopping cart"
          // eslint-disable-next-line react/prop-types
          {...dashboardHeaderFactory(props.navigation.goBack)}
        />
      ),
    }),
    [dashboardHeaderFactory]
  );

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={ShoppingCart} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
  );
}
