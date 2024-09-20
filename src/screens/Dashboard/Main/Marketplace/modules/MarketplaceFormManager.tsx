import React, { PropsWithChildren } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';
import { useAppEventListener } from '#ui/lib/emitter';

export type FilterValue = { label: string; value: number };

export type FormValues<T = string> = {
  companies: Array<FilterValue>;
  coolingUnits: Array<FilterValue>;
  crops: Array<FilterValue>;
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

type FormManagerProps = {
  initialValues?: FormValues<number>;
  onSubmit: (values: FormValues<number>) => void;
};

export default function MarketplaceFormManager(props: PropsWithChildren<FormManagerProps>) {
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
      const baseStruct = z.object({ label: z.string(), value: z.number() });
      return z.object({
        companies: z.array(baseStruct),
        coolingUnits: z.array(baseStruct),
        crops: z.array(baseStruct),
        min: greaterThanEqual,
        max: greaterThanEqual,
      });
    }),
    reValidateMode: 'onSubmit',
  });

  useAppEventListener('DISPATCH_MARKETPLACE_FILTERS_FORM_SUBMISSION', async () => {
    // eslint-disable-next-line
    const handler = form.handleSubmit(props.onSubmit as any);
    await handler();
  });

  useAppEventListener('DISPATCH_MARKETPLACE_FILTERS_FORM_RESET', (values: FormValues<number>) => {
    form.reset({
      ...values,
      min: values?.min.toString() ?? '0',
      max: values?.max.toString() ?? '0',
    });
  });

  return <FormProvider {...form}>{props.children}</FormProvider>;
}

MarketplaceFormManager.useForm = function _useForm() {
  return useFormContext<FormValues>();
};
