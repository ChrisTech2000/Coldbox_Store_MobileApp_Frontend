import React, { useCallback, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';

import InAppNotifications from '#common/InAppNotifications';
import { passwordRegex, stripSpacesRegex } from '#constants/schemas';
import { useTranslationUtils } from '#i18n/utils';
import type { AuthRouteProps } from '#navigation/Auth';
import AuthService from '#services/AuthService';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import reportCrash from '#ui/lib/reportCrash';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import RecaptchaModal from '#ui/components/RecaptchaModal';
import { useRecaptcha } from '#hooks/useRecaptcha';

type PasswordResetSchema = {
  password: string;
  confirmPassword: string;
};

function PasswordReset(props: AuthRouteProps<'PasswordReset'>) {
  const { navigation, route } = props;

  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [hidePass, setHidePass] = useState<boolean>(true);
  const [hideConfirmPass, setHideConfirmPass] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<PasswordResetSchema>({
    resolver: zodResolver((z, t) =>
      z
        .object({
          password: z
            .string()
            .transform((val) => val.replace(stripSpacesRegex, ''))
            .refine((pass) => passwordRegex.test(pass), {
              message: t('Auth.ResetPassword.schema.passwordError'),
            })
            .default(''),
          confirmPassword: z
            .string()
            .min(1, { message: t('Auth.ResetPassword.schema.confirmPasswordError') })
            .transform((val) => val.replace(stripSpacesRegex, ''))
            .default(''),
        })
        .superRefine(({ confirmPassword, password }, ctx) => {
          if (confirmPassword !== password) {
            ctx.addIssue({
              code: 'custom',
              message: t('Auth.ResetPassword.schema.passwordsMismatchError'),
              path: ['confirmPassword'],
            });
          }
        })
    ),
  });

  const { recaptchaRef, showRecaptcha, handleVerify, handleError } = useRecaptcha({
    onVerify: async (recaptchaToken) => {
      // Get form data and proceed with password reset
      const formData = getValues();
      await performPasswordReset(formData, recaptchaToken);
    },
    onError: (error) => {
      toast.show(`reCAPTCHA error: ${error}`, { type: 'md_danger' });
    },
    onCancel: () => {
      // User cancelled reCAPTCHA
    },
  });

  const performPasswordReset = useCallback(
    async (data: PasswordResetSchema, recaptchaToken: string | null) => {
      try {
        const { resetcode, phoneNumber } = route.params;

        await AuthService.resetPassword(
          {
            phoneNumber,
            code: resetcode,
            password: data.password,
          },
          recaptchaToken
        );

        navigation.navigate('SignIn');
      } catch (err) {
        toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
        reportCrash(err as Error);
      }
    },
    []
  );

  const onSubmit: SubmitHandler<PasswordResetSchema> = useCallback(async () => {
    // Instead of directly calling AuthService, show reCAPTCHA first
    showRecaptcha();
  }, [showRecaptcha]);

  return (
    <View tw="flex-1 items-center mt-4 space-y-4">
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            tw="w-[90%] text-base border bg-white border-gray-700 rounded-sm mb-2 h-12"
            label={`${t('Auth.ResetPassword.passwordLabel')}`}
            onChangeText={onChange}
            value={value}
            secureTextEntry={hidePass}
            error={errors.password}
            right={
              <TextInput.Icon
                icon={hidePass ? 'eye' : 'eye-off'}
                onPress={() => setHidePass(!hidePass)}
              />
            }
          />
        )}
        name="password"
      />

      {/** CONFIRM PASSWORD */}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            tw="w-[90%] text-base border bg-white border-gray-700 rounded-sm mb-2 h-12"
            label={`${t('Auth.ResetPassword.confirmPasswordLabel')}`}
            onChangeText={onChange}
            value={value}
            secureTextEntry={hideConfirmPass}
            error={errors.confirmPassword}
            right={
              <TextInput.Icon
                icon={hideConfirmPass ? 'eye' : 'eye-off'}
                onPress={() => setHideConfirmPass(!hideConfirmPass)}
              />
            }
          />
        )}
        name="confirmPassword"
      />

      <Button
        tw="w-[95%] border-2 border-green-primary mt-6"
        mode="outlined"
        uppercase
        onPress={handleSubmit(onSubmit)}
        icon="refresh"
        contentStyle="flex flex-row-reverse items-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          t('Auth.ResetPassword.resetButton')
        )}
      </Button>

      <RecaptchaModal ref={recaptchaRef} onVerify={handleVerify} onError={handleError} />
    </View>
  );
}

export default withSafeArea(PasswordReset, ['bottom'], true);
