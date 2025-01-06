/* eslint-disable react/prop-types */
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
import OrderOverview from '#screens/Dashboard/Main/ShoppingCart/OrderOverview';
import PaystackPayment from '#screens/Dashboard/Main/ShoppingCart/PaystackPayment';
import OrdersDetails from '#screens/Dashboard/Main/Orders/OrdersDetails';

import { useDashboardHeader } from '../lib/dashboardHeaderFactory';

import NavigatorHeader from '#navigation/components/NavigatorHeader';
import { useTranslationUtils } from '#i18n/utils';

export type ShoppingCartStackRoutes = {
  Root: undefined;
  OrderDetails: undefined;
  OrderOverview: { orderId: number };
  PaystackPayment: { url: string; orderId: number; coolingUnitIds: number[] };
  IncompleteOrderOverview: { orderId: number };
};

export type ShoppingCartStackRoutePaths = keyof ShoppingCartStackRoutes;

export type ShoppingCartStackRouteProps<Path extends ShoppingCartStackRoutePaths> =
  NativeStackScreenProps<ShoppingCartStackRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<ShoppingCartStackRoutes, ShoppingCartStackRoutePaths>;
  navigation: NativeStackNavigationProp<ShoppingCartStackRoutes, ShoppingCartStackRoutePaths>;
}) => NativeStackNavigationOptions;

const MARKETPLACE_ROOT_REDIRECT = {
  screen: 'Marketplace',
  params: { screen: 'MarketplaceRoot' },
};

const Stack = createNativeStackNavigator<ShoppingCartStackRoutes>();

export default function ShoppingCartStack() {
  const { t } = useTranslationUtils();
  const dashboardHeaderFactory = useDashboardHeader();

  const screenOptions: ScreenOptions = useCallback(
    (props) => {
      const { name: routeName, params } = props.route;
      const { navigation } = props;
      const navigationHandlers: Partial<
        Record<keyof ShoppingCartStackRoutes | 'default', () => void>
      > = {
        IncompleteOrderOverview: navigation.popToTop,
        OrderDetails: navigation.goBack,
        default: () => {
          navigation.navigate(
            // eslint-disable-next-line
            // @ts-ignore
            'Marketplace',
            MARKETPLACE_ROOT_REDIRECT
          );
        },
      };
      return {
        ...props,
        headerShown: !['OrderOverview', 'PaystackPayment'].includes(routeName),
        header: (headerProps) => {
          const isIncompleteOrder = routeName === 'IncompleteOrderOverview';
          const routeTitle = isIncompleteOrder
            ? t('navigation.dashboard.OrderDetails', { orderCode: `#${params?.orderId}` })
            : t('navigation.dashboard.ShoppingCart');
          return (
            <NavigatorHeader
              {...headerProps}
              routeTitle={routeTitle}
              {...dashboardHeaderFactory({
                showShoppingCart: true,
                goBackFunc: navigationHandlers[routeName] || navigationHandlers.default,
              })}
            />
          );
        },
      };
    },
    [dashboardHeaderFactory]
  );

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={ShoppingCart} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="OrderOverview" component={OrderOverview} />
      <Stack.Screen name="PaystackPayment" component={PaystackPayment} />
      <Stack.Screen
        name="IncompleteOrderOverview"
        // eslint-disable-next-line
        // @ts-ignore
        component={OrdersDetails}
      />
    </Stack.Navigator>
  );
}
