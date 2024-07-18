import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useUnmount } from '#ui/hooks/useUnmount';

type FormValues = {
  apiKey: string;
  deviceTag: string;
};

export default function FigorrForm() {
  const { t, zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z) =>
      z.object({
        apiKey: z.string().min(1),
        deviceTag: z.string().min(1),
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
          name="apiKey"
          control={form.control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="bg-transparent px-3"
              label={t('Dashboard.Management.AddCoolingUnit.fields.figorr.apiKey')}
              mode="flat"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!form.formState.errors.apiKey}
            />
          )}
        />
        <Controller
          name="deviceTag"
          control={form.control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="bg-transparent px-3"
              label={t('Dashboard.Management.AddCoolingUnit.fields.figorr.deviceTag')}
              mode="flat"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!form.formState.errors.deviceTag}
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
