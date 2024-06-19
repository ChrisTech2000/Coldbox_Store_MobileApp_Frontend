import React from 'react';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import type { DrawerNavigationOptions } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

import NavigatorHeader from '#navigation/components/NavigatorHeader';

import type { DashboardRoutes, DashboardRoutePaths } from '../index';

type Props = {
  route: RouteProp<DashboardRoutes, DashboardRoutePaths>;
  navigation: NavigationProp<Record<string, unknown>>;
};

const NAVIGATOR_HEADER_TITLES: Record<DashboardRoutePaths, string | undefined> = {
  Main: '{{firstName}} Coldtivate',
  AccountDetails: 'Account details',
  Management: undefined,
  KnowledgeHub: undefined,
  Tutorial: undefined,
  FAQ: undefined,
  About: undefined,
};

export default function DashboardScreenOptions(props: Props): DrawerNavigationOptions {
  const focusedRouteName = props.route.name;
  const routeTitle = NAVIGATOR_HEADER_TITLES[focusedRouteName];
  return {
    ...props,
    headerShown: typeof routeTitle !== 'undefined',
    header: (headerProps) => (
      <NavigatorHeader
        {...headerProps}
        routeTitle={routeTitle}
        leftContent={
          <_LeftContentFactory focusedRouteName={focusedRouteName} navigation={props.navigation} />
        }
      />
    ),
  };
}

function _LeftContentFactory(props: {
  focusedRouteName: DashboardRoutePaths;
  navigation: NavigationProp<Record<string, unknown>>;
}) {
  switch (props.focusedRouteName) {
    case 'Main':
      return (
        <Appbar.Action
          icon="menu"
          onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
        />
      );
    default:
      return <Appbar.BackAction onPress={props.navigation.goBack} />;
  }
}
