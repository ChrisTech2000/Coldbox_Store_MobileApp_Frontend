import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import FormManager, { type FormValues } from '../components/FormManager';

type Props = {
  disabled?: boolean;
  disabledFields?: Array<keyof FormValues>;
};

export default function TextFields(props: Props) {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="firstName"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent"
            label="First Name"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.firstName}
            disabled={props.disabled || props.disabledFields?.includes('firstName')}
            dense
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-4"
            label="Last Name"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.firstName}
            disabled={props.disabled || props.disabledFields?.includes('lastName')}
            dense
          />
        )}
      />

      <Controller
        name="userId"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-4"
            label="User ID"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.userId}
            disabled={props.disabled || props.disabledFields?.includes('userId')}
            dense
          />
        )}
      />
    </React.Fragment>
  );
}
