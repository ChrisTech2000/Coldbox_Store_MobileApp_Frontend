import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { useUnmount } from '#ui/hooks/useUnmount';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import reportCrash from '#ui/lib/reportCrash';
import { paperTheme } from '#ui/lib/theme';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import SensorsService from '#services/SensorsService';
import { ESensorType } from '#types/global';

type FormValues = {
  apiKey: string;
  deviceTag: string;
};

export default function GenericSensorForm({ type }: { type: ESensorType }) {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const form = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z) =>
      z.object({
        username: z.string().min(1),
        password: z.string().min(1),
      })
    ),
  });

  useUnmount(form.reset);

  async function onSubmit(values: FormValues) {
    try {
      const result = await SensorsService.listUserSensors({
        username: values.apiKey,
        password: values.deviceTag,
        type,
      });

      const contextualSensor = result?.at(0);
      if (!contextualSensor) {
        toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationError'), {
          type: 'md_danger',
        });
        return;
      }

      toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationSuccess'), {
        type: 'md_success',
      });

      emitter.emit(APP_EVENTS.DISPATCH_SENSOR_DATUMS, result);
    } catch (exception) {
      toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationError'), {
        type: 'md_danger',
      });
      reportCrash(exception as Error);
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <React.Fragment>
      <View tw="w-full pt-1.5 pb-3">
        <Controller
          name="apiKey"
          control={form.control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="bg-transparent px-3"
              label={t('Dashboard.Management.AddCoolingUnit.fields.genericSensorForm.username')}
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
              label={t('Dashboard.Management.AddCoolingUnit.fields.genericSensorForm.password')}
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
        <Button mode="text" onPress={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? (
            <ActivityIndicator color={paperTheme.colors.primary} size={16} animating />
          ) : (
            t('actions.save-changes')
          )}
        </Button>
      </View>
    </React.Fragment>
  );
}
