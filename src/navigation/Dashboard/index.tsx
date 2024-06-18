import React, { useCallback } from 'react';
import {
  createDrawerNavigator,
  type DrawerNavigationProp,
  type DrawerNavigationOptions,
} from '@react-navigation/drawer';
import type { RouteProp } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

import AccountDetails from '#screens/Dashboard/AccountDetails';

import NavigatorHeader from '../components/NavigatorHeader';
import DrawerContent from './components/DrawerContent';

export type DashboardRoutes = {
  Root: undefined;
  AccountDetails: undefined;
  Management: undefined;
  KnowledgeHub: undefined;
  Tutorial: undefined;
  FAQ: undefined;
  About: undefined;
};

type ScreenOptions = (props: {
  route: RouteProp<DashboardRoutes, keyof DashboardRoutes>;
  navigation: DrawerNavigationProp<DashboardRoutes, 'Root', undefined>;
}) => DrawerNavigationOptions;

const NAVIGATOR_HEADER_TITLES: Record<keyof DashboardRoutes, string | undefined> = {
  Root: undefined,
  AccountDetails: 'Account details',
  Management: undefined,
  KnowledgeHub: undefined,
  Tutorial: undefined,
  FAQ: undefined,
  About: undefined,
};

const Drawer = createDrawerNavigator<DashboardRoutes>();

export default function DashboardNavigator() {
  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const focusedRouteName = props.route.name;
    const headerShown = !focusedRouteName || focusedRouteName !== 'Root';
    return {
      ...props,
      headerShown,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={NAVIGATOR_HEADER_TITLES[focusedRouteName]}
          // eslint-disable-next-line react/prop-types
          leftContent={<Appbar.Action icon="menu" onPress={props.navigation.openDrawer} />}
        />
      ),
    };
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="AccountDetails"
      drawerContent={DrawerContent}
      screenOptions={screenOptions}
    >
      {/* <Drawer.Screen name="Root" component={() => <View />} /> */}
      <Drawer.Screen name="AccountDetails" component={AccountDetails} />
      {/* <Drawer.Screen name="Management" component={() => <View />} />
      <Drawer.Screen name="KnowledgeHub" component={() => <View />} />
      <Drawer.Screen name="Tutorial" component={() => <View />} />
      <Drawer.Screen name="FAQ" component={() => <View />} />
      <Drawer.Screen name="About" component={() => <View />} /> */}
    </Drawer.Navigator>
  );
}
