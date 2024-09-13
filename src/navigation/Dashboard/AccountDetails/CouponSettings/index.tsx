import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import Coupons from '#screens/Dashboard/AccountDetails/Coupons';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import NavigatorHeader from '#navigation/components/NavigatorHeader';

import CouponStatusTabs from './CouponStatusTabs';
import { useCouponStore } from '#screens/Dashboard/AccountDetails/Coupons/store';

export type CouponsSettingsRoutes = {
  Root: undefined;
};

export type CouponsSettingsRoutePaths = keyof CouponsSettingsRoutes;

export type CouponsSettingsRouteProps<Path extends CouponsSettingsRoutePaths> =
  NativeStackScreenProps<CouponsSettingsRoutes, Path>;

export const NAVIGATOR_HEADERS: Record<CouponsSettingsRoutePaths, TranslationPaths> = {
  Root: 'navigation.dashboard.Coupons',
};

type ScreenOptions = (props: {
  route: RouteProp<CouponsSettingsRoutes, CouponsSettingsRoutePaths>;
  navigation: NativeStackNavigationProp<CouponsSettingsRoutes, CouponsSettingsRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<CouponsSettingsRoutes>();

export default function CouponsSettingsStack() {
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

  // TODO → replace this with SWR hook
  const couponsLength = useCouponStore(useShallow((store) => store.coupons)).length;

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      {couponsLength === 0 ? (
        <Stack.Screen name="Root" component={Coupons} />
      ) : (
        <Stack.Screen name="Root" component={CouponStatusTabs} />
      )}
    </Stack.Navigator>
  );
}
