import { z } from 'zod';

import { Translator } from '#i18n/utils';
import { EUnitOfMeasurement } from '#types/global';

export const formatFloat = (value: string | number) => {
  return typeof value === 'string' ? value.replace(/,/g, '.').trim() : value;
};

export const FarmerSurveySchema = (t: Translator) =>
  z
    .object({
      unitOfMeasurement: z.enum([
        EUnitOfMeasurement.KILOGRAMS,
        EUnitOfMeasurement.BOXES,
        EUnitOfMeasurement.BASKETS,
        EUnitOfMeasurement.SACKS,
        EUnitOfMeasurement.CRATES,
      ]),
      unitaryWeight: z
        .string({ message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number') })
        .min(1, {
          message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
        }),
      weightDistribution: z
        .object({
          totalProducedWeekly: z
            .string({
              message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
            })
            .min(1, {
              message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
            }),
          quantitySelfConsumed: z.string(),
          quantitySold: z.string(),
          quantityLost: z.string(),
        })
        .superRefine((data, ctx) => {
          if (
            Number(formatFloat(data.quantitySelfConsumed ?? 0)) +
              Number(formatFloat(data.quantitySold ?? 0)) +
              Number(formatFloat(data.quantityLost ?? 0)) !==
            Number(formatFloat(data.totalProducedWeekly))
          ) {
            ctx.addIssue({
              code: 'custom',
              message: t(
                'Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.totalMismatch'
              ),
              path: ['quantitySelfConsumed'],
            });
          }
        }),
      reasonsForSpoilage: z.array(z.string(), {
        message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.reasonsForSpoilage'),
      }),
      averagePrice: z
        .string({ message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number') })
        .optional(),
      crop: z.any(),
      cropSelection: z.boolean(),
    })
    .superRefine(({ crop, cropSelection }, ctx) => {
      if (cropSelection && !crop) {
        ctx.addIssue({
          code: 'custom',
          message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.cropError'),
          path: ['crop'],
        });
      }
    });

export const defaultValues = {
  unitOfMeasurement: EUnitOfMeasurement.KILOGRAMS,
  unitaryWeight: '25',
};
