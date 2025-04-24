import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import startCase from 'lodash/startCase';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Icon, RadioButton, TextInput } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { KeyboardAwareScrollView } from '#ui/components/KeyboardAwareScrollView';
import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '#ui/components/MultipleSelectWithStore';
import { RadioButtonItem } from '#ui/components/RadioButton';
import SelectWithStore, { createSelectStore } from '#ui/components/SelectWithStore';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import reportCrash from '#ui/lib/reportCrash';
import { useTranslatedCrops } from '#screens/Dashboard/Management/CompanyDetails/utils';

import MineCart from '#assets/icons/mine-cart.svg';

import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import { HistoryTabStackRoutes } from '#navigation/Dashboard/Main/HistoryTabStack';
import { MarketSurveyStackRouteProps } from '#navigation/Dashboard/Main/HistoryTabStack/MarketSurveyStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { useMarketSurveyStore } from '#stores/marketSurvey';
import {
  ESellingLocation,
  EUnitOfMeasurement,
  MAP_APP_UNIT_OF_MEASUREMENT_TO_API,
} from '#types/global';

import { formatFloat } from '../../components/FarmerSurveyModal/schema';
import { MarketSurveySchema, MarketSurveySchemaType } from './schema';

export const useMeasurementStore = createSelectStore<EUnitOfMeasurement>();
export const useSpoilageReasonsStore = createMultipleSelectStore<string>();

function MarketSurvey(props: MarketSurveyStackRouteProps<'MarketSurvey'>) {
  const { cropId, companyCurrency } = props.route.params;

  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<HistoryTabStackRoutes>>();
  const { t, zodResolver } = useTranslationUtils();
  const measureUnit = useMeasurementStore((store) => store.selectedItem);
  const spoilageReasons = useSpoilageReasonsStore((store) => store.selectedItems);
  const refreshData = useDashboardStore((store) => store.refreshData);

  const { checkoutId } = useMarketSurveyStore();
  const [isUnitModalVisible, setIsUnitModalVisible] = useState<boolean>(false);
  const [isSpoilageReasonsModalVisible, setIsSpoilageReasonsModalVisible] =
    useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MarketSurveySchemaType>({
    resolver: zodResolver(() => MarketSurveySchema(t)),
    defaultValues: {
      unitOfMeasurement: EUnitOfMeasurement.KILOGRAMS,
      unitaryWeight: 25,
    },
  });

  const { data: cropsResult, isLoading: isCropsLoading } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined
  );

  const crops = useTranslatedCrops(cropsResult);

  const crop = useMemo(() => {
    if (!crops || !crops.length) return;
    return crops.find((c) => c.id === cropId);
  }, [crops, cropId]);

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

  const onSubmit: SubmitHandler<MarketSurveySchemaType> = useCallback(
    async (values) => {
      try {
        const result = await ColdtivateService.addMarketSurvey({
          crop: crop?.id as number,
          checkout: checkoutId as number,
          sellingPlace: values.location,
          ...(values.location === ESellingLocation.BOTH ? { market: null } : { localMarket: null }),
          price: Number(formatFloat(values.price)),
          reasonForLoss: values.reasonsForSpoilage,
          sellingUnit: MAP_APP_UNIT_OF_MEASUREMENT_TO_API[values.unitOfMeasurement],
          sellingDate: null,
          kgInUnit: values.unitaryWeight,
          loss: Number(formatFloat(values.spoiledProduceAmount)),
          currency: companyCurrency ?? '',
        });

        if (result) {
          refreshData.forEach((fn) => fn());
          rootNavigation.navigate('RootHistoryTabStack');
        }
      } catch (exception) {
        reportCrash(exception as Error);
      }
    },
    [crop, checkoutId, companyCurrency]
  );

  useEffect(() => {
    if (measureUnit) setValue('unitOfMeasurement', measureUnit);
  }, [measureUnit]);

  useEffect(() => {
    if (spoilageReasons) setValue('reasonsForSpoilage', spoilageReasons);
  }, [spoilageReasons]);

  if (isCropsLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView tw="space-y-4 mx-4 my-2" showsVerticalScrollIndicator={false}>
      <View tw="w-[70%] flex flex-row space-x-2 items-center mb-2">
        <FastImage
          resizeMode="contain"
          tw="w-20 h-20"
          source={{ uri: `${API_BASE_URL}media/${crop?.image}` }}
        />
        <Text variant="TextBold" tw="text-lg font-bold">
          {t('Dashboard.History.survey.marketSurvey.title', { crop: crop?.name })}
        </Text>
      </View>

      <Question question={t('Dashboard.History.survey.marketSurvey.locationQuestion')} />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioButton.Group value={value} onValueChange={onChange}>
            <RadioButtonItem
              label={t('Dashboard.History.survey.marketSurvey.locations.farm')}
              value={ESellingLocation.FARM}
              tw="flex flex-row-reverse ml-[-10]"
            />
            <RadioButtonItem
              label={t('Dashboard.History.survey.marketSurvey.locations.market')}
              value={ESellingLocation.MARKET}
              tw="flex flex-row-reverse ml-[-10]"
            />
            <RadioButtonItem
              label={t('Dashboard.History.survey.marketSurvey.locations.both')}
              value={ESellingLocation.BOTH}
              tw="flex flex-row-reverse ml-[-10]"
            />
          </RadioButton.Group>
        )}
        name="location"
      />
      {errors.location ? (
        <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
          {errors.location.message?.toString()}
        </Text>
      ) : null}

      <Question question={t('Dashboard.History.survey.marketSurvey.priceQuestion')} />
      <View
        tw={cn(
          'flex flex-row items-end space-x-2',
          (!errors.price || measureUnit === EUnitOfMeasurement.KILOGRAMS) && 'mb-4'
        )}
      >
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="h-8 bg-transparent w-20"
              keyboardType="decimal-pad"
              value={value?.toString()}
              onChangeText={(val) => onChangeNumericKeyboard(val, onChange)}
              onBlur={onBlur}
              error={!!errors.price?.message}
            />
          )}
          name="price"
        />
        <Text variant="TextMedium" tw="text-base">
          {companyCurrency} /
        </Text>
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
          itemName={(item) => t(`Dashboard.CrateManagement.FarmerSurvey.modal.unit.${item}`)}
          setIsModalVisible={setIsUnitModalVisible}
          useSelectStore={useMeasurementStore}
          label={startCase(measureUnit ?? '')}
        />
      </View>
      {errors.price ? (
        <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">{errors.price.message?.toString()}</Text>
      ) : null}
      {measureUnit !== EUnitOfMeasurement.KILOGRAMS ? (
        <View tw="mb-4 flex flex-row items-end space-x-2">
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
                  onPress={() => onChangeNumericKeyboard(!value ? 0 : Number(value) - 1, onChange)}
                  tw="ml-2"
                >
                  <Icon source="minus" size={20} color={colors.green.primary} />
                </TouchableOpacity>
                <TextInput
                  tw="h-8 bg-transparent"
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
      ) : null}

      <Question question={t('Dashboard.History.survey.marketSurvey.spoiledProducesQuestion')} />
      <View tw={cn('flex flex-row items-end space-x-2', !errors.spoiledProduceAmount && 'mb-4')}>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="h-8 bg-transparent w-20"
              keyboardType="decimal-pad"
              value={value?.toString()}
              onChangeText={(val) => onChangeNumericKeyboard(val, onChange)}
              onBlur={onBlur}
              error={!!errors.price?.message}
            />
          )}
          name="spoiledProduceAmount"
        />
        <Text variant="TextMedium" tw="text-base">
          {measureUnit}
        </Text>
      </View>
      {errors.spoiledProduceAmount ? (
        <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
          {errors.spoiledProduceAmount.message?.toString()}
        </Text>
      ) : null}

      <Question question={t('Dashboard.History.survey.marketSurvey.spoilageReasonsQuestion')} />
      <View tw={cn('space-y-2', !errors.price && 'mb-4')}>
        <MultipleSelectWithStore<string>
          datums={[
            t('Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.improperHarvest'),
            t('Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.inappropriateStorage'),
            t('Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.overproduction'),
            t('Dashboard.CrateManagement.FarmerSurvey.modal.reasonsForLoss.transportationDamage'),
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
              : t('Dashboard.CrateManagement.FarmerSurvey.modal.selectSpoilageReasonsPlaceholder')
          }
        />
        {errors.reasonsForSpoilage ? (
          <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
            {errors.reasonsForSpoilage.message?.toString()}
          </Text>
        ) : null}
      </View>

      <Button
        uppercase
        mode="contained"
        icon="check-circle-outline"
        contentStyle="flex flex-row-reverse"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {t('actions.confirm')}
      </Button>
    </KeyboardAwareScrollView>
  );
}

export default withSafeArea(
  withErrorBoundary(MarketSurvey, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);

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
