import type { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import EditCoolingUser from '#screens/Dashboard/Management/EditCoolingUser';
import CoolingUsersSurvey from '#screens/Dashboard/Management/EditCoolingUser/CoolingUsersSurvey';

import type { TranslationPaths } from '#i18n/index';
import { useTranslationUtils } from '#i18n/utils';
import NavigatorHeader from '#navigation/components/NavigatorHeader';

export type EditCoolingUserStackRoutes = {
  Root: {
    farmerId: number;
    createdByOperator: boolean;
  };
  CoolingUsersSurvey: {
    farmerId: number;
    redirectTo?: string;
  };
};

export type EditCoolingUserStackRoutePaths = keyof EditCoolingUserStackRoutes;

export type EditCoolingUserStackRouteProps<Path extends EditCoolingUserStackRoutePaths> =
  NativeStackScreenProps<EditCoolingUserStackRoutes, Path>;

export const NAVIGATOR_HEADERS: Record<EditCoolingUserStackRoutePaths, TranslationPaths> = {
  Root: 'navigation.management.EditCoolingUser',
  CoolingUsersSurvey: 'navigation.history.BaseSurvey',
};

type ScreenOptions = (props: {
  route: RouteProp<EditCoolingUserStackRoutes, EditCoolingUserStackRoutePaths>;
  navigation: NativeStackNavigationProp<EditCoolingUserStackRoutes, EditCoolingUserStackRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<EditCoolingUserStackRoutes>();

export default function EditCoolingUserStack() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback(
    (props) => ({
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
    }),
    []
  );

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={EditCoolingUser} />
      <Stack.Screen name="CoolingUsersSurvey" component={CoolingUsersSurvey} />
    </Stack.Navigator>
  );
}
