import React from 'react';
import { Divider, Switch, TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';

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
import { View } from 'react-native';

export default function FormFields() {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Cooling unit ID"
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
              <Text>Make check-ins editable by operators</Text>
              <Switch value={value} onValueChange={onChange} />
            </View>
            <Divider tw="w-full bg-gray-700" />
          </React.Fragment>
        )}
      />
    </React.Fragment>
  );
}
