import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import FormManager from '../components/FormManager';

type Props = {
  includeEmail: boolean;
};

export default function ContactFields(props: Props) {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Phone number"
            mode="outlined"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.phone}
          />
        )}
      />

      {props.includeEmail ? (
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="w-full bg-transparent mt-3"
              label="Email"
              mode="outlined"
              dense
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.email}
            />
          )}
        />
      ) : null}
    </React.Fragment>
  );
}
