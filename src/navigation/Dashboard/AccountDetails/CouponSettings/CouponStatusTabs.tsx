import React, { useCallback } from 'react';
import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationProp,
  type MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { RouteProp } from '@react-navigation/native';

import Coupons from '#screens/Dashboard/AccountDetails/Coupons';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

export type CouponStatusTabsRoutes = {
  Active: undefined;
  Revoked: undefined;
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

export default function CouponStatusTabs() {
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
      <TopTabs.Screen name="Active" component={Coupons} />
      <TopTabs.Screen name="Revoked" component={Coupons} />
    </TopTabs.Navigator>
  );
}
