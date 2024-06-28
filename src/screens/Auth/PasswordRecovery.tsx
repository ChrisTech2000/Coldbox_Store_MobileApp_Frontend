import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Button } from '#ui/components/Button';
import AuthService from '#services/AuthService';
import { useToast } from 'react-native-toast-notifications';
import { useTranslationUtils } from '#i18n/utils';

const schema = z.object({
  phone: z.string().default(''),
});

type PasswordRecoverySchema = { phone: string };

function PasswordRecovery() {
  const toast = useToast();
  const { t, zodResolver } = useTranslationUtils();

  const { control, handleSubmit } = useForm<PasswordRecoverySchema>({
    resolver: zodResolver(() => schema),
  });

  const onSubmit: SubmitHandler<PasswordRecoverySchema> = useCallback(
    async (data) => {
      // TODO: study possibility of making this a BE responsibility
      const partOne = t('Auth.ForgotPassword.link.partOne');
      const partTwo = t('Auth.ForgotPassword.link.partTwo', { phone: data.phone });

      await AuthService.requestResetPassword({
        phoneNumber: data.phone,
        link: { partOne, partTwo },
      });

      toast.show(t('Auth.ForgotPassword.messageSentNotification'), {
        type: 'success',
      });

      // TODO: create next screen (when user receives sms and starts resetting process)
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
            label={t('Auth.ForgotPassword.instructions')}
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

export default withSafeArea(PasswordRecovery);
