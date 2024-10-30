import React from 'react';
import { Controller } from 'react-hook-form';

import { Input } from '#ui/components/Input';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../components/FormManager';

type Props = {
  disabled: boolean;
};

export default function ContactField(props: Props) {
  const { control, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            tw="w-full bg-transparent mt-1"
            label={t('Auth.ForgotPassword.phoneInputLabel')}
            mode="flat"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.phone}
            disabled={props.disabled}
            dense
          />
        )}
      />
    </React.Fragment>
  );
}
