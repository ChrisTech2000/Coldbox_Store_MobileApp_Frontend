import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Icon, Portal } from 'react-native-paper';
import startCase from 'lodash/startCase';

import Danger from '#assets/icons/danger.svg';

import { Button } from '#ui/components/Button';
import { Input } from '#ui/components/Input';
import { Modal } from '#ui/components/Modal';
import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { EUnitOfMeasurement } from '#types/global';

import { FarmerSurveySchema } from './schema';
import SelectWithStore, { createSelectStore } from '../../components/SelectWithStore';

type FarmerSurveyProps = {
  cropName: string;
};

type Schema = {
  totalProducedWeekly: number;
  unitOfMeasurement: EUnitOfMeasurement;
  unitaryWeight: number | undefined;
  quantitySelfConsumed: number;
  quantitySold: number;
  quantityLost: number;
  reasonsForSpoilage: string[];
  averagePrice: number;
};

const useMeasurementStore = createSelectStore<EUnitOfMeasurement>();

export function FarmerSurvey({ cropName }: FarmerSurveyProps) {
  const { t, zodResolver } = useTranslationUtils();
  const { selectedItem: measureUnit } = useMeasurementStore();

  const {
    handleSubmit,
    control,
    // clearErrors,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(() => FarmerSurveySchema(t)),
  });

  const [isSurveyModalVisible, setIsSurveyModalVisible] = useState<boolean>(false);
  const [isUnitModalVisible, setIsUnitModalVisible] = useState<boolean>(false);

  const onSubmit = useCallback(() => {}, []);

  useEffect(() => {
    if (measureUnit) setValue('unitOfMeasurement', measureUnit);
  }, [measureUnit]);

  return (
    <View tw="w-full flex flex-row items-center justify-between space-x-2 mt-1 mb-2">
      <View tw="flex flex-row flex-1 items-center space-x-2">
        <Danger tw="w-7 h-7" />
        <Text variant="TextMedium" tw="text-base">
          {t('Dashboard.CrateManagement.FarmerSurvey.warningMessage', { crop: cropName })}
        </Text>
      </View>

      <Button
        mode="contained"
        icon="arrow-right"
        contentStyle="flex flex-row-reverse"
        onPress={() => setIsSurveyModalVisible(true)}
      >
        {t('actions.go')}
      </Button>

      <Portal>
        <Modal visible={isSurveyModalVisible} onDismiss={() => setIsSurveyModalVisible(false)}>
          <View tw="w-full bg-white rounded-sm w-3/4 max-w-3/4 h-auto py-4 px-5 self-center space-y-2">
            <Question
              question={t('Dashboard.CrateManagement.FarmerSurvey.modal.weeklyQuantityQuestion')}
            />
            <View>
              <Text variant="TextMedium" tw="text-base">
                1. {t('Dashboard.CrateManagement.FarmerSurvey.modal.totalQuantity')}
              </Text>
              <View tw="w-full flex flex-row items-end">
                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      tw="h-10 w-32 mr-4 bg-transparent"
                      value={value?.toString()}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.totalProducedWeekly?.message}
                    />
                  )}
                  name="totalProducedWeekly"
                />
                <SelectWithStore<EUnitOfMeasurement>
                  autoSelect
                  datums={[
                    EUnitOfMeasurement.KILOGRAMS,
                    EUnitOfMeasurement.CRATES,
                    EUnitOfMeasurement.BOXES,
                    EUnitOfMeasurement.BASKETS,
                    EUnitOfMeasurement.SACKS,
                  ]}
                  isModalVisible={isUnitModalVisible}
                  itemName={(item) =>
                    t(`Dashboard.CrateManagement.FarmerSurvey.modal.unit.${item}`)
                  }
                  setIsModalVisible={setIsUnitModalVisible}
                  useSelectStore={useMeasurementStore}
                  label={startCase(measureUnit ?? '')}
                />
              </View>
              {measureUnit !== EUnitOfMeasurement.KILOGRAMS && (
                <View tw="mt-2 flex flex-row items-end space-x-2">
                  <Text variant="TextMedium" tw="text-base">
                    {t('Dashboard.CrateManagement.FarmerSurvey.modal.unitWeight', {
                      crate: t(
                        `Dashboard.CrateManagement.FarmerSurvey.modal.unit.singular.${measureUnit?.toLowerCase() as EUnitOfMeasurement}`
                      ),
                    })}
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <Input
                        tw="h-10 w-32 mr-4 bg-transparent"
                        value={value?.toString()}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.unitaryWeight?.message}
                      />
                    )}
                    name="unitaryWeight"
                  />
                </View>
              )}
            </View>

            <Text variant="TextMedium" tw="text-base">
              2. {t('Dashboard.CrateManagement.FarmerSurvey.modal.quantityDistributionQuestion')}
            </Text>

            <Question
              question={t('Dashboard.CrateManagement.FarmerSurvey.modal.cropSpoilageQuestion')}
            />

            <Question
              question={t('Dashboard.CrateManagement.FarmerSurvey.modal.marketPriceQuestion', {
                crop: cropName,
              })}
            />
            <Button
              mode="contained"
              icon="check-circle-outline"
              contentStyle="flex flex-row-reverse"
              onPress={handleSubmit(onSubmit)}
            >
              {t('actions.confirm')}
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
}

function Question({ question }: { question: string }) {
  return (
    <View tw="flex flex-row space-x-1">
      <View tw="mt-2">
        <Icon source="circle" size={6} />
      </View>
      <Text variant="TextBold" tw="text-base font-bold">
        {question}
      </Text>
    </View>
  );
}
