import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import OrdersRoot from '#screens/Dashboard/Main/Orders';
import OrdersDetails from '#screens/Dashboard/Main/Orders/OrdersDetails';

import type { TranslationPaths } from '#i18n/utils';
import { useDashboardHeader } from '#navigation/Dashboard/lib/dashboardHeaderFactory';

export type OrdersRoutes = {
  OrdersRoot: undefined;
  OrdersDetails: {
    orderId: number;
    isTabsView?: boolean;
  };
};

export type OrdersRoutePaths = keyof OrdersRoutes;

export type OrdersRouteProps<Path extends OrdersRoutePaths> = NativeStackScreenProps<
  OrdersRoutes,
  Path
>;

export const NAVIGATOR_HEADERS: Record<OrdersRoutePaths, TranslationPaths | undefined> = {
  OrdersRoot: 'navigation.dashboard.MyOrders',
  OrdersDetails: 'navigation.dashboard.OrderDetails',
};

type ScreenOptions = (props: {
  route: RouteProp<OrdersRoutes, OrdersRoutePaths>;
  navigation: NativeStackNavigationProp<OrdersRoutes, OrdersRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<OrdersRoutes>();

export default function OrdersStack() {
  const dashboardHeaderFactory = useDashboardHeader();

  const screenOptions: ScreenOptions = useCallback(
    (props) => {
      return {
        ...props,
        headerShown: false,
      };
    },
    [dashboardHeaderFactory]
  );

  return (
    <Stack.Navigator initialRouteName="OrdersRoot" screenOptions={screenOptions}>
      <Stack.Screen name="OrdersRoot" component={OrdersRoot} />
      <Stack.Screen name="OrdersDetails" component={OrdersDetails} />
    </Stack.Navigator>
  );
}
