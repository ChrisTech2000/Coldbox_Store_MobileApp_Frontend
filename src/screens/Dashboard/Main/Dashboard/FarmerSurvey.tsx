import React, { useCallback, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Dimensions, View } from 'react-native';

import Danger from '#assets/icons/danger.svg';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { SMALL_SCREEN_THRESHOLD } from '#constants/ui';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useManagementStore } from '#stores/management';
import { GetFarmerSurveysResponse } from '#types/api.responses';

import { FarmersSurveyModal, FarmerSurveySchemaType } from '../components/FarmerSurveyModal';
import { defaultValues, formatFloat } from '../components/FarmerSurveyModal/schema';

type FarmerSurveyProps = {
  cropId: number | undefined;
  cropName: string;
  farmerId: number;
  surveys: GetFarmerSurveysResponse | undefined;
  disabled?: boolean;
};

const screenHeight = Dimensions.get('window').height;

export function FarmerSurvey({ cropId, cropName, farmerId, surveys, disabled }: FarmerSurveyProps) {
  const { t } = useTranslationUtils();

  const { company } = useManagementStore();

  const [isSurveyModalVisible, setIsSurveyModalVisible] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FarmerSurveySchemaType> = useCallback(
    async (values) => {
      const result = await ColdtivateService.updateFarmerSurveys({
        farmer: farmerId,
        userType: '',
        experience: 'no',
        experienceDuration: 1,
        commodities: [
          ...(surveys?.flatMap((survey) => survey.co) ?? []),
          {
            averagePrice: Number(formatFloat(values.averagePrice)),
            unit: values.unitOfMeasurement,
            quantityTotal: Number(formatFloat(values.weightDistribution.totalProducedWeekly)),
            quantityBelowMarketPrice: Number(formatFloat(values.weightDistribution.quantityLost)),
            quantitySelfConsumed: Number(
              formatFloat(values.weightDistribution.quantitySelfConsumed)
            ),
            quantitySold: Number(formatFloat(values.weightDistribution.quantitySold)),
            averageSeasonInMonths: null,
            kgInUnit: Number(formatFloat(values.unitaryWeight ?? defaultValues.unitaryWeight)),
            currency: company?.currency ?? '',
            reasonForLoss: values.reasonsForSpoilage,
            cropId: cropId ?? -1,
          },
        ],
      });

      if (result) {
        setIsSurveyModalVisible(false);
      }
    },
    [farmerId, cropId, company]
  );

  return (
    <View tw="w-full flex flex-row items-center justify-between space-x-2 mt-1 mb-2">
      <View tw="flex flex-row flex-1 items-center space-x-2">
        <Danger tw="w-7 h-7" />
        <Text
          variant="TextMedium"
          tw={cn('text-base', screenHeight <= SMALL_SCREEN_THRESHOLD ? 'w-44' : 'w-56')}
          numberOfLines={4}
        >
          {t('Dashboard.CrateManagement.FarmerSurvey.warningMessage', { crop: cropName })}
        </Text>
      </View>

      <Button
        mode="contained"
        icon={LanguageManager.isRTL ? 'arrow-left' : 'arrow-right'}
        contentStyle="flex flex-row-reverse"
        onPress={(evt) => {
          evt.stopPropagation();
          setIsSurveyModalVisible(true);
        }}
        disabled={disabled}
      >
        {t('actions.go')}
      </Button>

      <FarmersSurveyModal
        company={company}
        cropName={cropName}
        isModalVisible={isSurveyModalVisible}
        onDismiss={() => setIsSurveyModalVisible(false)}
        onSubmit={onSubmit}
      />
    </View>
  );
}
