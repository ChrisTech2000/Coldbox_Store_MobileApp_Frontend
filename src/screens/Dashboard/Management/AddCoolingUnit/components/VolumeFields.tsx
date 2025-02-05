import React from 'react';
import { Controller } from 'react-hook-form';

import { SuffixTextInput } from '#ui/components/SuffixTextInput';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../contexts/FormManager';

export default function VolumeFields() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="capacityInMetricTons"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={`${t('Dashboard.Management.AddCoolingUnit.fields.capacityInMetricTons')}*`}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.capacityInMetricTons}
            suffix="MT"
          />
        )}
      />

      <Controller
        name="foodCapacityInMetricTons"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={`${t('Dashboard.Management.AddCoolingUnit.fields.foodCapacityInMetricTons')}*`}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.foodCapacityInMetricTons}
            suffix="MT"
          />
        )}
      />
    </React.Fragment>
  );
}
