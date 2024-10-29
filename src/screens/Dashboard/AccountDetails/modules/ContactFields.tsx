import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Input } from '#ui/components/Input';

import RBAC from '#common/RBAC';
import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../components/FormManager';

export default function ContactFields() {
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
            tw="w-full bg-transparent mt-2"
            label={t('Auth.ForgotPassword.phoneInputLabel')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.phone}
          />
        )}
      />

      <RBAC.ProtectedResource action="SET" subject="FormEmailField">
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="w-full bg-transparent mt-3"
              label={t('Auth.SignUp.SignUpCompany.emailLabel')}
              mode="flat"
              dense
              value={value}
              onChangeText={onChange}
              autoCorrect={false}
              autoCapitalize="none"
              onBlur={onBlur}
              error={!!errors.email}
            />
          )}
        />
      </RBAC.ProtectedResource>
    </React.Fragment>
  );
}
