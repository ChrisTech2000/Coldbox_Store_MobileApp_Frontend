import type { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import ManagementRoot from '#screens/Dashboard/Management';
import AddCoolingUnit from '#screens/Dashboard/Management/AddCoolingUnit';
import AddCoolingUser from '#screens/Dashboard/Management/AddCoolingUser';
import AddLocation from '#screens/Dashboard/Management/AddLocation';
import AddOperator from '#screens/Dashboard/Management/AddOperator';
import AddRegisteredEmployee from '#screens/Dashboard/Management/AddRegisteredEmployee';
import CompanyDetails from '#screens/Dashboard/Management/CompanyDetails';
import CoolingUnits from '#screens/Dashboard/Management/CoolingUnits';
import CoolingUsers from '#screens/Dashboard/Management/CoolingUsers';
import EditCoolingUnit from '#screens/Dashboard/Management/EditCoolingUnit';
import EditLocation from '#screens/Dashboard/Management/EditLocation';
import EditOperator from '#screens/Dashboard/Management/EditOperator';
import Locations from '#screens/Dashboard/Management/Locations';
import Operators from '#screens/Dashboard/Management/Operators';
import RegisteredEmployee from '#screens/Dashboard/Management/RegisteredEmployee';
import RegisteredEmployeeDetails from '#screens/Dashboard/Management/RegisteredEmployeeDetails';
import RevenueAnalysis from '#screens/Dashboard/Management/RevenueAnalysis';
import UsageAnalysis from '#screens/Dashboard/Management/UsageAnalysis';

import NavigatorHeader, { type NavigationHeaderProps } from '../components/NavigatorHeader';

export type ManagementRoutes = {
  Root: undefined;
  CompanyDetails: undefined;
  RevenueAnalysis: undefined;
  UsageAnalysis: undefined;
  // Location related routes
  Locations: undefined;
  AddLocation: undefined;
  EditLocation: {
    name: string;
  };
  // Cooling Unit related routes
  CoolingUnits: undefined;
  AddCoolingUnit: undefined;
  EditCoolingUnit: {
    unitId: string;
  };
  // Operator related routes
  Operators: undefined;
  AddOperator: undefined;
  EditOperator: {
    firstName: string;
    familyName: string;
  };
  // Registered Employee related routes
  RegisteredEmployee: undefined;
  AddRegisteredEmployee: undefined;
  RegisteredEmployeeDetails: {
    firstName: string;
    familyName: string;
  };
  // Cooling User related routes
  CoolingUsers: undefined;
  AddCoolingUser: undefined;
  EditCoolingUser: {
    firstName: string;
    familyName: string;
  };
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

const NAVIGATOR_HEADER_TITLES: Record<ManagementRoutePaths, string | undefined> = {
  Root: 'Management',
  CompanyDetails: 'Company Details',
  RevenueAnalysis: 'Revenue analysis',
  UsageAnalysis: 'Usage Analysis',
  Locations: 'Locations',
  AddLocation: 'Add Location',
  EditLocation: 'Edit Location',
  CoolingUnits: 'Cooling Units',
  CoolingUsers: 'Cooling Users',
  AddCoolingUser: 'Add Cooling User',
  EditCoolingUser: 'Edit Cooling User',
  AddCoolingUnit: 'Add Cooling Unit',
  EditCoolingUnit: 'Edit Cooling Unit',
  Operators: 'Operators',
  AddOperator: 'Add Operator',
  EditOperator: 'Edit Operator',
  RegisteredEmployee: 'Registered Employee',
  AddRegisteredEmployee: 'Add Registered Employee',
  RegisteredEmployeeDetails: 'Registered Employee Details',
};

const Stack = createNativeStackNavigator<ManagementRoutes>();

export default function ManagementStack() {
  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;
    return {
      ...props,
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
      <Stack.Screen name="RevenueAnalysis" component={RevenueAnalysis} />
      <Stack.Screen name="UsageAnalysis" component={UsageAnalysis} />
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
    </Stack.Navigator>
  );
}

function _rightContentFactory(
  routeName: ManagementRoutePaths,
  navigation: NavigationProp<ManagementRoutes, ManagementRoutePaths>
): NavigationHeaderProps {
  switch (routeName) {
    case 'Locations':
      return {
        rightContent: (
          <Appbar.Action
            icon="plus-circle-outline"
            size={32}
            onPress={() => navigation.navigate('AddLocation')}
          />
        ),
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
            icon="plus-circle-outline"
            size={32}
            onPress={() => navigation.navigate('AddCoolingUser')}
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
