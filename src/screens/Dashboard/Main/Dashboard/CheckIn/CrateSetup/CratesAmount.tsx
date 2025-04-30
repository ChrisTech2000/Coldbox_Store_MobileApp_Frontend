import React from 'react';
import { View } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import { type Control, Controller } from 'react-hook-form';

import { Input } from '#ui/components/Input';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';

import type { SetupSchema } from './index';

export default function CratesAmount(props: {
  onChangeNumericKeyboard: (
    newVal: string | number,
    onChange: (...event: unknown[]) => void,
    field?: keyof SetupSchema
  ) => void;
  formControl: Control<SetupSchema, unknown>;
  errorMessage?: string;
}) {
  const { onChangeNumericKeyboard, formControl, errorMessage } = props;

  const { t } = useTranslationUtils();

  const hasError = typeof errorMessage === 'string';

  return (
    <View tw="flex-col mt-3">
      <Text tw="text-base">
        {t('Dashboard.CrateManagement.CheckIn.Setup.numberOfCratesLabel')}*
      </Text>
      <Controller
        name="numberOfCrates"
        control={formControl}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <View tw="w-full flex flex-row items-center justify-between">
            <Input
              tw={cn(
                'w-1/2 px-4 bg-white border border-b-0 rounded-sm h-12 mt-1',
                hasError && 'border-red-300'
              )}
              keyboardType="numeric"
              onChangeText={(newVal) => onChangeNumericKeyboard(newVal, onChange, 'numberOfCrates')}
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
                onChangeNumericKeyboard(!value ? 0 : Number(value) - 1, onChange, 'numberOfCrates');
              }}
              testID="numberOfCrates-minus"
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
                onChangeNumericKeyboard(Number(value ?? 0) + 1, onChange, 'numberOfCrates');
              }}
              testID="numberOfCrates-plus"
            />
          </View>
        )}
      />
      {hasError ? <Text tw="text-xs text-red-600 mt-[2] pl-3 w-[95%]">{errorMessage}</Text> : null}
      <Divider tw="bg-gray-400 mt-4" />
    </View>
  );
}
