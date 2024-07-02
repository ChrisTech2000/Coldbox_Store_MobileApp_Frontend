import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { styled } from 'nativewind';
import React from 'react';
import { View } from 'react-native';
import { Drawer } from 'react-native-paper';

import ColdtivateLogo from '#assets/images/coldtivate_logo.svg';
import { useAuthStore } from '#stores/auth';
import RBAC from '#common/RBAC';

import type { DashboardRoutes } from '../index';

const StyledDrawerContentScrollView = styled(DrawerContentScrollView);

type RoutePaths = Exclude<keyof DashboardRoutes, 'Main'>;

const DRAWER_ITEMS: Record<
  RoutePaths,
  { iconName: string; title: string; permissionSubject?: string }
> = {
  AccountDetails: { title: 'Account Details', iconName: 'account-settings-outline' },
  Management: {
    title: 'Management',
    iconName: 'account-supervisor-outline',
    permissionSubject: 'ManagementStack',
  },
  KnowledgeHub: { title: 'Knowledge Hub', iconName: 'information-outline' },
  Tutorial: { title: 'Tutorial', iconName: 'card-multiple-outline' },
  FAQ: { title: 'FAQ', iconName: 'chat-question-outline' },
  About: { title: 'About', iconName: 'information-outline' },
};

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { routeNames, index } = props.state;
  const focusedRoute = routeNames[index];

  return (
    <StyledDrawerContentScrollView {...props} tw="flex-1">
      <View tw="mx-2.5 mb-4">
        <ColdtivateLogo width={60} height={60} />
      </View>

      <Drawer.Section tw="space-y-1.5">
        {Object.entries(DRAWER_ITEMS).map(([routeName, datums], routeIdx) => (
          <RBAC.ProtectedResource
            key={`${routeName}-#${routeIdx}`}
            action="NAVIGATE"
            subject={datums.permissionSubject ?? routeName}
          >
            <Drawer.Item
              label={datums.title}
              active={focusedRoute === routeName}
              onPress={(evt) => {
                evt.stopPropagation();
                props.navigation.navigate(routeName);
              }}
              icon={datums.iconName}
            />
          </RBAC.ProtectedResource>
        ))}
      </Drawer.Section>

      <Drawer.Item
        label="Log-out"
        onPress={() => useAuthStore.getState().revokeSession()}
        icon="logout-variant"
      />
    </StyledDrawerContentScrollView>
  );
}
