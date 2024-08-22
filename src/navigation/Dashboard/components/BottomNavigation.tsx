import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { BottomTabDescriptorMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { BottomNavigation as MDBottomNavigation, Text } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

import type { DashboardMainRoutes } from '../Main';

function useStyles(descriptors: BottomTabDescriptorMap, routeKey: string) {
  return descriptors[routeKey].options.tabBarStyle as StyleProp<ViewStyle>;
}

export default function BottomNavigation(props: BottomTabBarProps) {
  const { navigation, state, descriptors, insets } = props;

  const styles = useStyles(descriptors, state.routes[state.index].key);

  return (
    <MDBottomNavigation.Bar
      style={styles}
      navigationState={state}
      safeAreaInsets={insets}
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
          <Text key={`${label}-${id}`} tw="text-center">
            {label}
          </Text>
        ));
      }}
    />
  );
}
