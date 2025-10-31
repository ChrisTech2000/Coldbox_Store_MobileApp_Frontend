/* eslint-disable react/prop-types */
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  type MaterialTopTabNavigationOptions,
  type MaterialTopTabNavigationProp,
  type MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import type { RouteProp } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { useShallow } from 'zustand/react/shallow';

import MarketplaceRoot from '#screens/Dashboard/Main/Marketplace';
import { Marketplace3ScreenOverlay } from '#screens/Dashboard/Tutorial/MarketplaceOverlay';
import { EMarketplaceTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import { useTutorialStore } from '#stores/tutorial';
import { paperTheme } from '#ui/lib/theme';

import OrdersStack from '../OrdersStack';
import SalesStack from '../SalesStack';

export type MarketplaceTabsRoutes = {
  Marketplace: undefined;
  MyOrders: undefined;
  MySales: undefined;
};

export type MarketplaceTabsRoutePaths = keyof MarketplaceTabsRoutes;
export type MarketplaceTabsRouteProps<Path extends MarketplaceTabsRoutePaths> =
  MaterialTopTabScreenProps<MarketplaceTabsRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<MarketplaceTabsRoutes, MarketplaceTabsRoutePaths>;
  navigation: MaterialTopTabNavigationProp<MarketplaceTabsRoutes, MarketplaceTabsRoutePaths>;
}) => MaterialTopTabNavigationOptions;

const TAB_HEADERS: Record<MarketplaceTabsRoutePaths, TranslationPaths | undefined> = {
  Marketplace: 'navigation.dashboard.Marketplace',
  MyOrders: 'navigation.dashboard.MyOrders',
  MySales: 'navigation.dashboard.MySales',
};

const TopTabs = createMaterialTopTabNavigator<MarketplaceTabsRoutes>();

export default function MarketplaceTabs() {
  const { t } = useTranslationUtils();
  const [isTutorialActive] = useTutorialStore(useShallow((store) => [store.isTutorialActive]));

  const { onLayout } = useWalkthroughStep({
    number: EMarketplaceTutorialSteps.MARKETPLACE_STEP_3,
    OverlayComponent: Marketplace3ScreenOverlay,
  });

  const screenOptions: ScreenOptions = useCallback((props) => {
    const routeName = props.route.name;
    const translationPath = TAB_HEADERS[routeName];
    const routeTitle = translationPath ? t(translationPath) : undefined;

    return {
      ...props,
      lazy: true,
      tabBarLabel: routeTitle,
      tabBarIndicatorStyle: {
        backgroundColor: paperTheme.colors.secondary,
      },
      tabBarStyle: {
        backgroundColor: paperTheme.colors.background,
      },
      tabBarLabelStyle: {
        color: paperTheme.colors.secondary,
        ...paperTheme.fonts.labelMedium,
      },
      swipeEnabled: false,
    };
  }, []);

  // TODO: add stack for my sales
  return (
    <TopTabs.Navigator
      screenOptions={screenOptions}
      tabBar={
        isTutorialActive
          ? (props) => <CustomTabBar {...props} onMyOrdersLayout={onLayout} />
          : undefined
      }
    >
      <TopTabs.Screen name="Marketplace" component={MarketplaceRoot} />
      <TopTabs.Screen name="MyOrders" component={OrdersStack} />
      <TopTabs.Screen name="MySales" component={SalesStack} />
    </TopTabs.Navigator>
  );
}

function CustomTabBar({
  state,
  descriptors,
  navigation,
  onMyOrdersLayout,
}: MaterialTopTabBarProps & { onMyOrdersLayout?: (event: unknown) => void }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel as string;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const layoutHandler = route.name === 'MyOrders' ? onMyOrdersLayout : undefined;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            onLayout={layoutHandler}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 3,
              borderBottomColor: isFocused ? '#4E5F5B' : 'transparent',
            }}
          >
            <Text
              style={{
                color: '#4E5F5B',
                fontSize: 12,
                fontWeight: '500',
                letterSpacing: 1,
              }}
              tw="uppercase"
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
