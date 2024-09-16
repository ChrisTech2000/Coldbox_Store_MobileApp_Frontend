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

import AddCard from '#screens/Dashboard/AccountDetails/PaymentSettings/AddCard';
import EditCard from '#screens/Dashboard/AccountDetails/PaymentSettings/EditCard';
import Wallet from '#screens/Dashboard/AccountDetails/PaymentSettings/Wallet';

export type WalletStackRoutes = {
  Root: undefined;
  AddCard: undefined;
  EditCard: undefined;
};

export type WalletStackRoutePaths = keyof WalletStackRoutes;

export type WalletStackRouteProps<Path extends WalletStackRoutePaths> = NativeStackScreenProps<
  WalletStackRoutes,
  Path
>;

export const NAVIGATOR_HEADERS: Record<WalletStackRoutePaths, TranslationPaths | undefined> = {
  Root: undefined,
  AddCard: 'navigation.dashboard.AddCard',
  EditCard: 'navigation.dashboard.EditCard',
};

type ScreenOptions = (props: {
  route: RouteProp<WalletStackRoutes, WalletStackRoutePaths>;
  navigation: NativeStackNavigationProp<WalletStackRoutes, WalletStackRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<WalletStackRoutes>();

export default function WalletStack() {
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
      <Stack.Screen name="Root" component={Wallet} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="EditCard" component={EditCard} />
    </Stack.Navigator>
  );
}
