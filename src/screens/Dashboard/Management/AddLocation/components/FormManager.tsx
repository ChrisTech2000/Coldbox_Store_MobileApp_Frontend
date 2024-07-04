import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';

export type FormValues = {
  _step: 'coordinates' | 'geolocation' | 'address';
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  street: string;
  streetNumber: string;
};

export const DEFAULT_VALUES = {
  _step: 'coordinates',
  name: '',
  latitude: 0,
  longitude: 0,
  country: '',
  state: '',
  city: '',
  zipCode: '',
  street: '',
  streetNumber: '',
} satisfies FormValues;

type FormManagerProps = {
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => Promise<void>;
  children: (
    submitHandler: (e?: React.BaseSyntheticEvent) => Promise<void>,
    isSubmitting: boolean
  ) => React.ReactNode;
};

export default function FormManager(props: FormManagerProps) {
  const { initialValues } = props;

  const { zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    defaultValues: initialValues ?? DEFAULT_VALUES,
    resolver: zodResolver((z) => {
      const baseSchema = z.object({
        _step: z.union([z.literal('coordinates'), z.literal('geolocation'), z.literal('address')]),
        name: z.string().min(1),
      });

      const coordinatesSchema = z.object({
        _step: z.literal('coordinates'),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
      });

      const geolocationSchema = z.object({
        _step: z.literal('geolocation'),
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
      });

      const addressSchema = z.object({
        _step: z.literal('address'),
        country: z.string().min(1),
        state: z.string().min(1),
        city: z.string().min(1),
        postalCode: z.string().min(1),
        street: z.string().min(1),
        streetNumber: z.string().min(1),
      });

      const schemaConditions = z.discriminatedUnion('_step', [
        coordinatesSchema,
        geolocationSchema,
        addressSchema,
      ]);

      return z.intersection(schemaConditions, baseSchema);
    }),
    reValidateMode: 'onSubmit',
  });

  return (
    <FormProvider {...form}>
      {props.children(form.handleSubmit(props.onSubmit), form.formState.isSubmitting)}
    </FormProvider>
  );
}

function useFormManager() {
  return useFormContext<FormValues>();
}

FormManager.useFormManager = useFormManager;
