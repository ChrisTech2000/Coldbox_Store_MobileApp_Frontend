import { z } from 'zod';

import { Translator } from '#i18n/utils';
import { EUnitOfMeasurement } from '#types/global';

export enum EOccupation {
  FARMER = 'FARMER',
  TRADER = 'TRADER',
}

export enum EExperience {
  OLD = 'OLD',
  NEW = 'NEW',
}
export enum ELocation {
  FARM = 'FARM',
  MARKET = 'MARKET',
  BOTH = 'BOTH',
}

export type BaseSurveySchemaType = {
  occupation: EOccupation;
  experience: EExperience;
  experienceInMonths: string;
};

export type MarketSurveySchemaType = {
  location: ELocation;
  reasonsForSpoilage: string[];
  spoiledProduceAmount: number;
  price: number;
  unitOfMeasurement: EUnitOfMeasurement;
};

export const BaseSurveySchema = (t: Translator) =>
  z
    .object({
      occupation: z.enum([EOccupation.FARMER, EOccupation.TRADER], {
        message: t('Dashboard.History.survey.baseSurvey.genericFormError'),
      }),
      experience: z.enum([EExperience.OLD, EExperience.NEW], {
        message: t('Dashboard.History.survey.baseSurvey.genericFormError'),
      }),
      experienceInMonths: z.string().optional(),
    })
    .superRefine(({ experience, experienceInMonths }, ctx) => {
      if (experience === EExperience.OLD && !experienceInMonths) {
        ctx.addIssue({
          code: 'custom',
          message: t('Dashboard.History.survey.baseSurvey.experienceError'),
          path: ['experienceInMonths'],
        });
      }
    });

export const MarketSurveySchema = (t: Translator) =>
  z.object({
    location: z.enum([ELocation.FARM, ELocation.MARKET, ELocation.BOTH], {
      message: t('Dashboard.History.survey.marketSurvey.formError'),
    }),
    unitOfMeasurement: z.enum([
      EUnitOfMeasurement.KILOGRAMS,
      EUnitOfMeasurement.BOXES,
      EUnitOfMeasurement.BASKETS,
      EUnitOfMeasurement.SACKS,
      EUnitOfMeasurement.CRATES,
    ]),
    reasonsForSpoilage: z
      .string()
      .array()
      .refine((array) => array && array.length > 0, {
        message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.reasonsForSpoilage'),
      }),
    spoiledProduceAmount: z
      .number({ message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number') })
      .positive({
        message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
      })
      .min(1, {
        message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
      }),
    price: z
      .number({ message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number') })
      .positive({
        message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
      })
      .min(1, {
        message: t('Dashboard.CrateManagement.FarmerSurvey.modal.errorMessages.number'),
      }),
  });
