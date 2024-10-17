import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { EApiGender, ERoles } from '#types/global';
import type { AuthRoutes } from '#navigation/Auth';
import { useTranslationUtils } from '#i18n/utils';
import { passwordRegex } from '#constants/schemas';

export type FormValues = {
  kind: ERoles;
  firstName: string;
  lastName: string;
  gender: EApiGender;
  password: string;
  confirmPassword: string;
  code: string;
  phone: string;
  email: string;
  hasAcceptedTerms: boolean;
};

export function buildInitialValues(params: AuthRoutes['Invite']): FormValues {
  return {
    kind: params.userType === 'op' ? ERoles.OPERATOR : ERoles.EMPLOYEE,
    code: params.inviteCode,
    phone: params.phoneNumber,
    firstName: '',
    lastName: '',
    gender: '' as EApiGender,
    email: '',
    password: '',
    confirmPassword: '',
    hasAcceptedTerms: false,
  };
}

type CallbackProps = {
  submitHandler: (evt?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  isDisabled: boolean;
};

type FormManagerProps = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<void>;
  children: (props: CallbackProps) => React.ReactNode;
};

export default function FormManager(props: FormManagerProps) {
  const { initialValues } = props;

  const { t, zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: zodResolver((z) => {
      const baseSchema = z
        .object({
          kind: z.union([z.literal(ERoles.EMPLOYEE), z.literal(ERoles.OPERATOR)]),
          firstName: z.string().min(1),
          lastName: z.string().min(1),
          gender: z.union([
            z.literal(EApiGender.OTHER),
            z.literal(EApiGender.FEMALE),
            z.literal(EApiGender.MALE),
          ]),
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
          phone: z.string().min(1),
          code: z.string().min(1),
          hasAcceptedTerms: z.boolean(),
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

      const employeeSchema = z.object({
        kind: z.literal(ERoles.EMPLOYEE),
        email: z.string().email(),
      });

      const operatorSchema = z.object({
        kind: z.literal(ERoles.OPERATOR),
      });

      const schemaConditions = z.discriminatedUnion('kind', [employeeSchema, operatorSchema]);
      return z.intersection(schemaConditions, baseSchema);
    }),
    reValidateMode: 'onSubmit',
  });

  const callbackProps = {
    submitHandler: form.handleSubmit(props.onSubmit),
    isSubmitting: form.formState.isSubmitting,
    isDisabled: !form.watch('hasAcceptedTerms'),
  } satisfies CallbackProps;

  return <FormProvider {...form}>{props.children(callbackProps)}</FormProvider>;
}

function useFormManager() {
  return useFormContext<FormValues>();
}

FormManager.useFormManager = useFormManager;
