import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { BottomTabDescriptorMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  CommonActions,
  type ParamListBase,
  type TabNavigationState,
} from '@react-navigation/native';
import React from 'react';
import { Dimensions, View, type StyleProp, type ViewStyle } from 'react-native';
import { BottomNavigation as MDBottomNavigation } from 'react-native-paper';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { Text } from '#ui/components/Text';

import type { DashboardMainRoutes } from '../Main';

function useStyles(descriptors: BottomTabDescriptorMap, routeKey: string) {
  return descriptors[routeKey].options.tabBarStyle as StyleProp<ViewStyle>;
}

function useNavigationState(state: TabNavigationState<DashboardMainRoutes>) {
  const filteredRoutes = state.routes.filter((route) => route.name !== 'ShoppingCart');
  return {
    ...state,
    routes: filteredRoutes,
    index: state.index >= filteredRoutes.length ? filteredRoutes.length - 1 : state.index,
  } satisfies TabNavigationState<ParamListBase>;
}

const MAX_CHARACTERS_FIRST_LINE = 9;

const screenHeight = Dimensions.get('screen').height;

export default function BottomNavigation(props: BottomTabBarProps) {
  const { navigation, state, descriptors, insets } = props;

  const styles = useStyles(descriptors, state.routes[state.index].key);
  // eslint-disable-next-line
  const navigationState = useNavigationState(state as any);

  return (
    <MDBottomNavigation.Bar
      style={styles}
      navigationState={navigationState}
      safeAreaInsets={{
        ...insets,
        ...(screenHeight <= SMALL_SCREEN_THRESHOLD ? { bottom: 10 } : {}),
      }}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });
        if (event.defaultPrevented) return preventDefault();
        switch (route.name as keyof DashboardMainRoutes) {
          case 'History': {
            return navigation.dispatch({
              ...CommonActions.reset({
                index: 0,
                routes: [{ name: 'History', state: { routes: [{ name: 'RootHistoryTabStack' }] } }],
              }),
              target: state.key,
            });
          }
          default: {
            return navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];
        if (typeof options.tabBarIcon !== 'function') return null;
        return options.tabBarIcon({ focused, color, size: 24 });
      }}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];
        if (typeof options.tabBarLabel === 'string') return options.tabBarLabel;
        return options.title;
      }}
      renderLabel={({ route }) => {
        const label =
          descriptors[route.key].options.tabBarLabel || descriptors[route.key].options.title;

        if (typeof label !== 'string') return null;

        const words = label.trim().split(' ');

        let firstLine = '';
        let secondLine = '';

        for (let i = 0; i < words.length; i++) {
          if (
            firstLine.length + words[i].length + 1 <= MAX_CHARACTERS_FIRST_LINE ||
            words.length === 1
          ) {
            firstLine += (firstLine.length ? ' ' : '') + words[i];
          } else {
            secondLine += (secondLine.length ? ' ' : '') + words[i];
          }
        }

        return (
          <View>
            <Text numberOfLines={1} tw="text-center">
              {firstLine}
            </Text>
            {secondLine ? (
              <Text numberOfLines={1} tw="text-center">
                {secondLine}
              </Text>
            ) : null}
          </View>
        );
      }}
    />
  );
}
