import React from 'react';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import type { DrawerNavigationOptions } from '@react-navigation/drawer';
import { Appbar } from 'react-native-paper';

import NavigatorHeader from '#navigation/components/NavigatorHeader';

import type { DashboardRoutes, DashboardRoutePaths } from '../index';

type Props = {
  route: RouteProp<DashboardRoutes, DashboardRoutePaths>;
  navigation: NavigationProp<Record<string, unknown>>;
};

const NAVIGATOR_HEADER_TITLES: Record<DashboardRoutePaths, string | undefined> = {
  Main: undefined,
  AccountDetails: 'Account details',
  Management: undefined,
  KnowledgeHub: 'Knowledge Hub',
  Tutorial: 'Quit Tutorial',
  FAQ: 'FAQ',
  About: 'About',
};

export default function DashboardScreenOptions(props: Props): DrawerNavigationOptions {
  const routeName = props.route.name;
  const routeTitle = NAVIGATOR_HEADER_TITLES[routeName];
  return {
    ...props,
    headerShown: typeof routeTitle !== 'undefined',
    drawerPosition: 'left',
    header: (headerProps) => (
      <NavigatorHeader
        {...headerProps}
        routeTitle={routeTitle}
        leftContent={<Appbar.BackAction onPress={props.navigation.goBack} size={22} />}
      />
    ),
  };
}
