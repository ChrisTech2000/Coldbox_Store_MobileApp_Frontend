import React, { useCallback } from 'react';
import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationProp,
  type MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { RouteProp } from '@react-navigation/native';

import CoolingUnitsPlanner from '#screens/Dashboard/Main/CoolingUnits/Planner';
import CoolingUnitsRoomConditions from '#screens/Dashboard/Main/CoolingUnits/RoomConditions';
import CoolingUnitsCratesInfo from '#screens/Dashboard/Main/CoolingUnits/CratesInfo';
import CoolingUnitsCratesMaps from '#screens/Dashboard/Main/CoolingUnits/Maps';

import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';
import RBAC from '#common/RBAC';

export type CoolingUnitsTabsRoutes = {
  Planner: undefined;
  RoomConditions: undefined;
  CratesInfo: undefined;
  Maps: undefined;
};

export type CoolingUnitsTabsRoutePaths = keyof CoolingUnitsTabsRoutes;
export type CoolingUnitsTabsRouteProps<Path extends CoolingUnitsTabsRoutePaths> =
  MaterialTopTabNavigationProp<CoolingUnitsTabsRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<CoolingUnitsTabsRoutes, CoolingUnitsTabsRoutePaths>;
  navigation: MaterialTopTabNavigationProp<CoolingUnitsTabsRoutes, CoolingUnitsTabsRoutePaths>;
}) => MaterialTopTabNavigationOptions;

const TAB_HEADERS: Record<CoolingUnitsTabsRoutePaths, TranslationPaths | undefined> = {
  Planner: 'navigation.bottomTabs.Planner',
  RoomConditions: 'navigation.bottomTabs.RoomConditions',
  CratesInfo: 'navigation.bottomTabs.CratesInfo',
  Maps: 'navigation.bottomTabs.Maps',
};

const TopTabs = createMaterialTopTabNavigator<CoolingUnitsTabsRoutes>();

export default function CoolingUnitsTabs() {
  const { guard } = RBAC.useRBAC();
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;

    const translationPath = TAB_HEADERS[routeName];
    const routeTitle = translationPath ? t(translationPath) : undefined;

    return {
      ...props,
      swipeEnabled: routeName !== 'Maps',
      tabBarLabel: routeTitle,
      tabBarIndicatorStyle: {
        backgroundColor: paperTheme.colors.secondary,
      },
      tabBarStyle: {
        backgroundColor: paperTheme.colors.background,
      },
      tabBarLabelStyle: {
        color: paperTheme.colors.secondary,
        ...paperTheme.fonts.labelMedium,
      },
    };
  }, []);

  const navToMaps = guard('NAVIGATE', 'Maps');
  const navToCrates = guard('NAVIGATE', 'CratesInfo');

  return (
    <TopTabs.Navigator screenOptions={screenOptions}>
      {navToMaps ? <TopTabs.Screen name="Maps" component={CoolingUnitsCratesMaps} /> : null}
      <TopTabs.Screen name="Planner" component={CoolingUnitsPlanner} />
      <TopTabs.Screen name="RoomConditions" component={CoolingUnitsRoomConditions} />
      {navToCrates ? <TopTabs.Screen name="CratesInfo" component={CoolingUnitsCratesInfo} /> : null}
    </TopTabs.Navigator>
  );
}
