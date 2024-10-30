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
  username: string;
  password: string;
  machineId: string;
};

export default function EcozenForm(props: { isVisible: boolean; onDismiss: () => void }) {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

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
    try {
      const result = await SensorsService.verifyEcozenSensorConnectivity({
        username: values.username,
        password: values.password,
        machineID: values.machineId,
      });

      if (!result) {
        toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationError'), {
          type: 'md_danger',
        });
        return;
      }

      const sensorData = {
        machineID: values.machineId,
        username: values.username,
        password: values.password,
        type: 'ecozen',
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
            name="username"
            control={form.control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                tw="bg-transparent"
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
                tw="bg-transparent"
                label={t('Dashboard.Management.AddCoolingUnit.fields.ecozen.password')}
                mode="flat"
                value={value}
                onChangeText={onChange}
                secureTextEntry
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
                tw="bg-transparent"
                label={t('Dashboard.Management.AddCoolingUnit.fields.ecozen.machineId')}
                mode="flat"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={!!form.formState.errors.machineId}
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
