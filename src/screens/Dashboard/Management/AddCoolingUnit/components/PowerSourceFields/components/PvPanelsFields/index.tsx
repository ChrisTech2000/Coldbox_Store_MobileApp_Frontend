import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { SuffixTextInput } from '#ui/components/SuffixTextInput';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../../../../contexts/FormManager';
import PvPanelTypeField from './components/PvPanelTypeField';

export default function PvPanelsFields() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="pvPanelCount"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label={t('Dashboard.Management.AddCoolingUnit.fields.pvPanelCount')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.pvPanelCount}
          />
        )}
      />
      <PvPanelTypeField />
      <Controller
        name="pvPanelSize"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.pvPanelSize')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.pvPanelSize}
            suffix="m2"
          />
        )}
      />
      <Controller
        name="pvPanelWeight"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.pvPanelWeight')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.pvPanelWeight}
            suffix="kg"
          />
        )}
      />
      <Controller
        name="pvPanelMaxPower"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.pvPanelMaxPower')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.pvPanelMaxPower}
            suffix="W"
          />
        )}
      />
    </React.Fragment>
  );
}
