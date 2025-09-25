import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { DataTable, Dialog, Portal, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSWRConfig } from 'swr';
import colors from 'tailwindcss/colors';
import { useShallow } from 'zustand/react/shallow';
import cloneDeep from 'lodash/cloneDeep';

import { Button } from '#ui/components/Button';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import reportCrash from '#ui/lib/reportCrash';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';

import InAppNotifications from '#common/InAppNotifications';
import { LanguageManager, dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { getQueryKey } from '#services/hooks/useAPiCall';
import type { CommodityInfo } from '#types/global';
import { useManagementStore } from '#stores/management';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

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

const DIALOG_MAX_HEIGHT = Dimensions.get('window').height * 0.7;

export default function TemperatureAlert() {
  const { t, zodResolver } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const { mutate } = useSWRConfig();

  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));
  const locale = LanguageManager.read();

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
    const unitId = form.getValues('coolingUnitId');
    form.reset(DEFAULT_STATE);
    await mutate(getQueryKey('getCoolingUnitTemperatures', unitId));
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
    } catch (exception) {
      toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
      reportCrash(exception as Error);
    }
  }

  useAppEventListener<[TemperatureAlertEvtDatum]>(
    APP_EVENTS.DISPATCH_CHECK_IN_TEMPERATURE_ALERT,
    async ({ coolingUnitId, companyId, showCompleteInfo }) => {
      try {
        const result = await ColdtivateService.getCoolingUnit({ coolingUnitId, companyId });
        const { buildMap, find } = cropTranslationLookup();
        const translationMap = buildMap();
        form.reset({
          ...DEFAULT_STATE,
          coolingUnitId,
          coolingUnitHasSensorIntegration: result.sensor,
          showCompleteInfo: showCompleteInfo === undefined ? false : showCompleteInfo,
          lastUpdated: result.latestTemperatureTimestamp
            ? new Date(result.latestTemperatureTimestamp)
            : undefined,
          datums: cloneDeep(result.commodityInfos)
            .map((commodityInfo) => ({
              ...commodityInfo,
              optimalStorageTemperature: commodityInfo.optimalStorageTemperature || 'N/A',
              commodity: find(translationMap, {
                name: commodityInfo.commodity,
                country: companyCountry || undefined,
                locale,
              }),
            }))
            .sort((a, b) => b.percentage - a.percentage),
        });
      } catch (exception) {
        toast.show(t('navigation.error.serverErrorMessage'), { type: 'md_danger' });
        reportCrash(exception as Error);
      }
    }
  );

  const commodityInfo = form.watch('datums');
  const coolingUnitHasSensorIntegration = form.watch('coolingUnitHasSensorIntegration');
  const showCompleteInfo = form.watch('showCompleteInfo');
  const latestTemperatureTimestamp = form.watch('lastUpdated');

  const isVisible = typeof commodityInfo !== 'undefined';

  const Container = showCompleteInfo ? Dialog.ScrollArea : Dialog.Content;
  const ContextualView = showCompleteInfo ? KeyboardAwareScrollView : React.Fragment;

  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={dismissHandler}
        style={{ backgroundColor: 'white', maxHeight: DIALOG_MAX_HEIGHT }}
      >
        <Dialog.Icon
          icon={(props) => <Icon {...props} name="warning" size={40} color={colors.yellow[400]} />}
        />
        <Dialog.Title tw="text-center mt-0">{t('Dashboard.TemperatureAlert.title')}</Dialog.Title>
        <Container>
          <ContextualView {...(showCompleteInfo ? { showsVerticalScrollIndicator: false } : {})}>
            <View tw={cn(showCompleteInfo && 'h-full pt-2')}>
              {showCompleteInfo ? (
                <View tw="w-full">
                  <Text tw="p-2">{t('Dashboard.TemperatureAlert.subtitle')}</Text>
                  <DataTable>
                    <FlashList
                      nestedScrollEnabled
                      showsVerticalScrollIndicator={false}
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
                      keyExtractor={(item) => `commodity-${item.commodity}`}
                      estimatedItemSize={48}
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
                      disabled={form.formState.isSubmitting}
                    >
                      {t('actions.confirm')}
                    </Button>
                  ) : null}
                </View>
              ) : null}

              <View tw="items-start w-full mt-3">
                {!showCompleteInfo && latestTemperatureTimestamp ? (
                  <Text variant="TitleSmall" tw="text-center">
                    {t('Dashboard.TemperatureAlert.latestTemperature', {
                      date: dateFmt(latestTemperatureTimestamp.toISOString(), 'dd-MM-yyyy HH:mm'),
                    })}
                  </Text>
                ) : null}
                {/** ADD LAST TEMPERATURE REGISTERED */}
                <Text variant="TitleSmall" tw="text-center w-full">
                  {t('Dashboard.TemperatureAlert.edit')}
                </Text>
                <Controller
                  name="temperature"
                  control={form.control}
                  render={({ field: { onChange, value, onBlur }, fieldState }) => {
                    const hasError = typeof fieldState.error?.message !== 'undefined';
                    return (
                      <TextInput
                        label={t('Dashboard.TemperatureAlert.newTemperature')}
                        mode="outlined"
                        keyboardType="numeric"
                        value={value}
                        onChangeText={(newValue) => {
                          if (hasError) {
                            form.setError('temperature', { message: undefined });
                          }
                          onChange(newValue);
                        }}
                        onBlur={onBlur}
                        error={hasError}
                        tw="w-full bg-transparent mt-2"
                        dense
                        disabled={form.formState.isSubmitting}
                      />
                    );
                  }}
                />
              </View>
              <View tw="space-y-3 mt-5">
                <Button
                  mode="outlined"
                  icon="check-circle-outline"
                  disabled={
                    !form.watch('temperature') ||
                    !!form.formState.errors.temperature?.message ||
                    form.formState.isSubmitting
                  }
                  // eslint-disable-next-line
                  onPress={form.handleSubmit(onSubmit as any)}
                >
                  {t('Dashboard.TemperatureAlert.confirm')}
                </Button>
                <Button
                  tw={cn(showCompleteInfo && 'mb-4')}
                  mode="contained"
                  onPress={async (evt) => {
                    evt?.stopPropagation();
                    await dismissHandler();
                  }}
                  disabled={form.formState.isSubmitting}
                >
                  {t('Dashboard.TemperatureAlert.continueWithoutUpdate')}
                </Button>
              </View>
            </View>
          </ContextualView>
        </Container>
      </Dialog>
    </Portal>
  );
}
