import React, { useRef } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import cloneDeep from 'lodash/cloneDeep';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import ColdRoom from '#assets/icons/coldroom.svg';
import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import type { AddCoolingUnitParams } from '#types/api.params';
import { paperTheme } from '#ui/lib/theme';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';

import FormManager, { type PreprocessedFormValues, type FormValues } from './contexts/FormManager';
import FormFields from './components/FormFields';
import DataAggregator from './contexts/DataAggregator';
import { METRIC_UNITS, PRICING_TYPE } from './constants';

type CropUpdates = AddCoolingUnitParams['cropUpdates'];

type Props = {
  companyId: number | undefined;
};

export default function ScreenContainer(props: Props) {
  const initialFormValues = useRef<FormValues>(_buildInitialValues());
  const navigation = useNavigation();

  const { isLoading, companyCrops } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  async function onSubmit(values: PreprocessedFormValues): Promise<void> {
    const clone = cloneDeep(values) as PreprocessedFormValues & { cropUpdates: CropUpdates };
    clone.cropUpdates = [];

    if (!(clone.crops.length >= 1)) {
      for (const cropId in companyCrops) {
        clone.crops.push(parseInt(cropId));
      }
    }

    for (const cropId of clone.crops) {
      const struct = { id: cropId, pricingType: clone.priceType } as CropUpdates[0];
      if (clone.priceType === 'PERIODICITY') {
        clone.cropUpdates.push({
          ...struct,
          dailyRate: clone.price,
          fixedRate: 0,
        });
        continue;
      }
      clone.cropUpdates.push({
        ...struct,
        dailyRate: 0,
        fixedRate: clone.price,
      });
    }

    try {
      await ColdtivateService.addCoolingUnit({
        name: clone.name,
        location: clone.location as number,
        metric: clone.metricUnit,
        capacityInNumberCrates: clone.capacityInNumberCrates,
        capacityInMetricTons: clone.capacityInMetricTons,
        foodCapacityInMetricTons: clone.foodCapacityInMetricTons,
        fixedPrice: clone.priceType === 'FIXED',
        price: clone.price,
        sensor: clone.sensor,
        public: clone.public,
        sensorData: '', // TODO: sensor integration
        powerOptions: {
          powerConsumptionInMt: clone.powerConsumptionInMt ?? 0,
          dailyRoomWattage: clone.dailyRoomWattage ?? 0,
          powerSourceDieselPercent: clone.powerSourceDieselPercent ?? 0,
          powerSourceGridPercent: clone.powerSourceGridPercent ?? 0,
          powerSourcePvPercent: clone.powerSourcePvPercent ?? 0,
          powerSourceBiomassPercent: clone.powerSourceBiomassPercent ?? 0,
          powerSourceDieselConsumptionKwh: clone.powerSourceDieselConsumptionKwh ?? 0,
          pvPanelCount: clone.pvPanelCount ?? 0,
          pvPanelSize: clone.pvPanelSize ?? 0,
          pvPanelWeight: clone.pvPanelWeight ?? 0,
          pvPanelMaxPower: clone.pvPanelMaxPower ?? 0,
          batteryCount: clone.batteryCount ?? 0,
          batteryWeight: clone.batteryWeight ?? 0,
          batteryCapacity: clone.batteryCapacity ?? 0,
          batteryMaxCurrent: clone.batteryMaxCurrent ?? 0,
          batteryPeakEnergyStorage: clone.batteryPeakEnergyStorage ?? 0,
          refrigerantType: clone.refrigerantType ?? 'other',
          amountRefrigerant: clone.amountRefrigerant ?? 0,
          roomInsulator: clone.roomInsulator ?? 0,
          batteryType: clone.batteryType ?? null,
          powerSource: clone.powerSource ?? '',
          electricityStorageSystem: clone.electricityStorageSystem ?? '',
          thermalStorageMethod: clone.thermalStorageMethod ?? '',
          pvPanelType: clone.pvPanelType ?? '',
        },
        operators: clone.operators,
        crops: clone.crops,
        cropUpdates: clone.cropUpdates,
        crateLength: clone.crateLength,
        crateWidth: clone.crateWidth,
        crateHeight: clone.crateHeight,
        crateWeight: clone.crateWeight,
        roomWeight: clone.roomWeight,
        roomHeight: clone.roomHeight,
        roomLength: clone.roomLength,
        roomWidth: clone.roomWidth,
        coolingUnitType: clone.coolingUnitType ?? '',
        editableCheckins: clone.editableCheckins,
      });

      await mutate(getQueryKey('getLocations', props.companyId));
      navigation.goBack();
    } catch (exception) {
      console.error(exception);
    }
  }

  return (
    <KeyboardAwareScrollView
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
    public: false,
    operators: [],
    crops: [],
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
