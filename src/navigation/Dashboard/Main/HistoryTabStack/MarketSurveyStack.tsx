import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import MarketSurveyBase from '#screens/Dashboard/Main/History/MarketSurvey';
import BaseSurvey from '#screens/Dashboard/Main/History/MarketSurvey/BaseSurvey';
import MarketSurvey from '#screens/Dashboard/Main/History/MarketSurvey/MarketSurvey';

import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import NavigatorHeader, { NavigationHeaderProps } from '#navigation/components/NavigatorHeader';

import { useDashboardHeader, type DashboardHeaderFactory } from '../../lib/dashboardHeaderFactory';

export type MarketSurveyStackRoutes = {
  MarketSurveyBase: {
    checkoutId?: number;
    crops: Array<{ id: number; name: string }>;
    ownerId: number;
    owner: string;
    companyCurrency?: string;
  };
  BaseSurvey: {
    companyCurrency?: string;
  };
  MarketSurvey: {
    cropId: number;
    companyCurrency?: string;
    ownerId: number;
    owner: string;
  };
};

export type MarketSurveyStackRoutePaths = keyof MarketSurveyStackRoutes;

export type MarketSurveyStackRouteProps<Path extends MarketSurveyStackRoutePaths> =
  NativeStackScreenProps<MarketSurveyStackRoutes, Path>;

export const NAVIGATOR_HEADERS: Record<MarketSurveyStackRoutePaths, TranslationPaths | undefined> =
  {
    MarketSurveyBase: 'navigation.history.MarketSurvey',
    BaseSurvey: 'navigation.history.BaseSurvey',
    MarketSurvey: 'navigation.history.MarketSurvey',
  };

type ScreenOptions = (props: {
  route: RouteProp<MarketSurveyStackRoutes, MarketSurveyStackRoutePaths>;
  navigation: NativeStackNavigationProp<MarketSurveyStackRoutes, MarketSurveyStackRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<MarketSurveyStackRoutes>();

export default function MarketSurveyStack() {
  const { t } = useTranslationUtils();
  const dashboardHeaderFactory = useDashboardHeader();

  const screenOptions: ScreenOptions = useCallback(
    (props) => {
      // eslint-disable-next-line react/prop-types
      const routeName = props.route.name;

      // eslint-disable-next-line react/prop-types
      const farmer = (props.route.params as { owner: string })?.owner;

      const translationPath = NAVIGATOR_HEADERS[routeName];
      const routeTitle = translationPath ? t(translationPath, { farmer }) : undefined;

      return {
        ...props,
        header: (headerProps) => (
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
    <Stack.Navigator initialRouteName="MarketSurveyBase" screenOptions={screenOptions}>
      <Stack.Screen name="MarketSurveyBase" component={MarketSurveyBase} />
      <Stack.Screen name="BaseSurvey" component={BaseSurvey} />
      <Stack.Screen name="MarketSurvey" component={MarketSurvey} />
    </Stack.Navigator>
  );
}

function _renderContentFactory(
  routeName: MarketSurveyStackRoutePaths,
  navigation: NativeStackNavigationProp<MarketSurveyStackRoutes, MarketSurveyStackRoutePaths>,
  dashboardHeaderFactory: DashboardHeaderFactory
): NavigationHeaderProps {
  switch (routeName) {
    case 'MarketSurveyBase':
    case 'BaseSurvey':
    case 'MarketSurvey':
      return {
        leftContent: <Appbar.BackAction onPress={navigation.goBack} size={22} />,
      };
    default:
      return dashboardHeaderFactory();
  }
}
