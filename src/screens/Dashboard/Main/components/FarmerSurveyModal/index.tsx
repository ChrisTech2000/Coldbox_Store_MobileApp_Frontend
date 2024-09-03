import startCase from 'lodash/startCase';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Divider, Icon, Portal, TextInput } from 'react-native-paper';

import MineCart from '#assets/icons/mine-cart.svg';

import { Button } from '#ui/components/Button';
import { Modal } from '#ui/components/Modal';
import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '#ui/components/MultipleSelectWithStore';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import { useTranslationUtils } from '#i18n/utils';
import type { ManagementCompany } from '#stores/management';
import type { GetAllCropsResponse } from '#types/api.responses';
import { type Crop, EUnitOfMeasurement } from '#types/global';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { defaultValues as _defaultValues, FarmerSurveySchema, formatFloat } from './schema';

export type FarmerSurveySchemaType = {
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
  crop?: Crop | GetAllCropsResponse;
  cropSelection: boolean;
};

type FarmersSurveyModalProps = {
  company?: ManagementCompany;
  companyCurrency?: string;
  cropName?: string;
  defaultValues?: Partial<FarmerSurveySchemaType>;
  isModalVisible: boolean;
  cropSelectionAvailable?: {
    title: string;
    crops: Array<Crop | GetAllCropsResponse>;
  };
  onDismiss: () => void;
  onSubmit: SubmitHandler<FarmerSurveySchemaType>;
  initialCropSelection?: Crop | GetAllCropsResponse;
};

const useMeasurementStore = createSelectStore<EUnitOfMeasurement>();
const useSpoilageReasonsStore = createMultipleSelectStore<string>();
const instantiateCropStore = (initialState?: Crop | GetAllCropsResponse) =>
  createSelectStore(initialState);

export function FarmersSurveyModal({
  company,
  companyCurrency,
  cropName: _cropName,
  defaultValues,
  isModalVisible,
  cropSelectionAvailable,
  onDismiss,
  onSubmit,
  ...props
}: FarmersSurveyModalProps) {
  const { t, zodResolver } = useTranslationUtils();
  const colors = useTailwindColors();

  const useCropStore = useMemo(
    () => instantiateCropStore(props.initialCropSelection),
    [isModalVisible]
  );

  const { selectedItem: measureUnit } = useMeasurementStore();
  const { selectedItem: crop } = useCropStore();
  const { selectedItems: spoilageReasons, onSelect: onSelectSpoilageReasons } =
    useSpoilageReasonsStore();

  const [isUnitModalVisible, setIsUnitModalVisible] = useState<boolean>(false);
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [isSpoilageReasonsModalVisible, setIsSpoilageReasonsModalVisible] =
    useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FarmerSurveySchemaType>({
    resolver: zodResolver(() => FarmerSurveySchema(t)),
    defaultValues: {
      ...(defaultValues ?? _defaultValues),
      cropSelection: !!cropSelectionAvailable,
    },
  });

  const onChangeNumericKeyboard = useCallback(
    (newVal: string | number | undefined, onChange: (...event: unknown[]) => void) => {
      if (newVal === undefined) return;

      const value = typeof newVal === 'string' ? newVal.trim() : String(newVal);

      if (value === '' || /^-?\d*[.,]?\d*$/.test(value)) {
        onChange(value);
      }
    },
    []
  );

  const submit: SubmitHandler<FarmerSurveySchemaType> = useCallback((values) => {
    values.averagePrice = Number(formatFloat(values.averagePrice));
    values.weightDistribution = {
      totalProducedWeekly: Number(formatFloat(values.weightDistribution.totalProducedWeekly)),
      quantityLost: Number(formatFloat(values.weightDistribution.quantityLost)),
      quantitySelfConsumed: Number(formatFloat(values.weightDistribution.quantitySelfConsumed)),
      quantitySold: Number(formatFloat(values.weightDistribution.quantitySold)),
    };
    onSubmit(values);
  }, []);

  useEffect(() => {
    if (measureUnit) setValue('unitOfMeasurement', measureUnit);
  }, [measureUnit]);

  useEffect(() => {
    if (spoilageReasons) setValue('reasonsForSpoilage', spoilageReasons);
  }, [spoilageReasons]);

  useEffect(() => {
    if (crop) setValue('crop', crop);
  }, [crop]);

  useEffect(() => {
    if (defaultValues?.reasonsForSpoilage?.length) {
      onSelectSpoilageReasons(defaultValues.reasonsForSpoilage);
    }
  }, [defaultValues?.reasonsForSpoilage]);

  return (
    <Portal>
      <Modal visible={isModalVisible} onDismiss={onDismiss}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAwareScrollView tw="rounded-3xl bg-white w-[90%] h-auto py-4 px-5 self-center space-y-2">
            {cropSelectionAvailable && (
              <View tw="space-y-2">
                <Text variant="TitleBold" tw="font-bold">
                  {cropSelectionAvailable.title}
                </Text>
                <Divider />
                <View tw="flex flex-row items-center justify-between space-x-1">
                  <Text variant="TextMedium" tw="text-lg">
                    {t('Dashboard.CrateManagement.FarmerSurvey.modal.commodityShortlist')}
                  </Text>
                  <SelectWithStore<Crop | GetAllCropsResponse>
                    datums={cropSelectionAvailable.crops}
                    isModalVisible={isCropModalVisible}
                    itemName={(item) => item?.name}
                    setIsModalVisible={setIsCropModalVisible}
                    useSelectStore={useCropStore}
                    label={crop?.name ?? ''}
                  />
                </View>
                {errors.crop && (
                  <Text tw="text-xs text-red-600 mt-2 pl-3 w-[95%]">
                    {errors.crop.message?.toString()}
                  </Text>
                )}
                <Divider />
              </View>
            )}

            {/** QUANTITY */}
            <Question
              question={t('Dashboard.CrateManagement.FarmerSurvey.modal.weeklyQuantityQuestion', {
                crop: _cropName ?? crop?.name ?? '__',
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
                      keyboardType="decimal-pad"
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
                          onPress={() =>
                            Number(onChangeNumericKeyboard(Number(value ?? 0) + 1, onChange))
                          }
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
                      keyboardType="decimal-pad"
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
                      keyboardType="decimal-pad"
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
                      keyboardType="decimal-pad"
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
                crop: _cropName ?? crop?.name ?? '__',
              })}
            />
            <View tw="flex flex-row items-end space-x-2">
              <Controller
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextInput
                    tw="h-12 bg-transparent w-20"
                    label={t('Dashboard.CrateManagement.FarmerSurvey.modal.priceLabel')}
                    keyboardType="decimal-pad"
                    value={value?.toString()}
                    onChangeText={(val) => onChangeNumericKeyboard(val, onChange)}
                    onBlur={onBlur}
                    error={!!errors.averagePrice?.message}
                  />
                )}
                name="averagePrice"
              />
              <Text variant="TextMedium" tw="text-base">
                {companyCurrency ?? company?.currency}{' '}
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
              onPress={handleSubmit(submit)}
            >
              {t('actions.confirm')}
            </Button>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </Modal>
    </Portal>
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
