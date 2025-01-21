/* eslint-disable react/prop-types */
import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import MarketplaceFilters from '#screens/Dashboard/Main/Marketplace/MarketplaceFilters';
import type { FormValues } from '#screens/Dashboard/Main/Marketplace/modules/MarketplaceFormManager';
import OrdersDetails from '#screens/Dashboard/Main/Orders/OrdersDetails';
import OrderOverview from '#screens/Dashboard/Main/ShoppingCart/OrderOverview';
import PaystackPayment from '#screens/Dashboard/Main/ShoppingCart/PaystackPayment';

import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';

import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import NavigatorHeader, {
  type NavigationHeaderProps,
} from '#navigation/components/NavigatorHeader';
import { useDashboardHeader } from '#navigation/Dashboard/lib/dashboardHeaderFactory';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import MarketplaceTabs from './MarketplaceTabs';

export type MarketplaceRoutes = {
  MarketplaceRoot: undefined;
  MarketplaceFilters: undefined;
  PaystackPayment: { url: string; orderId: number };
  OrderOverview: { orderId: number };
  IncompleteOrderOverview: { orderId: number };
};

export type MarketplaceRoutePaths = keyof MarketplaceRoutes;

export type MarketplaceRouteProps<Path extends MarketplaceRoutePaths> = NativeStackScreenProps<
  MarketplaceRoutes,
  Path
>;

export const NAVIGATOR_HEADERS: Record<MarketplaceRoutePaths, TranslationPaths | undefined> = {
  MarketplaceRoot: 'navigation.dashboard.Marketplace',
  MarketplaceFilters: 'navigation.dashboard.MarketplaceFilters',
  OrderOverview: 'navigation.dashboard.OrderDetails',
  PaystackPayment: undefined,
  IncompleteOrderOverview: 'navigation.dashboard.OrderDetails',
};

type ScreenOptions = (props: {
  route: RouteProp<MarketplaceRoutes, MarketplaceRoutePaths>;
  navigation: NativeStackNavigationProp<MarketplaceRoutes, MarketplaceRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<MarketplaceRoutes>();

export default function MarketplaceStack() {
  const { t } = useTranslationUtils();
  const dashboardHeaderFactory = useDashboardHeader();

  const screenOptions: ScreenOptions = useCallback(
    (props) => {
      // eslint-disable-next-line react/prop-types
      const routeName = props.route.name;
      const isFiltersScreen = routeName === 'MarketplaceFilters';
      const isOrderIncompleteScreen = routeName === 'IncompleteOrderOverview';

      return {
        ...props,
        headerShown: routeName !== 'PaystackPayment' && routeName !== 'OrderOverview',
        header: () => {
          const baseProps: NavigationHeaderProps = {
            routeTitle:
              routeName === 'PaystackPayment'
                ? ''
                : t(NAVIGATOR_HEADERS[routeName] as TranslationPaths),
          };
          if (!isFiltersScreen && !isOrderIncompleteScreen) {
            const { leftContent, rightContent } = dashboardHeaderFactory({
              showShoppingCart: true,
            });

            baseProps.leftContent = leftContent;
            baseProps.rightContent = rightContent;
          } else {
            if (routeName === 'IncompleteOrderOverview') {
              baseProps.routeTitle = t('navigation.dashboard.OrderDetails', {
                orderCode: `#${props.route?.params?.orderId}`,
              });

              baseProps.leftContent = (
                <Appbar.BackAction
                  size={26}
                  onPress={() => props.navigation.replace('MarketplaceRoot')}
                />
              );
            } else {
              baseProps.leftContent = (
                <Appbar.BackAction size={26} onPress={props.navigation.goBack} />
              );
              baseProps.rightContent = (
                <Touchable
                  tw="flex-row items-center justify-center space-x-2 px-4 py-1.5 mr-2"
                  onPress={(evt) => {
                    evt.stopPropagation();
                    emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_FILTERS_FORM_RESET, {
                      companies: [],
                      coolingUnits: [],
                      crops: [],
                      min: 0,
                      max: 0,
                    } satisfies FormValues<number>);
                  }}
                >
                  <Text variant="TextMedium" tw="text-lg text-green-primary">
                    {t('navigation.auth.PasswordReset')}
                  </Text>
                </Touchable>
              );
            }
          }
          return <NavigatorHeader {...baseProps} />;
        },
      };
    },
    [dashboardHeaderFactory]
  );

  return (
    <Stack.Navigator initialRouteName="MarketplaceRoot" screenOptions={screenOptions}>
      <Stack.Screen name="MarketplaceRoot" component={MarketplaceTabs} />
      <Stack.Screen name="MarketplaceFilters" component={MarketplaceFilters} />
      <Stack.Screen
        name="PaystackPayment"
        // eslint-disable-next-line
        // @ts-ignore
        component={PaystackPayment}
      />
      <Stack.Screen name="OrderOverview" component={OrderOverview} />
      <Stack.Screen
        name="IncompleteOrderOverview"
        // eslint-disable-next-line
        // @ts-ignore
        component={OrdersDetails}
      />
    </Stack.Navigator>
  );
}
