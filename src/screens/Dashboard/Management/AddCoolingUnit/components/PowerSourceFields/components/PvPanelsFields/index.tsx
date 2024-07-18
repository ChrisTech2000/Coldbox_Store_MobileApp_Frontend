import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import FormManager from '../../../../contexts/FormManager';
import PvPanelTypeField from './components/PvPanelTypeField';

export default function PvPanelsFields() {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="pvPanelCount"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Number of PV panels"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.pvPanelCount}
          />
        )}
      />
      <PvPanelTypeField />
      <Controller
        name="pvPanelSize"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Size of a single panel"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.pvPanelSize}
            right={<TextInput.Affix text="m2" />}
          />
        )}
      />
      <Controller
        name="pvPanelWeight"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Weight of a single panel"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.pvPanelWeight}
            right={<TextInput.Affix text="kg" />}
          />
        )}
      />
      <Controller
        name="pvPanelMaxPower"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Maximum power of a single panel"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.pvPanelMaxPower}
            right={<TextInput.Affix text="W" />}
          />
        )}
      />
    </React.Fragment>
  );
}
