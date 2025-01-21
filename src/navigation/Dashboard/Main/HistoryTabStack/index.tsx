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

import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import NavigatorHeader, { NavigationHeaderProps } from '#navigation/components/NavigatorHeader';
import { useAuthStore } from '#stores/auth';
import type { GetMovementsHistoryResponse } from '#types/api.responses';

import { useDashboardHeader, type DashboardHeaderFactory } from '../../lib/dashboardHeaderFactory';
import MarketSurveyStack, { MarketSurveyStackRoutes } from './MarketSurveyStack';

export type HistoryTabStackRoutes = {
  RootHistoryTabStack: undefined;
  EditCheckIn: {
    movement: GetMovementsHistoryResponse[number];
    coolingUnitId?: number;
  };
  MarketSurveyStack: {
    screen?: keyof MarketSurveyStackRoutes;
    params?:
      | MarketSurveyStackRoutes['MarketSurveyBase']
      | MarketSurveyStackRoutes['BaseSurvey']
      | MarketSurveyStackRoutes['MarketSurvey'];
  };
};

export type HistoryTabStackRoutePaths = keyof HistoryTabStackRoutes;

export type HistoryTabStackRouteProps<Path extends HistoryTabStackRoutePaths> =
  NativeStackScreenProps<HistoryTabStackRoutes, Path>;

export const NAVIGATOR_HEADERS: Record<HistoryTabStackRoutePaths, TranslationPaths | undefined> = {
  RootHistoryTabStack: 'navigation.bottomTabs.History',
  EditCheckIn: 'navigation.history.EditCheckIn',
  MarketSurveyStack: 'navigation.history.MarketSurvey',
};

type ScreenOptions = (props: {
  route: RouteProp<HistoryTabStackRoutes, HistoryTabStackRoutePaths>;
  navigation: NativeStackNavigationProp<HistoryTabStackRoutes, HistoryTabStackRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<HistoryTabStackRoutes>();

export default function HistoryTabStack() {
  const { t } = useTranslationUtils();
  const dashboardHeaderFactory = useDashboardHeader();

  const screenOptions: ScreenOptions = useCallback(
    (props) => {
      // eslint-disable-next-line react/prop-types
      const routeName = props.route.name;

      // eslint-disable-next-line react/prop-types
      const code = (props.route.params as { movement: GetMovementsHistoryResponse[number] })
        ?.movement?.code;

      const firstName = useAuthStore.getState().user?.firstName;

      let routeTitle: string | undefined;

      const translationPath = NAVIGATOR_HEADERS[routeName];

      if (routeName === 'RootHistoryTabStack') {
        routeTitle = t('navigation.bottomTabs.RootMainTabStack', { firstName });
      } else {
        routeTitle = translationPath ? t(translationPath, { code }) : undefined;
      }

      return {
        ...props,
        header: (headerProps) =>
          translationPath !== NAVIGATOR_HEADERS.MarketSurveyStack && (
            <NavigatorHeader
              {...headerProps}
              routeTitle={routeTitle}
              // eslint-disable-next-line react/prop-types
              {..._renderContentFactory(routeName, props.navigation, dashboardHeaderFactory)}
            />
          ),
        gestureDirection: 'vertical',
        animationDuration: 180,
      };
    },
    [dashboardHeaderFactory]
  );

  return (
    <Stack.Navigator initialRouteName="RootHistoryTabStack" screenOptions={screenOptions}>
      <Stack.Screen name="RootHistoryTabStack" component={History} />
      <Stack.Screen name="EditCheckIn" component={EditCheckIn} />
      <Stack.Screen name="MarketSurveyStack" component={MarketSurveyStack} />
    </Stack.Navigator>
  );
}

function _renderContentFactory(
  routeName: HistoryTabStackRoutePaths,
  navigation: NativeStackNavigationProp<HistoryTabStackRoutes, HistoryTabStackRoutePaths>,
  dashboardHeaderFactory: DashboardHeaderFactory
): NavigationHeaderProps {
  switch (routeName) {
    case 'EditCheckIn':
      return {
        leftContent: <Appbar.BackAction onPress={navigation.goBack} size={22} />,
      };
    default:
      return dashboardHeaderFactory();
  }
}
