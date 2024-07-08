import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';

export type FormValues = {
  country: string;
  commodities: Array<number>;
  currency: string;
  logo: {
    uri: string;
    name?: string;
    type?: string;
  };
};

type CallbackProps = {
  submitHandler: (evt?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
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
    resolver: zodResolver((z) =>
      z.object({
        country: z.string(),
        commodities: z.array(z.number()),
        currency: z.string(),
        logo: z.object({
          uri: z.string(),
          name: z.string().optional(),
          type: z.string().optional(),
        }),
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
