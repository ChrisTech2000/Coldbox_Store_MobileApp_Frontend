import React from 'react';
import { View } from 'react-native';
import { Icon, RadioButton } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { RadioButtonItem } from '#ui/components/RadioButton';

import { useTranslationUtils } from '#i18n/utils';

function BaseSurvey() {
  const colors = useTailwindColors();
  const { t } = useTranslationUtils();

  return (
    <View tw="flex-1 space-y-4 m-4">
      <View>
        <View tw="flex flex-row space-x-2 items-center">
          <Icon source="account-outline" size={25} color={colors.green.primary} />
          <Text variant="TextBold" tw="text-lg font-bold">
            {t('Dashboard.History.farmersSurvey.baseSurvey.occupationQuestion')}
          </Text>
        </View>

        <RadioButton.Group value={''} onValueChange={() => null}>
          <RadioButtonItem
            label={t('Dashboard.History.farmersSurvey.baseSurvey.occupationFarmer')}
            value={t('Dashboard.History.farmersSurvey.baseSurvey.occupationFarmer')}
            tw="flex flex-row-reverse ml-[-10]"
          />
          <RadioButtonItem
            label={t('Dashboard.History.farmersSurvey.baseSurvey.occupationTrader')}
            value={t('Dashboard.History.farmersSurvey.baseSurvey.occupationTrader')}
            tw="flex flex-row-reverse ml-[-10]"
          />
        </RadioButton.Group>
      </View>

      <View>
        <View tw="flex flex-row space-x-2 items-center">
          <Icon source="snowflake" size={25} color={colors.green.primary} />
          <Text variant="TextBold" tw="text-lg font-bold">
            {t('Dashboard.History.farmersSurvey.baseSurvey.usageQuestion')}
          </Text>
        </View>

        <RadioButton.Group value={''} onValueChange={() => null}>
          <RadioButtonItem
            label={t('Dashboard.History.farmersSurvey.baseSurvey.newUser')}
            value={t('Dashboard.History.farmersSurvey.baseSurvey.newUser')}
            tw="flex flex-row-reverse ml-[-10]"
          />
          <RadioButtonItem
            label={t('Dashboard.History.farmersSurvey.baseSurvey.oldUser')}
            value={t('Dashboard.History.farmersSurvey.baseSurvey.oldUser')}
            tw="flex flex-row-reverse ml-[-10]"
          />
        </RadioButton.Group>
      </View>

      <View tw="space-y-2">
        <View tw="flex flex-row space-x-2 items-center">
          <Icon source="shopping-outline" size={25} color={colors.green.primary} />
          <Text variant="TextBold" tw="text-lg font-bold">
            {t('Dashboard.History.farmersSurvey.baseSurvey.mostUsedCommoditiesQuestion')}
          </Text>
        </View>

        <Text variant="TextMedium" tw="text-lg">
          {t('Dashboard.History.farmersSurvey.baseSurvey.fillCommoditiesMessage')}
        </Text>
      </View>
    </View>
  );
}

export default withSafeArea(BaseSurvey);
