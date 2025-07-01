import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Dialog, Portal, TextInput } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import InAppNotifications from '#common/InAppNotifications';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';

type FormValues<T = string> = { temperature: T };
type PreprocessedFormValues = FormValues<number>;

type Props = {
  temp: number;
  coolingUnitId: number;
  revalidateTemperatures: () => Promise<void>;
  hasSensorIntegration: boolean;
};

export default function TemperatureModal(props: Props) {
  const [isModalOpen, toggleModalVisibility] = useToggle(false);
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const form = useForm<FormValues>({
    defaultValues: { temperature: '' },
    resolver: zodResolver((z) =>
      z.object({
        temperature: z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number()),
      })
    ),
    reValidateMode: 'onSubmit',
  });

  async function onSubmit(values: PreprocessedFormValues): Promise<void> {
    try {
      await ColdtivateService.addCoolingUnitTemperature({
        value: values.temperature,
        specificationType: 'TEMPERATURE',
        datetimeStamp: new Date().toISOString(),
        coolingUnit: props.coolingUnitId,
      });

      toast.show(t('Dashboard.CoolingUnitsRoomConditions.toasts.confirmation'), {
        type: 'md_success',
      });

      await props.revalidateTemperatures();
      toggleModalVisibility();
    } catch {
      // silent error
    }
  }

  const isRTL = LanguageManager.isRTL;

  return (
    <View tw="w-full px-4">
      <Button
        mode="contained"
        tw="mt-3"
        onPress={toggleModalVisibility}
        disabled={props.hasSensorIntegration}
      >
        {t('Dashboard.CoolingUnitsRoomConditions.enterTemperature')}
      </Button>

      {props.hasSensorIntegration ? (
        <Text tw={cn('px-16 mt-2 text-zinc-500 text-center', isRTL && 'text-left px-2 py-3.5')}>
          {t('Dashboard.TemperatureAlert.sensorHint')}
        </Text>
      ) : null}

      <Portal>
        <Dialog
          visible={isModalOpen}
          onDismiss={toggleModalVisibility}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Title>{t('Dashboard.CoolingUnitsRoomConditions.enterTemperature')}</Dialog.Title>
          <Dialog.Content>
            <Controller
              name="temperature"
              control={form.control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  label={t('Dashboard.TemperatureAlert.temperature')}
                  mode="flat"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!form.formState.errors.temperature}
                  left={<TextInput.Icon icon="thermometer" />}
                  right={<TextInput.Affix text={`${props.temp}°C`} />}
                  tw="w-full bg-transparent mt-2"
                  dense
                />
              )}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onPress={form.handleSubmit(onSubmit as any)}
              disabled={form.formState.isSubmitting}
            >
              {t('actions.confirm')}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
