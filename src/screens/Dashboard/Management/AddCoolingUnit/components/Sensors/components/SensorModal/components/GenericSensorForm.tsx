import React, { useState } from 'react';
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
  username: string;
  password: string;
};

export default function GenericSensorForm({ type }: { type: ESensorType }) {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [hidePass, setHidePass] = useState<boolean>(true);

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
        username: values.username,
        password: values.password,
        integrationType: type,
      });

      if (!result?.sources.length) {
        toast.show(t('Dashboard.Management.AddCoolingUnit.fields.emptySensorListError', { type }), {
          type: 'md_danger',
        });
        return;
      }

      emitter.emit(APP_EVENTS.DISPATCH_SENSOR_LIST_MODAL, true, {
        username: values.username,
        password: values.password,
        sensorType: type,
        sensors: result.sources,
      });
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
          name="username"
          control={form.control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="bg-transparent px-3"
              label={t('Dashboard.Management.AddCoolingUnit.fields.genericSensorForm.username')}
              mode="flat"
              autoCapitalize="none"
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
              label={t('Dashboard.Management.AddCoolingUnit.fields.genericSensorForm.password')}
              mode="flat"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={hidePass}
              right={
                <TextInput.Icon
                  icon={hidePass ? 'eye' : 'eye-off'}
                  onPress={() => setHidePass(!hidePass)}
                />
              }
              error={!!form.formState.errors.password}
            />
          )}
        />
      </View>
      <View tw="self-end px-6">
        <Button mode="text" onPress={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? (
            <ActivityIndicator color={paperTheme.colors.primary} size={16} animating />
          ) : (
            t('actions.confirm')
          )}
        </Button>
      </View>
    </React.Fragment>
  );
}
