import { useFocusEffect, useNavigation } from '@react-navigation/native';
import isEmpty from 'lodash/isEmpty';
import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSWRConfig } from 'swr';
import { useShallow } from 'zustand/react/shallow';

import ColdRoom from '#assets/icons/coldroom.svg';
import { Button } from '#ui/components/Button';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
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

const BACKEND_COMPLIANT_DEFAULT_VALUE = '';

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

  const {
    data: { sensorData },
    isLoading: isSensorDataLoading,
    refetch: refetchSensorData,
  } = useApiCall(
    'getCoolingUnit',
    ColdtivateService.getCoolingUnitSensorData,
    {
      coolingUnitId,
    },
    {
      skip: !coolingUnitId,
      defaultData: undefined,
    }
  );

  if (isLoading || isUnitLoading || isSensorDataLoading || isEmpty(unit)) {
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
          pricingId: unit.commonPricingType?.pricingId,
        },
        coolingUnitId
      );

      toast.show(t('Dashboard.Management.EditCoolingUnit.toasts.editSuccess'), {
        type: 'md_success',
      });

      await Promise.allSettled([
        refetch(),
        refetchSensorData(),
        mutate(getQueryKey('getLocations', props.companyId)),
        mutate(
          (key) => typeof key === 'string' && key.startsWith('getDashboardProduces:'),
          undefined,
          { revalidate: true }
        ),
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
                <View tw="flex-row items-center space-x-3 mb-3 mx-3.5 w-[85%]">
                  <ColdRoom width={28} height={28} color={paperTheme.colors.primary} />
                  <Text tw="text-lg" numberOfLines={1}>
                    {t('Dashboard.Management.AddCoolingUnit.heading')}
                  </Text>
                </View>

                <View tw="pb-28">
                  <FormFields isEditMode sensorList={sensorData} />
                </View>
              </View>
            </KeyboardAwareScrollView>

            <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-5 pt-4 absolute bottom-0 left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
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
            </HideWithKeyboardView>
          </React.Fragment>
        )}
      </FormManager>
    </View>
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
  const commonPrice = unit.commonPricingType?.value?.toString() ?? '0';

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
    capacityInMetricTons: unit.capacityInMetricTons?.toString() ?? '0',
    foodCapacityInMetricTons: unit.foodCapacityInMetricTons?.toString() ?? '0',
    roomLength: unit.roomLength?.toString() ?? '0',
    roomWidth: unit.roomWidth?.toString() ?? '0',
    roomHeight: unit.roomHeight?.toString() ?? '0',
    roomWeight: unit.roomWeight?.toString() ?? '0',
    roomInsulator: powerOptions?.roomInsulator?.toString() ?? '0',
    capacityInNumberCrates: unit.capacityInNumberCrates?.toString() ?? '0',
    crateWeight: unit.crateWeight?.toString() ?? '25',
    crateLength: unit.crateLength?.toString() ?? '0',
    crateWidth: unit.crateWidth?.toString() ?? '0',
    crateHeight: unit.crateHeight?.toString() ?? '0',
    editableCheckins: unit.editableCheckins ?? true,
    sensor: unit.sensor ?? false,
    sensorData: undefined,
    public: unit.public ?? false,
    operators: unit.operators ?? [],
    crops,
    cropSpecificPricing,
    refrigerantType: powerOptions?.refrigerantType ?? '',
    amountRefrigerant: powerOptions?.amountRefrigerant?.toString() ?? '0',
    powerConsumptionInMt: powerOptions?.powerConsumptionInMt?.toString() ?? '0',
    dailyRoomWattage: powerOptions?.dailyRoomWattage?.toString() ?? '0',
    powerSource: powerOptions?.powerSource ?? null,
    electricityStorageSystem:
      (powerOptions?.electricityStorageSystem as FormValues['electricityStorageSystem']) ?? null,
    powerSourceDieselConsumptionKwh:
      powerOptions?.powerSourceDieselConsumptionKwh?.toString() ?? '0',
    pvPanelCount: powerOptions?.pvPanelCount?.toString() ?? '0',
    pvPanelType: (powerOptions?.pvPanelType as FormValues['pvPanelType']) ?? null,
    pvPanelSize: powerOptions?.pvPanelSize?.toString() ?? '0',
    pvPanelWeight: powerOptions?.pvPanelWeight?.toString() ?? '0',
    pvPanelMaxPower: powerOptions?.pvPanelMaxPower?.toString() ?? '0',
    powerSourceDieselPercent: powerOptions?.powerSourceDieselPercent?.toString() ?? '0',
    powerSourceGridPercent: powerOptions?.powerSourceGridPercent?.toString() ?? '0',
    powerSourcePvPercent: powerOptions?.powerSourcePvPercent?.toString() ?? '0',
    powerSourceBiomassPercent: powerOptions?.powerSourceBiomassPercent?.toString() ?? '0',
    batteryType: (powerOptions?.batteryType as FormValues['batteryType']) ?? null,
    batteryCount: powerOptions?.batteryCount?.toString() ?? '0',
    batteryWeight: powerOptions?.batteryWeight?.toString() ?? '0',
    batteryCapacity: powerOptions?.batteryCapacity?.toString() ?? '0',
    batteryMaxCurrent: powerOptions?.batteryMaxCurrent?.toString() ?? '0',
    batteryPeakEnergyStorage: powerOptions?.batteryPeakEnergyStorage?.toString() ?? '0',
    thermalStorageMethod: powerOptions?.thermalStorageMethod ?? null,
  };
}
