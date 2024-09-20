import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';
import { useAppEventListener } from '#ui/lib/emitter';

export type FormValues<T = string> = {
  companies: Array<number>;
  coolingUnits: Array<number>;
  crops: Array<number>;
  min: T;
  max: T;
};

export const DEFAULT_MARKETPLACE_FILTER_VALUES: FormValues<number> = {
  companies: [],
  coolingUnits: [],
  crops: [],
  min: 0,
  max: 0,
};

type CallbackProps = {
  isSubmitting: boolean;
};

type FormManagerProps = {
  initialValues?: FormValues<number>;
  onSubmit: (values: FormValues) => void;
  children: (props: CallbackProps) => React.ReactNode;
};

export default function MarketplaceFormManager(props: FormManagerProps) {
  const { initialValues } = props;

  const { zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    defaultValues: {
      ...initialValues,
      min: initialValues?.min.toString() ?? '0',
      max: initialValues?.max.toString() ?? '0',
    },
    resolver: zodResolver((z) => {
      const greaterThanEqual = z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gte(0));
      return z.object({
        companies: z.array(z.number()),
        coolingUnits: z.array(z.number()),
        crops: z.array(z.number()),
        min: greaterThanEqual,
        max: greaterThanEqual,
      });
    }),
    reValidateMode: 'onSubmit',
  });

  useAppEventListener('DISPATCH_MARKETPLACE_FILTERS_FORM_SUBMISSION', async () => {
    const handler = form.handleSubmit(props.onSubmit);
    await handler();
  });

  useAppEventListener('DISPATCH_MARKETPLACE_FILTERS_FORM_RESET', (values: FormValues<number>) => {
    form.reset({
      ...values,
      min: values?.min.toString() ?? '0',
      max: values?.max.toString() ?? '0',
    });
  });

  return (
    <FormProvider {...form}>
      {props.children({ isSubmitting: form.formState.isSubmitting })}
    </FormProvider>
  );
}

MarketplaceFormManager.useForm = function _useForm() {
  return useFormContext<FormValues>();
};
