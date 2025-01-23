import { useFocusEffect, useNavigation } from '@react-navigation/native';
import isEmpty from 'lodash/isEmpty';
import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import ColdRoom from '#assets/icons/coldroom.svg';
import { Button } from '#ui/components/Button';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey, useApiCall } from '#services/hooks/useAPiCall';
import { useAuthStore } from '#stores/auth';
import type { GetCoolingUnitResponse } from '#types/api.responses';
import { ERoles } from '#types/global';
import reportCrash from '#ui/lib/reportCrash';
import { paperTheme } from '#ui/lib/theme';

import FormFields from '../AddCoolingUnit/components/FormFields';
import { METRIC_UNITS, PRICING_TYPE } from '../AddCoolingUnit/constants';
import DataAggregator from '../AddCoolingUnit/contexts/DataAggregator';
import FormManager, {
  type FormValues,
  type PreprocessedFormValues,
} from '../AddCoolingUnit/contexts/FormManager';
import { CropPricingManager } from '../AddCoolingUnit/utils';
import DeleteAction from './components/DeleteAction';

const width = (Dimensions.get('window').width - 42) / 2;

type Props = {
  coolingUnitId: number;
  companyId: number | undefined;
};

export default function ScreenContainer(props: Props) {
  const { coolingUnitId, companyId } = props;

  const { isLoading, companyCrops } = DataAggregator.useDataAggregator();
  const toast = InAppNotifications.useToast();
  const user = useAuthStore(useShallow((store) => store.user));
  const { t } = useTranslationUtils();
  const { mutate } = useSWRConfig();

  const navigation = useNavigation();

  const initialFormValues = useRef<FormValues | undefined>(undefined);
  useFocusEffect(() => (initialFormValues.current = undefined));

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

  if (isLoading || isUnitLoading || isEmpty(unit)) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!initialFormValues.current) {
    initialFormValues.current = _buildInitialValues(
      unit,
      Object.keys(companyCrops).map((cropId) => parseInt(cropId))
    );
  }

  async function onSubmit(values: PreprocessedFormValues): Promise<void> {
    try {
      await ColdtivateService.editCoolingUnit(
        {
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
          pricingId: unit.commonPricingType?.pricingId,
        },
        coolingUnitId
      );

      toast.show(t('Dashboard.Management.EditCoolingUnit.toasts.editSuccess'), {
        type: 'md_success',
      });

      await Promise.allSettled([
        refetch(),
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
    <KeyboardAwareScrollView
      tw="h-full"
      contentContainerStyle="pt-5 pb-8"
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      showsVerticalScrollIndicator={false}
    >
      <FormManager onSubmit={onSubmit} initialValues={initialFormValues.current}>
        {({ submitHandler, isSubmitting }) => (
          <React.Fragment>
            <View tw="flex-row items-center space-x-3 mb-3 mx-3.5 w-[85%]">
              <ColdRoom width={28} height={28} color={paperTheme.colors.primary} />
              <Text tw="text-lg" numberOfLines={1}>
                {t('Dashboard.Management.AddCoolingUnit.heading')}
              </Text>
            </View>
            <FormFields isEditMode sensorList={unit?.sensorList} />
            <View tw="w-full flex-row items-center justify-around mt-5 px-2">
              <DeleteAction
                coolingUnitId={coolingUnitId}
                coolingUnitName={unit.name}
                companyId={companyId}
              />
              <Button
                style={{ width }}
                mode="contained"
                onPress={submitHandler}
                icon={isSubmitting ? undefined : 'pencil'}
                uppercase
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  t('actions.save')
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
): FormValues {
  const crops: FormValues['crops'] = [];

  for (const crop of unit.crops) {
    if (crop.active && companyCrops.includes(crop.cropId)) {
      crops.push(crop.cropId);
    }
    continue;
  }

  const powerOptions = unit.powerOptions.at(0);
  const commonPrice = unit.commonPricingType?.value?.toString() ?? '';

  const cropSpecificPricing = CropPricingManager.init({
    unitCrops: unit.crops.filter((unitCrop) => crops.includes(unitCrop.cropId)),
    commonPrice,
  });

  return {
    name: unit.name ?? '',
    location: unit.location ?? null,
    coolingUnitType: (unit?.coolingUnitType as FormValues['coolingUnitType']) ?? null,
    priceType: (unit.commonPricingType?.type as FormValues['priceType']) ?? PRICING_TYPE.PER_DAY,
    metricUnit: (unit.commonPricingType?.metric as FormValues['metricUnit']) ?? METRIC_UNITS.CRATES,
    price: commonPrice,
    capacityInMetricTons: unit.capacityInMetricTons?.toString() ?? '',
    foodCapacityInMetricTons: unit.foodCapacityInMetricTons?.toString() ?? '',
    roomLength: unit.roomLength?.toString() ?? '',
    roomWidth: unit.roomWidth?.toString() ?? '',
    roomHeight: unit.roomHeight?.toString() ?? '',
    roomWeight: unit.roomWeight?.toString() ?? '',
    roomInsulator: powerOptions?.roomInsulator?.toString() ?? '',
    capacityInNumberCrates: unit.capacityInNumberCrates?.toString() ?? '',
    crateWeight: unit.crateWeight?.toString() ?? '25',
    crateLength: unit.crateLength?.toString() ?? '',
    crateWidth: unit.crateWidth?.toString() ?? '',
    crateHeight: unit.crateHeight?.toString() ?? '',
    editableCheckins: unit.editableCheckins ?? true,
    sensor: unit.sensor ?? false,
    sensorData: undefined,
    public: unit.public ?? false,
    operators: unit.operators ?? [],
    crops,
    cropSpecificPricing,
    refrigerantType: powerOptions?.refrigerantType ?? '',
    amountRefrigerant: powerOptions?.amountRefrigerant?.toString() ?? '',
    powerConsumptionInMt: powerOptions?.powerConsumptionInMt?.toString() ?? '',
    dailyRoomWattage: powerOptions?.dailyRoomWattage?.toString() ?? '',
    powerSource: powerOptions?.powerSource ?? null,
    electricityStorageSystem:
      (powerOptions?.electricityStorageSystem as FormValues['electricityStorageSystem']) ?? null,
    powerSourceDieselConsumptionKwh:
      powerOptions?.powerSourceDieselConsumptionKwh?.toString() ?? '',
    pvPanelCount: powerOptions?.pvPanelCount?.toString() ?? '',
    pvPanelType: (powerOptions?.pvPanelType as FormValues['pvPanelType']) ?? null,
    pvPanelSize: powerOptions?.pvPanelSize?.toString() ?? '',
    pvPanelWeight: powerOptions?.pvPanelWeight?.toString() ?? '',
    pvPanelMaxPower: powerOptions?.pvPanelMaxPower?.toString() ?? '',
    powerSourceDieselPercent: powerOptions?.powerSourceDieselPercent?.toString() ?? '',
    powerSourceGridPercent: powerOptions?.powerSourceGridPercent?.toString() ?? '',
    powerSourcePvPercent: powerOptions?.powerSourcePvPercent?.toString() ?? '',
    powerSourceBiomassPercent: powerOptions?.powerSourceBiomassPercent?.toString() ?? '',
    batteryType: (powerOptions?.batteryType as FormValues['batteryType']) ?? null,
    batteryCount: powerOptions?.batteryCount?.toString() ?? '',
    batteryWeight: powerOptions?.batteryWeight?.toString() ?? '',
    batteryCapacity: powerOptions?.batteryCapacity?.toString() ?? '',
    batteryMaxCurrent: powerOptions?.batteryMaxCurrent?.toString() ?? '',
    batteryPeakEnergyStorage: powerOptions?.batteryPeakEnergyStorage?.toString() ?? '',
    thermalStorageMethod: powerOptions?.thermalStorageMethod ?? null,
  };
}
