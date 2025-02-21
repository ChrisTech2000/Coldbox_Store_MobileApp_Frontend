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
import ContactsSharing from '#screens/Dashboard/AccountDetails/ContactsSharing';
import LocalizationPreferences from '#screens/Dashboard/AccountDetails/LocalizationPreferences';
import PayoutSettings from '#screens/Dashboard/AccountDetails/PayoutSettings';
import PersonalDetails from '#screens/Dashboard/AccountDetails/PersonalDetails';
import CoolingUsersSurvey from '#screens/Dashboard/Management/EditCoolingUser/CoolingUsersSurvey';

import type { TranslationLocales } from '#i18n/constants';
import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import NavigatorHeader from '#navigation/components/NavigatorHeader';
import type { EApiGender, ERoles, User } from '#types/global';

import type { EditCoolingUserStackRoutes } from '../Management/EditCoolingUserStack';
import CouponsSettingsStack from './CouponSettings';
import { goBackWithDrawer } from '#navigation/utils/navigationUtils';

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
  CouponStack: undefined;
  PayoutSettings:
    | {
        isCompanyView?: boolean;
        farmer?: User;
        recheckEligibility: () => void;
      }
    | undefined;
  //PaymentSettings: undefined;
};

export type AccountDetailsRoutePaths = keyof AccountDetailsRoutes;

export type AccountDetailsRouteProps<Path extends AccountDetailsRoutePaths> =
  NativeStackScreenProps<AccountDetailsRoutes, Path>;

export const NAVIGATOR_HEADERS: Record<AccountDetailsRoutePaths, TranslationPaths | undefined> = {
  Root: 'navigation.dashboard.AccountDetails',
  CoolingUsersSurvey: 'navigation.history.BaseSurvey',
  PersonalDetails: 'navigation.dashboard.PersonalDetails',
  LocalizationPreferences: 'navigation.dashboard.LocalizationPreferences',
  ContactsSharing: 'navigation.dashboard.ContactsSharing',
  CouponStack: undefined,
  PayoutSettings: 'navigation.dashboard.PayoutOptions',
};

type ScreenOptions = (props: {
  route: RouteProp<AccountDetailsRoutes, AccountDetailsRoutePaths>;
  navigation: NativeStackNavigationProp<AccountDetailsRoutes, AccountDetailsRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<AccountDetailsRoutes>();

export default function AccountDetailsStack() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const translationPath = NAVIGATOR_HEADERS[props.route.name];

    return {
      ...props,
      headerShown: !!translationPath,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={t(translationPath!)}
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
      <Stack.Screen name="Root" component={AccountDetails} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="LocalizationPreferences" component={LocalizationPreferences} />
      <Stack.Screen name="ContactsSharing" component={ContactsSharing} />
      <Stack.Screen name="CoolingUsersSurvey" component={CoolingUsersSurvey} />
      <Stack.Screen name="CouponStack" component={CouponsSettingsStack} />
      <Stack.Screen name="PayoutSettings" component={PayoutSettings} />
    </Stack.Navigator>
  );
}
