import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import FormManager from '../contexts/FormManager';

export default function PowerConsumptionFields() {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="powerConsumptionInMt"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Power consumption of cooling unit per MT"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.powerConsumptionInMt}
            right={<TextInput.Affix text="kW/MT" />}
          />
        )}
      />
      <Controller
        name="dailyRoomWattage"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Daily wattage of the room"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.dailyRoomWattage}
            right={<TextInput.Affix text="kWh/day" />}
          />
        )}
      />
    </React.Fragment>
  );
}
