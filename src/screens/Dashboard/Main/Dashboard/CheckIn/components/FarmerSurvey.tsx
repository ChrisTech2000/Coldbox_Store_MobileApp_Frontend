import React from 'react';
import { View } from 'react-native';
import { Icon, Portal } from 'react-native-paper';

import Danger from '#assets/icons/danger.svg';

import { Button } from '#ui/components/Button';
import { Modal } from '#ui/components/Modal';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';

type FarmerSurveyProps = {
  cropName: string;
};

export function FarmerSurvey({ cropName }: FarmerSurveyProps) {
  const { t } = useTranslationUtils();

  return (
    <View tw="w-full flex flex-row items-center justify-between space-x-2 mt-1 mb-2">
      <View tw="flex flex-row flex-1 items-center space-x-2">
        <Danger tw="w-7 h-7" />
        <Text variant="TextMedium" tw="text-base">
          {t('Dashboard.CrateManagement.FarmerSurvey.warningMessage', { crop: cropName })}
        </Text>
      </View>

      <Button
        mode="contained"
        icon="arrow-right"
        contentStyle="flex flex-row-reverse"
        onPress={() => null}
      >
        {t('actions.go')}
      </Button>

      <Portal>
        <Modal visible={true} onDismiss={() => null}>
          <View tw="w-full bg-white rounded-sm w-3/4 max-w-3/4 h-auto py-4 px-5 self-center space-y-2">
            <Question
              question={t('Dashboard.CrateManagement.FarmerSurvey.modal.weeklyQuantityQuestion')}
            />
            <Text variant="TextMedium" tw="text-base">
              1. {t('Dashboard.CrateManagement.FarmerSurvey.modal.totalQuantity')}
            </Text>
            <Text variant="TextMedium" tw="text-base">
              2. {t('Dashboard.CrateManagement.FarmerSurvey.modal.quantityDistributionQuestion')}
            </Text>

            <Question
              question={t('Dashboard.CrateManagement.FarmerSurvey.modal.cropSpoilageQuestion')}
            />
            <Question
              question={t('Dashboard.CrateManagement.FarmerSurvey.modal.marketPriceQuestion', {
                crop: cropName,
              })}
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

function Question({ question }: { question: string }) {
  return (
    <View tw="flex flex-row space-x-1">
      <View tw="mt-2">
        <Icon source="circle" size={6} />
      </View>
      <Text variant="TextBold" tw="text-base font-bold">
        {question}
      </Text>
    </View>
  );
}
