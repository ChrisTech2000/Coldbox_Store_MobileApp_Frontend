import React from 'react';
import { Divider, TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../contexts/FormManager';

export default function UnitSizeFields() {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Text tw="mx-4 mt-4 mb-1 text-base">
        {t('Dashboard.Management.AddCoolingUnit.fields.roomSizeHeading')}
      </Text>
      <Controller
        name="roomLength"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label={t('Dashboard.Management.AddCoolingUnit.fields.length')}
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.roomLength}
            right={<TextInput.Affix text="m" />}
            underlineColor="transparent"
          />
        )}
      />
      <Controller
        name="roomWidth"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label={t('Dashboard.Management.AddCoolingUnit.fields.width')}
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.roomWidth}
            right={<TextInput.Affix text="m" />}
            underlineColor="transparent"
          />
        )}
      />
      <Controller
        name="roomHeight"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label={t('Dashboard.Management.AddCoolingUnit.fields.height')}
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.roomHeight}
            right={<TextInput.Affix text="m" />}
            underlineColor="transparent"
          />
        )}
      />
      <Controller
        name="roomWeight"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label={t('Dashboard.Management.AddCoolingUnit.fields.weight')}
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.roomWeight}
            right={<TextInput.Affix text="kg" />}
            underlineColor="transparent"
          />
        )}
      />
      <Divider tw="w-full bg-gray-700 mt-4" />
    </React.Fragment>
  );
}
