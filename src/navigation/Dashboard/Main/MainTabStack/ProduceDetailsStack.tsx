import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import type { CoolingUnit, DashboardProduce } from '#types/global';
import type { TranslationPaths } from '#i18n/index';

import ProduceDetails from '#screens/Dashboard/Main/Dashboard/ProduceDetails';

import NavigatorHeader, {
  type NavigationHeaderProps,
} from '#navigation/components/NavigatorHeader';

import { useTranslationUtils } from '#i18n/utils';

export type ProduceDetailsStackRoutes = {
  Root: {
    produce: DashboardProduce;
    coolingUnit: CoolingUnit | null;
    currency: string;
  };
};

export type ProduceDetailsStackRoutePaths = keyof ProduceDetailsStackRoutes;

export type ProduceDetailsStackRouteProps<Path extends ProduceDetailsStackRoutePaths> =
  NativeStackScreenProps<ProduceDetailsStackRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<ProduceDetailsStackRoutes, ProduceDetailsStackRoutePaths>;
  navigation: NativeStackNavigationProp<ProduceDetailsStackRoutes, ProduceDetailsStackRoutePaths>;
}) => NativeStackNavigationOptions;

const NAVIGATOR_HEADERS: Record<ProduceDetailsStackRoutePaths, TranslationPaths | undefined> = {
  Root: 'navigation.bottomTabs.ProduceDetails',
};

const Stack = createNativeStackNavigator<ProduceDetailsStackRoutes>();

export default function ProduceDetailsStack() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;
    // eslint-disable-next-line react/prop-types
    const produce = (props.route.params as { produce: DashboardProduce })?.produce;

    const translationPath = NAVIGATOR_HEADERS[routeName];
    const routeTitle = translationPath
      ? t(translationPath, { produceCode: produce.movementCode })
      : undefined;

    return {
      ...props,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={routeTitle}
          // eslint-disable-next-line react/prop-types
          {..._renderContentFactory(routeName, props.navigation)}
        />
      ),
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={ProduceDetails} />
    </Stack.Navigator>
  );
}

function _renderContentFactory(
  routeName: ProduceDetailsStackRoutePaths,
  navigation: NativeStackNavigationProp<ProduceDetailsStackRoutes, ProduceDetailsStackRoutePaths>
): NavigationHeaderProps {
  switch (routeName) {
    case 'Root':
    default:
      return {
        leftContent: <Appbar.BackAction onPress={navigation.goBack} size={22} />,
      };
  }
}
