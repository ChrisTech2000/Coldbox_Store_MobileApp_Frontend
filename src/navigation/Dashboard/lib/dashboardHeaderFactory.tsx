import React from 'react';
import { DrawerActions, NavigationProp } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

import type { NavigationHeaderProps } from '#navigation/components/NavigatorHeader';

export function dashboardHeaderFactory<Params extends Record<string, unknown>, Path extends string>(
  navigation: NavigationProp<Params, Path>
): NavigationHeaderProps {
  return {
    leftContent: (
      <Appbar.Action
        icon="menu"
        size={26}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    ),
    rightContent: <Appbar.Action icon="bell-outline" size={25} onPressIn={() => undefined} />,
  };
}
