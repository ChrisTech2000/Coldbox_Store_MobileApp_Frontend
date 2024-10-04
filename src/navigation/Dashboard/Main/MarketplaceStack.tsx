import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import MarketplaceRoot from '#screens/Dashboard/Main/Marketplace';
import MarketplaceFilters from '#screens/Dashboard/Main/Marketplace/MarketplaceFilters';

import { Touchable } from '#ui/components/Touchable';
import { Text } from '#ui/components/Text';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import NavigatorHeader, {
  type NavigationHeaderProps,
} from '#navigation/components/NavigatorHeader';
import { useDashboardHeader } from '#navigation/Dashboard/lib/dashboardHeaderFactory';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import type { FormValues } from '#screens/Dashboard/Main/Marketplace/modules/MarketplaceFormManager';

export type MarketplaceRoutes = {
  MarketplaceRoot: undefined;
  MarketplaceFilters: undefined;
};

export type MarketplaceRoutePaths = keyof MarketplaceRoutes;

export type MarketplaceRouteProps<Path extends MarketplaceRoutePaths> = NativeStackScreenProps<
  MarketplaceRoutes,
  Path
>;

export const NAVIGATOR_HEADERS: Record<MarketplaceRoutePaths, TranslationPaths> = {
  MarketplaceRoot: 'navigation.dashboard.Marketplace',
  MarketplaceFilters: 'navigation.dashboard.MarketplaceFilters',
};

type ScreenOptions = (props: {
  route: RouteProp<MarketplaceRoutes, MarketplaceRoutePaths>;
  navigation: NativeStackNavigationProp<MarketplaceRoutes, MarketplaceRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<MarketplaceRoutes>();

export default function MarketplaceStack() {
  const { t } = useTranslationUtils();
  const dashboardHeaderFactory = useDashboardHeader();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;
    const isFiltersScreen = routeName === 'MarketplaceFilters';
    return {
      ...props,
      header: () => {
        const baseProps: NavigationHeaderProps = { routeTitle: t(NAVIGATOR_HEADERS[routeName]) };
        if (!isFiltersScreen) {
          const { leftContent, rightContent } = dashboardHeaderFactory();
          baseProps.leftContent = leftContent;
          baseProps.rightContent = rightContent;
        } else {
          // eslint-disable-next-line react/prop-types
          baseProps.leftContent = <Appbar.BackAction size={26} onPress={props.navigation.goBack} />;
          baseProps.rightContent = (
            <Touchable
              tw="flex-row items-center justify-center space-x-2 px-4 py-1.5 mr-2"
              onPress={(evt) => {
                evt.stopPropagation();
                emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_FILTERS_FORM_RESET, {
                  companies: [],
                  coolingUnits: [],
                  crops: [],
                  min: 0,
                  max: 0,
                } satisfies FormValues<number>);
              }}
            >
              <Text variant="TextMedium" tw="text-lg text-green-primary">
                Reset
              </Text>
            </Touchable>
          );
        }
        return <NavigatorHeader {...baseProps} />;
      },
    };
  }, [dashboardHeaderFactory]);

  return (
    <Stack.Navigator initialRouteName="MarketplaceRoot" screenOptions={screenOptions}>
      <Stack.Screen name="MarketplaceRoot" component={MarketplaceRoot} />
      <Stack.Screen name="MarketplaceFilters" component={MarketplaceFilters} />
    </Stack.Navigator>
  );
}
