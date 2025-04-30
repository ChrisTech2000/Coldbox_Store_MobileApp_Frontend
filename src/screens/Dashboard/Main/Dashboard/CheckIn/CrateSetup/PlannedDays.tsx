import React from 'react';
import { View } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import { type Control, Controller } from 'react-hook-form';

import { Input } from '#ui/components/Input';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import type { SetupSchema } from './index';

export default function PlannedDays(props: {
  onChangeNumericKeyboard: (
    newVal: string | number,
    onChange: (...event: unknown[]) => void,
    field?: keyof SetupSchema
  ) => void;
  formControl: Control<SetupSchema, unknown>;
}) {
  const { onChangeNumericKeyboard, formControl } = props;

  const { t } = useTranslationUtils();

  return (
    <View tw="flex-col mt-3">
      <Text tw="text-base">{t('Dashboard.CrateManagement.CheckIn.Setup.plannedDaysLabel')}</Text>
      <Controller
        name="plannedDays"
        control={formControl}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <View tw="w-full flex flex-row items-center justify-between">
            <Input
              tw="w-1/2 px-4 bg-white border rounded-sm h-12"
              keyboardType="numeric"
              onChangeText={(newVal) => onChangeNumericKeyboard(newVal, onChange, 'plannedDays')}
              value={value?.toString() ?? ''}
            />
            <IconButton
              mode="contained-tonal"
              icon="minus"
              size={30}
              tw="rounded-md border border-green-primary"
              iconColor={paperTheme.colors.primary}
              containerColor={paperTheme.colors.secondaryContainer}
              onPress={(evt) => {
                evt.stopPropagation();
                onChangeNumericKeyboard(!value ? 0 : Number(value) - 1, onChange, 'plannedDays');
              }}
              testID="plannedDays-minus"
            />
            <IconButton
              mode="contained-tonal"
              icon="plus"
              size={30}
              tw="rounded-md border border-green-primary"
              iconColor={paperTheme.colors.primary}
              containerColor={paperTheme.colors.secondaryContainer}
              onPress={(evt) => {
                evt.stopPropagation();
                onChangeNumericKeyboard(Number(value ?? 0) + 1, onChange, 'plannedDays');
              }}
              testID="plannedDays-plus"
            />
          </View>
        )}
      />
      <Divider tw="bg-gray-400 mt-4" />
    </View>
  );
}
