import { type NavigatorScreenParams, type RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';

import DashboardMain from '#screens/Dashboard/Main/Dashboard';
import { Dashboard6Overlay } from '#screens/Dashboard/Tutorial/FarmerDashboardOverlay';
import { EFarmerTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import { useTranslationUtils, type TranslationPaths, type Translator } from '#i18n/utils';
import {
  useDashboardHeader,
  type DashboardHeaderFactory,
} from '#navigation/Dashboard/lib/dashboardHeaderFactory';
import NavigatorHeader, { NavigationHeaderProps } from '#navigation/components/NavigatorHeader';
import { useAuthStore } from '#stores/auth';
import { Text } from '#ui/components/Text';

import CheckInStack, { type CheckInStackRoutes } from './CheckInTabStack';
import CheckOutStack, { type CheckOutStackRoutes } from './CheckOutTabStack';
import ProduceDetailsStack, { type ProduceDetailsStackRoutes } from './ProduceDetailsStack';

export type MainTabStackRoutes = {
  RootMainTabStack: undefined;
  ProduceDetailsStack: NavigatorScreenParams<ProduceDetailsStackRoutes>;
  CheckInStack: NavigatorScreenParams<CheckInStackRoutes>;
  CheckOutStack: NavigatorScreenParams<CheckOutStackRoutes>;
};

export type MainTabStackRoutePaths = keyof MainTabStackRoutes;
export type MainTabStackRouteProps<Path extends MainTabStackRoutePaths> = NativeStackScreenProps<
  MainTabStackRoutes,
  Path
>;

type ScreenOptions = (props: {
  route: RouteProp<MainTabStackRoutes, MainTabStackRoutePaths>;
  navigation: NativeStackNavigationProp<MainTabStackRoutes, MainTabStackRoutePaths>;
}) => NativeStackNavigationOptions;

export const NAVIGATOR_HEADERS: Record<MainTabStackRoutePaths, TranslationPaths | undefined> = {
  RootMainTabStack: 'navigation.bottomTabs.RootMainTabStack',
  ProduceDetailsStack: undefined,
  CheckInStack: 'navigation.bottomTabs.CheckIn',
  CheckOutStack: 'navigation.bottomTabs.CheckOut',
};

const Stack = createNativeStackNavigator<MainTabStackRoutes>();

export default function MainTabStack() {
  const { t } = useTranslationUtils();
  const dashboardHeaderFactory = useDashboardHeader();

  const { onLayout: onRightLayout } = useWalkthroughStep({
    number: EFarmerTutorialSteps.DASHBOARD_STEP_6,
    OverlayComponent: Dashboard6Overlay,
    maskAllowInteraction: true,
  });

  const screenOptions: ScreenOptions = useCallback(
    (props) => {
      // eslint-disable-next-line react/prop-types
      const routeName = props.route.name;
      const firstName = useAuthStore.getState().user?.firstName;

      const translationPath = NAVIGATOR_HEADERS[routeName];
      const routeTitle = translationPath ? t(translationPath, { firstName }) : undefined;

      return {
        ...props,
        headerShown: !!translationPath,
        header: (headerProps) =>
          translationPath !== NAVIGATOR_HEADERS.CheckInStack && (
            <View onLayout={onRightLayout}>
              <NavigatorHeader
                {...headerProps}
                routeTitle={routeTitle}
                // eslint-disable-next-line react/prop-types
                {..._renderContentFactory(routeName, props.navigation, dashboardHeaderFactory, t)}
              />
            </View>
          ),
        gestureDirection: 'vertical',
        animationDuration: 180,
      };
    },
    [dashboardHeaderFactory]
  );

  return (
    <Stack.Navigator initialRouteName="RootMainTabStack" screenOptions={screenOptions}>
      <Stack.Screen name="RootMainTabStack" component={DashboardMain} />
      <Stack.Screen name="ProduceDetailsStack" component={ProduceDetailsStack} />
      <Stack.Screen name="CheckInStack" component={CheckInStack} />
      <Stack.Screen name="CheckOutStack" component={CheckOutStack} />
    </Stack.Navigator>
  );
}

function _renderContentFactory(
  routeName: MainTabStackRoutePaths,
  navigation: NativeStackNavigationProp<MainTabStackRoutes, MainTabStackRoutePaths>,
  dashboardHeaderFactory: DashboardHeaderFactory,
  t: Translator
): NavigationHeaderProps {
  switch (routeName) {
    case 'CheckOutStack':
      return {
        rightContent: (
          <TouchableOpacity onPress={() => navigation.navigate('RootMainTabStack')}>
            <Text variant="TitleSmall" tw="uppercase mr-1">
              {t('actions.close')}
            </Text>
          </TouchableOpacity>
        ),
      };
    default:
      return dashboardHeaderFactory();
  }
}
