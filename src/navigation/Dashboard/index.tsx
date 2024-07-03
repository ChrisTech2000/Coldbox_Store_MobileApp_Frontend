import React from 'react';
import { createDrawerNavigator, type DrawerScreenProps } from '@react-navigation/drawer';
import { Drawer } from 'react-native-drawer-layout';
import { create } from 'zustand';

import About from '#screens/Dashboard/About';
import AccountDetails from '#screens/Dashboard/AccountDetails';
import FAQ from '#screens/Dashboard/FAQ';
import KnowledgeHub from '#screens/Dashboard/KnowledgeHub';
import Tutorial from '#screens/Dashboard/Tutorial';

import { useTranslationUtils } from '#i18n/utils';
import RBAC from '#common/RBAC';

import DrawerContent from './components/DrawerContent';
import DashboardScreenOptions from './components/ScreenOptions';
import DashboardMainBottomTabs from './Main';
import ManagementStack from './Management';
import NotificationsDrawerContent from './components/NotificationsDrawerContent';

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

const NavigationDrawer = createDrawerNavigator<DashboardRoutes>();

function DashboardNavigationRouter() {
  const { t } = useTranslationUtils();

  return (
    <NavigationDrawer.Navigator
      initialRouteName="Main"
      drawerContent={(props) => <DrawerContent {...props} t={t} />}
      screenOptions={(opts) => DashboardScreenOptions(opts, t)}
    >
      <NavigationDrawer.Screen name="Main" component={DashboardMainBottomTabs} />
      <NavigationDrawer.Screen name="AccountDetails" component={AccountDetails} />
      <NavigationDrawer.Screen name="Management" component={ManagementStack} />
      <NavigationDrawer.Screen name="KnowledgeHub" component={KnowledgeHub} />
      <NavigationDrawer.Screen name="Tutorial" component={Tutorial} />
      <NavigationDrawer.Screen name="FAQ" component={FAQ} />
      <NavigationDrawer.Screen name="About" component={About} />
    </NavigationDrawer.Navigator>
  );
}

export const useRightDrawerStore = create<{
  isOpen: boolean;
  toggle: (value?: boolean) => void;
}>((set) => ({
  isOpen: false,
  toggle: (value) => set((state) => ({ isOpen: value ?? !state.isOpen })),
}));

export default function DashboardNavigator() {
  const isOpen = useRightDrawerStore((store) => store.isOpen);
  const toggle = useRightDrawerStore((store) => store.toggle);

  return (
    <RBAC>
      <Drawer
        open={isOpen}
        onOpen={() => toggle(true)}
        onClose={() => toggle(false)}
        drawerPosition="right"
        renderDrawerContent={() => (
          <React.Fragment>
            <NotificationsDrawerContent />
          </React.Fragment>
        )}
      >
        <DashboardNavigationRouter />
      </Drawer>
    </RBAC>
  );
}
