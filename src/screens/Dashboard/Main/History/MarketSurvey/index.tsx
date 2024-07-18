import React, { useEffect, useMemo } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Divider, Icon } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import Danger from '#assets/icons/danger.svg';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useTranslationUtils } from '#i18n/utils';
import { MarketSurveyStackRouteProps } from '#navigation/Dashboard/Main/HistoryTabStack/MarketSurveyStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useMarketSurveyStore } from '#stores/marketSurvey';

function MarketSurveyBase(props: MarketSurveyStackRouteProps<'MarketSurveyBase'>) {
  const { crops, farmer, companyCurrency, checkoutId } = props.route.params;

  const { t } = useTranslationUtils();
  const { setSurveys, setFarmerId, setRefetchSurveys, setCheckoutId } = useMarketSurveyStore();

  const { data: farmers, isLoading: loadingFarmers } = useApiCall(
    'getFarmers',
    ColdtivateService.getFarmers,
    {},
    {
      defaultData: [],
    }
  );

  const farmerId = useMemo(() => {
    return farmers?.find(
      (_farmer) => `${_farmer.user.firstName} ${_farmer.user.lastName}` === farmer
    )?.id;
  }, [farmers]);

  const {
    data: surveys,
    isLoading: loadingSurveys,
    refetch,
  } = useApiCall(
    'getFarmerSurveys',
    ColdtivateService.getFarmerSurveys,
    {
      farmerId: farmerId as number,
    },
    {
      skip: !farmerId,
      defaultData: [],
    }
  );

  const cropsWithSurveyStatus = useMemo(() => {
    if (!surveys || !crops) return [];

    const surveyedCropIds = surveys.reduce((acc, survey) => {
      survey.co.forEach((coItem) => acc.add(coItem.cropId));
      return acc;
    }, new Set());

    const uniqueCrops = crops.reduce(
      (acc: Array<{ id: number; name: string; hasSurvey: boolean }>, crop) => {
        if (!acc.some((c) => c.id === crop.id)) {
          acc.push({ ...crop, hasSurvey: surveyedCropIds.has(crop.id) });
        }
        return acc;
      },
      []
    );

    return uniqueCrops;
  }, [surveys, crops]);

  useEffect(() => {
    if (surveys?.length) {
      setSurveys(surveys);
      setFarmerId(surveys[0].farmer as number);
      setRefetchSurveys(refetch);
    }
  }, [surveys, refetch]);

  useEffect(() => {
    if (checkoutId) {
      setCheckoutId(checkoutId);
    }
  }, [checkoutId]);

  if (loadingFarmers || loadingSurveys) {
    return (
      <View tw="flex-1 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View tw="flex-1 justify-center space-y-4 mx-4 my-2">
      <FlatList
        data={cropsWithSurveyStatus}
        keyExtractor={(item, index) => `crop-${item.name}-#${index}`}
        renderItem={({ item }) => (
          <View tw="flex space-y-2 w-full my-2">
            <TouchableOpacity
              tw="flex flex-row justify-between items-center space-y-2 w-full my-1 h-6"
              onPress={() =>
                props.navigation.navigate('MarketSurvey', {
                  cropId: item.id,
                  companyCurrency,
                  farmer,
                })
              }
              disabled={!item.hasSurvey}
            >
              <Text variant="TextMedium" tw={cn('text-lg', !item.hasSurvey && 'text-gray-400')}>
                {item.name}
              </Text>
              <Icon
                source="chevron-right"
                size={20}
                color={item.hasSurvey ? colors.black : colors.gray[400]}
              />
            </TouchableOpacity>
            <Divider tw="w-full bg-gray-400" />
            {!item.hasSurvey && (
              <View>
                <TouchableOpacity
                  tw="flex flex-row space-y-2 space-x-4 items-center w-full my-1 h-6"
                  onPress={() => props.navigation.navigate('BaseSurvey', { companyCurrency })}
                >
                  <Danger tw="w-7 h-7" />
                  <Text variant="TextMedium" tw="">
                    {t('Dashboard.History.survey.fillMessage', { crop: item.name })}
                  </Text>
                </TouchableOpacity>
                <Divider tw="w-full bg-gray-400 mt-1" />
              </View>
            )}
          </View>
        )}
        nestedScrollEnabled
      />
    </View>
  );
}

export default withSafeArea(MarketSurveyBase);
