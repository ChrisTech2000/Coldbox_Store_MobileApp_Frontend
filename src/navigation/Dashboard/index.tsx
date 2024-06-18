import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AccountDetails from '#screens/Dashboard/AccountDetails';

import DrawerContent from './components/DrawerContent';

export type Routes = {
  Root: undefined;
  AccountDetails: undefined;
  Management: undefined;
  KnowledgeHub: undefined;
  Tutorial: undefined;
  FAQ: undefined;
  About: undefined;
};

const Drawer = createDrawerNavigator<Routes>();

export default function DashboardNavigator() {
  return (
    <Drawer.Navigator initialRouteName="AccountDetails" drawerContent={DrawerContent}>
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
