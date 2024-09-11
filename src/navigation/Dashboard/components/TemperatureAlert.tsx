import React from 'react';
import { DataTable, Modal, Portal, TextInput } from 'react-native-paper';
import { FlatList, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialIcons';
import cloneDeep from 'lodash/cloneDeep';
import colors from 'tailwindcss/colors';
import { useSWRConfig } from 'swr';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';

import type { CommodityInfo } from '#types/global';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import InAppNotifications from '#common/InAppNotifications';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';

type LocalState<T = string> = {
  coolingUnitId: number | undefined;
  datums: Array<CommodityInfo> | undefined;
  coolingUnitHasSensorIntegration: boolean;
  temperature: T;
  showCompleteInfo: boolean;
  lastUpdated: Date | undefined;
};

export type TemperatureAlertEvtDatum = {
  coolingUnitId: number;
  companyId: number;
  showCompleteInfo?: boolean;
};

const DEFAULT_STATE = {
  coolingUnitId: undefined,
  datums: undefined,
  coolingUnitHasSensorIntegration: false,
  temperature: '',
  lastUpdated: undefined,
  showCompleteInfo: false,
} satisfies LocalState;

export default function TemperatureAlert() {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const { mutate } = useSWRConfig();

  const form = useForm<LocalState>({
    defaultValues: DEFAULT_STATE,
    reValidateMode: 'onSubmit',
    resolver: zodResolver((z) =>
      z.object({
        coolingUnitId: z.number().positive(),
        datums: z.array(
          z.object({
            commodity: z.string(),
            percentage: z.number(),
            combinedWeight: z.number(),
            cratesNumber: z.number(),
            optimalStorageTemperature: z.string(),
          })
        ),
        coolingUnitHasSensorIntegration: z.boolean(),
        temperature: z.preprocess((v) => (v ? Number(v) : 0), z.coerce.number().gt(0)),
      })
    ),
  });

  async function dismissHandler() {
    await mutate(getQueryKey('getCoolingUnitTemperatures', form.getValues('coolingUnitId')));
    form.reset(DEFAULT_STATE);
  }

  async function onSubmit(values: LocalState<number>) {
    try {
      await ColdtivateService.addCoolingUnitTemperature({
        value: values.temperature,
        specificationType: 'TEMPERATURE',
        datetimeStamp: new Date().toISOString(),
        coolingUnit: values.coolingUnitId!,
      });

      toast.show(t('Dashboard.CoolingUnitsRoomConditions.toasts.confirmation'), {
        type: 'md_success',
      });

      await dismissHandler();
    } catch {
      // silent error
    }
  }

  useAppEventListener<[TemperatureAlertEvtDatum]>(
    APP_EVENTS.DISPATCH_CHECK_IN_TEMPERATURE_ALERT,
    async ({ coolingUnitId, companyId, showCompleteInfo }) => {
      try {
        const result = await ColdtivateService.getCoolingUnit({ coolingUnitId, companyId });
        form.reset({
          coolingUnitId,
          coolingUnitHasSensorIntegration: result.sensor,
          showCompleteInfo: showCompleteInfo === undefined ? false : showCompleteInfo,
          lastUpdated: result.latestTemperatureTimestamp
            ? new Date(result.latestTemperatureTimestamp)
            : undefined,
          datums: cloneDeep(result.commodityInfos).sort((a, b) => b.percentage - a.percentage),
        });
      } catch (exception) {
        console.error(exception);
      }
    }
  );

  const commodityInfo = form.watch('datums');
  const coolingUnitHasSensorIntegration = form.watch('coolingUnitHasSensorIntegration');
  const showCompleteInfo = form.watch('showCompleteInfo');
  const latestTemperatureTimestamp = form.watch('lastUpdated');

  const isVisible = typeof commodityInfo !== 'undefined';

  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={dismissHandler}>
        <KeyboardAwareScrollView
          contentContainerStyle="items-center"
          tw="w-full bg-white rounded-3xl w-11/12 max-w-11/12 h-auto max-h-[95%] py-4 px-5 self-center space-y-2 mb-4"
        >
          <View tw="flex items-center justify-center space-y-1">
            <Icon name="warning" size={40} color={colors.yellow[400]} />
            <Text variant="TitleRegular">{t('Dashboard.TemperatureAlert.title')}</Text>
          </View>

          {showCompleteInfo ? (
            <View tw="w-full">
              <Text tw="px-2">{t('Dashboard.TemperatureAlert.subtitle')}</Text>
              <DataTable>
                <FlatList
                  nestedScrollEnabled
                  showsHorizontalScrollIndicator={false}
                  ListHeaderComponent={
                    <DataTable.Header>
                      <DataTable.Title>
                        {t('Dashboard.CoolingUnitsCratesInfo.commodity')}
                      </DataTable.Title>
                      <DataTable.Title>
                        {t('Dashboard.CoolingUnitsCratesInfo.percentage')}
                      </DataTable.Title>
                      <DataTable.Title>
                        {t('Dashboard.CoolingUnitsCratesInfo.weight')}
                      </DataTable.Title>
                      <DataTable.Title>
                        {t('Dashboard.CoolingUnitsCratesInfo.crates')}
                      </DataTable.Title>
                      <DataTable.Title>
                        {t('Dashboard.CoolingUnitsCratesInfo.optimalTemp')}
                      </DataTable.Title>
                    </DataTable.Header>
                  }
                  data={commodityInfo}
                  keyExtractor={(item) => `data-table-row-${item.commodity}`}
                  renderItem={({ item }) => (
                    <DataTable.Row>
                      <DataTable.Cell>{item.commodity}</DataTable.Cell>
                      <DataTable.Cell>{item.percentage}%</DataTable.Cell>
                      <DataTable.Cell>{item.combinedWeight}kg</DataTable.Cell>
                      <DataTable.Cell>{item.cratesNumber}</DataTable.Cell>
                      <DataTable.Cell>{item.optimalStorageTemperature}</DataTable.Cell>
                    </DataTable.Row>
                  )}
                />
              </DataTable>

              {coolingUnitHasSensorIntegration ? (
                <Button
                  tw="mt-4"
                  mode="contained"
                  onPress={async (evt) => {
                    evt?.stopPropagation();
                    await dismissHandler();
                  }}
                >
                  {t('actions.confirm')}
                </Button>
              ) : null}
            </View>
          ) : null}

          <View tw="items-start w-full mt-3">
            {!showCompleteInfo && latestTemperatureTimestamp && (
              <Text variant="TitleSmall" tw="text-center">
                {t('Dashboard.TemperatureAlert.latestTemperature', {
                  date: dateFmt(latestTemperatureTimestamp.toISOString(), 'dd-MM-yyyy HH:mm'),
                })}
              </Text>
            )}
            {/** ADD LAST TEMPERATURE REGISTERED */}
            <Text variant="TitleSmall" tw="text-center w-full">
              {t('Dashboard.TemperatureAlert.edit')}
            </Text>
            <Controller
              name="temperature"
              control={form.control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  label={t('Dashboard.TemperatureAlert.newTemperature')}
                  mode="outlined"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!form.formState.errors.temperature}
                  tw="w-full bg-transparent mt-2"
                  dense
                />
              )}
            />
          </View>
          <View tw="space-y-3 mt-5">
            <Button
              mode="outlined"
              icon="check-circle-outline"
              disabled={!form.watch('temperature')}
              // eslint-disable-next-line
              onPress={form.handleSubmit(onSubmit as any)}
            >
              {t('Dashboard.TemperatureAlert.confirm')}
            </Button>
            <Button
              mode="contained"
              onPress={async (evt) => {
                evt?.stopPropagation();
                await dismissHandler();
              }}
            >
              {t('Dashboard.TemperatureAlert.continueWithoutUpdate')}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    </Portal>
  );
}
