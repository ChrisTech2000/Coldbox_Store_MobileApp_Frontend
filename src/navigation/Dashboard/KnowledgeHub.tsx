import React, { useCallback } from 'react';
import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';

import KnowledgeHub from '#screens/Dashboard/KnowledgeHub';
import KnowledgeHubDetails from '#screens/Dashboard/KnowledgeHub/Details';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import NavigatorHeader from '#navigation/components/NavigatorHeader';

export type KnowledgeHubStackRoutes = {
  Root: undefined;
  Details: {
    uri: string;
  };
};

export type KnowledgeHubStackRoutePaths = keyof KnowledgeHubStackRoutes;
export type KnowledgeHubStackRouteProps<Path extends KnowledgeHubStackRoutePaths> =
  NativeStackScreenProps<KnowledgeHubStackRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<KnowledgeHubStackRoutes, KnowledgeHubStackRoutePaths>;
  navigation: NativeStackNavigationProp<KnowledgeHubStackRoutes, KnowledgeHubStackRoutePaths>;
}) => NativeStackNavigationOptions;

export const NAVIGATOR_HEADERS: Record<KnowledgeHubStackRoutePaths, TranslationPaths> = {
  Root: 'navigation.dashboard.KnowledgeHub',
  Details: 'navigation.dashboard.KnowledgeHub',
};

const Stack = createNativeStackNavigator<KnowledgeHubStackRoutes>();

export default function KnowledgeHubStack() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeTitle = t(NAVIGATOR_HEADERS[props.route.name]);
    return {
      ...props,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={routeTitle}
          leftContent={
            <Appbar.BackAction
              // eslint-disable-next-line react/prop-types
              onPress={props.navigation.goBack}
              size={22}
            />
          }
        />
      ),
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={KnowledgeHub} />
      <Stack.Screen name="Details" component={KnowledgeHubDetails} />
    </Stack.Navigator>
  );
}
