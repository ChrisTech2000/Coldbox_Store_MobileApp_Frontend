import React from 'react';
import { View } from 'react-native';
import { Icon, RadioButton } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { RadioButtonItem } from '#ui/components/RadioButton';

import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import { EOccupation } from '#screens/Dashboard/Main/History/MarketSurvey/schema';
import SurveyFormManager from '../SurveyFormManager';

export default function OccupationField() {
  const {
    control,
    formState: { errors },
  } = SurveyFormManager.useSurveyForm();

  const { t } = useTranslationUtils();

  return (
    <View tw="my-2">
      <View tw="flex flex-row space-x-2 items-center">
        <Icon source="account-outline" size={25} color={paperTheme.colors.primary} />
        <Text variant="TextBold" tw="text-lg font-bold">
          {t('Dashboard.History.survey.baseSurvey.occupationQuestion')}
        </Text>
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioButton.Group value={value} onValueChange={onChange}>
            <RadioButtonItem
              label={t('Dashboard.History.survey.baseSurvey.occupationFarmer')}
              value={EOccupation.FARMER}
              tw="flex flex-row-reverse ml-[-10]"
            />
            <RadioButtonItem
              label={t('Dashboard.History.survey.baseSurvey.occupationTrader')}
              value={EOccupation.TRADER}
              tw="flex flex-row-reverse ml-[-10]"
            />
          </RadioButton.Group>
        )}
        name="occupation"
      />

      {errors.occupation ? (
        <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
          {errors.occupation.message?.toString()}
        </Text>
      ) : null}
    </View>
  );
}
