import startCase from 'lodash/startCase';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { Divider, Icon, Portal, TextInput } from 'react-native-paper';

import Danger from '#assets/icons/danger.svg';
import MineCart from '#assets/icons/mine-cart.svg';

import { Button } from '#ui/components/Button';
import { Modal } from '#ui/components/Modal';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useManagementStore } from '#stores/management';
import { GetFarmerSurveysResponse } from '#types/api.responses';
import { EUnitOfMeasurement } from '#types/global';

import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '../../components/MultipleSelectWithStore';
import SelectWithStore, { createSelectStore } from '../../components/SelectWithStore';
import { FarmerSurveySchema, defaultValues } from './schema';

type FarmerSurveyProps = {
  cropId: number | undefined;
  cropName: string;
  farmerId: number;
  surveys: GetFarmerSurveysResponse | undefined;
};

type Schema = {
  weightDistribution: {
    totalProducedWeekly: number;
    quantitySelfConsumed: number;
    quantitySold: number;
    quantityLost: number;
  };
  unitOfMeasurement: EUnitOfMeasurement;
  unitaryWeight: number | undefined;
  reasonsForSpoilage: string[];
  averagePrice: number;
};

const useMeasurementStore = createSelectStore<EUnitOfMeasurement>();
const useSpoilageReasonsStore = createMultipleSelectStore<string>();

export function FarmerSurvey({ cropId, cropName, farmerId, surveys }: FarmerSurveyProps) {
  const { t, zodResolver } = useTranslationUtils();
  const colors = useTailwindColors();

  const { selectedItem: measureUnit } = useMeasurementStore();
  const { selectedItems: spoilageReasons } = useSpoilageReasonsStore();
  const { company } = useManagementStore();

  const {
    handleSubmit,
    control,
    // clearErrors,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(() => FarmerSurveySchema(t)),
    defaultValues,
  });

  const [isSurveyModalVisible, setIsSurveyModalVisible] = useState<boolean>(false);
  const [isUnitModalVisible, setIsUnitModalVisible] = useState<boolean>(false);
  const [isSpoilageReasonsModalVisible, setIsSpoilageReasonsModalVisible] =
    useState<boolean>(false);

  const onChangeNumericKeyboard = useCallback(
    (newVal: string | number | undefined, onChange: (...event: unknown[]) => void) => {
      const value = Number(newVal);
      if (isNaN(value) || newVal === undefined) return;
      onChange(value);
    },
    []
  );

  const onSubmit: SubmitHandler<Schema> = useCallback(
    async (values) => {
      await ColdtivateService.updateFarmerSurveys({
        farmer: farmerId,
        userType: '',
        experience: false,
        experienceDuration: 0,
        commodities: [
          ...(surveys?.flatMap((survey) => survey.co) ?? []),
          {
            averagePrice: values.averagePrice,
            unit: values.unitOfMeasurement,
            quantityTotal: values.weightDistribution.totalProducedWeekly,
            quantityBelowMarketPrice: values.weightDistribution.quantityLost,
            quantitySelfConsumed: values.weightDistribution.quantitySelfConsumed,
            quantitySold: values.weightDistribution.quantitySold,
            averageSeasonInMonths: null,
            kgInUnit: values.unitaryWeight ?? defaultValues.unitaryWeight,
            currency: company?.currency ?? '',
            reasonForLoss: values.reasonsForSpoilage,
            cropId: cropId ?? -1,
          },
        ],
      });
    },
    [farmerId, cropId, company]
  );

  useEffect(() => {
    if (measureUnit) setValue('unitOfMeasurement', measureUnit);
  }, [measureUnit]);

  useEffect(() => {
    if (spoilageReasons) setValue('reasonsForSpoilage', spoilageReasons);
  }, [spoilageReasons]);

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

      {/** MODAL */}
      <Portal>
        <Modal visible={isSurveyModalVisible} onDismiss={() => setIsSurveyModalVisible(false)}>
          <View tw="w-full bg-white rounded-sm w-[90%] max-w-3/4 h-auto py-4 px-5 self-center space-y-2">
            {/** QUANTITY */}
            <Question
              question={t('Dashboard.CrateManagement.FarmerSurvey.modal.weeklyQuantityQuestion', {
                crop: cropName,
              })}
            />

            {/** QUANTITY — TOTAL */}
            <View>
              <Text variant="TextMedium" tw="text-base">
                1. {t('Dashboard.CrateManagement.FarmerSurvey.modal.totalQuantity')}
              </Text>
              <View tw="w-full flex flex-row items-end">
                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                      tw="h-10 w-32 mr-4 bg-transparent"
                      value={value?.toString()}
                      onChangeText={(val) => onChangeNumericKeyboard(val, onChange)}
                      onBlur={onBlur}
                      keyboardType="number-pad"
                      error={!!errors.weightDistribution?.totalProducedWeekly?.message}
                    />
                  )}
                  name="weightDistribution.totalProducedWeekly"
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

              {errors.weightDistribution?.totalProducedWeekly && (
                <Text tw="text-xs text-red-600 mt-2 pl-3 w-[95%]">
                  {errors.weightDistribution.totalProducedWeekly.message?.toString()}
                </Text>
              )}

              {measureUnit !== EUnitOfMeasurement.KILOGRAMS && (
                <View tw="my-2 flex flex-row items-end space-x-2">
                  <Text variant="TextMedium" tw="text-base">
                    {t('Dashboard.CrateManagement.FarmerSurvey.modal.unitWeight', {
                      crate: t(
                        `Dashboard.CrateManagement.FarmerSurvey.modal.unit.singular.${measureUnit?.toLowerCase() as EUnitOfMeasurement}`
                      ),
                    })}
                  </Text>
                  <MineCart tw="ml-2 mb-1" width={20} height={20} />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <View tw="flex flex-row items-center justify-between space-x-2">
                        <TouchableOpacity
                          onPress={() =>
                            onChangeNumericKeyboard(!value ? 0 : Number(value) - 1, onChange)
                          }
                          tw="ml-2"
                        >
                          <Icon source="minus" size={20} color={colors.green.primary} />
                        </TouchableOpacity>
                        <TextInput
                          tw="h-10 bg-transparent"
                          keyboardType="number-pad"
                          value={value?.toString()}
                          onChangeText={(val) => onChangeNumericKeyboard(val, onChange)}
                          onBlur={onBlur}
                          error={!!errors.unitaryWeight?.message}
                        />
                        <TouchableOpacity
                          onPress={() => onChangeNumericKeyboard(Number(value ?? 0) + 1, onChange)}
                          tw="mr-2"
                        >
                          <Icon source="plus" size={20} color={colors.green.primary} />
                        </TouchableOpacity>
                      </View>
                    )}
                    name="unitaryWeight"
                  />
                  <Icon source="weight-kilogram" size={27} />
                </View>
              )}
            </View>

            {/** QUANTITY — DISTRIBUTION */}
            <Text variant="TextMedium" tw="text-base">
              2. {t('Dashboard.CrateManagement.FarmerSurvey.modal.quantityDistributionQuestion')}
            </Text>
            <View tw="flex flex-row space-between space-x-2 w-[90%] mb-2">
              <View tw="w-1/3">
                <Text variant="TextMedium" tw="text-base">
                  {t('Dashboard.CrateManagement.FarmerSurvey.modal.selfConsumed', {
                    unit: measureUnit,
                  })}
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                      tw="h-10 bg-transparent"
                      keyboardType="number-pad"
                      value={value?.toString()}
                      onChangeText={(val) => onChangeNumericKeyboard(val, onChange)}
                      onBlur={onBlur}
                    />
                  )}
                  name="weightDistribution.quantitySelfConsumed"
                />
              </View>
              <Divider tw="h-full w-[0.25%] bg-gray-400" />
              <View tw="w-1/3 flex flex-col justify-between">
                <Text variant="TextMedium" tw="text-base">
                  {t('Dashboard.CrateManagement.FarmerSurvey.modal.sold', { unit: measureUnit })}
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                      tw="h-10 bg-transparent"
                      keyboardType="number-pad"
                      value={value?.toString()}
                      onChangeText={(val) => onChangeNumericKeyboard(val, onChange)}
                      onBlur={onBlur}
                    />
                  )}
                  name="weightDistribution.quantitySold"
                />
              </View>
              <Divider tw="h-full w-[0.25%] bg-gray-400" />
              <View tw="w-1/3">
                <Text variant="TextMedium" tw="text-base">
                  {t('Dashboard.CrateManagement.FarmerSurvey.modal.lost', { unit: measureUnit })}
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextInput
                      tw="h-10 bg-transparent"
                      value={value?.toString()}
                      keyboardType="number-pad"
                      onChangeText={(val) => onChangeNumericKeyboard(val, onChange)}
                      onBlur={onBlur}
                    />
                  )}
                  name="weightDistribution.quantityLost"
                />
              </View>
            </View>
            {errors.weightDistribution?.quantitySelfConsumed && (
              <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
                {errors.weightDistribution.quantitySelfConsumed.message?.toString()}
              </Text>
            )}

            {/** SPOILAGE */}
            <Question
              question={t('Dashboard.CrateManagement.FarmerSurvey.modal.cropSpoilageQuestion')}
            />
            <View tw="my-2">
              <MultipleSelectWithStore<string>
                datums={[
                  t('Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.improperHarvest'),
                  t(
                    'Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.inappropriateStorage'
                  ),
                  t('Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.overproduction'),
                  t(
                    'Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.transportationDamage'
                  ),
                  t('Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.pest'),
                  t('Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.diseases'),
                  t('Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.weather'),
                  t('Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.price'),
                  t('Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.other'),
                ]}
                isModalVisible={isSpoilageReasonsModalVisible}
                itemName={(item) => item}
                setIsModalVisible={setIsSpoilageReasonsModalVisible}
                useSelectStore={useSpoilageReasonsStore}
                label={
                  spoilageReasons && spoilageReasons.length > 0
                    ? spoilageReasons.join(', ')
                    : t(
                        'Dashboard.CrateManagement.FarmerSurvey.modal.selectSpoilageReasonsPlaceholder'
                      )
                }
              />
            </View>
            {errors.reasonsForSpoilage && (
              <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
                {errors.reasonsForSpoilage.message?.toString()}
              </Text>
            )}

            {/** PRICE */}
            <Question
              question={t('Dashboard.CrateManagement.FarmerSurvey.modal.marketPriceQuestion', {
                crop: cropName,
              })}
            />
            <View tw="flex flex-row items-end space-x-2">
              <Controller
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    tw="h-12 bg-transparent w-20"
                    label={t('Dashboard.CrateManagement.FarmerSurvey.modal.priceLabel')}
                    keyboardType="number-pad"
                    value={value?.toString()}
                    onChangeText={(val) => onChangeNumericKeyboard(val, onChange)}
                    onBlur={onBlur}
                    error={!!errors.averagePrice?.message}
                  />
                )}
                name="averagePrice"
              />
              <Text variant="TextMedium" tw="text-base">
                {company?.currency}{' '}
                {t('Dashboard.CrateManagement.FarmerSurvey.modal.priceUnit', {
                  unit: t(
                    `Dashboard.CrateManagement.FarmerSurvey.modal.unit.singular.${measureUnit?.toLowerCase() as EUnitOfMeasurement}`
                  ),
                })}
              </Text>
            </View>
            {errors.averagePrice && (
              <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
                {errors.averagePrice.message?.toString()}
              </Text>
            )}

            {/** SUBMIT */}
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
