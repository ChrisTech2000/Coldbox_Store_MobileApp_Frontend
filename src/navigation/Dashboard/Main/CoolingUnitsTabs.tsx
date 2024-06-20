import React, { useCallback } from 'react';
import {
  createMaterialTopTabNavigator,
  type MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import type { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';

import CoolingUnitsPlanner from '#screens/Dashboard/Main/CoolingUnits/Planner';
import CoolingUnitsRoomConditions from '#screens/Dashboard/Main/CoolingUnits/RoomConditions';
import CoolingUnitsCratesInfo from '#screens/Dashboard/Main/CoolingUnits/CratesInfo';
import { paperTheme } from '#ui/lib/theme';

export type CoolingUnitsTabsRoutes = {
  Planner: undefined;
  RoomConditions: undefined;
  CratesInfo: undefined;
};

export type CoolingUnitsTabsRoutePaths = keyof CoolingUnitsTabsRoutes;
export type CoolingUnitsTabsRouteProps<Path extends CoolingUnitsTabsRoutePaths> =
  BottomTabScreenProps<CoolingUnitsTabsRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<CoolingUnitsTabsRoutes, CoolingUnitsTabsRoutePaths>;
  navigation: BottomTabNavigationProp<CoolingUnitsTabsRoutes, CoolingUnitsTabsRoutePaths>;
}) => MaterialTopTabNavigationOptions;

const TAB_TITLE: Record<CoolingUnitsTabsRoutePaths, string | undefined> = {
  Planner: 'Planner',
  RoomConditions: 'Room Conditions',
  CratesInfo: 'Crates Info',
};

const TopTabs = createMaterialTopTabNavigator<CoolingUnitsTabsRoutes>();

export default function CoolingUnitsTabs() {
  const screenOptions: ScreenOptions = useCallback(
    (props) => ({
      ...props,
      // eslint-disable-next-line react/prop-types
      tabBarLabel: TAB_TITLE[props.route.name],
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
    }),
    []
  );

  return (
    <TopTabs.Navigator screenOptions={screenOptions}>
      <TopTabs.Screen name="Planner" component={CoolingUnitsPlanner} />
      <TopTabs.Screen name="RoomConditions" component={CoolingUnitsRoomConditions} />
      <TopTabs.Screen name="CratesInfo" component={CoolingUnitsCratesInfo} />
    </TopTabs.Navigator>
  );
}
