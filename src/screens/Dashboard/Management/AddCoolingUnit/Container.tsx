import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import ColdRoom from '#assets/icons/coldroom.svg';
import { Button } from '#ui/components/Button';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';

import { useTranslationUtils } from '#i18n/utils';
import { AddCoolingUnitOverlay } from '#screens/Dashboard/Tutorial/AddCoolingUnitOverlay';
import { EEmployeeTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import { ERoles } from '#types/global';
import reportCrash from '#ui/lib/reportCrash';

import InAppNotifications from '#common/InAppNotifications';
import FormFields from './components/FormFields';
import { METRIC_UNITS, PRICING_TYPE } from './constants';
import DataAggregator from './contexts/DataAggregator';
import FormManager, { type FormValues, type PreprocessedFormValues } from './contexts/FormManager';

type Props = {
  companyId: number | undefined;
};

const BACKEND_COMPLIANT_DEFAULT_VALUE = '';

export default function ScreenContainer(props: Props) {
  const { isLoading, companyCrops } = DataAggregator.useDataAggregator();
  const toast = InAppNotifications.useToast();

  const navigation = useNavigation();

  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();

  const initialFormValues = useRef<FormValues | undefined>(undefined);
  useFocusEffect(() => (initialFormValues.current = undefined));

  useWalkthroughStep({
    number: EEmployeeTutorialSteps.ADD_COOLING_UNIT_STEP,
    OverlayComponent: AddCoolingUnitOverlay,
    fullScreen: true,
  });

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!initialFormValues.current) {
    initialFormValues.current = _buildInitialValues(
      Object.keys(companyCrops).map((key) => parseInt(key))
    );
  }

  async function onSubmit(values: PreprocessedFormValues): Promise<void> {
    try {
      await ColdtivateService.addCoolingUnit({
        name: values.name,
        location: values.location as number,
        metric: values.metricUnit,
        capacityInNumberCrates: values.capacityInNumberCrates,
        capacityInMetricTons: values.capacityInMetricTons,
        foodCapacityInMetricTons: values.foodCapacityInMetricTons,
        fixedPrice: values.priceType === PRICING_TYPE.FIXED,
        price: values.price,
        sensor: values.sensor,
        public: values.public,
        sensorData: values.sensorData ?? BACKEND_COMPLIANT_DEFAULT_VALUE,
        powerOptions: {
          powerConsumptionInMt: values.powerConsumptionInMt,
          dailyRoomWattage: values.dailyRoomWattage,
          powerSourceDieselPercent: values.powerSourceDieselPercent,
          powerSourceGridPercent: values.powerSourceGridPercent,
          powerSourcePvPercent: values.powerSourcePvPercent,
          powerSourceBiomassPercent: values.powerSourceBiomassPercent,
          powerSourceDieselConsumptionKwh: values.powerSourceDieselConsumptionKwh,
          pvPanelCount: values.pvPanelCount,
          pvPanelSize: values.pvPanelSize,
          pvPanelWeight: values.pvPanelWeight,
          pvPanelMaxPower: values.pvPanelMaxPower,
          batteryCount: values.batteryCount,
          batteryWeight: values.batteryWeight,
          batteryCapacity: values.batteryCapacity,
          batteryMaxCurrent: values.batteryMaxCurrent,
          batteryPeakEnergyStorage: values.batteryPeakEnergyStorage,
          refrigerantType: values.refrigerantType,
          amountRefrigerant: values.amountRefrigerant,
          roomInsulator: values.roomInsulator,
          batteryType: values.batteryType,
          powerSource: values.powerSource ?? BACKEND_COMPLIANT_DEFAULT_VALUE,
          electricityStorageSystem:
            values.electricityStorageSystem ?? BACKEND_COMPLIANT_DEFAULT_VALUE,
          thermalStorageMethod: values.thermalStorageMethod ?? BACKEND_COMPLIANT_DEFAULT_VALUE,
          pvPanelType: values.pvPanelType ?? BACKEND_COMPLIANT_DEFAULT_VALUE,
        },
        operators: values.operators,
        crops: values.crops,
        cropUpdates: values.cropSpecificPricing,
        crateLength: values.crateLength,
        crateWidth: values.crateWidth,
        crateHeight: values.crateHeight,
        crateWeight: values.crateWeight,
        roomWeight: values.roomWeight,
        roomHeight: values.roomHeight,
        roomLength: values.roomLength,
        roomWidth: values.roomWidth,
        coolingUnitType: values.coolingUnitType ?? BACKEND_COMPLIANT_DEFAULT_VALUE,
        editableCheckins: values.editableCheckins,
      });

      toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.addSuccess'), {
        type: 'md_success',
      });

      await Promise.allSettled([
        mutate(getQueryKey('getLocations', props.companyId)),
        ...(typeof user?.id !== 'undefined' && typeof props.companyId !== 'undefined'
          ? [
              mutate(
                getQueryKey('getCoolingUnits', {
                  ...(user.role === ERoles.EMPLOYEE
                    ? { company: props.companyId }
                    : { operator: user.id }),
                })
              ),
            ]
          : []),
      ]);

      navigation.goBack();
    } catch (exception) {
      reportCrash(exception as Error);
    }
  }

  return (
    <View tw="flex-1">
      <FormManager onSubmit={onSubmit} initialValues={initialFormValues.current}>
        {({ submitHandler, isSubmitting }) => (
          <React.Fragment>
            <KeyboardAwareScrollView
              keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
              showsVerticalScrollIndicator={false}
            >
              <View tw="pt-5">
                <View tw="flex-row items-center space-x-3 mb-3 mx-3.5">
                  <ColdRoom width={28} height={28} color={paperTheme.colors.primary} />
                  <Text tw="text-lg">{t('Dashboard.Management.AddCoolingUnit.heading')}</Text>
                </View>

                <View tw="pb-28">
                  <FormFields />
                </View>
              </View>
            </KeyboardAwareScrollView>

            <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-5 pt-4 absolute bottom-0 left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
              <Button
                tw="w-full"
                mode="contained"
                onPress={submitHandler}
                icon={isSubmitting ? undefined : 'plus-circle-outline'}
                uppercase
                disabled={isSubmitting}
              >
                {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.add')}
              </Button>
            </HideWithKeyboardView>
          </React.Fragment>
        )}
      </FormManager>
    </View>
  );
}

function _buildInitialValues(crops: Array<number>) {
  return {
    name: '',
    location: null,
    coolingUnitType: null,
    priceType: PRICING_TYPE.PER_DAY,
    metricUnit: METRIC_UNITS.CRATES,
    price: '0',
    capacityInMetricTons: '0',
    foodCapacityInMetricTons: '0',
    roomLength: '0',
    roomWidth: '0',
    roomHeight: '0',
    roomWeight: '0',
    roomInsulator: '0',
    capacityInNumberCrates: '0',
    crateWeight: '25',
    crateLength: '0',
    crateWidth: '0',
    crateHeight: '0',
    editableCheckins: true,
    sensor: false,
    sensorData: undefined,
    public: false,
    operators: [],
    crops,
    cropSpecificPricing: [],
    refrigerantType: 'other',
    amountRefrigerant: '0',
    powerConsumptionInMt: '0',
    dailyRoomWattage: '0',
    powerSource: null,
    electricityStorageSystem: null,
    powerSourceDieselConsumptionKwh: '0',
    pvPanelCount: '0',
    pvPanelType: null,
    pvPanelSize: '0',
    pvPanelWeight: '0',
    pvPanelMaxPower: '0',
    powerSourceDieselPercent: '0',
    powerSourceGridPercent: '0',
    powerSourcePvPercent: '0',
    powerSourceBiomassPercent: '0',
    batteryType: null,
    batteryCount: '0',
    batteryWeight: '0',
    batteryCapacity: '0',
    batteryMaxCurrent: '0',
    batteryPeakEnergyStorage: '0',
    thermalStorageMethod: null,
  } satisfies FormValues;
}
