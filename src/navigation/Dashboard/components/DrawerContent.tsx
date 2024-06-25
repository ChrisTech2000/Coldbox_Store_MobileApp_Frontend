import React from 'react';
import { View } from 'react-native';
import {
  DrawerContentScrollView,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { styled } from 'nativewind';
import { Drawer } from 'react-native-paper';

import ColdtivateLogo from '#assets/images/coldtivate_logo.svg';

import type { DashboardRoutes } from '../index';
import { useAuthStore } from '#stores/auth';

const StyledDrawerContentScrollView = styled(DrawerContentScrollView);

type RoutePaths = Exclude<keyof DashboardRoutes, 'Main'>;

const DRAWER_ITEM_TITLE: Record<RoutePaths, { iconName: string; title: string }> = {
  AccountDetails: { title: 'Account Details', iconName: 'account-settings-outline' },
  Management: { title: 'Management', iconName: 'account-supervisor-outline' },
  KnowledgeHub: { title: 'Knowledge Hub', iconName: 'information-outline' },
  Tutorial: { title: 'Tutorial', iconName: 'card-multiple-outline' },
  FAQ: { title: 'FAQ', iconName: 'chat-question-outline' },
  About: { title: 'About', iconName: 'information-outline' },
};

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { routeNames, index } = props.state;
  const focusedRoute = routeNames[index];

  const revokeSession = useAuthStore((store) => store.revokeSession);

  return (
    <StyledDrawerContentScrollView {...props} tw="flex-1">
      <View tw="mx-2.5 mb-4">
        <ColdtivateLogo width={60} height={60} />
      </View>

      <Drawer.Section tw="space-y-1.5">
        {Object.entries(DRAWER_ITEM_TITLE).map(([routeName, datums], routeIdx) => (
          <Drawer.Item
            key={`${routeName}-#${routeIdx}`}
            label={datums.title}
            active={focusedRoute === routeName}
            onPress={(evt) => {
              evt.stopPropagation();
              props.navigation.navigate(routeName);
            }}
            icon={datums.iconName}
          />
        ))}
      </Drawer.Section>

      <Drawer.Item label="Log-out" onPress={revokeSession} icon="logout-variant" />
    </StyledDrawerContentScrollView>
  );
}
