import React from 'react';
import { Dimensions, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../components/FormManager';

const width = (Dimensions.get('window').width - 42) / 2;

export default function CoordinatesForm() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const latitudeError = typeof formState.errors.latitude !== 'undefined';
  const longitudeError = typeof formState.errors.longitude !== 'undefined';

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
              value={value}
              keyboardType="numbers-and-punctuation"
              onChangeText={onChange}
              onBlur={onBlur}
              error={latitudeError}
            />
          )}
          name="latitude"
        />
        {latitudeError ? (
          <Text tw="text-red-600 text-xs mt-1.5">
            {t('Dashboard.Management.Location.fieldErrorMessages.latitude')}
          </Text>
        ) : null}
      </View>

      <View style={{ width }}>
        <Controller
          control={control}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              label={t('Dashboard.Management.Location.fields.longitude')}
              mode="flat"
              dense
              value={value}
              keyboardType="numbers-and-punctuation"
              onChangeText={onChange}
              onBlur={onBlur}
              error={longitudeError}
            />
          )}
          name="longitude"
        />
        {longitudeError ? (
          <Text tw="text-red-600 text-xs mt-1.5">
            {t('Dashboard.Management.Location.fieldErrorMessages.longitude')}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
