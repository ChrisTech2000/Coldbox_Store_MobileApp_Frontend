import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  type NativeStackNavigationOptions,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import AppInfo from '#screens/Auth/AppInfo';
import PasswordRecoveryRequest from '#screens/Auth/PasswordRecovery/PasswordRecoveryRequest';
import PasswordReset from '#screens/Auth/PasswordRecovery/PasswordReset';
import AuthRoot from '#screens/Auth/Root';
import SignIn from '#screens/Auth/SignIn';
import SignUpCompany from '#screens/Auth/SignUp/SignUpCompany';
import SignUpCoolingUser from '#screens/Auth/SignUp/SignUpCoolingUser';

import NavigatorHeader from './components/NavigatorHeader';

export type AuthRoutes = {
  Root: undefined;
  SignIn: undefined;
  SignUpCompany: undefined;
  SignUpCoolingUser: undefined;
  PasswordReset: undefined;
  PasswordRecoveryRequest: undefined;
  AppInfo: undefined;
};

export type AuthRoutePaths = keyof AuthRoutes;
export type AuthRouteProps<Path extends AuthRoutePaths> = NativeStackScreenProps<AuthRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<AuthRoutes, keyof AuthRoutes>;
  navigation: NativeStackNavigationProp<AuthRoutes, 'Root', undefined>;
}) => NativeStackNavigationOptions;

const NAVIGATOR_HEADER_TITLES: Record<keyof AuthRoutes, string | undefined> = {
  SignIn: 'Log in',
  SignUpCompany: 'Sign up',
  SignUpCoolingUser: 'Sign up',
  PasswordRecoveryRequest: 'Forgot Password',
  PasswordReset: 'Reset Password',
  AppInfo: 'FAQ',
  Root: undefined,
};

const Stack = createNativeStackNavigator<AuthRoutes>();

export default function AuthNavigator() {
  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;
    const headerShown = !routeName || routeName !== 'Root';

    return {
      ...props,
      headerShown,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={NAVIGATOR_HEADER_TITLES[routeName]}
          leftContent={
            <Appbar.BackAction
              // eslint-disable-next-line react/prop-types
              onPress={props.navigation.goBack}
              size={22}
            />
          }
        />
      ),
      contentStyle: { backgroundColor: colors.white },
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={AuthRoot} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUpCompany" component={SignUpCompany} />
      <Stack.Screen name="SignUpCoolingUser" component={SignUpCoolingUser} />
      <Stack.Screen name="PasswordRecoveryRequest" component={PasswordRecoveryRequest} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="AppInfo" component={AppInfo} />
    </Stack.Navigator>
  );
}
