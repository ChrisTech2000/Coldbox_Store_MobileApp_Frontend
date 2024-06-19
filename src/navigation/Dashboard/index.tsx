import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DashboardMain from '#screens/Dashboard/Main';
import AccountDetails from '#screens/Dashboard/AccountDetails';
import KnowledgeHub from '#screens/Dashboard/KnowledgeHub';
import Tutorial from '#screens/Dashboard/Tutorial';
import About from '#screens/Dashboard/About';
import FAQ from '#screens/Dashboard/FAQ';

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
      <Drawer.Screen name="KnowledgeHub" component={KnowledgeHub} />
      <Drawer.Screen name="Tutorial" component={Tutorial} />
      <Drawer.Screen name="FAQ" component={FAQ} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}
