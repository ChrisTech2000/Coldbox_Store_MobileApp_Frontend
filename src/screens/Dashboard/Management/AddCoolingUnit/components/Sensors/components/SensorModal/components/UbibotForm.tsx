import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useUnmount } from '#ui/hooks/useUnmount';

type FormValues = {
  accountKey: string;
  channelId: string;
};

export default function UbibotForm() {
  const { t, zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z) =>
      z.object({
        accountKey: z.string().min(1),
        channelId: z.string().min(1),
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
          name="accountKey"
          control={form.control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="bg-transparent px-3"
              label="Account Key"
              mode="flat"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!form.formState.errors.accountKey}
            />
          )}
        />
        <Controller
          name="channelId"
          control={form.control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="bg-transparent px-3"
              label="Channel Id"
              mode="flat"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!form.formState.errors.channelId}
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
