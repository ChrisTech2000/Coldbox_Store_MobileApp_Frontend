import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import FormManager from '../contexts/FormManager';
import LocationField from './LocationField';
import UnitTypeField from './UnitTypeField';
import PriceTypeField from './PriceTypeField';

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
            mode="outlined"
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
    </React.Fragment>
  );
}
