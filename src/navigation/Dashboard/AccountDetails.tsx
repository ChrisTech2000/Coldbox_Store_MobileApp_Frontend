import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import AccountDetails from '#screens/Dashboard/AccountDetails';
import CoolingUsersSurvey from '#screens/Dashboard/Management/EditCoolingUser/CoolingUsersSurvey';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import NavigatorHeader from '#navigation/components/NavigatorHeader';

import type { EditCoolingUserStackRoutes } from './Management/EditCoolingUserStack';

export type AccountDetailsRoutes = {
  Root: undefined;
  CoolingUsersSurvey: EditCoolingUserStackRoutes['CoolingUsersSurvey'];
};

export type AccountDetailsRoutePaths = keyof AccountDetailsRoutes;

export type AccountDetailsRouteProps<Path extends AccountDetailsRoutePaths> =
  NativeStackScreenProps<AccountDetailsRoutes, Path>;

export const NAVIGATOR_HEADERS: Record<AccountDetailsRoutePaths, TranslationPaths> = {
  Root: 'navigation.dashboard.AccountDetails',
  CoolingUsersSurvey: 'navigation.history.BaseSurvey',
};

type ScreenOptions = (props: {
  route: RouteProp<AccountDetailsRoutes, AccountDetailsRoutePaths>;
  navigation: NativeStackNavigationProp<AccountDetailsRoutes, AccountDetailsRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<AccountDetailsRoutes>();

export default function AccountDetailsStack() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    return {
      ...props,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          // eslint-disable-next-line react/prop-types
          routeTitle={t(NAVIGATOR_HEADERS[props.route.name])}
          // eslint-disable-next-line react/prop-types
          leftContent={<Appbar.BackAction onPress={props.navigation.goBack} size={22} />}
        />
      ),
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={AccountDetails} />
      <Stack.Screen name="CoolingUsersSurvey" component={CoolingUsersSurvey} />
    </Stack.Navigator>
  );
}
