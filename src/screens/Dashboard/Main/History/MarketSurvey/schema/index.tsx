import { z } from 'zod';

import { Translator } from '#i18n/utils';

export enum EOccupation {
  FARMER = 'FARMER',
  TRADER = 'TRADER',
}

export enum EExperience {
  OLD = 'OLD',
  NEW = 'NEW',
}

export type Schema = {
  occupation: EOccupation;
  experience: EExperience;
  experienceInMonths: string;
};

export const BaseSurveySchema = (t: Translator) =>
  z
    .object({
      occupation: z.enum([EOccupation.FARMER, EOccupation.TRADER], {
        message: t('Dashboard.History.farmersSurvey.baseSurvey.genericFormError'),
      }),
      experience: z.enum([EExperience.OLD, EExperience.NEW], {
        message: t('Dashboard.History.farmersSurvey.baseSurvey.genericFormError'),
      }),
      experienceInMonths: z.string().optional(),
    })
    .superRefine(({ experience, experienceInMonths }, ctx) => {
      if (experience === EExperience.OLD && !experienceInMonths) {
        ctx.addIssue({
          code: 'custom',
          message: t('Dashboard.History.farmersSurvey.baseSurvey.experienceError'),
          path: ['experienceInMonths'],
        });
      }
    });
