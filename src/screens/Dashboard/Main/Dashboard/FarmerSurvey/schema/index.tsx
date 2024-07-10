import { z } from 'zod';

import { Translator } from '#i18n/utils';
import { EUnitOfMeasurement } from '#types/global';

export const FarmerSurveySchema = (t: Translator) =>
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
    );

export const defaultValues = {
  totalProducedWeekly: 0,
  unitOfMeasurement: EUnitOfMeasurement.KILOGRAMS,
};
