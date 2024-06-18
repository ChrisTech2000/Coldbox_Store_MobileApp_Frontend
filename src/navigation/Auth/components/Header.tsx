import React from 'react';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';

import type { AuthRoutes } from '../index';

type Paths = Exclude<keyof AuthRoutes, 'Root'>;

const HEADER_TITLES: Record<Paths, string> = {
  SignIn: 'Log in',
  SignUpCompany: 'Sign up',
  SignUpCoolingUser: 'Sign up',
  PasswordRecovery: 'Forgot Password',
  AppInfo: 'FAQ',
};

export default function NavigatorHeader(props: NativeStackHeaderProps) {
  const routeTitle = HEADER_TITLES[props.route.name as Paths];

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={props.navigation.goBack} />
      <Appbar.Content title={routeTitle} />
    </Appbar.Header>
  );
}
