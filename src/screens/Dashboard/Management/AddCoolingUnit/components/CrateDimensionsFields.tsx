import React from 'react';
import { Divider } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { SuffixTextInput } from '#ui/components/SuffixTextInput';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../contexts/FormManager';

export default function CrateDimensionsFields() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Text tw="mx-4 mt-4 mb-1 text-base">
        {t('Dashboard.Management.AddCoolingUnit.fields.crateSizeHeading')}
      </Text>
      <Controller
        name="crateLength"
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
            error={!!errors.crateLength}
            underlineColor="transparent"
            suffix="cm"
          />
        )}
      />
      <Controller
        name="crateWidth"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            tw="w-full bg-transparent mt-1"
            label={t('Dashboard.Management.AddCoolingUnit.fields.width')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.crateWidth}
            underlineColor="transparent"
            suffix="cm"
          />
        )}
      />
      <Controller
        name="crateHeight"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            tw="w-full bg-transparent mt-1"
            label={t('Dashboard.Management.AddCoolingUnit.fields.height')}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.crateHeight}
            underlineColor="transparent"
            suffix="cm"
          />
        )}
      />
      <Divider tw="w-full bg-gray-700 mt-4" />
    </React.Fragment>
  );
}
