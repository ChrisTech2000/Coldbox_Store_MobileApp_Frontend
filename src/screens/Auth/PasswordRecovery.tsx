import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { Button } from '#ui/components/Button';

const schema = z.object({
  phone: z.string().default(''),
});

function PasswordRecovery() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(() => {
    // TODO: Implement API call here
  }, []);

  return (
    <View tw="flex-1 items-center">
      <View tw="w-[95%] border border-gray-300 rounded-md mb-6">
        <Text tw="text-base my-1 mx-2 text-green-primary text-center">
          In order to reset your password, please enter the phone number with it&apos;s country
          code, to which the account is connected.
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
            label="Phone number"
            left={<TextInput.Icon icon="phone" />}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="phone"
      />

      <Button
        tw="w-[95%] border-2 border-green-primary rounded-sm mt-6"
        mode="outlined"
        uppercase
        onPress={handleSubmit(onSubmit)}
        icon="refresh"
        contentStyle="flex flex-row-reverse items-center"
      >
        Reset
      </Button>
    </View>
  );
}

export default withSafeArea(PasswordRecovery);
