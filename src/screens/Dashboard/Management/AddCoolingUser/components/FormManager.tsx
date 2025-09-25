import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { isValidPhoneNumber } from 'libphonenumber-js';

import { useTranslationUtils } from '#i18n/utils';
import { EApiGender } from '#types/global';
import type { TranslationLocales } from '#i18n/constants';

export type FormValues = {
  firstName: string;
  lastName: string;
  gender: EApiGender;
  phone: string;
  language: TranslationLocales;
  parentName: string;
};

type CallbackProps = {
  submitHandler: (evt?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
};

type FormManagerProps = {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => Promise<void>;
  children: (props: CallbackProps) => React.ReactNode;
};

export default function FormManager(props: FormManagerProps) {
  const { initialValues } = props;

  const { zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: zodResolver((z, t) =>
      z.object({
        firstName: z.string().min(1),
        lastName: z.string().optional(),
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
        language: z.string(),
        parentName: z.string(),
      })
    ),
    reValidateMode: 'onSubmit',
  });

  const callbackProps = {
    submitHandler: form.handleSubmit(props.onSubmit),
    isSubmitting: form.formState.isSubmitting,
  } satisfies CallbackProps;

  return <FormProvider {...form}>{props.children(callbackProps)}</FormProvider>;
}

function useFormManager() {
  return useFormContext<FormValues>();
}

FormManager.useFormManager = useFormManager;
