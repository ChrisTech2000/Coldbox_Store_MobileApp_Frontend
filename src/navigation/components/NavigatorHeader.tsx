import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Appbar } from 'react-native-paper';

import { DrawerOverlay } from '#screens/Dashboard/Tutorial/DrawerOverlay';
import { EOperatorTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import { DashboardMainRoutes } from '#navigation/Dashboard/Main';

export type NavigationHeaderProps = {
  routeTitle?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

export default function NavigatorHeader(props: NavigationHeaderProps) {
  const navigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  const { onLayout } = useWalkthroughStep({
    number: EOperatorTutorialSteps.OPEN_DRAWER_STEP,
    enableHardwareBack: true,
    OverlayComponent: DrawerOverlay,
    maskAllowInteraction: true,
    onPressMask: () => navigation.dispatch(DrawerActions.openDrawer()),
  });

  return (
    <Appbar.Header onLayout={onLayout}>
      {props.leftContent}
      <Appbar.Content title={props.routeTitle} />
      {props.rightContent}
    </Appbar.Header>
  );
}
