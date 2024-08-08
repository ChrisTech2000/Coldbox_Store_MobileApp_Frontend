import React, { useRef } from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import cloneDeep from 'lodash/cloneDeep';

import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { EditCoolingUserStackRouteProps } from '#navigation/Dashboard/Management/EditCoolingUserStack';
import { useApiCall } from '#services/hooks/useAPiCall';
import ColdtivateService from '#services/ColdtivateService';
import { useTranslationUtils } from '#i18n/utils';
import { paperTheme } from '#ui/lib/theme';

import { EExperience, EOccupation } from '#screens/Dashboard/Main/History/MarketSurvey/schema';
import SurveyFormManager, { type SurveyFormValues } from './components/SurveyFormManager';
import OccupationField from './components/SurveyFormFields/OccupationField';
import ExperienceField from './components/SurveyFormFields/ExperienceField';
import CommoditiesField from './components/SurveyFormFields/CommoditiesField';
import AddCommodity from './components/AddCommodity';

const SWR_CACHE_KEY = 'getCoolingUsersSurveyAggregatedData';
const width = (Dimensions.get('screen').width - 42) / 2;

function CoolingUsersSurvey(props: EditCoolingUserStackRouteProps<'CoolingUsersSurvey'>) {
  const { params } = props.route;

  const initialValues = useRef<SurveyFormValues | undefined>(undefined);

  const { data, isLoading } = useApiCall(SWR_CACHE_KEY, _dataFetcher, params.farmerId, {
    skip: !params.farmerId,
    defaultData: undefined,
  });

  const { t } = useTranslationUtils();

  if (isLoading) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  if (!initialValues.current) {
    initialValues.current = {
      occupation: data.userType,
      experience: data.experience,
      experienceInMonths: data.experienceInMonths,
    };
  }

  return (
    <View tw="space-y-4 mx-4 pt-2 pb-8">
      <SurveyFormManager
        initialValues={initialValues.current}
        onSubmit={async (values): Promise<void> => {
          try {
            const result = await ColdtivateService.updateFarmerSurveys({
              farmer: params.farmerId,
              userType: values.occupation,
              experience: values.experience === EExperience.OLD ? 'yes' : 'no',
              experienceDuration: values.experienceInMonths,
              commodities: cloneDeep(data.surveys),
            });

            if (typeof result !== 'undefined') props.navigation.goBack();
          } catch (exception) {
            console.error(exception);
          }
        }}
      >
        {({ submitHandler, isSubmitting }) => (
          <React.Fragment>
            <OccupationField />
            <ExperienceField />
            <CommoditiesField farmerSurveys={data.surveys} />

            <View tw="w-full flex flex-col space-y-4 mt-5">
              <AddCommodity farmerSurveysLength={data.surveys.length} crops={data.crops} />

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
    farmerSurveysResult.status === 'fulfilled' ? farmerSurveysResult.value?.at(0) : undefined;

  return {
    crops,
    surveys:
      surveys?.co?.map((datum) => ({
        ...datum,
        cropName: crops.find((crop) => crop.id === datum.cropId)?.name ?? '',
      })) ?? [],
    userType: (surveys?.userType as EOccupation) ?? EOccupation.FARMER,
    experience: surveys?.experience ? EExperience.OLD : EExperience.NEW,
    experienceInMonths: surveys?.experienceDuration?.toString() ?? '1',
  };
}

export type CoolingUserSurveyAggregatedData = Awaited<ReturnType<typeof _dataFetcher>>;

export default withSafeArea(CoolingUsersSurvey);
