import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import BillingInfoScreen from '#screens/Dashboard/Main/Dashboard/Checkout/BillingInfo';
import CrateSelectionScreen from '#screens/Dashboard/Main/Dashboard/Checkout/CrateSelection';

import type { CoolingUnit, Crate, Farmer } from '#types/global';

export type CheckOutStackRoutes = {
  CrateSelection: { user?: Farmer; owner?: string; crates?: Crate[]; coolingUnit?: CoolingUnit };
  BillingInfo: { user?: string; crates?: Crate[]; coolingUnit?: CoolingUnit };
};

export type CheckOutStackRoutePaths = keyof CheckOutStackRoutes;

export type CheckOutStackRouteProps<Path extends CheckOutStackRoutePaths> = NativeStackScreenProps<
  CheckOutStackRoutes,
  Path
>;

type ScreenOptions = (props: {
  route: RouteProp<CheckOutStackRoutes, CheckOutStackRoutePaths>;
  navigation: NativeStackNavigationProp<CheckOutStackRoutes, CheckOutStackRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<CheckOutStackRoutes>();

export default function CheckOutStack() {
  const screenOptions: ScreenOptions = useCallback((props) => {
    return {
      ...props,
      header: () => null,
      gestureDirection: 'vertical',
      animationDuration: 180,
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="CrateSelection" screenOptions={screenOptions}>
      <Stack.Screen name="CrateSelection" component={CrateSelectionScreen} />
      <Stack.Screen name="BillingInfo" component={BillingInfoScreen} />
    </Stack.Navigator>
  );
}
