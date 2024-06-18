import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AccountDetails from '#screens/Dashboard/AccountDetails';
import DashboardRoot from '#screens/Dashboard/Root';

import DrawerContent from './components/DrawerContent';
import DashboardScreenOptions from './components/ScreenOptions';

export type DashboardRoutes = {
  Root: undefined;
  AccountDetails: undefined;
  Management: undefined;
  KnowledgeHub: undefined;
  Tutorial: undefined;
  FAQ: undefined;
  About: undefined;
};

const Drawer = createDrawerNavigator<DashboardRoutes>();

export default function DashboardNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Root"
      drawerContent={DrawerContent}
      screenOptions={DashboardScreenOptions}
    >
      <Drawer.Screen name="Root" component={DashboardRoot} />
      <Drawer.Screen name="AccountDetails" component={AccountDetails} />
      {/* <Drawer.Screen name="Management" component={() => <View />} />
      <Drawer.Screen name="KnowledgeHub" component={() => <View />} />
      <Drawer.Screen name="Tutorial" component={() => <View />} />
      <Drawer.Screen name="FAQ" component={() => <View />} />
      <Drawer.Screen name="About" component={() => <View />} /> */}
    </Drawer.Navigator>
  );
}
