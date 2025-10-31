import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
  type NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { Appbar } from 'react-native-paper';

import CheckIn from '#screens/Dashboard/Main/Dashboard/CheckIn/CheckIn';
import CrateSetup from '#screens/Dashboard/Main/Dashboard/CheckIn/CrateSetup';
import CropList from '#screens/Dashboard/Main/Dashboard/CheckIn/CropList';
import SelectCropType from '#screens/Dashboard/Main/Dashboard/CheckIn/SelectCropType';
import CrateWeightAndPricing, {
  resetCrateWeightPricingBridge,
} from '#screens/Dashboard/Main/Dashboard/CheckIn/CrateWeightAndPricing';

import { type Translator, type TranslationPaths, useTranslationUtils } from '#i18n/utils';
import NavigatorHeader from '#navigation/components/NavigatorHeader';
import { type ProduceCrate, useCheckInStore } from '#stores/checkIn';
import { ECropType, type CoolingUnit, type Crop, type Farmer } from '#types/global';
import { AccountDetailsRoutes } from '#navigation/Dashboard/AccountDetails';
import PayoutSettings from '#screens/Dashboard/AccountDetails/PayoutSettings';

export type CheckInStackRoutes = {
  CheckIn: { coolingUnit: CoolingUnit; user: Farmer; isTutorial?: boolean };
  AddFarmerBankAccount: AccountDetailsRoutes['PayoutSettings'];
  SelectCropType: undefined;
  CropList: { type: ECropType };
  CrateSetup:
    | {
        crop: Crop;
        additionalInfo: string;
      }
    | {
        contextualProduce: ProduceCrate;
      };
  CrateWeightAndPricing: {
    companyCurrency: string;
    crates: Array<{
      weight: number;
      isSellable: boolean;
      tag: string | undefined;
    }>;
    sellingPrice: number;
    applyToAll: boolean;
  };
};

export type CheckInStackRoutePaths = keyof CheckInStackRoutes;

export type CheckInStackRouteProps<Path extends CheckInStackRoutePaths> = NativeStackScreenProps<
  CheckInStackRoutes,
  Path
>;

export const NAVIGATOR_HEADERS: Record<CheckInStackRoutePaths, TranslationPaths | undefined> = {
  SelectCropType: 'navigation.checkIn.SelectCropType',
  CheckIn: 'navigation.checkIn.CheckIn',
  CropList: 'navigation.checkIn.CropList',
  CrateSetup: 'navigation.checkIn.CrateSetup',
  CrateWeightAndPricing: 'navigation.checkIn.CrateWeightAndPricing',
  AddFarmerBankAccount: 'navigation.management.AddUserBankAccount',
};

type ScreenOptions = (props: {
  route: RouteProp<CheckInStackRoutes, CheckInStackRoutePaths>;
  navigation: NativeStackNavigationProp<CheckInStackRoutes, CheckInStackRoutePaths>;
}) => NativeStackNavigationOptions;

const Stack = createNativeStackNavigator<CheckInStackRoutes>();

export default function CheckInStack() {
  const { t } = useTranslationUtils();
  const resetCheckInStore = useCheckInStore((store) => store.resetCheckInStore);

  const screenOptions: ScreenOptions = useCallback((props) => {
    // eslint-disable-next-line react/prop-types
    const routeName = props.route.name;
    // eslint-disable-next-line react/prop-types
    const type = (props.route.params as { type: ECropType })?.type;
    const cropType = mapCroppedType(type, t);
    // eslint-disable-next-line react/prop-types
    const farmer = (props.route.params as { user: Farmer })?.user?.user;

    const translationPath = NAVIGATOR_HEADERS[routeName];
    const routeTitle = translationPath
      ? t(translationPath, {
          cropType,
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
                props.navigation.goBack();
                switch (routeName) {
                  case 'CheckIn':
                    return resetCheckInStore();
                  case 'CrateSetup':
                    return resetCrateWeightPricingBridge();
                  default:
                    return;
                }
              }}
              size={22}
            />
          }
        />
      ),
      gestureDirection: 'vertical',
      animationDuration: 180,
    };
  }, []);

  return (
    <Stack.Navigator initialRouteName="CheckIn" screenOptions={screenOptions}>
      <Stack.Screen name="CheckIn" component={CheckIn} />
      <Stack.Screen name="SelectCropType" component={SelectCropType} />
      <Stack.Screen name="CropList" component={CropList} />
      <Stack.Screen name="CrateSetup" component={CrateSetup} />
      <Stack.Screen name="CrateWeightAndPricing" component={CrateWeightAndPricing} />
      <Stack.Screen name="AddFarmerBankAccount" component={PayoutSettings} />
    </Stack.Navigator>
  );
}

function mapCroppedType(type: ECropType, t: Translator) {
  switch (type) {
    case ECropType.FRUITS:
      return t('Dashboard.CrateManagement.CheckIn.SelectCropType.fruits');
    case ECropType.VEGETABLES:
      return t('Dashboard.CrateManagement.CheckIn.SelectCropType.vegetables');
    case ECropType.ROOT_VEGETABLES:
      return t('Dashboard.CrateManagement.CheckIn.SelectCropType.rootVegetables');
    case ECropType.OTHER:
      return t('Dashboard.CrateManagement.CheckIn.SelectCropType.other');
  }
}
