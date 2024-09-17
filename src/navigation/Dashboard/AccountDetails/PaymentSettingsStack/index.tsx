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
import TransactionDetails from '#screens/Dashboard/AccountDetails/PaymentSettings/TransactionDetails';

import PaymentSettingsTabs from './PaymentSettingsTabs';

export type PaymentSettingsRoutes = {
  Root: undefined;
  AddCard: undefined;
  EditCard: undefined;
  TransactionDetails: undefined;
};

export type PaymentSettingsRoutePaths = keyof PaymentSettingsRoutes;

export type PaymentSettingsRouteProps<Path extends PaymentSettingsRoutePaths> =
  NativeStackScreenProps<PaymentSettingsRoutes, Path>;

export const NAVIGATOR_HEADERS: Record<PaymentSettingsRoutePaths, TranslationPaths> = {
  Root: 'navigation.dashboard.PaymentOptions',
  AddCard: 'navigation.dashboard.AddCard',
  EditCard: 'navigation.dashboard.EditCard',
  TransactionDetails: 'navigation.dashboard.Transaction',
};

type ScreenOptions = (props: {
  route: RouteProp<PaymentSettingsRoutes, PaymentSettingsRoutePaths>;
  navigation: NativeStackNavigationProp<PaymentSettingsRoutes, PaymentSettingsRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<PaymentSettingsRoutes>();

export default function PaymentSettings() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback(
    (props) => ({
      ...props,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          // eslint-disable-next-line react/prop-types
          routeTitle={t(NAVIGATOR_HEADERS[props.route.name])}
          // eslint-disable-next-line react/prop-types
          leftContent={<Appbar.BackAction onPress={props.navigation.goBack} size={22} />}
        />
      ),
    }),
    []
  );

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={PaymentSettingsTabs} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="EditCard" component={EditCard} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetails} />
    </Stack.Navigator>
  );
}
