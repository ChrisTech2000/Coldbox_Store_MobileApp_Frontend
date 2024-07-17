import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import History from '#screens/Dashboard/Main/History';
import EditCheckIn from '#screens/Dashboard/Main/History/EditCheckIn';
import MarketSurvey from '#screens/Dashboard/Main/History/MarketSurvey';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import NavigatorHeader, { NavigationHeaderProps } from '#navigation/components/NavigatorHeader';
import type { GetMovementsHistoryResponse } from '#types/api.responses';

import { dashboardHeaderFactory } from '../lib/dashboardHeaderFactory';

export type HistoryTabStackRoutes = {
  RootHistoryTabStack: undefined;
  EditCheckIn: {
    movement: GetMovementsHistoryResponse[number];
    coolingUnitId?: number;
  };
  MarketSurvey: {
    checkoutId?: number;
    crops: Array<{ id: number; name: string }>;
    farmer: string;
  };
};

export type HistoryTabStackRoutePaths = keyof HistoryTabStackRoutes;

export type HistoryTabStackRouteProps<Path extends HistoryTabStackRoutePaths> =
  NativeStackScreenProps<HistoryTabStackRoutes, Path>;

export const NAVIGATOR_HEADERS: Record<HistoryTabStackRoutePaths, TranslationPaths | undefined> = {
  RootHistoryTabStack: 'navigation.bottomTabs.History',
  EditCheckIn: 'navigation.history.EditCheckIn',
  MarketSurvey: 'navigation.history.MarketSurvey',
};

type ScreenOptions = (props: {
  route: RouteProp<HistoryTabStackRoutes, HistoryTabStackRoutePaths>;
  navigation: NativeStackNavigationProp<HistoryTabStackRoutes, HistoryTabStackRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<HistoryTabStackRoutes>();

export default function HistoryTabStack() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;

    // eslint-disable-next-line react/prop-types
    const code = (props.route.params as { movement: GetMovementsHistoryResponse[number] })?.movement
      ?.code;

    // eslint-disable-next-line react/prop-types
    const farmer = (props.route.params as { farmer: string })?.farmer;

    const translationPath = NAVIGATOR_HEADERS[routeName];
    const datums = code ? { code } : { farmer };
    const routeTitle = translationPath ? t(translationPath, datums) : undefined;

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
      gestureDirection: 'vertical',
      animationDuration: 180,
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="RootHistoryTabStack" screenOptions={screenOptions}>
      <Stack.Screen name="RootHistoryTabStack" component={History} />
      <Stack.Screen name="EditCheckIn" component={EditCheckIn} />
      <Stack.Screen name="MarketSurvey" component={MarketSurvey} />
    </Stack.Navigator>
  );
}

function _renderContentFactory(
  routeName: HistoryTabStackRoutePaths,
  navigation: NativeStackNavigationProp<HistoryTabStackRoutes, HistoryTabStackRoutePaths>
): NavigationHeaderProps {
  switch (routeName) {
    case 'EditCheckIn':
    case 'MarketSurvey':
      return {
        leftContent: <Appbar.BackAction onPress={navigation.goBack} size={22} />,
      };
    default:
      return dashboardHeaderFactory(navigation);
  }
}
