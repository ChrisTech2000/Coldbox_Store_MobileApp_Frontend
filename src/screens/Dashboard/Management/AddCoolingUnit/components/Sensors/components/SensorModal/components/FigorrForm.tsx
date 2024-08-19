import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useUnmount } from '#ui/hooks/useUnmount';
import SensorsService from '#services/SensorsService';
import type { SensorDatum } from '#screens/Dashboard/Management/AddCoolingUnit/contexts/FormManager';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

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
    try {
      const result = await SensorsService.verifyFigorrSensorConnectivity({
        apiKey: values.apiKey,
        deviceTag: values.deviceTag,
      });
      const contextualSensor = result?.at(0);
      if (!contextualSensor) {
        // TODO -> show a toast with an error message
        return;
      }
      const sensorData = {
        machineID: contextualSensor.deviceTag,
        id: contextualSensor.imei,
        username: contextualSensor.id,
        settings: contextualSensor.settings,
        stat: contextualSensor.stat,
        status: contextualSensor.status,
        password: values.apiKey,
        type: contextualSensor.type,
      } satisfies SensorDatum;

      emitter.emit(APP_EVENTS.DISPATCH_SENSOR_DATUMS, sensorData);
    } catch (exception) {
      console.error(exception);
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
