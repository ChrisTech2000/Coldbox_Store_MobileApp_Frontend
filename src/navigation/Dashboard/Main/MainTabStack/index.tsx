import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';

import DashboardMain from '#screens/Dashboard/Main/Dashboard';
import ProduceDetails from '#screens/Dashboard/Main/Dashboard/ProduceDetails';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils, type Translator } from '#i18n/utils';
import { dashboardHeaderFactory } from '#navigation/Dashboard/lib/dashboardHeaderFactory';
import NavigatorHeader, { NavigationHeaderProps } from '#navigation/components/NavigatorHeader';
import { useAuthStore } from '#stores/auth';
import type { CoolingUnit, Crate, DashboardProduce, Farmer } from '#types/global';
import { Text } from '#ui/components/Text';

import CheckInStack, { CheckInStackRoutes } from './CheckInTabStack';
import CheckOutStack, { CheckOutStackRoutes } from './CheckOutTabStack';

export type MainTabStackRoutes = {
  RootMainTabStack: undefined;
  ProduceDetails: {
    produce: DashboardProduce;
    coolingUnit: CoolingUnit | null;
  };
  CheckInStack: {
    screen: keyof CheckInStackRoutes;
    params: {
      user?: Farmer;
      coolingUnit?: CoolingUnit;
    };
  };
  CheckOutStack: {
    screen: keyof CheckOutStackRoutes;
    params: {
      crates?: Array<Crate>;
      user?: Farmer;
      coolingUnit: CoolingUnit | null;
    };
  };
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
  ProduceDetails: 'navigation.bottomTabs.ProduceDetails',
  CheckInStack: 'navigation.bottomTabs.CheckIn',
  CheckOutStack: 'navigation.bottomTabs.CheckOut',
};

const Stack = createNativeStackNavigator<MainTabStackRoutes>();

export default function MainTabStack() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;
    // eslint-disable-next-line react/prop-types
    const produce = (props.route.params as { produce: DashboardProduce })?.produce;

    const firstName = useAuthStore.getState().user?.firstName;

    const translationPath = NAVIGATOR_HEADERS[routeName];
    const datums = produce ? { produceCode: produce.movementCode } : { firstName };
    const routeTitle = translationPath ? t(translationPath, datums) : undefined;

    return {
      ...props,
      header: (headerProps) =>
        translationPath !== NAVIGATOR_HEADERS.CheckInStack && (
          <NavigatorHeader
            {...headerProps}
            routeTitle={routeTitle}
            // eslint-disable-next-line react/prop-types
            {..._renderContentFactory(routeName, props.navigation, t)}
          />
        ),
      gestureDirection: 'vertical',
      animationDuration: 180,
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="RootMainTabStack" screenOptions={screenOptions}>
      <Stack.Screen name="RootMainTabStack" component={DashboardMain} />
      <Stack.Screen name="ProduceDetails" component={ProduceDetails} />
      <Stack.Screen name="CheckInStack" component={CheckInStack} />
      <Stack.Screen name="CheckOutStack" component={CheckOutStack} />
    </Stack.Navigator>
  );
}

function _renderContentFactory(
  routeName: MainTabStackRoutePaths,
  navigation: NativeStackNavigationProp<MainTabStackRoutes, MainTabStackRoutePaths>,
  t: Translator
): NavigationHeaderProps {
  switch (routeName) {
    case 'ProduceDetails':
      return {
        leftContent: <Appbar.BackAction onPress={navigation.goBack} size={22} />,
      };
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
      return dashboardHeaderFactory(navigation);
  }
}
