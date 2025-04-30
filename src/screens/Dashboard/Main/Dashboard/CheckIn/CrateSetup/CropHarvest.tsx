import React, { useMemo } from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { type Control, Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { RadioButtonItem } from '#ui/components/RadioButton';

import { useTranslationUtils } from '#i18n/utils';
import { EDateCropped } from '#types/global';

import type { SetupSchema } from './index';

export default function CropHarvest(props: {
  formControl: Control<SetupSchema, unknown>;
  errorMessage?: string;
}) {
  const { formControl, errorMessage } = props;

  const { t } = useTranslationUtils();

  const harvestDateOptions = useMemo(
    () => [
      {
        label: t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateValues.today'),
        value: EDateCropped.TODAY,
      },
      {
        label: t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateValues.yesterday'),
        value: EDateCropped.YESTERDAY,
      },
      {
        label: t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateValues.dayBefore'),
        value: EDateCropped.DAY_BEFORE,
      },
      {
        label: t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateValues.evenBefore'),
        value: EDateCropped.EVEN_BEFORE,
      },
    ],
    [t]
  );

  const hasError = typeof errorMessage === 'string';

  return (
    <View tw="flex-col mt-3">
      <Text tw="text-base mb-1">
        {t('Dashboard.CrateManagement.CheckIn.Setup.harvestDateLabel')}*
      </Text>
      {hasError ? <Text tw="text-xs text-red-600 mt-[2] pl-3 w-[95%]">{errorMessage}</Text> : null}
      <Controller
        name="dateHarvested"
        control={formControl}
        render={({ field: { onChange, value } }) => (
          <RadioButton.Group value={value?.toString() ?? ''} onValueChange={onChange}>
            {harvestDateOptions.map((option, optionIdx) => (
              <RadioButtonItem
                testID={`radio-harvest-date-${option.label.toLowerCase()}`}
                key={`${option}-${optionIdx}`}
                label={option.label}
                value={option.value}
                tw="flex flex-row-reverse ml-[-10]"
              />
            ))}
          </RadioButton.Group>
        )}
      />
    </View>
  );
}
