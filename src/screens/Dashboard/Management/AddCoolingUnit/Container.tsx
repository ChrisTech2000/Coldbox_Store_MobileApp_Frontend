import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { useWalkthroughStep } from 'react-native-interactive-walkthrough';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';

import ColdRoom from '#assets/icons/coldroom.svg';
import { Button } from '#ui/components/Button';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';

import { useTranslationUtils } from '#i18n/utils';
import { AddCoolingUnitOverlay } from '#screens/Dashboard/Tutorial/AddCoolingUnitOverlay';
import { EEmployeeTutorialSteps } from '#screens/Dashboard/Tutorial/utils/constants';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';

import InAppNotifications from '#common/InAppNotifications';
import FormFields from './components/FormFields';
import { METRIC_UNITS, PRICING_TYPE } from './constants';
import DataAggregator from './contexts/DataAggregator';
import FormManager, { type FormValues, type PreprocessedFormValues } from './contexts/FormManager';

type Props = {
  companyId: number | undefined;
};

export default function ScreenContainer(props: Props) {
  const initialFormValues = useRef<FormValues>(_buildInitialValues());
  const navigation = useNavigation();

  const { isLoading } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();

  const toast = InAppNotifications.useToast();

  const { onLayout } = useWalkthroughStep({
    number: EEmployeeTutorialSteps.ADD_COOLING_UNIT_STEP,
    enableHardwareBack: true,
    OverlayComponent: AddCoolingUnitOverlay,
    onPressMask: () => navigation.goBack(),
  });

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center" onLayout={onLayout}>
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
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
        fixedPrice: values.priceType === 'FIXED',
        price: values.price,
        sensor: values.sensor,
        public: values.public,
        sensorData: values.sensorData ?? '',
        powerOptions: {
          powerConsumptionInMt: values.powerConsumptionInMt ?? 0,
          dailyRoomWattage: values.dailyRoomWattage ?? 0,
          powerSourceDieselPercent: values.powerSourceDieselPercent ?? 0,
          powerSourceGridPercent: values.powerSourceGridPercent ?? 0,
          powerSourcePvPercent: values.powerSourcePvPercent ?? 0,
          powerSourceBiomassPercent: values.powerSourceBiomassPercent ?? 0,
          powerSourceDieselConsumptionKwh: values.powerSourceDieselConsumptionKwh ?? 0,
          pvPanelCount: values.pvPanelCount ?? 0,
          pvPanelSize: values.pvPanelSize ?? 0,
          pvPanelWeight: values.pvPanelWeight ?? 0,
          pvPanelMaxPower: values.pvPanelMaxPower ?? 0,
          batteryCount: values.batteryCount ?? 0,
          batteryWeight: values.batteryWeight ?? 0,
          batteryCapacity: values.batteryCapacity ?? 0,
          batteryMaxCurrent: values.batteryMaxCurrent ?? 0,
          batteryPeakEnergyStorage: values.batteryPeakEnergyStorage ?? 0,
          refrigerantType: values.refrigerantType ?? 'other',
          amountRefrigerant: values.amountRefrigerant ?? 0,
          roomInsulator: values.roomInsulator ?? 0,
          batteryType: values.batteryType ?? null,
          powerSource: values.powerSource ?? '',
          electricityStorageSystem: values.electricityStorageSystem ?? '',
          thermalStorageMethod: values.thermalStorageMethod ?? '',
          pvPanelType: values.pvPanelType ?? '',
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
        coolingUnitType: values.coolingUnitType ?? '',
        editableCheckins: values.editableCheckins,
      });

      toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.addSuccess'), {
        type: 'md_success',
      });

      await mutate(getQueryKey('getLocations', props.companyId));
      navigation.goBack();
    } catch (exception) {
      console.error(exception);
    }
  }

  return (
    <KeyboardAwareScrollView
      onLayout={onLayout}
      tw="h-full"
      contentContainerStyle="pt-5 pb-8"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
      <FormManager onSubmit={onSubmit} initialValues={initialFormValues.current}>
        {({ submitHandler, isSubmitting }) => (
          <React.Fragment>
            <View tw="flex-row items-center space-x-3 mb-3 mx-3.5">
              <ColdRoom width={28} height={28} color={paperTheme.colors.primary} />
              <Text tw="text-lg">{t('Dashboard.Management.AddCoolingUnit.heading')}</Text>
            </View>
            <FormFields />
            <Button
              tw="w-11/12 self-center mt-7"
              mode="contained"
              onPress={submitHandler}
              icon={isSubmitting ? undefined : 'plus-circle-outline'}
              uppercase
            >
              {isSubmitting ? <ActivityIndicator size="small" color="white" /> : t('actions.add')}
            </Button>
          </React.Fragment>
        )}
      </FormManager>
    </KeyboardAwareScrollView>
  );
}

function _buildInitialValues() {
  return {
    name: '',
    location: null,
    coolingUnitType: null,
    priceType: PRICING_TYPE.PER_DAY,
    metricUnit: METRIC_UNITS.CRATES,
    price: '',
    capacityInMetricTons: '',
    foodCapacityInMetricTons: '',
    roomLength: '',
    roomWidth: '',
    roomHeight: '',
    roomWeight: '',
    roomInsulator: '',
    capacityInNumberCrates: '',
    crateWeight: '25',
    crateLength: '',
    crateWidth: '',
    crateHeight: '',
    editableCheckins: true,
    sensor: false,
    sensorData: undefined,
    public: false,
    operators: [],
    crops: [],
    cropSpecificPricing: [],
    refrigerantType: 'other',
    amountRefrigerant: '',
    powerConsumptionInMt: '',
    dailyRoomWattage: '',
    powerSource: null,
    electricityStorageSystem: null,
    powerSourceDieselConsumptionKwh: '',
    pvPanelCount: '',
    pvPanelType: null,
    pvPanelSize: '',
    pvPanelWeight: '',
    pvPanelMaxPower: '',
    powerSourceDieselPercent: '',
    powerSourceGridPercent: '',
    powerSourcePvPercent: '',
    powerSourceBiomassPercent: '',
    batteryType: null,
    batteryCount: '',
    batteryWeight: '',
    batteryCapacity: '',
    batteryMaxCurrent: '',
    batteryPeakEnergyStorage: '',
    thermalStorageMethod: null,
  } satisfies FormValues;
}
