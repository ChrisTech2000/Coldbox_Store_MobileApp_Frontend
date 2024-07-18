import React from 'react';
import { Divider, TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';

import FormManager from '../../../contexts/FormManager';

export default function HybridFields() {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Text tw="mx-4 mt-4 mb-1 text-base">
        Which percentage of the room is powered by the different sources?
      </Text>
      <Controller
        name="powerSourceDieselPercent"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Diesel Generator"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.powerSourceDieselPercent}
            right={<TextInput.Affix text="%" />}
            underlineColor="transparent"
          />
        )}
      />
      <Controller
        name="powerSourceGridPercent"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Grid"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.powerSourceGridPercent}
            right={<TextInput.Affix text="%" />}
            underlineColor="transparent"
          />
        )}
      />
      <Controller
        name="powerSourcePvPercent"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="PV Panels"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.powerSourcePvPercent}
            right={<TextInput.Affix text="%" />}
            underlineColor="transparent"
          />
        )}
      />
      <Controller
        name="powerSourceBiomassPercent"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Biomass"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.powerSourceBiomassPercent}
            right={<TextInput.Affix text="%" />}
            underlineColor="transparent"
          />
        )}
      />
      <Divider tw="w-full bg-gray-700 mt-4" />
    </React.Fragment>
  );
}
