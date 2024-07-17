import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import FormManager from '../contexts/FormManager';

export default function VolumeFields() {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="capacityInMetricTons"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Total empty volume"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.capacityInMetricTons}
            right={<TextInput.Affix text="MT" />}
          />
        )}
      />

      <Controller
        name="foodCapacityInMetricTons"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Max volume of food"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.foodCapacityInMetricTons}
            right={<TextInput.Affix text="MT" />}
          />
        )}
      />
    </React.Fragment>
  );
}
