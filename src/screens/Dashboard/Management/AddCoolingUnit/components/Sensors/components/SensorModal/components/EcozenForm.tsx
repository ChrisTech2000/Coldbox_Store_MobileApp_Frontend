import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useUnmount } from '#ui/hooks/useUnmount';

type FormValues = {
  username: string;
  password: string;
  machineId: string;
};

export default function EcozenForm() {
  const { t, zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z) =>
      z.object({
        username: z.string().min(1),
        password: z.string().min(1),
        machineId: z.string().min(1),
      })
    ),
  });

  useUnmount(form.reset);

  async function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <React.Fragment>
      <View tw="w-full pt-1.5 pb-3">
        <Controller
          name="username"
          control={form.control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="bg-transparent px-3"
              label="Username"
              mode="flat"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!form.formState.errors.username}
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="bg-transparent px-3"
              label="Password"
              mode="flat"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!form.formState.errors.password}
            />
          )}
        />
        <Controller
          name="machineId"
          control={form.control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="bg-transparent px-3"
              label="Machine Id"
              mode="flat"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!form.formState.errors.machineId}
            />
          )}
        />
      </View>
      <View tw="self-end px-6">
        <Button mode="text" onPress={form.handleSubmit(onSubmit)}>
          {t('actions.save-changes')}
        </Button>
      </View>
    </React.Fragment>
  );
}
