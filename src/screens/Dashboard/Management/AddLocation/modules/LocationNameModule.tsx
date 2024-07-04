import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';

import FormManager from '../components/FormManager';

export default function LocationNameModule() {
  const { control, formState } = FormManager.useFormManager();

  const errorMessage = formState.errors.name?.message?.toString();

  return (
    <React.Fragment>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            tw="w-full"
            label="Name"
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
          />
        )}
        name="name"
      />
      {typeof errorMessage !== 'undefined' ? (
        <Text tw="text-xs text-red-600 mt-1.5 pl-3">{errorMessage}</Text>
      ) : null}
    </React.Fragment>
  );
}
