import { EGender } from '#types/auth';
import validator from 'validator';
import { z } from 'zod';

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;

// TODO: get languages from BE
export const LANGUAGES = ['English', 'Hindi', 'Oriya', 'Gujarati', 'French', 'Portuguese'];

const PASSWORD_SCHEMA = z
  .object({
    password: z
      .string()
      .refine((pass) => passwordRegex.test(pass), {
        message:
          'Your password needs to be at least 8 characters long, contain one uppercase and one lowercase letters, and a number.',
      })
      .default(''),
    confirmPassword: z
      .string()
      .min(1, { message: 'Password confirmation is mandatory.' })
      .default(''),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords do not match.',
        path: ['confirmPassword'],
      });
    }
  });

///////////////// COOLING USER
export const SignUpAsCoolingUserSchema = z.object({
  country: z.string().min(1, { message: 'Country selection is mandatory.' }).default(''),
  firstName: z.string().min(1, { message: 'First Name is mandatory.' }).default(''),
  lastName: z.string().min(1, { message: 'Last Name is mandatory.' }).default(''),
  phone: z
    .string()
    .min(1, { message: 'Phone number is mandatory.' })
    .default('')
    .refine((value) => validator.isMobilePhone(value, undefined, { strictMode: true }), {
      message: 'Phone number is invalid',
    }),
  language: z
    .string()
    .default('')
    .refine((lang) => lang.length && LANGUAGES.includes(lang), {
      message: 'Language is mandatory.',
    }),
  gender: z.enum([EGender.FEMALE, EGender.MALE, EGender.OTHER], {
    required_error: 'Gender selection is mandatory.',
  }),
  password: PASSWORD_SCHEMA,
  terms: z
    .boolean()
    .refine((terms) => terms, { message: 'You need to agree to the Terms of Use.' }),
});

///////////////// COMPANY
export const SignUpAsCompanySchema = z.object({
  companyName: z.string().min(1, { message: 'Company Name is mandatory.' }).default(''),
  country: z.string().optional(),
  currency: z.string().min(1, { message: 'Currency selection is mandatory.' }).default(''),
  email: z.string().email().min(1, { message: 'Email is mandatory.' }).default(''),
  firstName: z.string().min(1, { message: 'First Name is mandatory.' }).default(''),
  lastName: z.string().min(1, { message: 'Last Name is mandatory.' }).default(''),
  phone: z
    .string()
    .refine((value) => validator.isMobilePhone(value, undefined, { strictMode: true }), {
      message: 'Phone number is invalid',
    })
    .optional(),
  gender: z.enum([EGender.FEMALE, EGender.MALE, EGender.OTHER], {
    required_error: 'Gender selection is mandatory.',
  }),
  password: PASSWORD_SCHEMA,
  terms: z
    .boolean()
    .refine((terms) => terms, { message: 'You need to agree to the Terms of Use.' }),
});
