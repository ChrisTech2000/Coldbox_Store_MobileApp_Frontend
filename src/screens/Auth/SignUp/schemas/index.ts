import { passwordRegex } from '#constants/schemas';
import { Translator } from '#i18n/utils';
import { EAppGender } from '#types/global';

import validator from 'validator';
import { z } from 'zod';

export const LANGUAGES = (t: Translator) => [
  t('languages.options.en'),
  t('languages.options.hi'),
  t('languages.options.or'),
  t('languages.options.gu'),
  t('languages.options.fr'),
  t('languages.options.pt'),
];

const passwordSchema = (t: Translator) =>
  z
    .object({
      password: z
        .string()
        .refine((pass) => passwordRegex.test(pass), {
          message: t('Auth.SignUp.schema.passwordError'),
        })
        .default(''),
      confirmPassword: z
        .string()
        .min(1, { message: t('Auth.SignUp.schema.confirmPasswordError') })
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
    gender: z.enum([EAppGender.FEMALE, EAppGender.MALE, EAppGender.OTHER], {
      required_error: t('Auth.SignUp.schema.genderError'),
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
      .refine((value) => validator.isMobilePhone(value, undefined, { strictMode: true }), {
        message: t('Auth.SignUp.schema.invalidPhoneError'),
      })
      .optional(),
    gender: z.enum([EAppGender.FEMALE, EAppGender.MALE, EAppGender.OTHER], {
      required_error: t('Auth.SignUp.schema.genderError'),
    }),
    password: passwordSchema(t),
    terms: z.boolean().refine((terms) => terms, { message: t('Auth.SignUp.schema.termsError') }),
  });
