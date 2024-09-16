import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationOptions,
  type MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import type { RouteProp } from '@react-navigation/native';
import React, { useCallback } from 'react';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import TransactionsStack from './TransactionsStack';
import WalletStack from './WalletStack';

export type PaymentSettingsTabsRoutes = {
  Wallet: undefined;
  Transactions: undefined;
};

export type PaymentSettingsTabsRoutePaths = keyof PaymentSettingsTabsRoutes;
export type PaymentSettingsTabsRouteProps<Path extends PaymentSettingsTabsRoutePaths> =
  MaterialTopTabNavigationProp<PaymentSettingsTabsRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<PaymentSettingsTabsRoutes, PaymentSettingsTabsRoutePaths>;
  navigation: MaterialTopTabNavigationProp<
    PaymentSettingsTabsRoutes,
    PaymentSettingsTabsRoutePaths
  >;
}) => MaterialTopTabNavigationOptions;

const TAB_HEADERS: Record<PaymentSettingsTabsRoutePaths, TranslationPaths> = {
  Wallet: 'navigation.dashboard.Wallet',
  Transactions: 'navigation.dashboard.Transactions',
};

const TopTabs = createMaterialTopTabNavigator<PaymentSettingsTabsRoutes>();

export default function PaymentSettingsTabs() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback(
    (props) => ({
      ...props,
      // eslint-disable-next-line react/prop-types
      tabBarLabel: t(TAB_HEADERS[props.route.name]),
      tabBarIndicatorStyle: {
        backgroundColor: paperTheme.colors.secondary,
      },
      tabBarStyle: {
        backgroundColor: paperTheme.colors.background,
      },
      tabBarLabelStyle: {
        color: paperTheme.colors.secondary,
        ...paperTheme.fonts.labelMedium,
      },
    }),
    []
  );

  return (
    <TopTabs.Navigator screenOptions={screenOptions}>
      <TopTabs.Screen name="Wallet" component={WalletStack} />
      <TopTabs.Screen name="Transactions" component={TransactionsStack} />
    </TopTabs.Navigator>
  );
}
