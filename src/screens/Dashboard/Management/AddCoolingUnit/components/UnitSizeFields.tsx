import React from 'react';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { SuffixTextInput } from '#ui/components/SuffixTextInput';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../contexts/FormManager';

export default function UnitSizeFields() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Text tw="mx-4 mt-4 mb-2 text-base">
        {t('Dashboard.Management.AddCoolingUnit.fields.roomSizeHeading')}
      </Text>
      <Controller
        name="roomLength"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.length')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.roomLength}
            suffix="m"
          />
        )}
      />
      <Controller
        name="roomWidth"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.width')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.roomWidth}
            suffix="m"
          />
        )}
      />
      <Controller
        name="roomHeight"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.height')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.roomHeight}
            suffix="m"
          />
        )}
      />
      <Controller
        name="roomWeight"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.weight')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.roomWeight}
            suffix="kg"
          />
        )}
      />
    </React.Fragment>
  );
}
