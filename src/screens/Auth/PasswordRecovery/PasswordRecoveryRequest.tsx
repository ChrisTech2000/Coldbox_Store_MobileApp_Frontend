import React, { useCallback } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import validator from 'validator';

import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import { DEEP_LINK_URL } from '#navigation/deepLinking';
import AuthService from '#services/AuthService';

type PasswordRecoverySchema = { phone: string };

function PasswordRecoveryRequest() {
  const toast = InAppNotifications.useToast();
  const { t, zodResolver } = useTranslationUtils();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<PasswordRecoverySchema>({
    resolver: zodResolver((z) =>
      z.object({
        phone: z
          .string()
          .default('')
          .refine((value) => validator.isMobilePhone(value, undefined, { strictMode: true }), {
            message: t('Auth.SignUp.schema.invalidPhoneError'),
          }),
      })
    ),
  });

  const onSubmit: SubmitHandler<PasswordRecoverySchema> = useCallback(
    async (values) => {
      const partOne = t('Auth.ForgotPassword.link.partOne', {
        baseLink: `${DEEP_LINK_URL}/password-reset/`,
      });

      try {
        await AuthService.requestResetPassword({
          phoneNumber: values.phone,
          link: { partOne, partTwo: `/${values.phone}` },
        });
      } catch {
        // silent error
      }

      // For security reasons, we don't want to inform the user whether the introduced phone exists in our DB or not
      toast.show(t('Auth.ForgotPassword.messageSentNotification'), {
        type: 'md_success',
      });
    },
    [toast]
  );

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
    </View>
  );
}

export default withSafeArea(PasswordRecoveryRequest, ['bottom'], true);
