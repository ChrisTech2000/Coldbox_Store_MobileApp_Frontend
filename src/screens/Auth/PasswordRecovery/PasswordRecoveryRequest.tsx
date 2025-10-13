import React, { useCallback } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { isValidPhoneNumber } from 'libphonenumber-js';

import { Button } from '#ui/components/Button';
import reportCrash from '#ui/lib/reportCrash';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import RecaptchaModal from '#ui/components/RecaptchaModal';
import { useRecaptcha } from '#hooks/useRecaptcha';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import AuthService from '#services/AuthService';
import { CustomError } from '#services/utils/ErrorUtil';

type PasswordRecoverySchema = { phone: string };

function PasswordRecoveryRequest() {
  const toast = InAppNotifications.useToast();
  const { t, zodResolver } = useTranslationUtils();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm<PasswordRecoverySchema>({
    resolver: zodResolver((z) =>
      z.object({
        phone: z
          .string()
          .default('')
          .refine((value) => isValidPhoneNumber(value), {
            message: t('Auth.SignUp.schema.invalidPhoneError'),
          }),
      })
    ),
  });

  const { recaptchaRef, showRecaptcha, handleVerify, handleError } = useRecaptcha({
    onVerify: async (recaptchaToken) => {
      // Get form data and proceed with password recovery request
      const formData = getValues();
      await performPasswordRecovery(formData, recaptchaToken);
    },
    onError: (error) => {
      toast.show(`reCAPTCHA error: ${error}`, { type: 'md_danger' });
    },
    onCancel: () => {
      // User cancelled reCAPTCHA
    },
  });

  const performPasswordRecovery = useCallback(
    async (values: PasswordRecoverySchema, recaptchaToken: string | null) => {
      try {
        await AuthService.requestResetPassword(
          {
            phoneNumber: values.phone,
          },
          recaptchaToken
        );
        // For security reasons, we don't want to inform the user whether the introduced phone exists in our DB or not
        toast.show(t('Auth.ForgotPassword.messageSentNotification'), {
          type: 'md_success',
        });
      } catch (exception) {
        if (exception instanceof CustomError && exception.originalError.response.status >= 500) {
          toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
        } else {
          toast.show(t('Auth.ForgotPassword.requestLimitMessage'), { type: 'md_danger' });
        }

        reportCrash(exception as Error);
      }
    },
    [toast]
  );

  const onSubmit: SubmitHandler<PasswordRecoverySchema> = useCallback(async () => {
    // Instead of directly calling AuthService, show reCAPTCHA first
    showRecaptcha();
  }, [showRecaptcha]);

  return (
    <View tw="flex-1 items-center">
      <View tw="w-[95%] border border-gray-300 rounded-md mb-6">
        <Text tw="text-base my-1 mx-2 text-green-primary text-center">
          {t('Auth.ForgotPassword.instructions')}
        </Text>
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            tw="w-[95%] text-base border bg-white rounded-sm h-12"
            label={t('Auth.ForgotPassword.phoneInputLabel')}
            left={<TextInput.Icon icon="phone" />}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="phone"
      />
      {errors.phone ? (
        <Text tw="mx-4 mt-1 text-red-700 self-start">{errors.phone.message}</Text>
      ) : null}

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
          t('Auth.ForgotPassword.resetButton')
        )}
      </Button>

      <RecaptchaModal ref={recaptchaRef} onVerify={handleVerify} onError={handleError} />
    </View>
  );
}

export default withSafeArea(PasswordRecoveryRequest, ['bottom'], true);
