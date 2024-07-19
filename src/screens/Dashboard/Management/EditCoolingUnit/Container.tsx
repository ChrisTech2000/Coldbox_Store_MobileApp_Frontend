import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import cloneDeep from 'lodash/cloneDeep';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import ColdRoom from '#assets/icons/coldroom.svg';
import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';
import type { AddCoolingUnitParams } from '#types/api.params';
import type { GetCoolingUnitResponse } from '#types/api.responses';

import FormManager, { type FormValues } from '../AddCoolingUnit/contexts/FormManager';
import DataAggregator from '../AddCoolingUnit/contexts/DataAggregator';
import FormFields from '../AddCoolingUnit/components/FormFields';
import { METRIC_UNITS, PRICING_TYPE } from '../AddCoolingUnit/constants';

const width = (Dimensions.get('screen').width - 42) / 2;

type CropUpdates = AddCoolingUnitParams['cropUpdates'];

type FormStateBuilder = {
  getFormValues: () => FormValues;
  getExtraValues: () => { pricingId: number };
};

type Props = {
  coolingUnitId: number;
  companyId: number | undefined;
};

export default function ScreenContainer(props: Props) {
  const { coolingUnitId, companyId } = props;

  const navigation = useNavigation();

  const formValuesBuilder = useRef<FormStateBuilder | undefined>(undefined);

  const { isLoading, companyCrops } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();

  const {
    data: unit,
    isLoading: isUnitLoading,
    refetch,
  } = useApiCall(
    'getCoolingUnit',
    ColdtivateService.getCoolingUnit,
    {
      coolingUnitId,
      companyId: companyId as number,
    },
    {
      skip: !coolingUnitId || !companyId,
      defaultData: undefined,
    }
  );

  if (isLoading || isUnitLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!formValuesBuilder.current) {
    formValuesBuilder.current = _buildInitialValues(
      unit,
      Object.keys(companyCrops).map((cropId) => parseInt(cropId))
    );
  }

  async function onSubmit(values: FormValues): Promise<void> {
    if (typeof formValuesBuilder.current === 'undefined') return;

    const clone = cloneDeep(values) as FormValues & { cropUpdates: CropUpdates };
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

    const safeValues = formValuesBuilder.current.getFormValues();

    try {
      await ColdtivateService.editCoolingUnit(
        {
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
            powerConsumptionInMt: clone.powerConsumptionInMt ?? safeValues.powerConsumptionInMt,
            dailyRoomWattage: clone.dailyRoomWattage ?? safeValues.dailyRoomWattage,
            powerSourceDieselPercent:
              clone.powerSourceDieselPercent ?? safeValues.powerSourceDieselPercent,
            powerSourceGridPercent:
              clone.powerSourceGridPercent ?? safeValues.powerSourceGridPercent,
            powerSourcePvPercent: clone.powerSourcePvPercent ?? safeValues.powerSourcePvPercent,
            powerSourceBiomassPercent:
              clone.powerSourceBiomassPercent ?? safeValues.powerSourceBiomassPercent,
            powerSourceDieselConsumptionKwh:
              clone.powerSourceDieselConsumptionKwh ?? safeValues.powerSourceDieselConsumptionKwh,
            pvPanelCount: clone.pvPanelCount ?? safeValues.pvPanelCount,
            pvPanelSize: clone.pvPanelSize ?? safeValues.pvPanelSize,
            pvPanelWeight: clone.pvPanelWeight ?? safeValues.pvPanelWeight,
            pvPanelMaxPower: clone.pvPanelMaxPower ?? safeValues.pvPanelMaxPower,
            batteryCount: clone.batteryCount ?? safeValues.batteryCount,
            batteryWeight: clone.batteryWeight ?? safeValues.batteryWeight,
            batteryCapacity: clone.batteryCapacity ?? safeValues.batteryCapacity,
            batteryMaxCurrent: clone.batteryMaxCurrent ?? safeValues.batteryMaxCurrent,
            batteryPeakEnergyStorage:
              clone.batteryPeakEnergyStorage ?? safeValues.batteryPeakEnergyStorage,
            refrigerantType: clone.refrigerantType ?? safeValues.refrigerantType,
            amountRefrigerant: clone.amountRefrigerant ?? safeValues.amountRefrigerant,
            roomInsulator: clone.roomInsulator ?? safeValues.roomInsulator,
            batteryType: clone.batteryType ?? safeValues.batteryType,
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
          ...formValuesBuilder.current.getExtraValues(),
        },
        coolingUnitId
      );

      await Promise.all([refetch(), mutate(getQueryKey('getLocations', props.companyId))]);
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
      <FormManager onSubmit={onSubmit} initialValues={formValuesBuilder.current?.getFormValues()}>
        {({ submitHandler, isSubmitting }) => (
          <React.Fragment>
            <View tw="flex-row items-center space-x-3 mb-3 mx-3.5">
              <ColdRoom width={28} height={28} color={paperTheme.colors.primary} />
              <Text tw="text-lg">{t('Dashboard.Management.AddCoolingUnit.heading')}</Text>
            </View>
            <FormFields />
            <View tw="w-full flex-row items-center justify-around mt-5 px-2">
              <Button
                style={{ width }}
                mode="contained"
                onPress={undefined}
                icon="trash-can-outline"
                buttonColor={paperTheme.colors.error}
                uppercase
              >
                {t('actions.delete')}
              </Button>
              <Button
                style={{ width }}
                mode="contained"
                onPress={submitHandler}
                icon={isSubmitting ? undefined : 'pencil'}
                uppercase
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  t('actions.edit')
                )}
              </Button>
            </View>
          </React.Fragment>
        )}
      </FormManager>
    </KeyboardAwareScrollView>
  );
}

function _buildInitialValues(
  unit: GetCoolingUnitResponse,
  companyCrops: Array<number>
): FormStateBuilder {
  return {
    getFormValues: () => {
      const crops: FormValues['crops'] = [];
      for (const crop of unit.crops) {
        if (crop.active && companyCrops.includes(crop.cropId)) {
          crops.push(crop.cropId);
        }
        continue;
      }

      const powerOptions = unit.powerOptions.at(0);

      return {
        name: unit.name ?? '',
        location: unit.location ?? null,
        coolingUnitType: (unit?.coolingUnitType as FormValues['coolingUnitType']) ?? null,
        priceType: (unit.commonPricingType.type as FormValues['priceType']) ?? PRICING_TYPE.PER_DAY,
        metricUnit:
          (unit.commonPricingType.metric as FormValues['metricUnit']) ?? METRIC_UNITS.CRATES,
        price: (unit.commonPricingType.value satisfies FormValues['price']) ?? 0,
        capacityInMetricTons: unit.capacityInMetricTons ?? 0,
        foodCapacityInMetricTons: unit.foodCapacityInMetricTons ?? 0,
        roomLength: unit.roomLength ?? 0,
        roomWidth: unit.roomWidth ?? 0,
        roomHeight: unit.roomHeight ?? 0,
        roomWeight: unit.roomWeight ?? 0,
        roomInsulator: powerOptions?.roomInsulator ?? 0,
        capacityInNumberCrates: unit.capacityInNumberCrates ?? 0,
        crateWeight: unit.crateWeight ?? 25,
        crateLength: unit.crateLength ?? 0,
        crateWidth: unit.crateWidth ?? 0,
        crateHeight: unit.crateHeight ?? 0,
        editableCheckins: unit.editableCheckins ?? true,
        sensor: unit.sensor ?? false,
        public: unit.public ?? false,
        operators: unit.operators ?? [],
        crops,
        refrigerantType: powerOptions?.refrigerantType ?? '',
        amountRefrigerant: powerOptions?.amountRefrigerant ?? 0,
        powerConsumptionInMt: powerOptions?.powerConsumptionInMt ?? 0,
        dailyRoomWattage: powerOptions?.dailyRoomWattage ?? 0,
        powerSource: powerOptions?.powerSource ?? null,
        electricityStorageSystem:
          (powerOptions?.electricityStorageSystem as FormValues['electricityStorageSystem']) ??
          null,
        powerSourceDieselConsumptionKwh: powerOptions?.powerSourceDieselConsumptionKwh ?? 0,
        pvPanelCount: powerOptions?.pvPanelCount ?? 0,
        pvPanelType: (powerOptions?.pvPanelType as FormValues['pvPanelType']) ?? null,
        pvPanelSize: powerOptions?.pvPanelSize ?? 0,
        pvPanelWeight: powerOptions?.pvPanelWeight ?? 0,
        pvPanelMaxPower: powerOptions?.pvPanelMaxPower ?? 0,
        powerSourceDieselPercent: powerOptions?.powerSourceDieselPercent ?? 0,
        powerSourceGridPercent: powerOptions?.powerSourceGridPercent ?? 0,
        powerSourcePvPercent: powerOptions?.powerSourcePvPercent ?? 0,
        powerSourceBiomassPercent: powerOptions?.powerSourceBiomassPercent ?? 0,
        batteryType: (powerOptions?.batteryType as FormValues['batteryType']) ?? null,
        batteryCount: powerOptions?.batteryCount ?? 0,
        batteryWeight: powerOptions?.batteryWeight ?? 0,
        batteryCapacity: powerOptions?.batteryCapacity ?? 0,
        batteryMaxCurrent: powerOptions?.batteryMaxCurrent ?? 0,
        batteryPeakEnergyStorage: powerOptions?.batteryPeakEnergyStorage ?? 0,
        thermalStorageMethod: powerOptions?.thermalStorageMethod ?? null,
      };
    },
    getExtraValues: () => ({ pricingId: unit.commonPricingType.pricingId }),
  };
}
