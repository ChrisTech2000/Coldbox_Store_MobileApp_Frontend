import React, { useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useIsFocused } from '@react-navigation/native';
import isEqual from 'lodash/isEqual';
import { isValidPhoneNumber } from 'libphonenumber-js';

import type { DetailsSectionParams } from '#navigation/Dashboard/AccountDetails';
import { EApiGender, ERoles } from '#types/global';
import { useTranslationUtils } from '#i18n/utils';
import type { TranslationLocales } from '#i18n/constants';

export type FormValues = {
  location: string;
} & Omit<DetailsSectionParams, 'userId' | 'farmerId'>;

type CallbackProps = {
  submitHandler: (evt?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  hasChanges: boolean;
  selectedLanguage: TranslationLocales;
};

type FormManagerProps = {
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => Promise<void>;
  children: (props: CallbackProps) => React.ReactNode;
};

export default function FormManager(props: FormManagerProps) {
  const { initialValues } = props;

  const { zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: zodResolver((z, t) => {
      const baseSchema = z.object({
        kind: z.union([
          z.literal(ERoles.EMPLOYEE),
          z.literal(ERoles.OPERATOR),
          z.literal(ERoles.COOLING_USER),
        ]),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        language: z.string(),
        phone: z
          .string()
          .min(1, { message: t('Auth.SignUp.schema.phoneError') })
          .default('')
          .refine((value) => isValidPhoneNumber(value), {
            message: t('Auth.SignUp.schema.invalidPhoneError'),
          }),
        gender: z.union([
          z.literal(EApiGender.OTHER),
          z.literal(EApiGender.FEMALE),
          z.literal(EApiGender.MALE),
        ]),
      });

      const employeeSchema = z.object({
        kind: z.literal(ERoles.EMPLOYEE),
        email: z.string().email(),
      });

      const operatorSchema = z.object({
        kind: z.literal(ERoles.OPERATOR),
      });

      const coolingUserSchema = z.object({
        kind: z.literal(ERoles.COOLING_USER),
        location: z.string().optional(),
        parentName: z.string().optional(),
        country: z.string(),
        userCode: z.string(),
      });

      const schemaConditions = z.discriminatedUnion('kind', [
        employeeSchema,
        operatorSchema,
        coolingUserSchema,
      ]);

      return z.intersection(schemaConditions, baseSchema);
    }),
    reValidateMode: 'onSubmit',
  });

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      form.reset(initialValues);
    }
  }, [isFocused]);

  const callbackProps = {
    submitHandler: form.handleSubmit(props.onSubmit),
    isSubmitting: form.formState.isSubmitting,
    hasChanges: !isEqual(initialValues, form.watch()),
    selectedLanguage: form.watch('language'),
  } satisfies CallbackProps;

  return <FormProvider {...form}>{props.children(callbackProps)}</FormProvider>;
}

function useFormManager() {
  return useFormContext<FormValues>();
}

FormManager.useFormManager = useFormManager;
