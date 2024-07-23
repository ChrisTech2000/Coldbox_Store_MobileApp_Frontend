import React from 'react';
import { View } from 'react-native';
import { Modal, Portal, TextInput } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import ColdtivateService from '#services/ColdtivateService';

type FormValues = { temperature: number };

type Props = {
  temp: number;
  coolingUnitId: number;
  revalidateTemperatures: () => Promise<void>;
};

export default function TemperatureModal(props: Props) {
  const [isModalOpen, toggleModalVisibility] = useToggle(false);
  const { t, zodResolver } = useTranslationUtils();

  const form = useForm<FormValues>({
    defaultValues: { temperature: 0 },
    resolver: zodResolver((z) =>
      z.object({
        temperature: z.number().gt(0).positive(),
      })
    ),
    reValidateMode: 'onSubmit',
  });

  async function onSubmit(values: FormValues): Promise<void> {
    try {
      await ColdtivateService.addCoolingUnitTemperature({
        value: values.temperature,
        specificationType: 'TEMPERATURE',
        datetimeStamp: new Date().toISOString(),
        coolingUnit: props.coolingUnitId,
      });

      await props.revalidateTemperatures();
      toggleModalVisibility();
    } catch {
      // silent error
    }
  }

  return (
    <React.Fragment>
      <Button mode="contained" tw="mt-3" onPress={toggleModalVisibility}>
        {t('Dashboard.CoolingUnitsRoomConditions.enterTemperature')}
      </Button>

      <Portal>
        <Modal visible={isModalOpen} onDismiss={toggleModalVisibility}>
          <View tw="w-full items-center bg-white rounded-3xl w-3/4 max-w-3/4 h-auto py-4 px-5 self-center space-y-5">
            <View tw="items-start w-full">
              <Text variant="TitleSmall">
                {t('Dashboard.CoolingUnitsRoomConditions.enterTemperature')}
              </Text>
              <Controller
                name="temperature"
                control={form.control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    label="Temperature"
                    mode="flat"
                    keyboardType="numeric"
                    value={value.toString()}
                    onChangeText={(v) => onChange(parseInt(v || '0'))}
                    onBlur={onBlur}
                    error={!!form.formState.errors.temperature}
                    left={<TextInput.Icon icon="thermometer" />}
                    right={<TextInput.Affix text={`${props.temp}°C`} />}
                    tw="w-full bg-transparent mt-2"
                    dense
                  />
                )}
              />
            </View>

            <View tw="self-center w-full">
              <Button
                mode="contained"
                onPress={form.handleSubmit(onSubmit)}
                icon={form.formState.isSubmitting ? undefined : 'check-circle-outline'}
                disabled={form.formState.isSubmitting}
              >
                {t('actions.confirm')}
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </React.Fragment>
  );
}
