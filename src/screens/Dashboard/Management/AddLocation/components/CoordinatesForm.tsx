import React from 'react';
import { Dimensions, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../components/FormManager';

const width = (Dimensions.get('screen').width - 42) / 2;

export default function CoordinatesForm() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <View tw="w-full flex-row gap-3 justify-between mt-0.5">
      <View style={{ width }}>
        <Controller
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              label={t('Dashboard.Management.Location.fields.latitude')}
              mode="flat"
              dense
              value={value.toString()}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.latitude}
            />
          )}
          name="latitude"
        />
      </View>

      <View style={{ width }}>
        <Controller
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              label={t('Dashboard.Management.Location.fields.longitude')}
              mode="flat"
              dense
              value={value.toString()}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.longitude}
            />
          )}
          name="longitude"
        />
      </View>
    </View>
  );
}
