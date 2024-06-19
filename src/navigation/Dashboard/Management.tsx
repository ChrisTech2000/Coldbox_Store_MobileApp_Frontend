import React, { useCallback } from 'react';
import {
  createNativeStackNavigator,
  type NativeStackNavigationProp,
  type NativeStackNavigationOptions,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import ManagementRoot from '#screens/Dashboard/Management';
import CompanyDetails from '#screens/Dashboard/Management/CompanyDetails';
import Locations from '#screens/Dashboard/Management/Locations';
import AddLocation from '#screens/Dashboard/Management/AddLocation';
import EditLocation from '#screens/Dashboard/Management/EditLocation';

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
  EditCoolingUnit: undefined;
  // Operator related routes
  Operators: undefined;
  AddOperator: undefined;
  EditOperator: undefined;
  // Registered Employee related routes
  RegisteredEmployee: undefined;
  AddRegisteredEmployee: undefined;
  RegisteredEmployeeDetails: undefined;
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
  RevenueAnalysis: 'Revenue Analysis',
  UsageAnalysis: 'Usage Analysis',
  Locations: 'Locations',
  AddLocation: 'Add Location',
  EditLocation: 'Edit Location',
  CoolingUnits: 'Cooling Unit',
  AddCoolingUnit: 'Add Cooling Unit',
  EditCoolingUnit: 'Edit Cooling Unit',
  Operators: 'Operators',
  AddOperator: 'Add Operator',
  EditOperator: 'Edit Operator',
  RegisteredEmployee: 'Registered Employee',
  AddRegisteredEmployee: 'Add Registered Employee',
  RegisteredEmployeeDetails: 'Registered Employee Details',
};

const HEADER_RIGHT_CONTENT: Array<Partial<ManagementRoutePaths>> = ['Locations'];

const Stack = createNativeStackNavigator<ManagementRoutes>();

export default function ManagementStack() {
  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const focusedRouteName = props.route.name;
    return {
      ...props,
      header: (headerProps) => (
        <NavigatorHeader
          {...headerProps}
          routeTitle={NAVIGATOR_HEADER_TITLES[focusedRouteName]}
          leftContent={
            <Appbar.BackAction
              // eslint-disable-next-line react/prop-types
              onPress={props.navigation.goBack}
            />
          }
          // eslint-disable-next-line react/prop-types
          {...rightContentFactory(focusedRouteName, props.navigation)}
        />
      ),
      contentStyle: { backgroundColor: colors.white },
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={ManagementRoot} />
      <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
      <Stack.Screen name="Locations" component={Locations} />
      <Stack.Screen name="AddLocation" component={AddLocation} />
      <Stack.Screen name="EditLocation" component={EditLocation} />
    </Stack.Navigator>
  );
}

function rightContentFactory(
  focusedRouteName: ManagementRoutePaths,
  navigation: NavigationProp<ManagementRoutes, ManagementRoutePaths>
): NavigationHeaderProps {
  const showRightContent = HEADER_RIGHT_CONTENT.includes(focusedRouteName);
  if (!showRightContent) return {};

  switch (focusedRouteName) {
    case 'Locations':
      return {
        rightContent: (
          <Appbar.Action
            icon="plus-circle-outline"
            size={35}
            onPress={() => navigation.navigate('AddLocation')}
          />
        ),
      };

    default:
      return {};
  }
}
