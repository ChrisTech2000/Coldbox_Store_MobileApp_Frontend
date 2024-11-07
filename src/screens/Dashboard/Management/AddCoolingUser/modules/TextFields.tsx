import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';

import FormManager, { type FormValues } from '../components/FormManager';

type Props = {
  disabled?: boolean;
  disabledFields?: Array<keyof FormValues>;
};

export default function TextFields(props: Props) {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="firstName"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent"
            label={t('Auth.SignUp.commonForm.firstNameLabel')}
            mode="flat"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.firstName}
            disabled={props.disabled || props.disabledFields?.includes('firstName')}
            dense
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-4"
            label={t('Auth.SignUp.commonForm.lastNameLabel')}
            mode="flat"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.lastName}
            disabled={props.disabled || props.disabledFields?.includes('lastName')}
            dense
          />
        )}
      />

      <Controller
        name="parentName"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-4"
            label="User ID"
            mode="flat"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.parentName}
            disabled={props.disabled || props.disabledFields?.includes('parentName')}
            dense
          />
        )}
      />
    </React.Fragment>
  );
}
