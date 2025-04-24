import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Divider, Icon, RadioButton } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { Input } from '#ui/components/Input';
import { RadioButtonItem } from '#ui/components/RadioButton';
import { Text } from '#ui/components/Text';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import reportCrash from '#ui/lib/reportCrash';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { HistoryTabStackRoutes } from '#navigation/Dashboard/Main/HistoryTabStack';
import { MarketSurveyStackRouteProps } from '#navigation/Dashboard/Main/HistoryTabStack/MarketSurveyStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useMarketSurveyStore } from '#stores/marketSurvey';
import { useTranslatedCrops } from '#screens/Dashboard/Management/CompanyDetails/utils';

import { FarmersSurveyModal, FarmerSurveySchemaType } from '../../components/FarmerSurveyModal';
import { BaseSurveySchema, EExperience, EOccupation, type BaseSurveySchemaType } from './schema';
import { sanitizeString } from './utils';
import { formatFloat } from '../../components/FarmerSurveyModal/schema';

function BaseSurvey(props: MarketSurveyStackRouteProps<'BaseSurvey'>) {
  const { companyCurrency } = props.route.params;

  const colors = useTailwindColors();
  const rootNavigation = useNavigation<NativeStackNavigationProp<HistoryTabStackRoutes>>();

  const { t, zodResolver } = useTranslationUtils();
  const { surveys, farmerId, refetchSurveys, resetMarketSurveyStore } = useMarketSurveyStore();

  const { data: cropsResult, isLoading: isCropsLoading } = useApiCall(
    'getAllCrops',
    ColdtivateService.getAllCrops,
    undefined
  );

  const crops = useTranslatedCrops(cropsResult);

  const [openFarmersSurveyModal, setOpenFarmersSurveyModal] = useState<number | null>(null);
  const [isAddCommodityModalOpen, setIsAddCommodityModalOpen] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BaseSurveySchemaType>({
    resolver: zodResolver(() => BaseSurveySchema(t)),
    defaultValues: surveys[0]
      ? {
          occupation: surveys[0].userType as EOccupation,
          experience: surveys[0].experience ? EExperience.OLD : EExperience.NEW,
          experienceInMonths: surveys[0].experienceDuration.toString(),
        }
      : {},
  });

  const experience = watch('experience');

  const farmerSurveys = useMemo(() => {
    if (!crops?.length || !surveys.length) return [];

    return surveys[0].co.map((co) => ({
      ...co,
      cropName: crops.find((c) => c.id === co.cropId)?.name ?? '',
    }));
  }, [surveys, crops]);

  const onSubmit: SubmitHandler<BaseSurveySchemaType> = useCallback(
    async (values) => {
      try {
        const result = await ColdtivateService.updateFarmerSurveys({
          farmer: farmerId as number,
          userType: values.occupation,
          experience: values.experience === EExperience.OLD ? 'yes' : 'no',
          experienceDuration: Number(values.experienceInMonths ?? 0),
          commodities: [...farmerSurveys],
        });

        if (result) {
          rootNavigation.navigate('RootHistoryTabStack');
          resetMarketSurveyStore();
          refetchSurveys?.();
        }
      } catch (exception) {
        reportCrash(exception as Error);
      }
    },
    [farmerId, farmerSurveys, refetchSurveys]
  );

  const onSubmitSurveyWrapper = useCallback(
    (adding?: boolean): SubmitHandler<FarmerSurveySchemaType> => {
      return async (values) => {
        let cropId: number;

        if (adding) {
          if (!values.crop) return;
          cropId = values.crop.id;
        } else {
          if (openFarmersSurveyModal === null) return;
          cropId = farmerSurveys[openFarmersSurveyModal].cropId;
        }

        const result = await ColdtivateService.updateFarmerSurveys({
          farmer: farmerId as number,
          userType: surveys[0]?.userType ?? '',
          experience: !!surveys[0]?.experience,
          experienceDuration: surveys[0]?.experienceDuration ?? 0,
          commodities: [
            ...(surveys ?? [])
              .flatMap((survey) => survey.co)
              .filter((survey) => survey.cropId !== cropId),
            {
              averagePrice: Number(formatFloat(values.averagePrice)),
              unit: values.unitOfMeasurement,
              quantityTotal: Number(formatFloat(values.weightDistribution.totalProducedWeekly)),
              quantityBelowMarketPrice: Number(formatFloat(values.weightDistribution.quantityLost)),
              quantitySelfConsumed: Number(
                formatFloat(values.weightDistribution.quantitySelfConsumed)
              ),
              quantitySold: Number(formatFloat(values.weightDistribution.quantitySold)),
              averageSeasonInMonths: null,
              kgInUnit: Number(formatFloat(values.unitaryWeight as string)),
              currency: companyCurrency ?? '',
              reasonForLoss: values.reasonsForSpoilage,
              cropId,
            },
          ],
        });

        if (result) {
          refetchSurveys?.();
          if (adding) setIsAddCommodityModalOpen(false);
          else setOpenFarmersSurveyModal(null);
        }
      };
    },
    [surveys, farmerSurveys, companyCurrency, openFarmersSurveyModal, refetchSurveys, farmerId]
  );

  if (isCropsLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1 space-y-4 m-4">
      <ScrollView tw="space-y-4" showsVerticalScrollIndicator={false}>
        <View>
          <View tw="flex flex-row space-x-2 items-center">
            <Icon source="account-outline" size={25} color={colors.green.primary} />
            <Text variant="TextBold" tw="text-lg font-bold">
              {t('Dashboard.History.survey.baseSurvey.occupationQuestion')}
            </Text>
          </View>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioButton.Group value={value} onValueChange={onChange}>
                <RadioButtonItem
                  label={t('Dashboard.History.survey.baseSurvey.occupationFarmer')}
                  value={EOccupation.FARMER}
                  tw="flex flex-row-reverse ml-[-10]"
                />
                <RadioButtonItem
                  label={t('Dashboard.History.survey.baseSurvey.occupationTrader')}
                  value={EOccupation.TRADER}
                  tw="flex flex-row-reverse ml-[-10]"
                />
              </RadioButton.Group>
            )}
            name="occupation"
          />
          {errors.occupation ? (
            <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
              {errors.occupation.message?.toString()}
            </Text>
          ) : null}
        </View>

        <View>
          <View tw="flex flex-row space-x-2 items-center">
            <Icon source="snowflake" size={25} color={colors.green.primary} />
            <Text variant="TextBold" tw="text-lg font-bold">
              {t('Dashboard.History.survey.baseSurvey.usageQuestion')}
            </Text>
          </View>

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioButton.Group value={`${value}`} onValueChange={onChange}>
                <RadioButtonItem
                  label={t('Dashboard.History.survey.baseSurvey.newUser')}
                  value={EExperience.NEW}
                  tw="flex flex-row-reverse ml-[-10]"
                />
                <RadioButtonItem
                  label={t('Dashboard.History.survey.baseSurvey.oldUser')}
                  value={EExperience.OLD}
                  tw="flex flex-row-reverse ml-[-10]"
                />
              </RadioButton.Group>
            )}
            name="experience"
          />
          {errors.experience ? (
            <Text tw="text-xs text-red-600 mb-2 pl-3 w-[95%]">
              {errors.experience.message?.toString()}
            </Text>
          ) : null}

          {experience === EExperience.OLD ? (
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  tw="w-full text-base bg-transparent rounded-sm h-12 truncate"
                  onChangeText={onChange}
                  keyboardType="number-pad"
                  value={value ?? 0}
                  label={'For how many months have you used the room?'}
                  error={errors.experienceInMonths}
                />
              )}
              name="experienceInMonths"
            />
          ) : null}
        </View>

        <View tw="space-y-2 mb-2">
          <View tw="flex flex-row space-x-2 items-center">
            <Icon source="shopping-outline" size={25} color={colors.green.primary} />
            <Text variant="TextBold" tw="text-lg font-bold">
              {t('Dashboard.History.survey.baseSurvey.mostUsedCommoditiesQuestion')}
            </Text>
          </View>

          <Text variant="TextMedium" tw="text-lg">
            {t('Dashboard.History.survey.baseSurvey.fillCommoditiesMessage')}
          </Text>

          <FlatList
            data={farmerSurveys}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item: survey, index }) => (
              <TouchableOpacity onPress={() => setOpenFarmersSurveyModal(index)}>
                <View tw="flex flex-row items-center justify-between space-y-2">
                  <Text variant="TextMedium" tw="text-lg">
                    {t('Dashboard.History.survey.baseSurvey.commodity')} {index + 1}
                  </Text>
                  <View tw="flex flex-row space-x-2 items-center">
                    <Text variant="TextMedium" tw="text-lg">
                      {survey.cropName}
                    </Text>
                    <Icon
                      source={LanguageManager.isRTL ? 'chevron-left' : 'chevron-right'}
                      size={20}
                    />
                  </View>
                </View>
                {openFarmersSurveyModal === index ? (
                  <FarmersSurveyModal
                    companyCurrency={companyCurrency}
                    cropName={survey.cropName}
                    isModalVisible={openFarmersSurveyModal === index}
                    onDismiss={() => setOpenFarmersSurveyModal(null)}
                    onSubmit={onSubmitSurveyWrapper()}
                    defaultValues={{
                      weightDistribution: {
                        totalProducedWeekly: survey.quantityTotal.toString(),
                        quantitySelfConsumed: survey.quantitySelfConsumed.toString(),
                        quantitySold: survey.quantitySold.toString(),
                        quantityLost: survey.quantityBelowMarketPrice.toString(),
                      },
                      unitOfMeasurement: survey.unit,
                      unitaryWeight: survey.kgInUnit.toString(),
                      reasonsForSpoilage: sanitizeString(survey.reasonForLoss as string),
                      averagePrice: survey.averagePrice.toString(),
                    }}
                  />
                ) : null}
                <Divider tw="bg-gray-400" />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
      <Button
        mode="outlined"
        icon="plus-circle-outline"
        contentStyle="flex flex-row-reverse"
        uppercase
        tw="border-green-primary"
        onPress={() => setIsAddCommodityModalOpen(true)}
        disabled={isSubmitting}
      >
        {t('Dashboard.History.survey.baseSurvey.addCommodityButton')}
      </Button>

      {isAddCommodityModalOpen && (
        <FarmersSurveyModal
          companyCurrency={companyCurrency}
          cropSelectionAvailable={{
            title: t('Dashboard.History.survey.baseSurvey.newCommodity', {
              index: farmerSurveys.length + 1,
            }),
            crops,
          }}
          isModalVisible={isAddCommodityModalOpen}
          onDismiss={() => setIsAddCommodityModalOpen(false)}
          onSubmit={onSubmitSurveyWrapper(true)}
        />
      )}

      <View tw="flex flex-row space-x-2 justify-center">
        <Button
          mode="outlined"
          icon="close-circle-outline"
          contentStyle="flex flex-row-reverse"
          labelStyle="text-red-400"
          uppercase
          tw="border-red-400"
          onPress={props.navigation.goBack}
          disabled={isSubmitting}
        >
          {t('actions.cancel')}
        </Button>
        <Button
          mode="contained"
          icon="check-circle-outline"
          contentStyle="flex flex-row-reverse"
          uppercase
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {t('actions.confirm')}
        </Button>
      </View>
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(BaseSurvey, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
