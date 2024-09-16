import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import NavigatorHeader from '#navigation/components/NavigatorHeader';

import Transactions from '#screens/Dashboard/AccountDetails/PaymentSettings/Transactions';
import TransactionDetails from '#screens/Dashboard/AccountDetails/PaymentSettings/TransactionDetails';

export type TransactionsStackRoutes = {
  Root: undefined;
  TransactionDetails: undefined;
};

export type TransactionsStackRoutePaths = keyof TransactionsStackRoutes;

export type TransactionsStackRouteProps<Path extends TransactionsStackRoutePaths> =
  NativeStackScreenProps<TransactionsStackRoutes, Path>;

export const NAVIGATOR_HEADERS: Record<TransactionsStackRoutePaths, TranslationPaths | undefined> =
  {
    Root: undefined,
    TransactionDetails: 'navigation.dashboard.Transaction',
  };

type ScreenOptions = (props: {
  route: RouteProp<TransactionsStackRoutes, TransactionsStackRoutePaths>;
  navigation: NativeStackNavigationProp<TransactionsStackRoutes, TransactionsStackRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<TransactionsStackRoutes>();

export default function TransactionsStack() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const translationPath = NAVIGATOR_HEADERS[props.route.name];

    return {
      ...props,
      headerShown: !!translationPath,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={t(translationPath!)}
          // eslint-disable-next-line react/prop-types
          leftContent={<Appbar.BackAction onPress={props.navigation.goBack} size={22} />}
        />
      ),
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={Transactions} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
    </Stack.Navigator>
  );
}
