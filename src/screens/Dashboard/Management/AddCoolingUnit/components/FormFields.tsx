import React from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Divider, Switch, TextInput } from 'react-native-paper';

import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import type { GetCoolingUnitSensorDataResponse } from '#types/api.responses';

import FormManager from '../contexts/FormManager';
import CommoditiesField from './CommoditiesField';
import CrateDimensionsFields from './CrateDimensionsFields';
import CropSpecificPricing from './CropSpecificPricing';
import ElectricityStorageFields from './ElectricityStorageFields';
import LocationField from './LocationField';
import MetricUnitField from './MetricUnitField';
import OperatorsField from './OperatorsField';
import PowerConsumptionFields from './PowerConsumptionFields';
import PowerSourceFields from './PowerSourceFields';
import PriceField from './PriceField';
import PriceTypeField from './PriceTypeField';
import RefrigerantFields from './RefrigerantFields';
import Sensors from './Sensors';
import SensorsList from './Sensors/components/SensorsListModal';
import TableModal from './Sensors/components/Table';
import UnitCapacityFields from './UnitCapacityFields';
import UnitSizeFields from './UnitSizeFields';
import UnitTypeField from './UnitTypeField';
import VolumeFields from './VolumeFields';

export default function FormFields(props: {
  isEditMode?: boolean;
  sensorList?: GetCoolingUnitSensorDataResponse['sensorData'];
}) {
  const { isEditMode, sensorList } = props;
  const { control, watch, formState } = FormManager.useFormManager();

  const { t } = useTranslationUtils();

  const integratedSensor = watch('sensor');
  const sensorData = watch('sensorData');
  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label={`${t('Dashboard.Management.AddCoolingUnit.fields.name')}*`}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.name}
          />
        )}
      />
      <LocationField />
      <UnitTypeField />
      <PriceTypeField />
      <MetricUnitField />
      <PriceField />
      <VolumeFields />
      <UnitSizeFields />
      <UnitCapacityFields />
      <CrateDimensionsFields />
      <Controller
        name="editableCheckins"
        control={control}
        render={({ field: { onChange, value } }) => (
          <React.Fragment>
            <View tw="flex-row items-center justify-between px-3 py-3.5">
              <Text tw="max-w-[80%]" numberOfLines={2}>
                {t('Dashboard.Management.AddCoolingUnit.fields.editableCheckins')}
              </Text>
              <Switch value={value} onValueChange={onChange} />
            </View>
            <Divider tw="w-full bg-gray-700" />
          </React.Fragment>
        )}
      />
      <Sensors>
        {!sensorList?.length ||
        (sensorData && sensorList[0].type !== sensorData?.type) ||
        !integratedSensor ? null : (
          <TableModal datums={sensorList ?? []} />
        )}

        <SensorsList />
      </Sensors>
      <Controller
        name="public"
        control={control}
        render={({ field: { onChange, value } }) => (
          <React.Fragment>
            <View tw="flex-row items-center justify-between px-3 py-3.5">
              <Text tw="max-w-[80%]">{t('Dashboard.Management.AddCoolingUnit.fields.public')}</Text>
              <Switch value={value} onValueChange={onChange} />
            </View>
            <Divider tw="w-full bg-gray-700" />
          </React.Fragment>
        )}
      />
      <OperatorsField />
      <CommoditiesField />
      {typeof isEditMode === 'undefined' || !isEditMode ? null : <CropSpecificPricing />}
      <RefrigerantFields />
      <PowerConsumptionFields />
      <PowerSourceFields />
      <ElectricityStorageFields />
    </React.Fragment>
  );
}
