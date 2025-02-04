import React from 'react';
import { Divider } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { SuffixTextInput } from '#ui/components/SuffixTextInput';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../../../contexts/FormManager';

export default function HybridFields() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Text tw="mx-4 mt-4 mb-1 text-base">
        Which percentage of the room is powered by the different sources?
      </Text>
      <Controller
        name="powerSourceDieselPercent"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.powerSourceDieselPercent')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.powerSourceDieselPercent}
            underlineColor="transparent"
            suffix="%"
          />
        )}
      />
      <Controller
        name="powerSourceGridPercent"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.powerSourceGridPercent')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.powerSourceGridPercent}
            underlineColor="transparent"
            suffix="%"
          />
        )}
      />
      <Controller
        name="powerSourcePvPercent"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.powerSourcePvPercent')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.powerSourcePvPercent}
            underlineColor="transparent"
            suffix="%"
          />
        )}
      />
      <Controller
        name="powerSourceBiomassPercent"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={t('Dashboard.Management.AddCoolingUnit.fields.powerSourceBiomassPercent')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.powerSourceBiomassPercent}
            underlineColor="transparent"
            suffix="%"
          />
        )}
      />
      <Divider tw="w-full bg-gray-700 mt-4" />
    </React.Fragment>
  );
}
