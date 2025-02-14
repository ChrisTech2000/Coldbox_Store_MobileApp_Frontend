import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from './FormManager';

export default function AddressForm() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-3"
            label={t('Dashboard.Management.Location.fields.country')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.country}
          />
        )}
        name="country"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-3"
            label={t('Dashboard.Management.Location.fields.state')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.state}
          />
        )}
        name="state"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-3"
            label={t('Dashboard.Management.Location.fields.city')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.city}
          />
        )}
        name="city"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-3"
            label={t('Dashboard.Management.Location.fields.zipCode')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.zipCode}
          />
        )}
        name="zipCode"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-3"
            label={t('Dashboard.Management.Location.fields.street')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.street}
          />
        )}
        name="street"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-3"
            label={t('Dashboard.Management.Location.fields.streetNumber')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.streetNumber}
            keyboardType="numbers-and-punctuation"
          />
        )}
        name="streetNumber"
      />
    </React.Fragment>
  );
}
