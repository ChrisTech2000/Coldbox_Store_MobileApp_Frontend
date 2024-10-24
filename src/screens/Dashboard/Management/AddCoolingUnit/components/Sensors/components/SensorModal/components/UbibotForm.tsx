import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Divider, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from '#ui/components/Button';
import { Select } from '#ui/components/Select';
import { Text } from '#ui/components/Text';
import { useToggle } from '#ui/hooks/useToggle';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import type { SensorDatum } from '#screens/Dashboard/Management/AddCoolingUnit/contexts/FormManager';
import SensorsService from '#services/SensorsService';

type FormValues = {
  // contextual fields
  _step: 'check' | 'save';
  temperatureOptions: Array<string>;
  // actual form fields
  accountKey: string;
  channelId: string;
  temperatureField: string;
  // temp fields
  tempTemperatureField: string;
};

export default function UbibotForm() {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const form = useForm<FormValues>({
    defaultValues: {
      _step: 'check',
      accountKey: '',
      channelId: '',
      temperatureField: '',
      temperatureOptions: [],
      tempTemperatureField: '',
    },
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z) => {
      const baseSchema = z.object({
        _step: z.union([z.literal('check'), z.literal('save')]),
      });

      const initialStepSchema = z.object({
        accountKey: z.string().min(1),
        channelId: z.string().min(1),
      });

      const schemaConditions = z.discriminatedUnion('_step', [
        initialStepSchema.extend({ _step: z.literal('check') }),
        initialStepSchema.extend({
          _step: z.literal('save'),
          temperatureField: z.string().min(1),
          temperatureOptions: z.array(z.string()).min(1),
          tempTemperatureField: z.string().optional(),
        }),
      ]);

      return z.intersection(schemaConditions, baseSchema);
    }),
  });

  const [isInternalModalVisible, toggleInternalModalVisibility] = useToggle(false);

  const temperatureField = form.watch('temperatureField');

  async function onSubmit(values: FormValues): Promise<void> {
    switch (values._step) {
      case 'check': {
        try {
          const result = await SensorsService.verifyUbibotSensorConnectivity({
            accountKey: values.accountKey,
            channelId: values.channelId,
          });

          if (!(result?.data?.length >= 1)) {
            toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationError'), {
              type: 'md_danger',
            });
            return;
          }

          form.reset((prev) => ({
            ...prev,
            _step: 'save',
            temperatureField: '',
            temperatureOptions: result.data,
            tempTemperatureField: '',
          }));
        } catch (exception) {
          console.error(exception);
          toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationError'), {
            type: 'md_danger',
          });
        }
        return;
      }

      case 'save': {
        const sensorData = {
          accountKey: values.accountKey,
          channelId: values.channelId,
          field: values.temperatureField,
          type: 'ubibot',
        } satisfies SensorDatum;

        toast.show(t('Dashboard.Management.AddCoolingUnit.toasts.integrationSuccess'), {
          type: 'md_success',
        });

        emitter.emit(APP_EVENTS.DISPATCH_SENSOR_DATUMS, sensorData);
        return;
      }

      default:
        return;
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  switch (form.watch('_step')) {
    case 'check':
    default:
      return (
        <React.Fragment>
          <Text variant="TitleRegular" tw="px-6">
            {t('Dashboard.Management.AddCoolingUnit.fields.addTempSensor')}
          </Text>
          <Text tw="px-6 mt-2">
            {t('Dashboard.Management.AddCoolingUnit.fields.sensorDesc.ubibot')}
          </Text>

          <View tw="w-full pt-1.5 pb-3">
            <Controller
              name="accountKey"
              control={form.control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  tw="bg-transparent px-3"
                  label={t('Dashboard.Management.AddCoolingUnit.fields.ubibot.accountKey')}
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
                  label={t('Dashboard.Management.AddCoolingUnit.fields.ubibot.channelId')}
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
            <Button mode="text" onPress={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator color={paperTheme.colors.primary} size={16} animating />
              ) : (
                t('actions.continue')
              )}
            </Button>
          </View>
        </React.Fragment>
      );

    case 'save':
      return (
        <React.Fragment>
          <Text variant="TitleRegular" tw="px-6">
            {t('Dashboard.Management.AddCoolingUnit.fields.ubibot.sensorFieldTitle')}
          </Text>
          <Text tw="px-6 mt-2">
            {t('Dashboard.Management.AddCoolingUnit.fields.ubibot.sensorFieldDesc')}
          </Text>

          <View tw="w-full pt-1.5 pb-3">
            <Controller<FormValues>
              name="temperatureField"
              control={form.control}
              render={({ field: { onChange } }) => (
                <View tw="mt-5">
                  <View tw="pl-7 pr-4 pb-1.5">
                    <Select
                      variant="md"
                      useScrollView={false}
                      label={t('Dashboard.Management.AddCoolingUnit.fields.ubibot.field')}
                      currentValue={temperatureField}
                      isModalOpen={isInternalModalVisible}
                      onClick={() => {
                        toggleInternalModalVisibility();
                        form.setValue(
                          'tempTemperatureField',
                          form.getValues('tempTemperatureField')
                        );
                      }}
                      content={{
                        header: t('Dashboard.Management.AddCoolingUnit.fields.ubibot.field'),
                        options: (
                          <FlatList
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled
                            data={form.watch('temperatureOptions')}
                            keyExtractor={(temperatureOption, idx) =>
                              `temperature-option-${temperatureOption}-#${idx}`
                            }
                            renderItem={({ item }) => (
                              <TouchableOpacity
                                tw="w-full flex flex-row items-center justify-between px-4 py-2"
                                onPress={(evt) => {
                                  evt.stopPropagation();
                                  form.setValue('tempTemperatureField', item);
                                }}
                              >
                                <Text tw="text-lg">{item}</Text>
                                {form.watch('tempTemperatureField') === item ? (
                                  <Icon name="check" color={paperTheme.colors.primary} size={20} />
                                ) : null}
                              </TouchableOpacity>
                            )}
                          />
                        ),
                        footer: (
                          <View tw="flex flex-row items-center justify-end">
                            <Button
                              mode="text"
                              uppercase
                              onPress={(evt) => {
                                evt.stopPropagation();
                                toggleInternalModalVisibility();
                                form.setValue(
                                  'tempTemperatureField',
                                  form.getValues('temperatureField')
                                );
                              }}
                            >
                              {t('actions.cancel')}
                            </Button>
                            <Button
                              mode="text"
                              uppercase
                              onPress={(evt) => {
                                evt.stopPropagation();
                                toggleInternalModalVisibility();
                                onChange(form.getValues('tempTemperatureField'));
                                form.clearErrors('temperatureField');
                              }}
                            >
                              {t('actions.ok')}
                            </Button>
                          </View>
                        ),
                      }}
                    />
                  </View>
                  <Divider
                    tw={cn(
                      'w-full bg-gray-700',
                      !!form.formState.errors.temperatureField && 'bg-red-700 h-[1.5px]'
                    )}
                  />
                </View>
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
}
