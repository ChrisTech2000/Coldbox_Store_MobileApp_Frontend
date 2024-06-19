import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { BottomTabDescriptorMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { BottomNavigation as MDBottomNavigation } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

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
        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate(route.name, route.params),
            target: state.key,
          });
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];
        if (typeof options.tabBarIcon === 'function') {
          return options.tabBarIcon({ focused, color, size: 24 });
        }
        return null;
      }}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];
        if (typeof options.tabBarLabel === 'string') return options.tabBarLabel;
        return options.title;
      }}
    />
  );
}
