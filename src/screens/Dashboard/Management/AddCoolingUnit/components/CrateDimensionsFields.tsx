import React from 'react';
import { Divider, TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';

import FormManager from '../contexts/FormManager';

export default function CrateDimensionsFields() {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Text tw="mx-4 mt-4 mb-1 text-base">Dimensions of a standard crate</Text>
      <Controller
        name="crateLength"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Length"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.crateLength}
            right={<TextInput.Affix text="cm" />}
            underlineColor="transparent"
          />
        )}
      />
      <Controller
        name="crateWidth"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Width"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.crateWidth}
            right={<TextInput.Affix text="cm" />}
            underlineColor="transparent"
          />
        )}
      />
      <Controller
        name="crateHeight"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Height"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.crateHeight}
            right={<TextInput.Affix text="cm" />}
            underlineColor="transparent"
          />
        )}
      />
      <Divider tw="w-full bg-gray-700 mt-4" />
    </React.Fragment>
  );
}
