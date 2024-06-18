import React from 'react';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import type { DrawerNavigationOptions } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

import NavigatorHeader from '#navigation/components/NavigatorHeader';

import type { DashboardRoutes } from '../index';

type Props = {
  route: RouteProp<DashboardRoutes, keyof DashboardRoutes>;
  navigation: NavigationProp<Record<string, unknown>>;
};

const NAVIGATOR_HEADER_TITLES: Record<keyof DashboardRoutes, string | undefined> = {
  Root: '{{firstName}} Coldtivate',
  AccountDetails: 'Account details',
  Management: undefined,
  KnowledgeHub: undefined,
  Tutorial: undefined,
  FAQ: undefined,
  About: undefined,
};

export default function DashboardScreenOptions(props: Props): DrawerNavigationOptions {
  const focusedRouteName = props.route.name;
  return {
    ...props,
    header: (headerProps) => (
      <NavigatorHeader
        {...headerProps}
        routeTitle={NAVIGATOR_HEADER_TITLES[focusedRouteName]}
        leftContent={
          <_LeftContentFactory focusedRouteName={focusedRouteName} navigation={props.navigation} />
        }
      />
    ),
  };
}

function _LeftContentFactory(props: {
  focusedRouteName: keyof DashboardRoutes;
  navigation: NavigationProp<Record<string, unknown>>;
}) {
  switch (props.focusedRouteName) {
    case 'Root':
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
