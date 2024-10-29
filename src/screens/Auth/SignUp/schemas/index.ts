import { passwordRegex, stripSpacesRegex } from '#constants/schemas';
import { Path, Translator } from '#i18n/utils';
import { EAppGender } from '#types/global';

import validator from 'validator';
import { z } from 'zod';

export const LANGUAGE_CODES: Record<string, Path> = {
  en: 'languages.options.en',
  hi: 'languages.options.hi',
  or: 'languages.options.or',
  gu: 'languages.options.gu',
  fr: 'languages.options.fr',
  pt: 'languages.options.pt',
};

export const getLanguageCode = (translatedName: string, t: Translator): string | undefined => {
  const entries = Object.entries(LANGUAGE_CODES);

  for (const [code, key] of entries) {
    if (t(key) === translatedName) {
      return code;
    }
  }

  return undefined;
};

export const LANGUAGES = (t: Translator) => [
  t(LANGUAGE_CODES.en),
  t(LANGUAGE_CODES.hi),
  t(LANGUAGE_CODES.or),
  t(LANGUAGE_CODES.gu),
  t(LANGUAGE_CODES.fr),
  t(LANGUAGE_CODES.pt),
];

export const GENDER_CODES: Record<EAppGender, Path> = {
  [EAppGender.FEMALE]: 'gender.female',
  [EAppGender.MALE]: 'gender.male',
  [EAppGender.OTHER]: 'gender.other',
};

export const getGenderCode = (translatedName: string, t: Translator): EAppGender | undefined => {
  const entries = Object.entries(GENDER_CODES);

  for (const [code, key] of entries) {
    if (t(key) === translatedName) {
      return code as EAppGender;
    }
  }

  return undefined;
};

export const GENDERS = (t: Translator) => [
  t(GENDER_CODES[EAppGender.FEMALE]),
  t(GENDER_CODES[EAppGender.MALE]),
  t(GENDER_CODES[EAppGender.OTHER]),
];

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
      .refine((value) => validator.isMobilePhone(value, undefined, { strictMode: true }), {
        message: t('Auth.SignUp.schema.invalidPhoneError'),
      }),
    language: z
      .string()
      .default('')
      .refine((lang) => lang.length && LANGUAGES(t).includes(lang), {
        message: t('Auth.SignUp.schema.languageError'),
      }),
    gender: z
      .string()
      .default('')
      .refine((gender) => gender.length && GENDERS(t).includes(gender), {
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
      .refine(
        (value) => !value || validator.isMobilePhone(value, undefined, { strictMode: true }),
        {
          message: t('Auth.SignUp.schema.invalidPhoneError'),
        }
      )
      .optional(),
    gender: z.enum([EAppGender.FEMALE, EAppGender.MALE, EAppGender.OTHER], {
      required_error: t('Auth.SignUp.schema.genderError'),
    }),
    password: passwordSchema(t),
    terms: z.boolean().refine((terms) => terms, { message: t('Auth.SignUp.schema.termsError') }),
  });
