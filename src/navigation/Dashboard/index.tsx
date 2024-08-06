import React from 'react';
import { createDrawerNavigator, type DrawerScreenProps } from '@react-navigation/drawer';
import { Drawer } from 'react-native-drawer-layout';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import ms from 'ms';

import AccountDetails from '#screens/Dashboard/AccountDetails';
import FAQ from '#screens/Dashboard/FAQ';
import KnowledgeHub from '#screens/Dashboard/KnowledgeHub';
import Tutorial from '#screens/Dashboard/Tutorial';

import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { ERoles } from '#types/global';
import RBAC from '#common/RBAC';

import DrawerContent from './components/DrawerContent';
import DashboardScreenOptions from './components/ScreenOptions';
import DashboardMainBottomTabs from './Main';
import ManagementStack, { ManagementRoutes } from './Management';
import NotificationsDrawerContent from './components/NotificationsDrawerContent';
import AboutStack from './About';

import { useNotifications } from './lib/notifications';

export type DashboardRoutes = {
  Main: undefined;
  AccountDetails: undefined;
  Management:
    | {
        screen: keyof ManagementRoutes;
      }
    | undefined;
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
  const user = useAuthStore(useShallow((store) => store.user));
  const company = useManagementStore(useShallow((store) => store.company));
  const { t } = useTranslationUtils();

  const { data } = useApiCall(
    'getCompanyById',
    ColdtivateService.getCompanyById,
    company?.id as number,
    {
      skip: user?.role === ERoles.COOLING_USER || !company?.id,
      defaultData: undefined,
    }
  );

  return (
    <NavigationDrawer.Navigator
      initialRouteName="Main"
      drawerContent={(props) => <DrawerContent {...props} t={t} logoURI={data?.logo} />}
      screenOptions={(opts) => DashboardScreenOptions(opts, t)}
    >
      <NavigationDrawer.Screen name="Main" component={DashboardMainBottomTabs} />
      <NavigationDrawer.Screen name="AccountDetails" component={AccountDetails} />
      <NavigationDrawer.Screen name="Management" component={ManagementStack} />
      <NavigationDrawer.Screen name="KnowledgeHub" component={KnowledgeHub} />
      <NavigationDrawer.Screen name="Tutorial" component={Tutorial} />
      <NavigationDrawer.Screen name="FAQ" component={FAQ} />
      <NavigationDrawer.Screen name="About" component={AboutStack} />
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
  const { data } = useNotifications({ refreshInterval: ms('10 seconds') });

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
            <NotificationsDrawerContent notifications={data.notifications} />
          </React.Fragment>
        )}
      >
        <DashboardNavigationRouter />
      </Drawer>
    </RBAC>
  );
}
