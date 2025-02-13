import React from 'react';
import { Controller } from 'react-hook-form';

import { SuffixTextInput } from '#ui/components/SuffixTextInput';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../../../contexts/FormManager';

export default function DieselConsumptionField() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="powerSourceDieselConsumptionKwh"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.powerSourceDieselConsumptionKwh')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.powerSourceDieselConsumptionKwh}
            suffix="L/kWh"
          />
        )}
      />
    </React.Fragment>
  );
}
