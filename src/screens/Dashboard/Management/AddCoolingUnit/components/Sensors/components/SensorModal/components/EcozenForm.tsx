import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { useUnmount } from '#ui/hooks/useUnmount';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import type { SensorDatum } from '#screens/Dashboard/Management/AddCoolingUnit/contexts/FormManager';
import SensorsService from '#services/SensorsService';
import reportCrash from '#ui/lib/reportCrash';

type FormValues = {
  username: string;
  password: string;
  sourceId: string;
};

export default function EcozenForm() {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const [hidePass, setHidePass] = useState<boolean>(true);

  const form = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z) =>
      z.object({
        username: z.string().min(1),
        password: z.string().min(1),
        sourceId: z.string().min(1),
      })
    ),
  });

  useUnmount(form.reset);

  async function onSubmit(values: FormValues) {
    try {
      const result = await SensorsService.verifyEcozenSensorConnectivity({
        username: values.username,
        password: values.password,
        sourceId: values.sourceId,
      });

      if (!result) {
        toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationError'), {
          type: 'md_danger',
        });
        return;
      }

      const sensorData = {
        sourceId: values.sourceId,
        username: values.username,
        password: values.password,
        type: 'ecozen',
      } satisfies SensorDatum;

      toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationSuccess'), {
        type: 'md_success',
      });

      emitter.emit(APP_EVENTS.DISPATCH_SENSOR_DATUMS, sensorData);
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
              label={t('Dashboard.Management.AddCoolingUnit.fields.ecozen.username')}
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
              label={t('Dashboard.Management.AddCoolingUnit.fields.ecozen.password')}
              mode="flat"
              value={value}
              onChangeText={onChange}
              secureTextEntry={hidePass}
              right={
                <TextInput.Icon
                  icon={hidePass ? 'eye' : 'eye-off'}
                  onPress={() => setHidePass(!hidePass)}
                />
              }
              onBlur={onBlur}
              error={!!form.formState.errors.password}
            />
          )}
        />
        <Controller
          name="sourceId"
          control={form.control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="bg-transparent px-3"
              label={t('Dashboard.Management.AddCoolingUnit.fields.ecozen.machineId')}
              mode="flat"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!form.formState.errors.sourceId}
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
