import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import FormManager from '../contexts/FormManager';
import LocationField from './LocationField';
import UnitTypeField from './UnitTypeField';
import PriceTypeField from './PriceTypeField';
import MetricUnitField from './MetricUnitField';
import PriceField from './PriceField';
import VolumeFields from './VolumeFields';
import UnitSizeFields from './UnitSizeFields';

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
    </React.Fragment>
  );
}
