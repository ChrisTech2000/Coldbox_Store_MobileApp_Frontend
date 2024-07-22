import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { Checkbox } from '#ui/components/Checkbox';

import { ERoles } from '#types/global';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import FormManager from '../FormManager';
import ConditionalField from './components/ConditionalField';
import GenderField from '../../modules/GenderField';
import PasswordField from './components/PasswordField';

export default function FormFields() {
  const { control, watch, formState } = FormManager.useFormManager();
  const { t } = useTranslationUtils();

  const currentUserType = watch('kind');
  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="phone"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label={t('Auth.ForgotPassword.phoneInputLabel')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.phone}
          />
        )}
      />

      <ConditionalField protected={ERoles.EMPLOYEE} value={currentUserType}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="w-full bg-transparent mt-1"
              label={t('Auth.SignUp.SignUpCompany.emailLabel')}
              mode="flat"
              dense
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors.email}
            />
          )}
        />
      </ConditionalField>

      <Controller
        name="firstName"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label={t('Auth.SignUp.commonForm.firstNameLabel')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.firstName}
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label={t('Auth.SignUp.commonForm.lastNameLabel')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.lastName}
          />
        )}
      />

      <GenderField />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <PasswordField
            label={t('Auth.SignUp.commonForm.passwordLabel')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.password}
          />
        )}
      />
      <Text tw="mt-2.5 mb-1 px-3" style={{ color: paperTheme.colors.error }}>
        {t('Auth.Invite.fields.password')}
      </Text>

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <PasswordField
            label={t('Auth.SignUp.commonForm.confirmPasswordLabel')}
            mode="flat"
            dense
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.confirmPassword}
          />
        )}
      />

      <Controller
        control={control}
        name="hasAcceptedTerms"
        render={({ field: { onChange, value } }) => (
          <View tw="flex flex-row items-center max-w-[75%] mt-5 space-x-2">
            <Checkbox onPress={() => onChange(!value)} status={value ? 'checked' : 'unchecked'} />
            <Text>{t('Auth.SignUp.commonForm.terms')}</Text>
          </View>
        )}
      />
    </React.Fragment>
  );
}
