import React from 'react';
import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { styled } from 'nativewind';
import { Drawer } from 'react-native-paper';

import ColdtivateLogo from '#assets/images/coldtivate_logo.svg';

import type { Routes } from '../index';
import { View } from 'react-native';

const StyledDrawerContentScrollView = styled(DrawerContentScrollView);

type RoutePaths = Exclude<keyof Routes, 'Root'>;

const DRAWER_ROUTES: Array<RoutePaths> = [
  'AccountDetails',
  'Management',
  'KnowledgeHub',
  'Tutorial',
  'FAQ',
  'About',
];

const DRAWER_ITEM_TITLE: Record<RoutePaths, string> = {
  AccountDetails: 'Account Details',
  Management: 'Management',
  KnowledgeHub: 'Knowledge Hub',
  Tutorial: 'Tutorial',
  FAQ: 'FAQ',
  About: 'About',
};

export default function DrawerContent(props: DrawerContentComponentProps) {
  // TODO: improve this
  const { routeNames, index } = props.state;
  const focusedRoute = routeNames[index];

  return (
    <StyledDrawerContentScrollView {...props} tw="flex-1">
      <View tw="mx-2.5 mb-4">
        <ColdtivateLogo width={60} height={60} />
      </View>

      <View tw="space-y-2">
        {DRAWER_ROUTES.map((routePath, routeIdx) => (
          <Drawer.Item
            key={`${routePath}-#${routeIdx}`}
            label={DRAWER_ITEM_TITLE[routePath]}
            active={focusedRoute === routePath}
            onPress={(evt) => {
              evt.stopPropagation();
              props.navigation.navigate(routePath);
            }}
            icon="camera"
          />
        ))}
      </View>
    </StyledDrawerContentScrollView>
  );
}
