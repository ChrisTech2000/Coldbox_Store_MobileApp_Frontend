import type { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Dimensions } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { Appbar } from 'react-native-paper';

import PayoutSettings from '#screens/Dashboard/AccountDetails/PayoutSettings';
import EditCheckIn from '#screens/Dashboard/Main/History/EditCheckIn';
import ManagementRoot from '#screens/Dashboard/Management';
import AddCoolingUnit from '#screens/Dashboard/Management/AddCoolingUnit';
import AddCoolingUser from '#screens/Dashboard/Management/AddCoolingUser';
import AddLocation from '#screens/Dashboard/Management/AddLocation';
import AddOperator from '#screens/Dashboard/Management/AddOperator';
import AddRegisteredEmployee from '#screens/Dashboard/Management/AddRegisteredEmployee';
import RevenueAnalysis from '#screens/Dashboard/Management/Analysis/RevenueAnalysis';
import UsageAnalysis from '#screens/Dashboard/Management/Analysis/UsageAnalysis';
import CompanyDetails from '#screens/Dashboard/Management/CompanyDetails';
import CoolingUnits from '#screens/Dashboard/Management/CoolingUnits';
import CoolingUsers from '#screens/Dashboard/Management/CoolingUsers';
import DeliveryContacts from '#screens/Dashboard/Management/DeliveryContacts';
import LegacyContacts from '#screens/Dashboard/Management/DeliveryContacts/LegacyContacts';
import EditCoolingUnit from '#screens/Dashboard/Management/EditCoolingUnit';
import EditLocation from '#screens/Dashboard/Management/EditLocation';
import EditOperator from '#screens/Dashboard/Management/EditOperator';
import Locations from '#screens/Dashboard/Management/Locations';
import Operators from '#screens/Dashboard/Management/Operators';
import RegisteredEmployee from '#screens/Dashboard/Management/RegisteredEmployee';
import RegisteredEmployeeDetails from '#screens/Dashboard/Management/RegisteredEmployeeDetails';
import { AddCoolingUserNavigationOverLay } from '#screens/Dashboard/Tutorial/AddCoolingUserNavigationOverlay';
import { EOperatorTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';

import { LanguageManager, useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import { goBackWithDrawer } from '#navigation/utils/navigationUtils';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { Farmer } from '#types/global';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import NavigatorHeader, { type NavigationHeaderProps } from '../../components/NavigatorHeader';
import CouponsSettingsStack from '../AccountDetails/CouponSettings';
import MarketSurveyStack, {
  MarketSurveyStackRoutes,
} from '../Main/HistoryTabStack/MarketSurveyStack';
import EditCoolingUserStack, { type EditCoolingUserStackRoutes } from './EditCoolingUserStack';

export type ManagementRoutes = {
  Root: undefined;
  CompanyDetails: undefined;
  // Location related routes
  RevenueAnalysis: undefined;
  UsageAnalysis: undefined;
  EditCheckIn: {
    movement: GetMovementsHistoryResponse[number];
    coolingUnitId?: number;
  };
  MarketSurveyStack: {
    screen: keyof MarketSurveyStackRoutes;
    params: MarketSurveyStackRoutes[keyof MarketSurveyStackRoutes];
  };
  // Location related routes
  Locations: undefined;
  AddLocation: undefined;
  EditLocation: {
    locationId: number;
    companyId: number;
  };
  // Cooling Unit related routes
  CoolingUnits: undefined;
  AddCoolingUnit: undefined;
  EditCoolingUnit: {
    coolingUnitId: number;
  };
  // Operator related routes
  Operators: undefined;
  AddOperator: undefined;
  EditOperator: {
    userId: number;
  };
  // Registered Employee related routes
  RegisteredEmployee: undefined;
  AddRegisteredEmployee: undefined;
  RegisteredEmployeeDetails: {
    registeredEmployeeId: number;
  };
  // Cooling User related routes
  CoolingUsers: undefined;
  AddCoolingUser?: {
    farmer: Farmer;
  };
  EditCoolingUserStack: {
    screen: keyof EditCoolingUserStackRoutes;
    params: EditCoolingUserStackRoutes[keyof EditCoolingUserStackRoutes];
  };
  CouponStack: { source: string } | undefined;
  PayoutSettings:
    | {
        isCompanyView?: boolean;
      }
    | undefined;
  DeliveryContacts: undefined;
  LegacyContacts: undefined;
};

export type ManagementRoutePaths = keyof ManagementRoutes;
export type ManagementRouteProps<Path extends ManagementRoutePaths> = NativeStackScreenProps<
  ManagementRoutes,
  Path
>;

type ScreenOptions = (props: {
  route: RouteProp<ManagementRoutes, ManagementRoutePaths>;
  navigation: NativeStackNavigationProp<ManagementRoutes, 'Root', undefined>;
}) => NativeStackNavigationOptions;

const NAVIGATOR_HEADERS: Record<ManagementRoutePaths, TranslationPaths | undefined> = {
  Root: 'navigation.management.Root',
  CompanyDetails: 'navigation.management.CompanyDetails',
  RevenueAnalysis: 'navigation.management.RevenueAnalysis',
  UsageAnalysis: 'navigation.management.UsageAnalysis',
  EditCheckIn: 'navigation.history.EditCheckIn',
  MarketSurveyStack: undefined,
  Locations: 'navigation.management.Locations',
  AddLocation: 'navigation.management.AddLocation',
  EditLocation: 'navigation.management.EditLocation',
  CoolingUnits: 'navigation.management.CoolingUnits',
  CoolingUsers: 'navigation.management.CoolingUsers',
  AddCoolingUser: 'navigation.management.AddCoolingUser',
  EditCoolingUserStack: undefined,
  AddCoolingUnit: 'navigation.management.AddCoolingUnit',
  EditCoolingUnit: 'navigation.management.EditCoolingUnit',
  Operators: 'navigation.management.Operators',
  AddOperator: 'navigation.management.AddOperator',
  EditOperator: 'navigation.management.EditOperator',
  RegisteredEmployee: 'navigation.management.RegisteredEmployee',
  AddRegisteredEmployee: 'navigation.management.AddRegisteredEmployee',
  RegisteredEmployeeDetails: 'navigation.management.RegisteredEmployeeDetails',
  CouponStack: undefined,
  PayoutSettings: 'navigation.dashboard.PayoutOptions',
  DeliveryContacts: 'navigation.management.DeliveryContacts',
  LegacyContacts: 'navigation.management.LegacyContacts',
};

const Stack = createNativeStackNavigator<ManagementRoutes>();

export default function ManagementStack() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;

    // eslint-disable-next-line react/prop-types
    const code = (props.route.params as { movement: GetMovementsHistoryResponse[number] })?.movement
      ?.code;

    const translationPath = NAVIGATOR_HEADERS[routeName];
    const routeTitle = translationPath ? t(translationPath, { code }) : undefined;

    return {
      ...props,
      headerShown: !!translationPath,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={routeTitle}
          leftContent={
            <Appbar.BackAction
              // eslint-disable-next-line react/prop-types
              onPress={props.navigation.goBack}
              size={22}
            />
          }
          // eslint-disable-next-line react/prop-types
          {..._rightContentFactory(routeName, props.navigation)}
        />
      ),
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={ManagementRoot} />
      <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
      <Stack.Screen name="CoolingUsers" component={CoolingUsers} />
      <Stack.Screen name="AddCoolingUser" component={AddCoolingUser} />
      <Stack.Screen name="EditCoolingUserStack" component={EditCoolingUserStack} />
      <Stack.Screen name="RevenueAnalysis" component={RevenueAnalysis} />
      <Stack.Screen name="UsageAnalysis" component={UsageAnalysis} />
      <Stack.Screen name="EditCheckIn" component={EditCheckIn} />
      <Stack.Screen name="Locations" component={Locations} />
      <Stack.Screen name="AddLocation" component={AddLocation} />
      <Stack.Screen name="EditLocation" component={EditLocation} />
      <Stack.Screen name="CoolingUnits" component={CoolingUnits} />
      <Stack.Screen name="AddCoolingUnit" component={AddCoolingUnit} />
      <Stack.Screen name="EditCoolingUnit" component={EditCoolingUnit} />
      <Stack.Screen name="Operators" component={Operators} />
      <Stack.Screen name="AddOperator" component={AddOperator} />
      <Stack.Screen name="EditOperator" component={EditOperator} />
      <Stack.Screen name="RegisteredEmployee" component={RegisteredEmployee} />
      <Stack.Screen name="AddRegisteredEmployee" component={AddRegisteredEmployee} />
      <Stack.Screen name="RegisteredEmployeeDetails" component={RegisteredEmployeeDetails} />
      <Stack.Screen name="MarketSurveyStack" component={MarketSurveyStack} />
      <Stack.Screen
        name="CouponStack"
        component={CouponsSettingsStack}
        initialParams={{ source: 'Management' }}
      />
      <Stack.Screen name="DeliveryContacts" component={DeliveryContacts} />
      <Stack.Screen name="LegacyContacts" component={LegacyContacts} />
      <Stack.Screen
        name="PayoutSettings"
        // eslint-disable-next-line
        // @ts-ignore
        component={PayoutSettings}
      />
    </Stack.Navigator>
  );
}

function _rightContentFactory(
  routeName: ManagementRoutePaths,
  navigation: NavigationProp<ManagementRoutes, ManagementRoutePaths>
): NavigationHeaderProps {
  const isRTL = LanguageManager.isRTL;

  const { onLayout } = useWalkthroughStep({
    number: EOperatorTutorialSteps.ADD_COOLING_USER_NAVIGATION_STEP,
    OverlayComponent: AddCoolingUserNavigationOverLay,
    layoutAdjustments: {
      x: isRTL ? Dimensions.get('window').width - 58 : undefined,
    },
  });

  switch (routeName) {
    case 'Root':
      return {
        leftContent: (
          <Appbar.BackAction
            size={22}
            onPress={() => {
              goBackWithDrawer(navigation);
            }}
          />
        ),
      };
    case 'AddLocation':
      return {
        leftContent: (
          <Appbar.BackAction size={22} onPress={() => navigation.navigate('Locations')} />
        ),
      };
    case 'Locations':
      return {
        rightContent: (
          <Appbar.Action
            icon="plus-circle-outline"
            size={32}
            onPress={() => navigation.navigate('AddLocation')}
          />
        ),
        leftContent: <Appbar.BackAction size={22} onPress={() => navigation.goBack()} />,
      };
    case 'CoolingUnits':
      return {
        rightContent: (
          <Appbar.Action
            icon="plus-circle-outline"
            size={32}
            onPress={() => navigation.navigate('AddCoolingUnit')}
          />
        ),
      };
    case 'CoolingUsers':
      return {
        rightContent: (
          <Appbar.Action
            onLayout={onLayout}
            icon="plus-circle-outline"
            size={32}
            onPress={() => emitter.emit(APP_EVENTS.DISPATCH_CU_PROMPT, true)}
          />
        ),
      };
    case 'Operators':
      return {
        rightContent: (
          <Appbar.Action
            icon="plus-circle-outline"
            size={32}
            onPress={() => navigation.navigate('AddOperator')}
          />
        ),
      };
    case 'RegisteredEmployee':
      return {
        rightContent: (
          <Appbar.Action
            icon="plus-circle-outline"
            size={32}
            onPress={() => navigation.navigate('AddRegisteredEmployee')}
          />
        ),
      };
    default:
      return {};
  }
}
