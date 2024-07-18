import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import FormManager from '../../../contexts/FormManager';

export default function DieselConsumptionField() {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="powerSourceDieselConsumptionKwh"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Diesel consumption of the generator per kWh"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.powerSourceDieselConsumptionKwh}
            right={<TextInput.Affix text="L/kWh" />}
          />
        )}
      />
    </React.Fragment>
  );
}
