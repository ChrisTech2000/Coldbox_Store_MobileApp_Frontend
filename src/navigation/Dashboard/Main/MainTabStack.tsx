import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import DashboardMain from '#screens/Dashboard/Main/Dashboard';
import CheckIn from '#screens/Dashboard/Main/Dashboard/CheckIn';
import Checkout from '#screens/Dashboard/Main/Dashboard/Checkout';
import ProduceDetails from '#screens/Dashboard/Main/Dashboard/ProduceDetails';

import type { TranslationPaths } from '#i18n/index';
import { type Translator, useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import type { GetFarmerResponse } from '#types/api.responses';
import type { DashboardProduce } from '#types/global';
import { Text } from '#ui/components/Text';

import { TouchableOpacity } from 'react-native';
import NavigatorHeader, { type NavigationHeaderProps } from '../../components/NavigatorHeader';
import { dashboardHeaderFactory } from '../lib/dashboardHeaderFactory';

export type MainTabStackRoutes = {
  RootMainTabStack: undefined;
  ProduceDetails: { produce: DashboardProduce };
  CheckIn: { user?: GetFarmerResponse };
  CheckOut: { user?: GetFarmerResponse };
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

const NAVIGATOR_HEADERS: Record<MainTabStackRoutePaths, TranslationPaths | undefined> = {
  RootMainTabStack: 'navigation.bottomTabs.RootMainTabStack',
  ProduceDetails: 'navigation.bottomTabs.ProduceDetails',
  CheckIn: 'navigation.bottomTabs.CheckIn',
  CheckOut: 'navigation.bottomTabs.CheckOut',
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
      header: (headerProps) => (
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
      <Stack.Screen name="CheckIn" component={CheckIn} />
      <Stack.Screen name="CheckOut" component={Checkout} />
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
    case 'CheckIn':
    case 'CheckOut':
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
