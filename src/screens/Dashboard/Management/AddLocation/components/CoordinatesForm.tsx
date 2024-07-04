import React from 'react';
import { Dimensions, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';

import FormManager from '../components/FormManager';

const width = (Dimensions.get('screen').width - 42) / 2;

export default function CoordinatesForm() {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <View tw="w-full flex-row gap-3 justify-between mt-0.5">
      <View style={{ width }}>
        <Controller
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              label="Latitude"
              mode="flat"
              dense
              value={value.toString()}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="latitude"
        />
        {typeof errors.latitude !== 'undefined' ? (
          <Text tw="text-xs text-red-600 mt-1.5 pl-3">{errors.latitude.message?.toString()}</Text>
        ) : null}
      </View>

      <View style={{ width }}>
        <Controller
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              label="Longitude"
              mode="flat"
              dense
              value={value.toString()}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="longitude"
        />
        {typeof errors.longitude !== 'undefined' ? (
          <Text tw="text-xs text-red-600 mt-1.5 pl-3">{errors.longitude.message?.toString()}</Text>
        ) : null}
      </View>
    </View>
  );
}
