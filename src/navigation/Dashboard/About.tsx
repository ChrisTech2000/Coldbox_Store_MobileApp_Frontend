import React, { useCallback } from 'react';
import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';

import About from '#screens/Dashboard/About';
import ComsolAgreement from '#screens/Dashboard/About/ComsolAgreement';
import UserAgreement from '#screens/Dashboard/About/UserAgreement';
import Privacy from '#screens/Dashboard/About/Privacy';
import ComsolAbout from '#screens/Dashboard/About/ComsolAbout';

import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import NavigatorHeader from '#navigation/components/NavigatorHeader';
import { goBackWithDrawer } from '#navigation/utils/navigationUtils';

export type AboutStackRoutes = {
  Root: undefined;
  ComsolAgreement: undefined;
  UserAgreement: undefined;
  Privacy: undefined;
  ComsolAbout: undefined;
};

export type AboutStackRoutePaths = keyof AboutStackRoutes;
export type AboutStackRouteProps<Path extends AboutStackRoutePaths> = NativeStackScreenProps<
  AboutStackRoutes,
  Path
>;

type ScreenOptions = (props: {
  route: RouteProp<AboutStackRoutes, AboutStackRoutePaths>;
  navigation: NativeStackNavigationProp<AboutStackRoutes, AboutStackRoutePaths>;
}) => NativeStackNavigationOptions;

export const NAVIGATOR_HEADERS: Record<AboutStackRoutePaths, TranslationPaths | undefined> = {
  Root: 'navigation.dashboard.About',
  ComsolAgreement: 'navigation.about.comsolAgreement',
  UserAgreement: 'navigation.about.userLicense',
  Privacy: 'navigation.about.privacyPolicy',
  ComsolAbout: 'navigation.about.aboutComsol',
};

const Stack = createNativeStackNavigator<AboutStackRoutes>();

export default function AboutStack() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;

    const translationPath = NAVIGATOR_HEADERS[routeName];
    const routeTitle = translationPath ? t(translationPath) : undefined;

    return {
      ...props,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={routeTitle}
          leftContent={
            <Appbar.BackAction
              onPress={() => {
                // eslint-disable-next-line react/prop-types
                goBackWithDrawer(props.navigation);
              }}
              size={22}
            />
          }
        />
      ),
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={About} />
      <Stack.Screen name="ComsolAgreement" component={ComsolAgreement} />
      <Stack.Screen name="UserAgreement" component={UserAgreement} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="ComsolAbout" component={ComsolAbout} />
    </Stack.Navigator>
  );
}
