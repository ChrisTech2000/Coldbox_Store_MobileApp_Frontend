import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import type { TranslationPaths } from '#i18n/index';
import type { CoolingUnit, Crate, DashboardProduce } from '#types/global';

import ProduceDetails from '#screens/Dashboard/Main/Dashboard/ProduceDetails';
import EditCrateWeightAndPricing from '#screens/Dashboard/Main/Dashboard/ProduceDetails/EditCrateWeightAndPricing';

import NavigatorHeader from '#navigation/components/NavigatorHeader';

import { useTranslationUtils } from '#i18n/utils';
import RBAC from '#common/RBAC';

export type ProduceDetailsStackRoutes = {
  Root: {
    produce: DashboardProduce;
    coolingUnit: CoolingUnit | null;
    currency: string;
  };
  EditCrateWeightAndPricing: {
    companyCurrency: string;
    currencySymbol: string;
    crates: Array<Crate>;
    farmerId: number;
  };
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
};

const Stack = createNativeStackNavigator<ProduceDetailsStackRoutes>();

export default function ProduceDetailsStack() {
  const { t } = useTranslationUtils();
  const { guard } = RBAC.useRBAC();

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;
    // eslint-disable-next-line react/prop-types
    const produce = (props.route.params as { produce: DashboardProduce })?.produce;

    const translationPath = NAVIGATOR_HEADERS[routeName];
    const routeTitle = translationPath
      ? t(translationPath, { produceCode: produce?.movementCode })
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
                props.navigation.goBack();
              }}
              size={22}
            />
          }
        />
      ),
    };
  }, []);

  const navToEditListedCrates = guard('SET', 'MarketplaceEditListedCrates');

  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={screenOptions}>
      <Stack.Screen name="Root" component={ProduceDetails} />
      {navToEditListedCrates ? (
        <Stack.Screen name="EditCrateWeightAndPricing" component={EditCrateWeightAndPricing} />
      ) : null}
    </Stack.Navigator>
  );
}
