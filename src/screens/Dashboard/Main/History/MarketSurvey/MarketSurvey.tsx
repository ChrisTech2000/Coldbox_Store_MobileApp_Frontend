import startCase from 'lodash/startCase';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, Icon, RadioButton, TextInput } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import { MarketSurveyStackRouteProps } from '#navigation/Dashboard/Main/HistoryTabStack/MarketSurveyStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { EUnitOfMeasurement } from '#types/global';

import SelectWithStore, { createSelectStore } from '../../components/SelectWithStore';
import { ELocation, MarketSurveySchema, MarketSurveySchemaType } from './schema';
import MultipleSelectWithStore, {
  createMultipleSelectStore,
} from '../../components/MultipleSelectWithStore';

const useMeasurementStore = createSelectStore<EUnitOfMeasurement>();
const useSpoilageReasonsStore = createMultipleSelectStore<string>();

function MarketSurvey(props: MarketSurveyStackRouteProps<'MarketSurvey'>) {
  const { cropId, companyCurrency } = props.route.params;

  const { t, zodResolver } = useTranslationUtils();
  const { selectedItem: measureUnit } = useMeasurementStore();
  const { selectedItems: spoilageReasons } = useSpoilageReasonsStore();

  const [isUnitModalVisible, setIsUnitModalVisible] = useState<boolean>(false);
  const [isSpoilageReasonsModalVisible, setIsSpoilageReasonsModalVisible] =
    useState<boolean>(false);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<MarketSurveySchemaType>({
    resolver: zodResolver(() => MarketSurveySchema(t)),
  });

  const { data: crops, isLoading: isCropsLoading } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    {}
  );

  const crop = useMemo(() => {
    if (!crops || !crops.length) return;
    return crops.find((c) => c.id === cropId);
  }, [crops, cropId]);

  const onChangeNumericKeyboard = useCallback(
    (newVal: string | number | undefined, onChange: (...event: unknown[]) => void) => {
      const value = Number(newVal);
      if (isNaN(value) || newVal === undefined) return;
      onChange(value);
    },
    []
  );

  const onSubmit: SubmitHandler<MarketSurveySchemaType> = useCallback(() => {}, []);

  useEffect(() => {
    if (measureUnit) setValue('unitOfMeasurement', measureUnit);
  }, [measureUnit]);

  if (isCropsLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ScrollView tw="space-y-4 mx-4 my-2" showsVerticalScrollIndicator={false}>
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
              value={ELocation.FARM}
              tw="flex flex-row-reverse ml-[-10]"
            />
            <RadioButtonItem
              label={t('Dashboard.History.survey.marketSurvey.locations.market')}
              value={ELocation.MARKET}
              tw="flex flex-row-reverse ml-[-10]"
            />
            <RadioButtonItem
              label={t('Dashboard.History.survey.marketSurvey.locations.both')}
              value={ELocation.BOTH}
              tw="flex flex-row-reverse ml-[-10]"
            />
          </RadioButton.Group>
        )}
        name="location"
      />
      {errors.location && (
        <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
          {errors.location.message?.toString()}
        </Text>
      )}

      <Question question={t('Dashboard.History.survey.marketSurvey.priceQuestion')} />
      <View tw={cn('flex flex-row items-end space-x-2', !errors.price && 'mb-4')}>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="h-8 bg-transparent w-20"
              keyboardType="number-pad"
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
      {errors.price && (
        <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">{errors.price.message?.toString()}</Text>
      )}

      <Question question={t('Dashboard.History.survey.marketSurvey.spoiledProducesQuestion')} />
      <View tw={cn('flex flex-row items-end space-x-2', !errors.spoiledProduceAmount && 'mb-4')}>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput
              tw="h-8 bg-transparent w-20"
              keyboardType="number-pad"
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
      {errors.spoiledProduceAmount && (
        <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
          {errors.spoiledProduceAmount.message?.toString()}
        </Text>
      )}

      <Question question={t('Dashboard.History.survey.marketSurvey.spoilageReasonsQuestion')} />
      <View tw={cn('flex flex-row items-end space-x-2', !errors.price && 'mb-4')}>
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
      </View>
      {errors.reasonsForSpoilage && (
        <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
          {errors.reasonsForSpoilage.message?.toString()}
        </Text>
      )}

      <Button
        uppercase
        mode="contained"
        icon="check-circle-outline"
        contentStyle="flex flex-row-reverse"
        onPress={handleSubmit(onSubmit)}
      >
        {t('actions.confirm')}
      </Button>
    </ScrollView>
  );
}

export default withSafeArea(MarketSurvey);

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
