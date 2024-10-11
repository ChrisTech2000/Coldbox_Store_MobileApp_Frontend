import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import Coupons from '#screens/Dashboard/AccountDetails/Coupons';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import NavigatorHeader from '#navigation/components/NavigatorHeader';
import { useApiCall } from '#services/hooks/useAPiCall';
import CouponService from '#services/CouponService';

import CouponStatusTabs from './CouponStatusTabs';

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

  const { data } = useApiCall(
    'getCouponList',
    CouponService.getCouponList,
    { revoked: 'included' },
    {
      defaultData: { nodes: [] },
    }
  );

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      {data.nodes.length === 0 ? (
        <Stack.Screen name="Root" component={Coupons} />
      ) : (
        <Stack.Screen name="Root" component={CouponStatusTabs} />
      )}
    </Stack.Navigator>
  );
}
