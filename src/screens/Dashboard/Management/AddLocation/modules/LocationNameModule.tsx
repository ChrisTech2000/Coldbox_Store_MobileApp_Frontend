import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../components/FormManager';

export default function LocationNameModule() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errorMessage = formState.errors.name?.message?.toString();

  return (
    <React.Fragment>
      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent"
            label={`${t('Dashboard.Management.Location.fields.name')}*`}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errorMessage}
          />
        )}
        name="name"
      />
    </React.Fragment>
  );
}
