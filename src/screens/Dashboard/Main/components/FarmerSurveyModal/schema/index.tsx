import { z } from 'zod';

import { Translator } from '#i18n/utils';
import { EUnitOfMeasurement } from '#types/global';

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
        .number({ message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number') })
        .positive({
          message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
        })
        .min(1, {
          message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
        }),
      weightDistribution: z
        .object({
          totalProducedWeekly: z
            .number({
              message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
            })
            .positive({
              message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
            })
            .min(1, {
              message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
            }),
          quantitySelfConsumed: z.number(),
          quantitySold: z.number(),
          quantityLost: z.number(),
        })
        .superRefine((data, ctx) => {
          if (
            (data.quantitySelfConsumed ?? 0) +
              (data.quantitySold ?? 0) +
              (data.quantityLost ?? 0) !==
            data.totalProducedWeekly
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
      reasonsForSpoilage: z
        .string()
        .array()
        .refine((array) => array && array.length > 0, {
          message: t(
            'Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.reasonsForSpoilage'
          ),
        }),
      averagePrice: z
        .number({ message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number') })
        .positive({
          message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
        })
        .min(1, {
          message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
        }),
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
  unitaryWeight: 25,
};
