import cloneDeep from 'lodash/cloneDeep';
import React, { useCallback, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { ScrollView } from '#ui/components/ScrollView';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';

import InAppNotifications from '#common/InAppNotifications';
import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import type { EditCoolingUserStackRouteProps } from '#navigation/Dashboard/Management/EditCoolingUserStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useManagementStore } from '#stores/management';
import reportCrash from '#ui/lib/reportCrash';
import type { TranslationLocales } from '#i18n/constants';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import { EExperience, EOccupation } from '#screens/Dashboard/Main/History/MarketSurvey/schema';
import type { FarmerSurveySchemaType } from '#screens/Dashboard/Main/components/FarmerSurveyModal';
import { formatFloat } from '#screens/Dashboard/Main/components/FarmerSurveyModal/schema';

import AddCommodity from './components/AddCommodity';
import CommoditiesField from './components/SurveyFormFields/CommoditiesField';
import ExperienceField from './components/SurveyFormFields/ExperienceField';
import OccupationField from './components/SurveyFormFields/OccupationField';
import SurveyFormManager from './components/SurveyFormManager';

const SWR_CACHE_KEY = 'getCoolingUsersSurveyAggregatedData';
const width = (Dimensions.get('window').width - 42) / 2;

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

  const companyCurrency: string = company?.currency ?? DEFAULT_CURRENCY_CODE;
  const locale = LanguageManager.read();

  const { data, isLoading, refetch } = useApiCall(
    SWR_CACHE_KEY,
    _dataFetcher,
    {
      farmerId: params.farmerId,
      country: company?.country,
      locale,
    },
    {
      skip: !params.farmerId,
      defaultData: undefined,
    }
  );

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
                averagePrice: Number(formatFloat(values.averagePrice)),
                unit: values.unitOfMeasurement,
                quantityTotal: Number(formatFloat(values.weightDistribution.totalProducedWeekly)),
                quantityBelowMarketPrice: Number(
                  formatFloat(values.weightDistribution.quantityLost)
                ),
                quantitySelfConsumed: Number(
                  formatFloat(values.weightDistribution.quantitySelfConsumed)
                ),
                quantitySold: Number(formatFloat(values.weightDistribution.quantitySold)),
                averageSeasonInMonths: null,
                kgInUnit: Number(formatFloat(values.unitaryWeight as string)), // :shrug:
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

  function redirect() {
    if (typeof params.redirectTo === 'undefined') props.navigation.goBack();
    // eslint-disable-next-line
    else props.navigation.navigate(params.redirectTo as any);
  }

  return (
    <View tw="flex-1 pt-4">
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
              redirect();
            }
          } catch (exception) {
            reportCrash(exception as Error);
          }
        }}
      >
        {({ submitHandler, isSubmitting }) => (
          <React.Fragment>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle="px-4 pb-28">
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
                  farmerSurveysLength={data?.surveys?.length ?? 0}
                  commodityPatcher={commodityPatcher}
                  crops={data.crops}
                />
              </View>
            </ScrollView>

            <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-5 pt-4 absolute bottom-0 left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
              <Button
                style={{ width }}
                mode="contained"
                onPress={(evt) => {
                  evt?.stopPropagation();
                  redirect();
                }}
                icon="close-circle-outline"
                buttonColor={paperTheme.colors.error}
                uppercase
              >
                {typeof params.redirectTo === 'undefined'
                  ? t('actions.cancel')
                  : t('Dashboard.Management.EditCoolingUsers.actions.completeLater')}
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
            </HideWithKeyboardView>
          </React.Fragment>
        )}
      </SurveyFormManager>
    </View>
  );
}

async function _dataFetcher(opts: {
  country?: string;
  locale: TranslationLocales;
  farmerId: number;
}) {
  const [allCropsResult, farmerSurveysResult] = await Promise.allSettled([
    ColdtivateService.getAllCrops(),
    ColdtivateService.getFarmerSurveys({ farmerId: opts.farmerId }),
  ]);

  const allCrops = allCropsResult.status === 'fulfilled' ? allCropsResult.value : [];
  const surveys =
    farmerSurveysResult.status === 'fulfilled' ? farmerSurveysResult.value : undefined;

  const { buildMap, find } = cropTranslationLookup();
  const lookupMap = buildMap();
  const crops = cloneDeep(allCrops)
    .map((crop) => {
      crop.name = find(lookupMap, {
        name: crop.name,
        country: opts.country,
        locale: opts.locale,
      });
      return crop;
    })
    .sort((a, b) => a.name.localeCompare(b.name, opts.locale, { sensitivity: 'base' }));

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

export default withSafeArea(CoolingUsersSurvey, ['bottom'], true);
