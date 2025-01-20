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

import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import NavigatorHeader from '#navigation/components/NavigatorHeader';
import { useApiCall } from '#services/hooks/useAPiCall';
import CouponService from '#services/CouponService';
import { ManagementRouteProps } from '#navigation/Dashboard/Management';
import { useManagementStore } from '#stores/management';

import CouponStatusTabs from './CouponStatusTabs';
import { AccountDetailsRouteProps } from '..';

export type CouponsSettingsRoutes = {
  Root: { source: string } | undefined;
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

export default function CouponsSettingsStack(
  props: ManagementRouteProps<'CouponStack'> | AccountDetailsRouteProps<'CouponStack'>
) {
  const { t } = useTranslationUtils();
  const company = useManagementStore((store) => store.company);

  const screenOptions: ScreenOptions = useCallback((props) => {
    return {
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
    };
  }, []);

  const isManagementStack = props.route.params?.source === 'Management';

  const { data: coupons } = useApiCall(
    'getCouponList',
    CouponService.getCouponList,
    {
      revoked: 'included',
    },
    {
      defaultData: { nodes: [] },
      skip: isManagementStack,
    }
  );

  const { data: companyCoupons } = useApiCall(
    'getCompanyCouponList',
    CouponService.getCouponList,
    {
      revoked: 'included',
      ownedOnBehalfOfCompanyId: company?.id as number,
    },
    {
      defaultData: { nodes: [] },
      skip: !isManagementStack,
    }
  );

  const data = isManagementStack ? companyCoupons : coupons;

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      {data.nodes.length === 0 ? (
        <Stack.Screen name="Root" component={Coupons} initialParams={props.route.params} />
      ) : (
        <Stack.Screen name="Root" component={CouponStatusTabs} initialParams={props.route.params} />
      )}
    </Stack.Navigator>
  );
}
