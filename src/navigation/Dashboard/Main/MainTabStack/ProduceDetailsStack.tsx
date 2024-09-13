import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import type { CoolingUnit, Crate, DashboardProduce } from '#types/global';
import type { TranslationPaths } from '#i18n/index';

import ProduceDetails from '#screens/Dashboard/Main/Dashboard/ProduceDetails';
import MarketplaceSettings from '#screens/Dashboard/Main/Dashboard/ProduceDetails/MarketplaceSettings';
import EditCrateWeightAndPricing from '#screens/Dashboard/Main/Dashboard/ProduceDetails/EditCrateWeightAndPricing';

import NavigatorHeader from '#navigation/components/NavigatorHeader';

import {
  type MarketplaceCrateDatum,
  useMarketplaceSettingsStore,
} from '#screens/Dashboard/Main/Dashboard/ProduceDetails/store';
import { useTranslationUtils } from '#i18n/utils';

export type ProduceDetailsStackRoutes = {
  Root: {
    produce: DashboardProduce;
    coolingUnit: CoolingUnit | null;
    currency: string;
  };
  MarketplaceSettings: {
    crates: Array<Crate>;
    produceShelfLife: number;
    companyCurrency: string;
  };
  EditCrateWeightAndPricing: {
    companyCurrency: string;
  } & MarketplaceCrateDatum;
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
  MarketplaceSettings: 'navigation.bottomTabs.MarketplaceSettings',
  EditCrateWeightAndPricing: 'navigation.checkIn.CrateWeightAndPricing',
};

const Stack = createNativeStackNavigator<ProduceDetailsStackRoutes>();

export default function ProduceDetailsStack() {
  const { t } = useTranslationUtils();

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
                switch (routeName) {
                  case 'MarketplaceSettings':
                    return useMarketplaceSettingsStore.getState().reset();
                  default:
                    return;
                }
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
      <Stack.Screen name="MarketplaceSettings" component={MarketplaceSettings} />
      <Stack.Screen name="EditCrateWeightAndPricing" component={EditCrateWeightAndPricing} />
    </Stack.Navigator>
  );
}
