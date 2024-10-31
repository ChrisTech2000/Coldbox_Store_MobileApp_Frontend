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
import SignIn, { type EAccountProfile } from '#screens/Auth/SignIn';
import SignUpCompany from '#screens/Auth/SignUp/SignUpCompany';
import SignUpCoolingUser from '#screens/Auth/SignUp/SignUpCoolingUser';
import Invite from '#screens/Auth/Invite';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';

import NavigatorHeader from './components/NavigatorHeader';

export type AuthRoutes = {
  Root: undefined;
  SignIn?: {
    accountProfile: EAccountProfile;
  };
  SignUpCompany: undefined;
  SignUpCoolingUser: undefined;
  PasswordRecoveryRequest: undefined;
  PasswordReset: {
    resetCode: string;
    phoneNumber: string;
  };
  AppInfo: undefined;
  Invite: {
    userType: string;
    inviteCode: string;
    phoneNumber: string;
  };
};

export type AuthRoutePaths = keyof AuthRoutes;
export type AuthRouteProps<Path extends AuthRoutePaths> = NativeStackScreenProps<AuthRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<AuthRoutes, keyof AuthRoutes>;
  navigation: NativeStackNavigationProp<AuthRoutes, 'Root', undefined>;
}) => NativeStackNavigationOptions;

const NAVIGATOR_HEADERS: Record<keyof AuthRoutes, TranslationPaths | undefined> = {
  SignIn: 'navigation.auth.SignIn',
  SignUpCompany: 'navigation.auth.SignUp',
  SignUpCoolingUser: 'navigation.auth.SignUp',
  PasswordRecoveryRequest: 'navigation.auth.ForgotPassword',
  PasswordReset: 'navigation.auth.PasswordReset',
  AppInfo: 'navigation.auth.AppInfo',
  Root: undefined,
  Invite: 'navigation.auth.SignUp',
};

const Stack = createNativeStackNavigator<AuthRoutes>();

export default function AuthNavigator() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;
    const headerShown = !routeName || routeName !== 'Root';

    const translationPath = NAVIGATOR_HEADERS[routeName];
    const routeTitle = translationPath ? t(translationPath) : undefined;

    return {
      ...props,
      headerShown,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={routeTitle}
          leftContent={
            <Appbar.BackAction
              onPress={() => {
                switch (routeName) {
                  case 'Invite':
                  case 'SignIn':
                    // eslint-disable-next-line react/prop-types
                    return props.navigation.goBack();
                  default:
                    // eslint-disable-next-line react/prop-types
                    return props.navigation.navigate('Root');
                }
              }}
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
      <Stack.Screen name="Invite" component={Invite} />
    </Stack.Navigator>
  );
}
