import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { Text, TextInput } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';

import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import AuthService from '#services/AuthService';
import { BASE_DEEP_LINK_URL } from '#navigation/deepLinking';

type PasswordRecoverySchema = { phone: string };

function PasswordRecoveryRequest() {
  const toast = useToast();
  const { t, zodResolver } = useTranslationUtils();

  const { control, handleSubmit } = useForm<PasswordRecoverySchema>({
    resolver: zodResolver((z) => z.object({ phone: z.string().default('') })),
  });

  const onSubmit: SubmitHandler<PasswordRecoverySchema> = useCallback(
    async (values) => {
      const partOne = t('Auth.ForgotPassword.link.partOne', {
        baseLink: `${BASE_DEEP_LINK_URL}/password-reset/`,
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
        type: 'success',
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
        rules={{
          required: true,
        }}
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

      <Button
        tw="w-[95%] border-2 border-green-primary mt-6"
        mode="outlined"
        uppercase
        onPress={handleSubmit(onSubmit)}
        icon="refresh"
        contentStyle="flex flex-row-reverse items-center"
      >
        {t('Auth.ForgotPassword.resetButton')}
      </Button>
    </View>
  );
}

export default withSafeArea(PasswordRecoveryRequest);
