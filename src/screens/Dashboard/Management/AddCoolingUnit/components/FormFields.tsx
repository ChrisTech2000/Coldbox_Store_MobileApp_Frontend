import React from 'react';
import { View } from 'react-native';
import { Divider, Switch, TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../contexts/FormManager';
import LocationField from './LocationField';
import UnitTypeField from './UnitTypeField';
import PriceTypeField from './PriceTypeField';
import MetricUnitField from './MetricUnitField';
import PriceField from './PriceField';
import VolumeFields from './VolumeFields';
import UnitSizeFields from './UnitSizeFields';
import UnitCapacityFields from './UnitCapacityFields';
import CrateDimensionsFields from './CrateDimensionsFields';
import OperatorsField from './OperatorsField';
import CommoditiesField from './CommoditiesField';
import RefrigerantFields from './RefrigerantFields';
import PowerConsumptionFields from './PowerConsumptionFields';
import PowerSourceFields from './PowerSourceFields';
import ElectricityStorageFields from './ElectricityStorageFields';
import Sensors from './Sensors';
import CropSpecificPricing from './CropSpecificPricing';

export default function FormFields(props: { isEditMode: boolean }) {
  const { isEditMode } = props;

  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label={t('Dashboard.Management.AddCoolingUnit.fields.name')}
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
              <Text>{t('Dashboard.Management.AddCoolingUnit.fields.editableCheckins')}</Text>
              <Switch value={value} onValueChange={onChange} />
            </View>
            <Divider tw="w-full bg-gray-700" />
          </React.Fragment>
        )}
      />
      <Sensors />
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
      {isEditMode ? <CropSpecificPricing /> : null}
      <RefrigerantFields />
      <PowerConsumptionFields />
      <PowerSourceFields />
      <ElectricityStorageFields />
    </React.Fragment>
  );
}
