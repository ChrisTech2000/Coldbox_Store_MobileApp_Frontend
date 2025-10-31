import React from 'react';
import type { RouteProp } from '@react-navigation/native';
import type { DrawerNavigationOptions, DrawerNavigationProp } from '@react-navigation/drawer';
import { Appbar } from 'react-native-paper';

import NavigatorHeader from '#navigation/components/NavigatorHeader';
import { LanguageManager, type Translator, type TranslationPaths } from '#i18n/utils';

import type { DashboardRoutes, DashboardRoutePaths } from '../index';
import { goBackWithDrawer } from '#navigation/utils/navigationUtils';

type Props = {
  route: RouteProp<DashboardRoutes, DashboardRoutePaths>;
  navigation: DrawerNavigationProp<DashboardRoutes>;
};

const NAVIGATOR_HEADERS: Record<DashboardRoutePaths, TranslationPaths | undefined> = {
  Main: undefined,
  AccountDetails: undefined,
  Management: undefined,
  KnowledgeHub: undefined,
  Tutorial: 'navigation.dashboard.QuitTutorial',
  FAQ: 'navigation.dashboard.FAQ',
  About: undefined,
};

export default function DashboardScreenOptions(
  props: Props,
  t: Translator
): DrawerNavigationOptions {
  const routeName = props.route.name;
  const translationPath = NAVIGATOR_HEADERS[routeName];
  const routeTitle = translationPath ? t(translationPath) : undefined;
  return {
    ...props,
    headerShown: typeof routeTitle !== 'undefined',
    drawerPosition: LanguageManager.isRTL ? 'right' : 'left',
    header: (headerProps) => (
      <NavigatorHeader
        {...headerProps}
        routeTitle={routeTitle}
        leftContent={
          <Appbar.BackAction
            onPress={() => {
              goBackWithDrawer(props.navigation, true);
            }}
            size={22}
          />
        }
      />
    ),
  };
}
