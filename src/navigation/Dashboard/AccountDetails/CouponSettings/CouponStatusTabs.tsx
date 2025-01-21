import React, { useCallback } from 'react';
import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationProp,
  type MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { RouteProp } from '@react-navigation/native';

import ActiveCouponsTab from '#screens/Dashboard/AccountDetails/Coupons/ActiveCouponsTab';
import RevokedCouponsTab from '#screens/Dashboard/AccountDetails/Coupons/RevokedCouponsTab';

import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';
import { CouponsSettingsRouteProps } from '.';

export type CouponStatusTabsRoutes = {
  Active: { source: string } | undefined;
  Revoked: { source: string } | undefined;
};

export type CouponStatusTabsRoutePaths = keyof CouponStatusTabsRoutes;
export type CouponStatusTabsRouteProps<Path extends CouponStatusTabsRoutePaths> =
  MaterialTopTabNavigationProp<CouponStatusTabsRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<CouponStatusTabsRoutes, CouponStatusTabsRoutePaths>;
  navigation: MaterialTopTabNavigationProp<CouponStatusTabsRoutes, CouponStatusTabsRoutePaths>;
}) => MaterialTopTabNavigationOptions;

const TAB_HEADERS: Record<CouponStatusTabsRoutePaths, TranslationPaths> = {
  Active: 'navigation.dashboard.CouponsActiveTab',
  Revoked: 'navigation.dashboard.CouponsRevokedTab',
};

const TopTabs = createMaterialTopTabNavigator<CouponStatusTabsRoutes>();

export default function CouponStatusTabs(props: CouponsSettingsRouteProps<'Root'>) {
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
      <TopTabs.Screen
        name="Active"
        // eslint-disable-next-line
        // @ts-ignore
        component={ActiveCouponsTab}
        initialParams={props.route.params}
      />
      <TopTabs.Screen
        name="Revoked"
        // eslint-disable-next-line
        // @ts-ignore
        component={RevokedCouponsTab}
        initialParams={props.route.params}
      />
    </TopTabs.Navigator>
  );
}
