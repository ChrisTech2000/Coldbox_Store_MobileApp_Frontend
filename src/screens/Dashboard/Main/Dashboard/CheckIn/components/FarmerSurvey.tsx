import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Icon, Portal } from 'react-native-paper';

import Danger from '#assets/icons/danger.svg';

import { Button } from '#ui/components/Button';
import { Modal } from '#ui/components/Modal';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { EUnitOfMeasurement } from '#types/global';
import { useForm } from 'react-hook-form';

type FarmerSurveyProps = {
  cropName: string;
};

type Schema = {
  totalProducedWeekly: number;
  unitOfMeasurement: EUnitOfMeasurement;
  unitaryWeight: number | undefined;
  quantitySelfConsumed: number;
  quantitySold: number;
  quantityLost: number;
  reasonsForSpoilage: string[];
  averagePrice: number;
};

export function FarmerSurvey({ cropName }: FarmerSurveyProps) {
  const { t, zodResolver } = useTranslationUtils();

  const {
    handleSubmit,
    // control,
    // clearErrors,
    // watch,
    // formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver((z, t) =>
      z
        .object({
          totalProducedWeekly: z
            .number()
            .positive()
            .min(1, {
              message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
            }),
          unitOfMeasurement: z
            .enum([
              EUnitOfMeasurement.KILOGRAMS,
              EUnitOfMeasurement.BOXES,
              EUnitOfMeasurement.BASKETS,
              EUnitOfMeasurement.SACKS,
              EUnitOfMeasurement.CRATES,
            ])
            .optional()
            .refine((unit) => !!unit, { message: '' }),
          unitaryWeight: z
            .number()
            .positive()
            .min(1, {
              message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
            }),
          quantitySelfConsumed: z
            .number()
            .positive()
            .min(1, {
              message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
            }),
          quantitySold: z
            .number()
            .positive()
            .min(1, {
              message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
            }),
          quantityLost: z
            .number()
            .positive()
            .min(1, {
              message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
            }),
          reasonsForSpoilage: z
            .string()
            .array()
            .refine((array) => array && array.length > 1, { message: '' }),
          averagePrice: z
            .number()
            .positive()
            .min(1, {
              message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
            }),
        })
        .refine(
          (data) =>
            data.quantitySelfConsumed + data.quantitySold + data.quantityLost ===
            data.totalProducedWeekly,
          {
            message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.totalMismatch'),
            path: ['quantitySelfConsumed', 'quantitySold', 'quantityLost'],
          }
        )
    ),
  });

  const onSubmit = useCallback(() => {}, []);

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
            <Button
              mode="contained"
              icon="check-circle-outline"
              contentStyle="flex flex-row-reverse"
              onPress={handleSubmit(onSubmit)}
            >
              {t('actions.confirm')}
            </Button>
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
