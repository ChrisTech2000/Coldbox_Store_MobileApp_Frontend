import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import FormManager from '../components/FormManager';

export default function NameFields() {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="firstName"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-3"
            label="Name"
            mode="outlined"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.firstName}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-3"
            label="Last name"
            mode="outlined"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.lastName}
          />
        )}
      />
    </React.Fragment>
  );
}
