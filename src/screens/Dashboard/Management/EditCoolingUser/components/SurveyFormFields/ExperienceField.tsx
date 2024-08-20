import React, { type PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Icon, RadioButton } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Input } from '#ui/components/Input';

import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import { EExperience } from '#screens/Dashboard/Main/History/MarketSurvey/schema';
import SurveyFormManager from '../SurveyFormManager';

export default function ComposedField() {
  return (
    <_ExperienceField>
      <_ExperienceInMonthsField />
    </_ExperienceField>
  );
}

function _ExperienceField(props: PropsWithChildren) {
  const {
    control,
    formState: { errors },
  } = SurveyFormManager.useSurveyForm();

  const { t } = useTranslationUtils();

  return (
    <View tw="my-2">
      <View tw="flex flex-row space-x-2 items-center">
        <Icon source="snowflake" size={25} color={paperTheme.colors.primary} />
        <Text variant="TextBold" tw="text-lg font-bold">
          {t('Dashboard.History.survey.baseSurvey.usageQuestion')}
        </Text>
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioButton.Group value={`${value}`} onValueChange={onChange}>
            <RadioButtonItem
              label={t('Dashboard.History.survey.baseSurvey.newUser')}
              value={EExperience.NEW}
              tw="flex flex-row-reverse ml-[-10]"
            />
            <RadioButtonItem
              label={t('Dashboard.History.survey.baseSurvey.oldUser')}
              value={EExperience.OLD}
              tw="flex flex-row-reverse ml-[-10]"
            />
          </RadioButton.Group>
        )}
        name="experience"
      />

      {errors.experience ? (
        <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
          {errors.experience.message?.toString()}
        </Text>
      ) : null}

      {props.children}
    </View>
  );
}

function _ExperienceInMonthsField() {
  const {
    watch,
    control,
    formState: { errors },
  } = SurveyFormManager.useSurveyForm();

  const experience = watch('experience');

  switch (experience) {
    case EExperience.OLD: {
      return (
        <React.Fragment>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                tw="w-full text-base bg-transparent rounded-sm h-12 truncate"
                onChangeText={onChange}
                keyboardType="number-pad"
                value={value}
                label={'For how many months have you used the room?'}
                error={errors.experienceInMonths}
              />
            )}
            name="experienceInMonths"
          />
        </React.Fragment>
      );
    }

    case EExperience.NEW:
    default:
      return null;
  }
}
