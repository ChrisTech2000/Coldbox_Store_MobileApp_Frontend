import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { BottomTabDescriptorMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Dimensions, type StyleProp, type ViewStyle } from 'react-native';
import { BottomNavigation as MDBottomNavigation } from 'react-native-paper';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { Text } from '#ui/components/Text';

import type { DashboardMainRoutes } from '../Main';

function useStyles(descriptors: BottomTabDescriptorMap, routeKey: string) {
  return descriptors[routeKey].options.tabBarStyle as StyleProp<ViewStyle>;
}

const screenHeight = Dimensions.get('screen').height;

export default function BottomNavigation(props: BottomTabBarProps) {
  const { navigation, state, descriptors, insets } = props;

  const styles = useStyles(descriptors, state.routes[state.index].key);

  return (
    <MDBottomNavigation.Bar
      style={styles}
      navigationState={state}
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
        return (label as string)?.split(' ').map((label: string, id) => (
          <Text key={`${label}-${id}`} tw="text-center" numberOfLines={2}>
            {label}
          </Text>
        ));
      }}
    />
  );
}
