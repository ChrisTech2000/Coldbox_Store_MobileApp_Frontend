import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';
import { EExperience, EOccupation } from '#screens/Dashboard/Main/History/MarketSurvey/schema';
import type { CommoditiesBaseDatums as SurveyFormValues } from '../CoolingUsersSurvey';

export type PreprocessedSurveyFormValues = SurveyFormValues<number>;

type CallbackProps = {
  submitHandler: (evt?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
};

type SurveyFormManagerProps = {
  initialValues?: SurveyFormValues;
  onSubmit: (values: PreprocessedSurveyFormValues) => Promise<void>;
  children: (props: CallbackProps) => React.ReactNode;
};

export default function SurveyFormManager(props: SurveyFormManagerProps) {
  const { initialValues } = props;

  const { zodResolver } = useTranslationUtils();

  const form = useForm<SurveyFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver((z, t) =>
      z
        .object({
          occupation: z.enum([EOccupation.FARMER, EOccupation.TRADER], {
            message: t('Dashboard.History.survey.baseSurvey.genericFormError'),
          }),
          experience: z.enum([EExperience.OLD, EExperience.NEW], {
            message: t('Dashboard.History.survey.baseSurvey.genericFormError'),
          }),
          experienceInMonths: z
            .preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gte(1))
            .optional(),
        })
        .superRefine(({ experience, experienceInMonths }, ctx) => {
          if (experience === EExperience.OLD && !experienceInMonths) {
            ctx.addIssue({
              code: 'custom',
              message: t('Dashboard.History.survey.baseSurvey.experienceError'),
              path: ['experienceInMonths'],
            });
          }
        })
    ),
    reValidateMode: 'onSubmit',
  });

  const callbackProps = {
    // eslint-disable-next-line
    submitHandler: form.handleSubmit(props.onSubmit as any),
    isSubmitting: form.formState.isSubmitting,
  } satisfies CallbackProps;

  return <FormProvider {...form}>{props.children(callbackProps)}</FormProvider>;
}

function useSurveyForm() {
  return useFormContext<SurveyFormValues>();
}

SurveyFormManager.useSurveyForm = useSurveyForm;
