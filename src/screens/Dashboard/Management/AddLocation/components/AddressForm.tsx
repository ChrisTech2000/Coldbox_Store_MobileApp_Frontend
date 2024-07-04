import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';

import FormManager from './FormManager';

export default function AddressForm() {
  const { control, formState } = FormManager.useFormManager();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full mt-3"
            label="Country"
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
        name="country"
      />
      {typeof errors.country !== 'undefined' ? (
        <Text tw="text-xs text-red-600 mt-1.5 pl-3">{errors.country.message?.toString()}</Text>
      ) : null}

      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full mt-3"
            label="State"
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
        name="state"
      />
      {typeof errors.state !== 'undefined' ? (
        <Text tw="text-xs text-red-600 mt-1.5 pl-3">{errors.state.message?.toString()}</Text>
      ) : null}

      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full mt-3"
            label="City"
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
        name="city"
      />
      {typeof errors.city !== 'undefined' ? (
        <Text tw="text-xs text-red-600 mt-1.5 pl-3">{errors.city.message?.toString()}</Text>
      ) : null}

      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full mt-3"
            label="Postal Code"
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
        name="zipCode"
      />
      {typeof errors.zipCode !== 'undefined' ? (
        <Text tw="text-xs text-red-600 mt-1.5 pl-3">{errors.zipCode.message?.toString()}</Text>
      ) : null}

      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full mt-3"
            label="Street"
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
        name="street"
      />
      {typeof errors.street !== 'undefined' ? (
        <Text tw="text-xs text-red-600 mt-1.5 pl-3">{errors.street.message?.toString()}</Text>
      ) : null}

      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full mt-3"
            label="Street Number"
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
        name="streetNumber"
      />
      {typeof errors.streetNumber !== 'undefined' ? (
        <Text tw="text-xs text-red-600 mt-1.5 pl-3">{errors.streetNumber.message?.toString()}</Text>
      ) : null}
    </React.Fragment>
  );
}
