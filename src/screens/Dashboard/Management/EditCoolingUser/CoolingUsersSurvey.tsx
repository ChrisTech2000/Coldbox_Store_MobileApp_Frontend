import React, { useCallback, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import cloneDeep from 'lodash/cloneDeep';

import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { EditCoolingUserStackRouteProps } from '#navigation/Dashboard/Management/EditCoolingUserStack';
import { useManagementStore } from '#stores/management';
import { useTranslationUtils } from '#i18n/utils';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { paperTheme } from '#ui/lib/theme';

import { EExperience, EOccupation } from '#screens/Dashboard/Main/History/MarketSurvey/schema';
import type { FarmerSurveySchemaType } from '#screens/Dashboard/Main/components/FarmerSurveyModal';
import SurveyFormManager from './components/SurveyFormManager';
import OccupationField from './components/SurveyFormFields/OccupationField';
import ExperienceField from './components/SurveyFormFields/ExperienceField';
import CommoditiesField from './components/SurveyFormFields/CommoditiesField';
import AddCommodity from './components/AddCommodity';
import InAppNotifications from '#common/InAppNotifications';

const SWR_CACHE_KEY = 'getCoolingUsersSurveyAggregatedData';
const width = (Dimensions.get('screen').width - 42) / 2;

export type CommoditiesBaseDatums<T = string> = {
  occupation: EOccupation;
  experience: EExperience;
  experienceInMonths: T;
};

export type CommoditySurveyPatcher = (
  ctx: CommoditiesBaseDatums & {
    commoditiesSurveys: CoolingUserSurveyAggregatedData['commoditiesSurveys'];
    farmerId: number;
  }
) => (
  contextualCropId: number
) => (
  formValues: FarmerSurveySchemaType
) => ReturnType<typeof ColdtivateService.updateFarmerSurveys>;

function CoolingUsersSurvey(props: EditCoolingUserStackRouteProps<'CoolingUsersSurvey'>) {
  const { params } = props.route;

  const company = useManagementStore(useShallow((store) => store.company));
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const companyCurrency: string = company?.currency ?? 'NGN';

  const { data, isLoading, refetch } = useApiCall(SWR_CACHE_KEY, _dataFetcher, params.farmerId, {
    skip: !params.farmerId,
    defaultData: undefined,
  });

  const baseDatums = useMemo(
    () => ({
      occupation: data.userType,
      experience: data.experience,
      experienceInMonths: data.experienceInMonths,
    }),
    [data.userType, data.experience, data.experienceInMonths]
  );

  const buildAndSubmitSurvey: CommoditySurveyPatcher = useCallback(
    (ctx) => {
      return (contextualCropId) => {
        return async (values) => {
          const response = await ColdtivateService.updateFarmerSurveys({
            farmer: ctx.farmerId,
            userType: ctx.occupation,
            experience: ctx.experience === EExperience.OLD ? 'yes' : 'no',
            experienceDuration: Number(ctx.experienceInMonths ?? '1'),
            commodities: [
              ...ctx.commoditiesSurveys.filter(
                (commoditySurvey) => commoditySurvey.cropId !== contextualCropId
              ),
              {
                averagePrice: values.averagePrice,
                unit: values.unitOfMeasurement,
                quantityTotal: values.weightDistribution.totalProducedWeekly,
                quantityBelowMarketPrice: values.weightDistribution.quantityLost,
                quantitySelfConsumed: values.weightDistribution.quantitySelfConsumed,
                quantitySold: values.weightDistribution.quantitySold,
                averageSeasonInMonths: null,
                kgInUnit: values.unitaryWeight as number, // :shrug:
                currency: companyCurrency,
                reasonForLoss: values.reasonsForSpoilage,
                cropId: contextualCropId,
              },
            ],
          });

          toast.show(t('Dashboard.Management.EditCoolingUsers.toasts.updateSuccess'), {
            type: 'md_success',
          });

          if (response) await refetch();
          return response;
        };
      };
    },
    [companyCurrency, refetch]
  );

  const commodityPatcher = useCallback(
    (contextualCropId: number) =>
      buildAndSubmitSurvey({
        ...baseDatums,
        commoditiesSurveys: data.commoditiesSurveys,
        farmerId: params.farmerId,
      })(contextualCropId),
    [buildAndSubmitSurvey, baseDatums, data.commoditiesSurveys, params.farmerId]
  );

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="space-y-4 mx-4 pt-2 pb-8">
      <SurveyFormManager
        initialValues={baseDatums}
        onSubmit={async (values): Promise<void> => {
          try {
            const response = await ColdtivateService.updateFarmerSurveys({
              farmer: params.farmerId,
              userType: values.occupation,
              experience: values.experience === EExperience.OLD ? 'yes' : 'no',
              experienceDuration: values.experienceInMonths,
              commodities: cloneDeep(data.surveys),
            });
            if (response) {
              await refetch();
              props.navigation.goBack();
            }
          } catch (exception) {
            console.error(exception);
          }
        }}
      >
        {({ submitHandler, isSubmitting }) => (
          <React.Fragment>
            <OccupationField />
            <ExperienceField />
            <CommoditiesField
              companyCurrency={companyCurrency}
              farmerSurveys={data.surveys}
              commodityPatcher={commodityPatcher}
            />

            <View tw="w-full flex flex-col space-y-4 mt-5">
              <AddCommodity
                companyCurrency={companyCurrency}
                farmerSurveysLength={data.surveys.length}
                commodityPatcher={commodityPatcher}
                crops={data.crops}
              />

              <View tw="w-full flex-row items-center justify-between">
                <Button
                  style={{ width }}
                  mode="contained"
                  onPress={props.navigation.goBack}
                  icon="close-circle-outline"
                  buttonColor={paperTheme.colors.error}
                  uppercase
                >
                  {t('actions.cancel')}
                </Button>
                <Button
                  style={{ width }}
                  mode="contained"
                  onPress={submitHandler}
                  icon={isSubmitting ? undefined : 'check-circle-outline'}
                  uppercase
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    t('actions.confirm')
                  )}
                </Button>
              </View>
            </View>
          </React.Fragment>
        )}
      </SurveyFormManager>
    </View>
  );
}

async function _dataFetcher(farmerId: number) {
  const [allCropsResult, farmerSurveysResult] = await Promise.allSettled([
    ColdtivateService.getAllCrops(),
    ColdtivateService.getFarmerSurveys({ farmerId }),
  ]);

  const crops = allCropsResult.status === 'fulfilled' ? allCropsResult.value : [];
  const surveys =
    farmerSurveysResult.status === 'fulfilled' ? farmerSurveysResult.value : undefined;

  const contextualFarmerSurvey = surveys?.at(0);
  return {
    crops,
    surveys:
      contextualFarmerSurvey?.co?.map((datum) => ({
        ...datum,
        cropName: crops.find((crop) => crop.id === datum.cropId)?.name ?? '',
      })) ?? [],
    commoditiesSurveys: surveys?.flatMap((survey) => survey.co) ?? [],
    userType: (contextualFarmerSurvey?.userType as EOccupation) ?? EOccupation.FARMER,
    experience: contextualFarmerSurvey?.experience ? EExperience.OLD : EExperience.NEW,
    experienceInMonths: contextualFarmerSurvey?.experienceDuration?.toString() ?? '1',
  };
}

export type CoolingUserSurveyAggregatedData = Awaited<ReturnType<typeof _dataFetcher>>;

export default withSafeArea(CoolingUsersSurvey);
