import { createDrawerNavigator, type DrawerScreenProps } from '@react-navigation/drawer';
import ms from 'ms';
import React from 'react';
import { Drawer } from 'react-native-drawer-layout';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import FAQ from '#screens/Dashboard/FAQ';

import RBAC from '#common/RBAC';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { useManagementStore } from '#stores/management';
import { ERoles } from '#types/global';

import AboutStack from './About';
import type { AccountDetailsRoutes } from './AccountDetails';
import AccountDetailsStack from './AccountDetails';
import DrawerContent from './components/DrawerContent';
import NotificationsDrawerContent from './components/NotificationsDrawerContent';
import DashboardScreenOptions from './components/ScreenOptions';
import TemperatureAlert from './components/TemperatureAlert';
import KnowledgeHubStack from './KnowledgeHub';
import { useNotificationOpenSurveyListener, useNotifications } from './lib/notifications';
import DashboardMainBottomTabs from './Main';
import ManagementStack, { type ManagementRoutes } from './Management';

export type DashboardRoutes = {
  Main: undefined;
  AccountDetails: {
    screen: keyof AccountDetailsRoutes;
    params: AccountDetailsRoutes[keyof AccountDetailsRoutes];
  };
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

  useNotificationOpenSurveyListener();

  return (
    <NavigationDrawer.Navigator
      initialRouteName="Main"
      drawerContent={(props) => <DrawerContent {...props} t={t} logoURI={data?.logo} />}
      screenOptions={(opts) => DashboardScreenOptions(opts, t)}
    >
      <NavigationDrawer.Screen name="Main" component={DashboardMainBottomTabs} />
      <NavigationDrawer.Screen name="AccountDetails" component={AccountDetailsStack} />
      <NavigationDrawer.Screen name="Management" component={ManagementStack} />
      <NavigationDrawer.Screen name="KnowledgeHub" component={KnowledgeHubStack} />
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
        swipeEnabled={false}
        renderDrawerContent={() => (
          <React.Fragment>
            <NotificationsDrawerContent notifications={data.notifications} />
          </React.Fragment>
        )}
      >
        <DashboardNavigationRouter />
      </Drawer>

      <RBAC.ProtectedResource action="VIEW" subject="TemperatureAlertModal">
        <TemperatureAlert />
      </RBAC.ProtectedResource>
    </RBAC>
  );
}
