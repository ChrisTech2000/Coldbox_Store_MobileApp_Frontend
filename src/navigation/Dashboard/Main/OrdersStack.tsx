import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import OrdersRoot from '#screens/Dashboard/Main/Orders';
import OrdersDetails from '#screens/Dashboard/Main/Orders/OrdersDetails';
import PaystackPayment from '#screens/Dashboard/Main/ShoppingCart/PaystackPayment';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import NavigatorHeader, {
  type NavigationHeaderProps,
} from '#navigation/components/NavigatorHeader';
import { useDashboardHeader } from '#navigation/Dashboard/lib/dashboardHeaderFactory';

export type OrdersRoutes = {
  OrdersRoot: undefined;
  OrdersDetails: {
    orderId: number;
  };
  PaystackPayment: { url: string; orderId: number };
};

export type OrdersRoutePaths = keyof OrdersRoutes;

export type OrdersRouteProps<Path extends OrdersRoutePaths> = NativeStackScreenProps<
  OrdersRoutes,
  Path
>;

export const NAVIGATOR_HEADERS: Record<OrdersRoutePaths, TranslationPaths | undefined> = {
  OrdersRoot: 'navigation.dashboard.MyOrders',
  OrdersDetails: 'navigation.dashboard.OrderDetails',
  PaystackPayment: undefined,
};

type ScreenOptions = (props: {
  route: RouteProp<OrdersRoutes, OrdersRoutePaths>;
  navigation: NativeStackNavigationProp<OrdersRoutes, OrdersRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<OrdersRoutes>();

export default function OrdersStack() {
  const { t } = useTranslationUtils();
  const dashboardHeaderFactory = useDashboardHeader();

  const screenOptions: ScreenOptions = useCallback(
    (props) => {
      // eslint-disable-next-line react/prop-types
      const routeName = props.route.name;
      return {
        ...props,
        header: () => {
          const baseProps: NavigationHeaderProps = {
            routeTitle: routeName ? t(NAVIGATOR_HEADERS[routeName] as TranslationPaths, {
              // eslint-disable-next-line react/prop-types
              orderCode: `#${props.route.params?.orderId}`,
            }) : undefined,
          };
          if (routeName === 'OrdersRoot') {
            const { leftContent, rightContent } = dashboardHeaderFactory();
            baseProps.leftContent = leftContent;
            baseProps.rightContent = rightContent;
          } else {
            baseProps.leftContent = (
              // eslint-disable-next-line react/prop-types
              <Appbar.BackAction size={26} onPress={props.navigation.goBack} />
            );
          }

          return <NavigatorHeader {...baseProps} />;
        },
      };
    },
    [dashboardHeaderFactory]
  );

  return (
    <Stack.Navigator initialRouteName="OrdersRoot" screenOptions={screenOptions}>
      <Stack.Screen name="OrdersRoot" component={OrdersRoot} />
      <Stack.Screen name="OrdersDetails" component={OrdersDetails} />
      <Stack.Screen name="PaystackPayment" component={PaystackPayment} />
    </Stack.Navigator>
  );
}
