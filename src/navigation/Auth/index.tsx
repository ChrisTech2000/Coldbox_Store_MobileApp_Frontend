import React from 'react';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import colors from 'tailwindcss/colors';

import AuthRoot from '#screens/Auth/Root';
import SignIn from '#screens/Auth/SignIn';
import SignUpCompany from '#screens/Auth/SignUpCompany';
import SignUpCoolingUser from '#screens/Auth/SignUpCoolingUser';
import PasswordRecovery from '#screens/Auth/PasswordRecovery';
import AppInfo from '#screens/Auth/AppInfo';

import NavigatorHeader from './components/Header';

export type AuthRoutes = {
  Root: undefined;
  SignIn: undefined;
  SignUpCompany: undefined;
  SignUpCoolingUser: undefined;
  PasswordRecovery: undefined;
  AppInfo: undefined;
};

export type AuthRoutePaths = keyof AuthRoutes;

export type AuthRouteProps<Path extends AuthRoutePaths> = NativeStackScreenProps<AuthRoutes, Path>;

const Stack = createNativeStackNavigator<AuthRoutes>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={(props) => {
        // eslint-disable-next-line react/prop-types
        const focusedRouteName = props.route.name;
        const headerShown = !focusedRouteName || focusedRouteName !== 'Root';
        return {
          ...props,
          headerShown,
          header: NavigatorHeader,
          contentStyle: { backgroundColor: colors.white },
        };
      }}
    >
      <Stack.Screen name="Root" component={AuthRoot} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUpCompany" component={SignUpCompany} />
      <Stack.Screen name="SignUpCoolingUser" component={SignUpCoolingUser} />
      <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
      <Stack.Screen name="AppInfo" component={AppInfo} />
    </Stack.Navigator>
  );
}
