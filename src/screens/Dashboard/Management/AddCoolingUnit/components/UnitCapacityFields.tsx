import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { SuffixTextInput } from '#ui/components/SuffixTextInput';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../contexts/FormManager';

export default function UnitCapacityFields() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="roomInsulator"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.roomInsulator')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.roomInsulator}
            suffix="kg"
          />
        )}
      />
      <Controller
        name="capacityInNumberCrates"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label={`${t('Dashboard.Management.AddCoolingUnit.fields.capacityInNumberCrates')}*`}
            testID="field-max-number-crates"
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.capacityInNumberCrates}
          />
        )}
      />
      <Controller
        name="crateWeight"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={`${t('Dashboard.Management.AddCoolingUnit.fields.crateWeight')}*`}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.crateWeight}
            suffix="kg"
          />
        )}
      />
    </React.Fragment>
  );
}
