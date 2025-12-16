import startCase from 'lodash/startCase';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Platform,
  TextInput as RNTextInput,
} from 'react-native';
import { Dialog, Divider, Icon, Portal, TextInput } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import MineCart from '#assets/icons/mine-cart.svg';

import { Button } from '#ui/components/Button';
import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '#ui/components/MultipleSelectWithStore';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { ManagementCompany, useManagementStore } from '#stores/management';
import type { GetAllCropsResponse } from '#types/api.responses';
import { type Crop, EUnitOfMeasurement } from '#types/global';
import reportCrash from '#ui/lib/reportCrash';
import { cn } from '#ui/lib/cn';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';
import { useDashboardStore } from '#stores/dashboard';

import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import { defaultValues as _defaultValues, FarmerSurveySchema } from './schema';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-5',
  ios: 'mx-5',
});

export type FarmerSurveySchemaType = {
  weightDistribution: {
    totalProducedWeekly: string;
    quantitySelfConsumed: string;
    quantitySold: string;
    quantityLost: string;
  };
  unitOfMeasurement: EUnitOfMeasurement;
  unitaryWeight: string | undefined;
  reasonsForSpoilage: string[];
  averagePrice: string;
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

const MODAL_MAX_HEIGHT = Dimensions.get('window').height * 0.7;

const useMeasurementStore = createSelectStore<EUnitOfMeasurement>();
const useSpoilageReasonsStore = createMultipleSelectStore<string>();
const instantiateCropStore = (initialState?: Crop | GetAllCropsResponse) =>
  createSelectStore(initialState);

export const farmerSurveyStores = [useMeasurementStore, useSpoilageReasonsStore];

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

  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));
  const farmerCountry = useDashboardStore(useShallow((store) => store.farmerCountry));

  const locale = LanguageManager.read();

  const useCropStore = useMemo(
    () => instantiateCropStore(props.initialCropSelection),
    [isModalVisible]
  );

  const { selectedItem: measureUnit } = useMeasurementStore();
  const { selectedItem: crop } = useCropStore();
  const { selectedItems: spoilageReasons, onSelect: onSelectSpoilageReasons } =
    useSpoilageReasonsStore();

  const { cropTranslations, selectedItemTranslation, sortedCrops } = useMemo(() => {
    const datums = cropSelectionAvailable?.crops ?? [];
    const record: Record<number, string> = {};

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    for (const datum of datums) {
      if (!record[datum.id]) {
        record[datum.id] = find(translationMap, {
          name: datum.name,
          country: companyCountry || farmerCountry || undefined,
          locale,
        });
      }
    }

    const sorted = [...datums].sort((a, b) => {
      const nameA = record[a.id] || a.name;
      const nameB = record[b.id] || b.name;
      return nameA.localeCompare(nameB, locale, { sensitivity: 'base' });
    });

    return {
      cropTranslations: record,
      selectedItemTranslation: find(translationMap, {
        name: crop?.name ?? '',
        country: companyCountry || farmerCountry || undefined,
        locale,
      }),
      sortedCrops: sorted,
    };
  }, [cropSelectionAvailable?.crops, companyCountry, farmerCountry, locale, crop]);

  const selfConsumedInputRef = useRef<RNTextInput>(null);
  const soldInputRef = useRef<RNTextInput>(null);
  const lostInputRef = useRef<RNTextInput>(null);

  const [isUnitModalVisible, setIsUnitModalVisible] = useState<boolean>(false);
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [isSpoilageReasonsModalVisible, setIsSpoilageReasonsModalVisible] =
    useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FarmerSurveySchemaType>({
    resolver: zodResolver(() => FarmerSurveySchema(t)),
    defaultValues: {
      ...(defaultValues ?? _defaultValues),
      cropSelection: !!cropSelectionAvailable,
    },
  });

  const submit: SubmitHandler<FarmerSurveySchemaType> = useCallback((values) => {
    onSelectSpoilageReasons([]);
    try {
      onSubmit(values);
    } catch (exception) {
      reportCrash(exception as Error);
    }
  }, []);

  useEffect(() => {
    if (measureUnit) setValue('unitOfMeasurement', measureUnit, { shouldDirty: true });
  }, [measureUnit]);

  useEffect(() => {
    if (spoilageReasons) setValue('reasonsForSpoilage', spoilageReasons, { shouldDirty: true });
  }, [spoilageReasons]);

  useEffect(() => {
    if (crop) setValue('crop', crop, { shouldDirty: true });
  }, [crop]);

  useEffect(() => {
    if (defaultValues?.reasonsForSpoilage?.length) {
      onSelectSpoilageReasons(defaultValues.reasonsForSpoilage);
    }
  }, [defaultValues?.reasonsForSpoilage]);

  return (
    <Portal>
      <Dialog
        visible={isModalVisible}
        onDismiss={onDismiss}
        style={{ backgroundColor: 'white', maxHeight: MODAL_MAX_HEIGHT }}
      >
        {typeof cropSelectionAvailable !== 'undefined' ? (
          <Dialog.Title>{cropSelectionAvailable.title}</Dialog.Title>
        ) : null}
        <Dialog.ScrollArea tw="px-0">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView
              tw={cn('pt-2 space-y-2', HORIZONTAL_SPACING)}
              showsVerticalScrollIndicator={false}
            >
              {cropSelectionAvailable && (
                <View tw="space-y-2">
                  <View tw="flex flex-row items-center justify-between space-x-1">
                    <Text variant="TextMedium" tw="text-lg">
                      {t('Dashboard.CrateManagement.FarmerSurvey.modal.commodityShortlist')}
                    </Text>
                    <SelectWithStore<Crop | GetAllCropsResponse>
                      datums={sortedCrops}
                      isModalVisible={isCropModalVisible}
                      itemName={(item) => cropTranslations?.[item.id] || item?.name || ''}
                      setIsModalVisible={setIsCropModalVisible}
                      useSelectStore={useCropStore}
                      label={selectedItemTranslation ?? ''}
                      modalHeader={t('Dashboard.Management.CompanyDetails.headings.commodity')}
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
                  crop: _cropName ?? selectedItemTranslation ?? '__',
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
                        onChangeText={(val) => onChange(val, onChange)}
                        onBlur={onBlur}
                        keyboardType="decimal-pad"
                        error={!!errors.weightDistribution?.totalProducedWeekly?.message}
                        disabled={isSubmitting}
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
                            onPress={() => onChange(!value ? '0' : `${Number(value) - 1}`)}
                            tw="ml-2"
                            disabled={isSubmitting}
                          >
                            <Icon source="minus" size={20} color={colors.green.primary} />
                          </TouchableOpacity>
                          <TextInput
                            tw="h-10 bg-transparent"
                            keyboardType="number-pad"
                            value={value?.toString()}
                            onChangeText={(val) => onChange(val)}
                            onBlur={onBlur}
                            error={!!errors.unitaryWeight?.message}
                            disabled={isSubmitting}
                          />
                          <TouchableOpacity
                            onPress={() => `${Number(onChange(Number(value ?? 0) + 1, onChange))}`}
                            tw="mr-2"
                            disabled={isSubmitting}
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
                <TouchableOpacity
                  tw="w-1/3 justify-between"
                  activeOpacity={0.7}
                  onPress={() => {
                    selfConsumedInputRef.current?.focus();
                  }}
                >
                  <Text variant="TextMedium" tw="text-base">
                    {t('Dashboard.CrateManagement.FarmerSurvey.modal.selfConsumed', {
                      unit: measureUnit,
                    })}
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        ref={selfConsumedInputRef}
                        tw="h-10 bg-transparent"
                        keyboardType="decimal-pad"
                        value={value?.toString()}
                        onChangeText={(val) => onChange(val, onChange)}
                        onBlur={onBlur}
                        disabled={isSubmitting}
                      />
                    )}
                    name="weightDistribution.quantitySelfConsumed"
                  />
                </TouchableOpacity>
                <Divider tw="h-full w-[0.25%] bg-gray-400" />
                <TouchableOpacity
                  tw="w-1/3 flex flex-col justify-between"
                  activeOpacity={0.7}
                  onPress={() => {
                    soldInputRef.current?.focus();
                  }}
                >
                  <Text variant="TextMedium" tw="text-base">
                    {t('Dashboard.CrateManagement.FarmerSurvey.modal.sold', { unit: measureUnit })}
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        ref={soldInputRef}
                        tw="h-10 bg-transparent"
                        keyboardType="decimal-pad"
                        value={value?.toString()}
                        onChangeText={(val) => onChange(val, onChange)}
                        onBlur={onBlur}
                        disabled={isSubmitting}
                      />
                    )}
                    name="weightDistribution.quantitySold"
                  />
                </TouchableOpacity>
                <Divider tw="h-full w-[0.25%] bg-gray-400" />
                <TouchableOpacity
                  tw="w-1/3 justify-between"
                  activeOpacity={0.7}
                  onPress={() => {
                    lostInputRef.current?.focus();
                  }}
                >
                  <Text variant="TextMedium" tw="text-base">
                    {t('Dashboard.CrateManagement.FarmerSurvey.modal.lost', { unit: measureUnit })}
                  </Text>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        ref={lostInputRef}
                        tw="h-10 bg-transparent"
                        value={value?.toString()}
                        keyboardType="decimal-pad"
                        onChangeText={(val) => onChange(val, onChange)}
                        onBlur={onBlur}
                        disabled={isSubmitting}
                      />
                    )}
                    name="weightDistribution.quantityLost"
                  />
                </TouchableOpacity>
              </View>
              {errors.weightDistribution?.quantitySelfConsumed ? (
                <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
                  {errors.weightDistribution.quantitySelfConsumed.message?.toString()}
                </Text>
              ) : null}

              {/** SPOILAGE */}
              <Question
                question={t('Dashboard.CrateManagement.FarmerSurvey.modal.cropSpoilageQuestion')}
              />
              <View tw="my-2">
                <MultipleSelectWithStore<string>
                  datums={[
                    t(
                      'Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.improperHarvest'
                    ),
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
                  crop: _cropName ?? selectedItemTranslation ?? '__',
                })}
              />
              <View tw="pb-8 space-y-1.5">
                <View tw="flex flex-row items-end space-x-2">
                  <Controller
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        tw="h-12 bg-transparent w-20"
                        label={t('Dashboard.CrateManagement.FarmerSurvey.modal.priceLabel')}
                        keyboardType="decimal-pad"
                        value={value?.toString()}
                        onChangeText={(val) => onChange(val, onChange)}
                        onBlur={onBlur}
                        error={!!errors.averagePrice?.message}
                        disabled={isSubmitting}
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
                {errors.averagePrice?.message && (
                  <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
                    {errors.averagePrice.message}
                  </Text>
                )}
              </View>
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button
            mode="contained"
            icon="check-circle-outline"
            contentStyle="flex flex-row-reverse"
            onPress={handleSubmit(submit)}
            tw="w-2/5"
            disabled={isSubmitting}
          >
            {t('actions.confirm')}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

function Question({ question }: { question: string }) {
  return (
    <View tw="flex flex-row space-x-1 mt-1.5">
      <View tw="mt-2">
        <Icon source="circle" size={6} />
      </View>
      <Text variant="TextBold" tw="text-base font-bold">
        {question}
      </Text>
    </View>
  );
}
