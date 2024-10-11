import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../components/FormManager';

export default function LocationField() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="location"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent"
            label={t('Dashboard.AccountDetails.fields.location')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.phone}
          />
        )}
      />
    </React.Fragment>
  );
}
