import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';

export type FormValues = {
  _step: 'coordinates' | 'geolocation' | 'address';
  name: string;
  latitude: string;
  longitude: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  street: string;
  streetNumber: string;
};

export type PreprocessedFormValues = {
  point: string;
  latitude: number;
  longitude: number;
} & Omit<FormValues, 'latitude' | 'longitude'>;

export const DEFAULT_VALUES = {
  _step: 'coordinates',
  name: '',
  latitude: '',
  longitude: '',
  country: '',
  state: '',
  city: '',
  zipCode: '',
  street: '',
  streetNumber: '',
} satisfies FormValues;

type FormManagerProps = {
  initialValues?: FormValues;
  onSubmit: (values: PreprocessedFormValues) => Promise<void>;
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

      const coordsSchema = z.object({
        latitude: z.preprocess(
          (v) => (!v ? 0 : Number(String(v).replace(',', '.'))),
          z.coerce.number().min(-90).max(90)
        ),
        longitude: z.preprocess(
          (v) => (!v ? 0 : Number(String(v).replace(',', '.'))),
          z.coerce.number().min(-180).max(180)
        ),
      });

      const coordinatesSchema = coordsSchema.extend({ _step: z.literal('coordinates') });
      const geolocationSchema = coordsSchema.extend({ _step: z.literal('geolocation') });

      const addressSchema = z.object({
        _step: z.literal('address'),
        country: z.string().min(1),
        state: z.string().min(1),
        city: z.string().min(1),
        zipCode: z.string().optional(),
        street: z.string().optional(),
        streetNumber: z.preprocess(
          (val) => (val === '' ? undefined : String(val).replace(',', '.')),
          z
            .string()
            .regex(/^\d+(\.\d+)?$/)
            .optional()
        ),
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
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {props.children(form.handleSubmit(props.onSubmit as any), form.formState.isSubmitting)}
    </FormProvider>
  );
}

function useFormManager() {
  return useFormContext<FormValues>();
}

FormManager.useFormManager = useFormManager;
