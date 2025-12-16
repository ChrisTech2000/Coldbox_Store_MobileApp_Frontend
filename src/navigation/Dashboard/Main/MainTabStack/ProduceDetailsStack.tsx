import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import { AccountDetailsRoutes } from '#navigation/Dashboard/AccountDetails';
import type { CoolingUnit, DashboardProduce, User } from '#types/global';

import PayoutSettings from '#screens/Dashboard/AccountDetails/PayoutSettings';
import ProduceDetails from '#screens/Dashboard/Main/Dashboard/ProduceDetails';
import EditCrateWeightAndPricing from '#screens/Dashboard/Main/Dashboard/ProduceDetails/EditCrateWeightAndPricing';

import NavigatorHeader from '#navigation/components/NavigatorHeader';

export type ProduceDetailsStackRoutes = {
  Root: {
    produce: DashboardProduce;
    coolingUnit: CoolingUnit | null;
    currency: string;
    companyId: number;
  };
  EditCrateWeightAndPricing: {
    companyCurrency: string;
    coolingUnit: CoolingUnit | null;
    produce: DashboardProduce;
    companyId: number;
  };
  AddFarmerBankAccount: AccountDetailsRoutes['PayoutSettings'];
};

export type ProduceDetailsStackRoutePaths = keyof ProduceDetailsStackRoutes;

export type ProduceDetailsStackRouteProps<Path extends ProduceDetailsStackRoutePaths> =
  NativeStackScreenProps<ProduceDetailsStackRoutes, Path>;

type ScreenOptions = (props: {
  route: RouteProp<ProduceDetailsStackRoutes, ProduceDetailsStackRoutePaths>;
  navigation: NativeStackNavigationProp<ProduceDetailsStackRoutes, ProduceDetailsStackRoutePaths>;
}) => NativeStackNavigationOptions;

const NAVIGATOR_HEADERS: Record<ProduceDetailsStackRoutePaths, TranslationPaths | undefined> = {
  Root: 'navigation.bottomTabs.ProduceDetails',
  EditCrateWeightAndPricing: 'navigation.checkIn.CrateWeightAndPricing',
  AddFarmerBankAccount: 'navigation.dashboard.PayoutOptions',
};

const Stack = createNativeStackNavigator<ProduceDetailsStackRoutes>();

export default function ProduceDetailsStack() {
  const { t } = useTranslationUtils();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;
    // eslint-disable-next-line react/prop-types
    const produce = (props.route.params as { produce: DashboardProduce })?.produce;
    // eslint-disable-next-line react/prop-types
    const farmer = (props.route.params as { farmer: User })?.farmer;

    const translationPath = farmer
      ? 'navigation.management.AddUserBankAccount'
      : NAVIGATOR_HEADERS[routeName];
    const routeTitle = translationPath
      ? t(translationPath, {
          produceCode: produce?.movementCode,
          user: `${farmer?.firstName ?? ''} ${farmer?.lastName ?? ''}`,
        })
      : undefined;

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
                const parentNavigation = props.navigation.getParent();
                const tabNavigation = parentNavigation?.getParent?.();

                if (routeName === 'Root') {
                  if (tabNavigation && tabNavigation.navigate) {
                    tabNavigation.navigate('Dashboard');
                  }
                  // eslint-disable-next-line
                  // @ts-ignore
                  parentNavigation?.popToTop();
                  return;
                }
                // eslint-disable-next-line react/prop-types
                props.navigation.goBack();
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
      <Stack.Screen name="Root" component={ProduceDetails} />
      <Stack.Screen name="EditCrateWeightAndPricing" component={EditCrateWeightAndPricing} />
      <Stack.Screen name="AddFarmerBankAccount" component={PayoutSettings} />
    </Stack.Navigator>
  );
}
