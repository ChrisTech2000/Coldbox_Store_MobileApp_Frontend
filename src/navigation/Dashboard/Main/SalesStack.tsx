import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import SalesRoot from '#screens/Dashboard/Main/Sales';
import SalesDetails from '#screens/Dashboard/Main/Sales/SalesDetails';

import type { TranslationPaths } from '#i18n/index';
import { useDashboardHeader } from '#navigation/Dashboard/lib/dashboardHeaderFactory';

export type SalesRoutes = {
  SalesRoot: undefined;
  SalesDetails: {
    orderId: number;
    isTabsView?: boolean;
  };
};

export type SalesRoutePaths = keyof SalesRoutes;

export type SalesRouteProps<Path extends SalesRoutePaths> = NativeStackScreenProps<
  SalesRoutes,
  Path
>;

export const NAVIGATOR_HEADERS: Record<SalesRoutePaths, TranslationPaths | undefined> = {
  SalesRoot: 'navigation.dashboard.MySales',
  SalesDetails: 'navigation.dashboard.OrderDetails',
};

type ScreenOptions = (props: {
  route: RouteProp<SalesRoutes, SalesRoutePaths>;
  navigation: NativeStackNavigationProp<SalesRoutes, SalesRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<SalesRoutes>();

export default function SalesStack() {
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
    <Stack.Navigator initialRouteName="SalesRoot" screenOptions={screenOptions}>
      <Stack.Screen name="SalesRoot" component={SalesRoot} />
      <Stack.Screen name="SalesDetails" component={SalesDetails} />
    </Stack.Navigator>
  );
}
