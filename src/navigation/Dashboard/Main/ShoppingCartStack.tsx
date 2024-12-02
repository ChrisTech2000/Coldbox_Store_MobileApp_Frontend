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

const navParams = {
  screen: 'Marketplace',
  params: { screen: 'MarketplaceRoot' },
};

const Stack = createNativeStackNavigator<ShoppingCartStackRoutes>();

export default function ShoppingCartStack() {
  const { t } = useTranslationUtils();
  const dashboardHeaderFactory = useDashboardHeader();

  const screenOptions: ScreenOptions = useCallback(
    (props) => {
      // eslint-disable-next-line react/prop-types
      const routeName = props.route.name;
      return {
        ...props,
        headerShown: routeName !== 'OrderOverview' && routeName !== 'PaystackPayment',
        header: (headerProps) => (
          <NavigatorHeader
            {...headerProps}
            routeTitle={
              routeName === 'IncompleteOrderOverview'
                ? t('navigation.dashboard.OrderDetails', {
                    // eslint-disable-next-line react/prop-types
                    orderCode: `#${props.route?.params?.orderId}`,
                  })
                : t('navigation.dashboard.ShoppingCart')
            }
            // eslint-disable-next-line react/prop-types
            {...dashboardHeaderFactory({
              showShoppingCart: true,
              goBackFunc:
                routeName === 'IncompleteOrderOverview'
                  ? // eslint-disable-next-line react/prop-types
                    () => props.navigation.popToTop()
                  : () => {
                      // eslint-disable-next-line react/prop-types
                      props.navigation.navigate(
                        // eslint-disable-next-line
                        // @ts-ignore
                        'Marketplace',
                        navParams
                      );
                    },
            })}
          />
        ),
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
