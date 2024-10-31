import React, { useEffect } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';
import { EApiGender } from '#types/global';

export type FormValues = {
  gender: EApiGender;
  coolingUnits: Array<number>;
};

const DEFAULT_VALUES = {
  gender: EApiGender.OTHER,
  coolingUnits: [],
} satisfies FormValues;

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
    defaultValues: initialValues ?? DEFAULT_VALUES,
    resolver: zodResolver((z) =>
      z.object({
        gender: z.union([
          z.literal(EApiGender.OTHER),
          z.literal(EApiGender.FEMALE),
          z.literal(EApiGender.MALE),
        ]),
        coolingUnits: z.array(z.number()),
      })
    ),
    reValidateMode: 'onSubmit',
  });

  const callbackProps = {
    submitHandler: form.handleSubmit(props.onSubmit),
    isSubmitting: form.formState.isSubmitting,
  } satisfies CallbackProps;

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues]);

  return <FormProvider {...form}>{props.children(callbackProps)}</FormProvider>;
}

function useFormManager() {
  return useFormContext<FormValues>();
}

FormManager.useFormManager = useFormManager;
