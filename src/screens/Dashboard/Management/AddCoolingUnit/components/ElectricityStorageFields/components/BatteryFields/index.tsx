import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import FormManager from '../../../../contexts/FormManager';
import BatteryTypeField from './components/BatteryTypeField';

export default function BatteryFields() {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <BatteryTypeField />
      <Controller
        name="batteryCount"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Number of batteries"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.batteryCount}
          />
        )}
      />
      <Controller
        name="batteryWeight"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Battery weight"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.batteryWeight}
            right={<TextInput.Affix text="kg" />}
          />
        )}
      />
      <Controller
        name="batteryCapacity"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Capacity of one battery"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.batteryCapacity}
            right={<TextInput.Affix text="Ah" />}
          />
        )}
      />
      <Controller
        name="batteryMaxCurrent"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Maximum charging current of one battery"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.batteryMaxCurrent}
            right={<TextInput.Affix text="A" />}
          />
        )}
      />
      <Controller
        name="batteryPeakEnergyStorage"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Energy storage at peak level of one battery"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.batteryPeakEnergyStorage}
            right={<TextInput.Affix text="kWh" />}
          />
        )}
      />
    </React.Fragment>
  );
}
