import { isValidPhoneNumber } from 'libphonenumber-js';
import { z } from 'zod';

import { passwordRegex, stripSpacesRegex } from '#constants/schemas';
import type { TranslationPaths, Translator } from '#i18n/utils';
import { EAppGender } from '#types/global';
import type { TranslationLocales } from '#i18n/constants';

export const LANGUAGE_CODES: Record<TranslationLocales, TranslationPaths> = {
  en: 'languages.options.en',
  hi: 'languages.options.hi',
  or: 'languages.options.or',
  gu: 'languages.options.gu',
  fr: 'languages.options.fr',
  pt: 'languages.options.pt',
  ha: 'languages.options.ha',
  yo: 'languages.options.yo',
  ig: 'languages.options.ig',
  ar: 'languages.options.ar',
};

export const LANGUAGES = Object.keys(LANGUAGE_CODES);

export const GENDER_CODES: Record<EAppGender, TranslationPaths> = {
  [EAppGender.FEMALE]: 'gender.female',
  [EAppGender.MALE]: 'gender.male',
  [EAppGender.OTHER]: 'gender.other',
};

export const GENDERS = Object.keys(GENDER_CODES);

const passwordSchema = (t: Translator) =>
  z
    .object({
      password: z
        .string()
        .transform((val) => val.replace(stripSpacesRegex, ''))
        .refine((pass) => passwordRegex.test(pass), {
          message: t('Auth.SignUp.schema.passwordError'),
        })
        .default(''),
      confirmPassword: z
        .string()
        .min(1, { message: t('Auth.SignUp.schema.confirmPasswordError') })
        .transform((val) => val.replace(stripSpacesRegex, ''))
        .default(''),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: t('Auth.SignUp.schema.passwordsMismatchError'),
          path: ['confirmPassword'],
        });
      }
    });

///////////////// COOLING USER
export type SignUpCoolingUserSchemaType = {
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: EAppGender;
  language: string;
  password: {
    password: string;
    confirmPassword: string;
  };
  terms: boolean;
};

export const SignUpAsCoolingUserSchema = (t: Translator) =>
  z.object({
    country: z
      .string()
      .min(1, { message: t('Auth.SignUp.schema.countryError') })
      .default(''),
    firstName: z
      .string()
      .min(1, { message: t('Auth.SignUp.schema.firstNameError') })
      .default(''),
    lastName: z
      .string()
      .min(1, { message: t('Auth.SignUp.schema.lastNameError') })
      .default(''),
    phone: z
      .string()
      .min(1, { message: t('Auth.SignUp.schema.phoneError') })
      .default('')
      .refine((value) => !value || isValidPhoneNumber(value), {
        message: t('Auth.SignUp.schema.invalidPhoneError'),
      }),
    language: z
      .string()
      .default('')
      .refine((lang) => lang.length && LANGUAGES.includes(lang), {
        message: t('Auth.SignUp.schema.languageError'),
      }),
    gender: z
      .string()
      .default('')
      .refine((gender) => gender.length && GENDERS.includes(gender), {
        message: t('Auth.SignUp.schema.genderError'),
      }),
    password: passwordSchema(t),
    terms: z.boolean().refine((terms) => terms, { message: t('Auth.SignUp.schema.termsError') }),
  });

///////////////// COMPANY
export type SignUpCompanySchemaType = {
  companyName: string;
  country?: string;
  currency: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: EAppGender;
  password: {
    password: string;
    confirmPassword: string;
  };
  terms: boolean;
};

export const SignUpAsCompanySchema = (t: Translator) =>
  z.object({
    companyName: z
      .string()
      .min(1, { message: t('Auth.SignUp.schema.companyError') })
      .default(''),
    country: z.string().optional(),
    currency: z
      .string()
      .min(1, { message: t('Auth.SignUp.schema.currencyError') })
      .default(''),
    email: z
      .string()
      .email(t('Auth.SignUp.schema.malformedEmailError'))
      .min(1, { message: t('Auth.SignUp.schema.emailError') })
      .default(''),
    firstName: z
      .string()
      .min(1, { message: t('Auth.SignUp.schema.firstNameError') })
      .default(''),
    lastName: z
      .string()
      .min(1, { message: t('Auth.SignUp.schema.lastNameError') })
      .default(''),
    phone: z
      .string()
      .refine((value) => !value || isValidPhoneNumber(value), {
        message: t('Auth.SignUp.schema.invalidPhoneError'),
      })
      .optional(),
    gender: z.enum([EAppGender.FEMALE, EAppGender.MALE, EAppGender.OTHER], {
      required_error: t('Auth.SignUp.schema.genderError'),
    }),
    password: passwordSchema(t),
    terms: z.boolean().refine((terms) => terms, { message: t('Auth.SignUp.schema.termsError') }),
  });
