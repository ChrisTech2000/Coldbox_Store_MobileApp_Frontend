import { createDrawerNavigator, type DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';

import About from '#screens/Dashboard/About';
import AccountDetails from '#screens/Dashboard/AccountDetails';
import FAQ from '#screens/Dashboard/FAQ';
import KnowledgeHub from '#screens/Dashboard/KnowledgeHub';
import Tutorial from '#screens/Dashboard/Tutorial';
import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';

import DrawerContent from './components/DrawerContent';
import DashboardScreenOptions from './components/ScreenOptions';
import DashboardMainBottomTabs from './Main';
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
export type DashboardRouteProps<Path extends DashboardRoutePaths> = DrawerScreenProps<
  DashboardRoutes,
  Path
>;

const Drawer = createDrawerNavigator<DashboardRoutes>();

export default function DashboardNavigator() {
  const { user } = useAuthStore();

  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={DrawerContent}
      screenOptions={DashboardScreenOptions}
    >
      <Drawer.Screen name="Main" component={DashboardMainBottomTabs} />
      <Drawer.Screen name="AccountDetails" component={AccountDetails} />
      {user && user.role !== ERoles.COOLING_USER && (
        <Drawer.Screen name="Management" component={ManagementStack} />
      )}
      <Drawer.Screen name="KnowledgeHub" component={KnowledgeHub} />
      <Drawer.Screen name="Tutorial" component={Tutorial} />
      <Drawer.Screen name="FAQ" component={FAQ} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}
