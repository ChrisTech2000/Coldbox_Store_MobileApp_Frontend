import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, DataTable, Icon } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import FarmerImpactService from '#services/FarmerImpactService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useDashboardStore } from '#stores/dashboard';
import { useMarketSurveyStore } from '#stores/marketSurvey';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { SkiaShadow } from '#ui/primitives/SkiaShadow';

import { DashboardMainRoutes } from 'navigation/Dashboard/Main';
import { DownChange, ImpactSection, UpChange } from '../../components/ImpactContent';
import { SectionAccordion } from '../../components/SectionAccordion';
import { useFarmerAnalyticsData } from '../store';

type Section = 'food' | 'revenue';

type TableProps = {
  column1: string;
  column2: string;
  column3: string;
  fourColumnsVersion?: boolean;
  items: Array<{
    column1: number | string;
    column2: number | string;
    column3: number | string;
  }>;
  total: number;
};

export function ImpactTab() {
  const { t } = useTranslationUtils();
  const crops = useDashboardStore((store) => store.allCrops ?? []);

  const { configData, farmer } = useFarmerAnalyticsData((store) => ({
    configData: store.configData,
    farmer: store.farmer,
  }));
  const { setSurveys, setFarmerId, setRefetchSurveys } = useMarketSurveyStore((store) => ({
    setSurveys: store.setSurveys,
    setFarmerId: store.setFarmerId,
    setRefetchSurveys: store.setRefetchSurveys,
  }));

  const rootNavigation = useNavigation<NativeStackNavigationProp<DashboardMainRoutes>>();

  const [expanded, setExpanded] = useState<Section | undefined>();

  const { data: impact, isLoading: loadingImpact } = useApiCall(
    'getImpact',
    FarmerImpactService.getImpact,
    {
      farmerId: farmer?.id as number,
      startDate: configData?.startDate as Date,
      endDate: configData?.endDate as Date,
      unitIds: configData?.coolingUnits.map((unit) => unit.id) as number[],
    },
    {
      skip: !configData || !farmer,
    }
  );

  const { data: company } = useApiCall(
    'getCompanyById',
    ColdtivateService.getCompanyById,
    farmer?.companies[0] as number,
    {
      skip: !farmer,
    }
  );

  const { data: surveysData, refetch } = useApiCall(
    'getFarmerSurveys',
    ColdtivateService.getFarmerSurveys,
    {
      farmerId: farmer?.id as number,
    },
    {
      skip: !farmer,
      defaultData: [],
    }
  );

  const surveys = useMemo(() => {
    const basePossible = impact?.surveys?.[0].numOfPossibleBaselineSurveys ?? 0;
    const baseFilled = impact?.surveys?.[0].numFilledBaselineSurveys ?? 0;
    const postPossible = impact?.surveys?.[0].numOfPossiblePostcheckoutSurveys ?? 0;
    const postFilled = impact?.surveys?.[0].numOfFilledPostcheckoutSurveys ?? 0;

    return {
      basePossible,
      baseFilled,
      baseLeft: basePossible - baseFilled,
      postPossible,
      postFilled,
      postLeft: postPossible - postFilled,
      idsNotFilled: impact?.surveys?.[0]?.cropsWithBaselineSurveyToBeCompleted.split(',') ?? [],
    };
  }, [impact]);

  const foodLoss = useMemo(() => {
    const from = impact?.aggregated?.avgMonthlyPercLoss || 0;
    const to = impact?.aggregated?.avgMonthlyPercFoodlossEvolution || 0;
    return {
      from,
      to,
      crops: Object.values(impact?.top5FoodLossEvolution ?? {}).map((val) => {
        const from = val.avgMonthlyPercLoss || 0;
        const to = val.avgMonthlyPercFoodlossEvolution || 0;
        return {
          name: val.cropName,
          to,
          from,
          change: Math.abs(to - from),
        };
      }),
      change: Math.abs(to - from),
    };
  }, [impact]);

  const revenueChange = useMemo(() => {
    const from = impact?.aggregated?.avgMonthlyFarmerRevenueEvolution || 0;
    const to = impact?.aggregated?.avgMonthlyPercRevenueIncreaseEvolution || 0;
    return {
      from,
      to,
      crops: Object.values(impact?.top5FoodLossEvolution ?? {}).map((val) => {
        const from = val.avgMonthlyFarmerRevenueEvolution || 0;
        const to = val.avgMonthlyPercRevenueIncreaseEvolution || 0;
        return {
          name: val.cropName,
          to,
          from,
          change: Math.abs(to - from),
        };
      }),
      change: Math.abs(to - from),
    };
  }, [impact]);

  const expandTab = useCallback(
    (tab: Section) => {
      if (tab === expanded) {
        setExpanded(undefined);
        return;
      }

      setExpanded(tab);
    },
    [expanded]
  );

  useEffect(() => {
    if (surveysData?.length) {
      setSurveys(surveysData);
      setFarmerId(surveysData[0].farmer as number);
      setRefetchSurveys(refetch);
    }
  }, [surveysData, refetch]);

  if (loadingImpact) {
    return (
      <View tw="flex-1 items-center justify-center mt-4">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="w-full mt-4">
      <View tw="bg-green-transparency rounded-lg py-3 px-2 w-full mb-2">
        <View tw="flex flex-row items-center justify-center w-full space-x-1">
          <View tw="items-center justify-start w-1/2 space-y-2 h-full">
            {surveys.baseLeft ? (
              <React.Fragment>
                <Button
                  mode="contained"
                  tw="bg-gray-700"
                  onPress={() =>
                    rootNavigation.navigate('History', {
                      screen: 'MarketSurveyStack',
                      params: {
                        screen: 'MarketSurveyBase',
                        params: {
                          owner: farmer?.user.firstName ?? '',
                          crops: surveys.idsNotFilled.map((crop) => {
                            const fullCrop = crops.find((c) => c.id.toString() === crop);

                            return {
                              id: fullCrop?.id as number,
                              name: fullCrop?.name as string,
                            };
                          }),
                          companyCurrency: company?.currency,
                        },
                      },
                    })
                  }
                >
                  {t('Dashboard.Analytics.farmersAnalytics.baselineSurveyButton')}
                </Button>
                <Text tw="text-xl flex flex-row">
                  <Text tw="text-red-600 text-4xl">{surveys.baseFilled}</Text>/
                  {surveys.basePossible}
                </Text>
                <Text variant="TextMedium" tw="text-base text-center">
                  {t('Dashboard.Analytics.farmersAnalytics.baseLineSurveyMessage', {
                    amount: surveys.baseLeft,
                  })}
                </Text>
              </React.Fragment>
            ) : (
              <View tw="bg-gray-700 rounded-md w-full h-40 items-center p-2 justify-center">
                <Text tw="text-green-400 text-4xl">
                  {surveys.baseFilled}/{surveys.basePossible}
                </Text>
                <Text variant="TextMedium" tw="text-base text-white text-center">
                  {t('Dashboard.Analytics.farmersAnalytics.allBaselineSurveysCompleted')}
                </Text>
              </View>
            )}
          </View>

          <View tw="items-center w-1/2 space-y-2 justify-start h-full">
            {surveys.postLeft ? (
              <React.Fragment>
                <Button
                  mode="contained"
                  tw="bg-gray-700"
                  onPress={() =>
                    rootNavigation.navigate('History', { screen: 'RootHistoryTabStack' })
                  }
                >
                  {t('Dashboard.Analytics.farmersAnalytics.postCheckOutSurveyButton')}
                </Button>
                <Text tw="text-xl flex flex-row">
                  <Text tw="text-red-600 text-4xl">{surveys.postFilled}</Text>/
                  {surveys.postPossible}
                </Text>
                <Text variant="TextMedium" tw="text-base text-center">
                  {t('Dashboard.Analytics.farmersAnalytics.baseLineSurveyMessage', {
                    amount: surveys.postLeft,
                  })}
                </Text>
              </React.Fragment>
            ) : (
              <View tw="bg-gray-700 rounded-md w-full h-40 items-center p-2 justify-center">
                <Text tw="text-green-400 text-4xl">
                  {surveys.postFilled}/{surveys.postPossible}
                </Text>
                <Text variant="TextMedium" tw="text-base text-white text-center">
                  {t('Dashboard.Analytics.farmersAnalytics.allPostCheckoutSurveysCompleted')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <ImpactSection
        title={t('Dashboard.Analytics.companyTab.impactTab.foodLossLabel')}
        from={
          <View>
            {foodLoss.change === 0 && (
              <Text variant="TextMedium" tw="text-base mb-1">
                {t('Dashboard.Analytics.farmersAnalytics.noChangeFoodLoss')}
              </Text>
            )}
            <View tw="flex flex-row justify-center">
              <Text variant="TextMedium" tw="text-base font-bold">
                {t('Dashboard.Analytics.companyTab.impactTab.from')}{' '}
              </Text>
              <Text variant="TextMedium" tw="text-base font-bold">
                {foodLoss.from}
              </Text>
              <Text variant="TextMedium" tw="text-base text-purple-500 font-bold">
                %
              </Text>
            </View>
          </View>
        }
        to={
          <View tw="flex flex-row">
            <Text variant="TextMedium" tw="text-base font-bold">
              {t('Dashboard.Analytics.companyTab.impactTab.to')}{' '}
            </Text>
            <Text variant="TextMedium" tw="text-base font-bold">
              {foodLoss.to}
            </Text>
            <Text variant="TextMedium" tw="text-base text-purple-500 font-bold">
              %
            </Text>
          </View>
        }
        change={
          foodLoss.to === foodLoss.from ? (
            <Icon source="equal" size={40} />
          ) : foodLoss.change < 0 ? (
            <DownChange
              value={`${foodLoss.change.toFixed(2)}%`}
              message={t('Dashboard.Analytics.farmersAnalytics.decreaseInFoodLoss')}
            />
          ) : (
            <UpChange
              value={`${foodLoss.change.toFixed(2)}%`}
              message={t('Dashboard.Analytics.farmersAnalytics.increaseInFoodLoss')}
            />
          )
        }
      />

      <SectionAccordion
        color="bg-violet-100"
        expanded={expanded === 'food'}
        setExpanded={() => expandTab('food')}
        title={t('Dashboard.Analytics.farmersAnalytics.foodLossEvolution')}
        content={
          <Table
            column1={t('Dashboard.Analytics.farmersAnalytics.crops')}
            column2={t('Dashboard.Analytics.farmersAnalytics.changePercentage')}
            column3={t('Dashboard.Analytics.farmersAnalytics.foodLossLevels')}
            items={foodLoss.crops.map((crop) => ({
              column1: crop.name,
              column2: `${crop.change.toFixed(2)}%`,
              column3: `${crop.from.toFixed(2)}% - ${crop.to.toFixed(2)}%`,
            }))}
            total={configData?.coolingUnits.length ?? 0}
          />
        }
      />

      <ImpactSection
        title={t('Dashboard.Analytics.farmersAnalytics.revenueEvolution')}
        from={
          <View>
            {revenueChange.change === 0 && (
              <Text variant="TextMedium" tw="text-base mb-1">
                {t('Dashboard.Analytics.farmersAnalytics.noChangeRevenue')}
              </Text>
            )}
            <View tw="flex flex-row justify-center">
              <Text variant="TextMedium" tw="text-base font-bold">
                {t('Dashboard.Analytics.companyTab.impactTab.from')}{' '}
              </Text>
              <Text variant="TextMedium" tw="text-base font-bold">
                {revenueChange.from}
              </Text>
              <Text variant="TextMedium" tw="text-base text-purple-500 font-bold">
                %
              </Text>
            </View>
          </View>
        }
        to={
          <View tw="flex flex-row">
            <Text variant="TextMedium" tw="text-base font-bold">
              {t('Dashboard.Analytics.companyTab.impactTab.to')}{' '}
            </Text>
            <Text variant="TextMedium" tw="text-base font-bold">
              {revenueChange.to}
            </Text>
            <Text variant="TextMedium" tw="text-base text-purple-500 font-bold">
              %
            </Text>
          </View>
        }
        change={
          revenueChange.to === revenueChange.from ? (
            <Icon source="equal" size={40} />
          ) : revenueChange.change < 0 ? (
            <DownChange
              value={`${revenueChange.change.toFixed(2)}%`}
              message={t('Dashboard.Analytics.farmersAnalytics.decreaseInRevenue')}
              negative
            />
          ) : (
            <UpChange
              value={`${revenueChange.change.toFixed(2)}%`}
              message={t('Dashboard.Analytics.farmersAnalytics.increaseInRevenue')}
              positive
            />
          )
        }
      />

      <SectionAccordion
        color="bg-violet-100"
        expanded={expanded === 'revenue'}
        setExpanded={() => expandTab('revenue')}
        title={t('Dashboard.Analytics.farmersAnalytics.revenueCropEvolution')}
        content={
          <Table
            column1={t('Dashboard.Analytics.farmersAnalytics.crops')}
            column2={t('Dashboard.Analytics.farmersAnalytics.changePercentage')}
            column3={t('Dashboard.Analytics.farmersAnalytics.revenueLevels')}
            items={revenueChange.crops.map((crop) => ({
              column1: crop.name,
              column2: `${crop.change.toFixed(2)}%`,
              column3: `${crop.from.toFixed(2)}% - ${crop.to.toFixed(2)}%`,
            }))}
            total={configData?.coolingUnits.length ?? 0}
          />
        }
      />

      <View tw="bg-violet-100 rounded-lg py-3 px-2 w-full items-center space-y-4 mt-2">
        <Text variant="TextMedium" tw="text-base">
          {t('Dashboard.Analytics.farmersAnalytics.baselineSurveyLabel')}
        </Text>
        <View tw="flex flex-row items-center space-x-4">
          <Text tw="text-xl flex flex-row">
            <Text tw="text-3xl">{surveys.baseFilled}</Text>/{surveys.basePossible}
          </Text>
          <Text tw="text-4xl text-purple-600">
            ({((surveys.baseFilled * 100) / surveys.basePossible).toFixed(2)}%)
          </Text>
        </View>
        <Button
          mode="contained"
          tw="bg-gray-700"
          onPress={() =>
            rootNavigation.navigate('History', {
              screen: 'MarketSurveyStack',
              params: {
                screen: 'MarketSurveyBase',
                params: {
                  owner: farmer?.user.firstName ?? '',
                  crops: surveys.idsNotFilled.map((crop) => {
                    const fullCrop = crops.find((c) => c.id.toString() === crop);

                    return {
                      id: fullCrop?.id as number,
                      name: fullCrop?.name as string,
                    };
                  }),
                  companyCurrency: company?.currency,
                },
              },
            })
          }
        >
          {t('Dashboard.Analytics.farmersAnalytics.baselineSurveyButton')}
        </Button>
      </View>

      <View tw="bg-violet-100 rounded-lg py-3 px-2 w-full items-center space-y-4 mt-4">
        <Text variant="TextMedium" tw="text-base">
          {t('Dashboard.Analytics.farmersAnalytics.postCheckoutSurveyLabel')}
        </Text>
        <View tw="flex flex-row items-center space-x-4">
          <Text tw="text-xl flex flex-row">
            <Text tw="text-3xl">{surveys.postFilled}</Text>/{surveys.postPossible}
          </Text>
          <Text tw="text-4xl text-purple-600">
            (
            {(surveys.postFilled ? (surveys.postFilled * 100) / surveys.postPossible : 0).toFixed(
              2
            )}
            %)
          </Text>
        </View>
        <Button
          mode="contained"
          tw="bg-gray-700"
          onPress={() => rootNavigation.navigate('History', { screen: 'RootHistoryTabStack' })}
        >
          {t('Dashboard.Analytics.farmersAnalytics.postCheckOutSurveyButton')}
        </Button>
      </View>
    </View>
  );
}

function Table({ items, column1, column2, column3, total }: TableProps) {
  const { t } = useTranslationUtils();

  return (
    <DataTable tw="py-4 px-2">
      <DataTable.Header tw="bg-gray-700 rounded-t-lg h-14">
        <DataTable.Cell tw="w-[25%]">
          <Text tw="flex-wrap text-base text-white" numberOfLines={2}>
            {column1}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell tw="w-[25%]">
          <Text tw="flex-wrap text-base text-white" numberOfLines={2}>
            {column2}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell tw="w-[25%]">
          <Text tw="flex-wrap text-base text-white" numberOfLines={2}>
            {column3}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell tw="w-[25%]">{''}</DataTable.Cell>
      </DataTable.Header>
      <SkiaShadow blur={4} dx={0} dy={4} color={colors.zinc[200]} borderRadius={20}>
        {items.map((item, index) => (
          <DataTable.Row tw="bg-white" key={`${item.column1}-${index}`}>
            <DataTable.Cell tw="border-r border-gray-200">
              <Text tw="text-base flex-wrap" numberOfLines={2}>
                {item.column1}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell tw="border-r border-gray-200">
              <Text tw="text-base flex-wrap pl-1" numberOfLines={2}>
                {item.column2}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell tw="border-r border-gray-200">
              <Text tw="text-base flex-wrap pl-1" numberOfLines={2}>
                {item.column3}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell tw="pl-2">
              <Icon source="equal" size={25} />
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Row tw="bg-white rounded-b-lg">
          <DataTable.Cell>
            {total} {t('Dashboard.Analytics.comparisonTab.total')}
          </DataTable.Cell>
        </DataTable.Row>
      </SkiaShadow>
    </DataTable>
  );
}
