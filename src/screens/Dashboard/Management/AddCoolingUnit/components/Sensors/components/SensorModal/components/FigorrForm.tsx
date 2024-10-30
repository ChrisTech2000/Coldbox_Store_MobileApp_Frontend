import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, TextInput, Dialog, Portal } from 'react-native-paper';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { useUnmount } from '#ui/hooks/useUnmount';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import type { SensorDatum } from '#screens/Dashboard/Management/AddCoolingUnit/contexts/FormManager';
import SensorsService from '#services/SensorsService';

type FormValues = {
  apiKey: string;
  deviceTag: string;
};

export default function FigorrForm(props: { isVisible: boolean; onDismiss: () => void }) {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

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
        toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationError'), {
          type: 'md_danger',
        });
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

      toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationSuccess'), {
        type: 'md_success',
      });

      emitter.emit(APP_EVENTS.DISPATCH_SENSOR_DATUMS, sensorData);
    } catch (exception) {
      console.error(exception);
      toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationError'), {
        type: 'md_danger',
      });
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Portal>
      <Dialog
        visible={props.isVisible}
        onDismiss={props.onDismiss}
        style={{ backgroundColor: 'white' }}
      >
        <Dialog.Title>{t('Dashboard.Management.AddCoolingUnit.fields.addTempSensor')}</Dialog.Title>
        <Dialog.Content>
          <Text tw="mb-2">
            {t('Dashboard.Management.AddCoolingUnit.fields.sensorDesc.default')}
          </Text>
          <Controller
            name="apiKey"
            control={form.control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                tw="bg-transparent"
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
                tw="bg-transparent"
                label={t('Dashboard.Management.AddCoolingUnit.fields.figorr.deviceTag')}
                mode="flat"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!form.formState.errors.deviceTag}
              />
            )}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color={paperTheme.colors.primary} size={16} animating />
            ) : (
              t('actions.save-changes')
            )}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
