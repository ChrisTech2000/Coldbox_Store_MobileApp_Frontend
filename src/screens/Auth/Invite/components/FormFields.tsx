import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { Checkbox } from '#ui/components/Checkbox';

import { ERoles } from '#types/global';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import FormManager from '../components/FormManager';
import ConditionalField from './ConditionalField';
import GenderField from '../modules/GenderField';

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
            label="Phone number"
            mode="outlined"
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
              label="Email"
              mode="outlined"
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
            label="First Name"
            mode="outlined"
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
            label="Last Name"
            mode="outlined"
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
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Password"
            mode="outlined"
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
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Confirm Password"
            mode="outlined"
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
