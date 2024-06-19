import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AccountDetails from '#screens/Dashboard/AccountDetails';
import DashboardMain from '#screens/Dashboard/Main';

import DrawerContent from './components/DrawerContent';
import DashboardScreenOptions from './components/ScreenOptions';
import ManagementStack from './Management';

export type DashboardRoutes = {
  Main: undefined;
  AccountDetails: undefined;
  Management: undefined;
  KnowledgeHub: undefined;
  Tutorial: undefined;
  FAQ: undefined;
  About: undefined;
};

export type DashboardRoutePaths = keyof DashboardRoutes;

const Drawer = createDrawerNavigator<DashboardRoutes>();

export default function DashboardNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={DrawerContent}
      screenOptions={DashboardScreenOptions}
    >
      <Drawer.Screen name="Main" component={DashboardMain} />
      <Drawer.Screen name="AccountDetails" component={AccountDetails} />
      <Drawer.Screen name="Management" component={ManagementStack} />
      {/* <Drawer.Screen name="KnowledgeHub" component={() => <View />} />
      <Drawer.Screen name="Tutorial" component={() => <View />} />
      <Drawer.Screen name="FAQ" component={() => <View />} />
      <Drawer.Screen name="About" component={() => <View />} /> */}
    </Drawer.Navigator>
  );
}
