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
import PersonalDetails from '#screens/Dashboard/AccountDetails/PersonalDetails';
import LocalizationPreferences from '#screens/Dashboard/AccountDetails/LocalizationPreferences';
import ContactsSharing from '#screens/Dashboard/AccountDetails/ContactsSharing';

import type { TranslationPaths } from '#i18n/index';
import type { TranslationLocales } from '#i18n/constants';
import type { EApiGender, ERoles } from '#types/global';
import { useTranslationUtils } from '#i18n/utils';
import NavigatorHeader from '#navigation/components/NavigatorHeader';

import type { EditCoolingUserStackRoutes } from './Management/EditCoolingUserStack';

export type DetailsSectionParams = {
  kind: ERoles;
  firstName: string;
  lastName: string;
  phone: string;
  language: TranslationLocales;
  gender: EApiGender;
  email: string;
  parentName: string;
  country: string;
  userCode: string;
  userId: number;
  farmerId: number;
};

export type AccountDetailsRoutes = {
  Root: undefined;
  PersonalDetails: DetailsSectionParams;
  LocalizationPreferences: DetailsSectionParams;
  ContactsSharing: undefined;
  CoolingUsersSurvey: EditCoolingUserStackRoutes['CoolingUsersSurvey'];
};

export type AccountDetailsRoutePaths = keyof AccountDetailsRoutes;

export type AccountDetailsRouteProps<Path extends AccountDetailsRoutePaths> =
  NativeStackScreenProps<AccountDetailsRoutes, Path>;

export const NAVIGATOR_HEADERS: Record<AccountDetailsRoutePaths, TranslationPaths> = {
  Root: 'navigation.dashboard.AccountDetails',
  CoolingUsersSurvey: 'navigation.history.BaseSurvey',
  PersonalDetails: 'navigation.dashboard.PersonalDetails',
  LocalizationPreferences: 'navigation.dashboard.LocalizationPreferences',
  ContactsSharing: 'navigation.dashboard.ContactsSharing',
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
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="LocalizationPreferences" component={LocalizationPreferences} />
      <Stack.Screen name="ContactsSharing" component={ContactsSharing} />
      <Stack.Screen name="CoolingUsersSurvey" component={CoolingUsersSurvey} />
    </Stack.Navigator>
  );
}
