import React, { useEffect, useMemo } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Divider, Icon } from 'react-native-paper';
import { Trans } from 'react-i18next';
import colors from 'tailwindcss/colors';

import Danger from '#assets/icons/danger.svg';

import { GenericError } from '#ui/components/GenericError';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { getDefaultCropValues } from '#i18n/transl/misc/crops';
import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { MarketSurveyStackRouteProps } from '#navigation/Dashboard/Main/HistoryTabStack/MarketSurveyStack';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { useMarketSurveyStore } from '#stores/marketSurvey';

function MarketSurveyBase(props: MarketSurveyStackRouteProps<'MarketSurveyBase'>) {
  const { crops, ownerId, owner, companyCurrency, checkoutId } = props.route.params;

  const { t } = useTranslationUtils();
  const { setSurveys, setFarmerId, setRefetchSurveys, setCheckoutId } = useMarketSurveyStore();

  const { data: farmers, isLoading: loadingFarmers } = useApiCall(
    'getFarmers',
    ColdtivateService.getFarmers,
    undefined,
    {
      defaultData: [],
    }
  );

  const farmerId = useMemo(
    () => farmers?.find((farmer) => farmer.user.id === ownerId)?.id,
    [farmers, ownerId]
  );

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
    if (surveys) {
      setSurveys(surveys);
      setFarmerId(farmerId as number);
      setRefetchSurveys(refetch);
    }
  }, [surveys, farmerId, refetch]);

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
        showsVerticalScrollIndicator={false}
        data={cropsWithSurveyStatus}
        keyExtractor={(item, index) =>
          `crop-${item.name || getDefaultCropValues(t).name}-#${index}`
        }
        renderItem={({ item }) => (
          <View tw="flex space-y-2 w-full my-2">
            <TouchableOpacity
              tw="flex flex-row justify-between items-center space-y-2 w-full my-1 h-6"
              onPress={() =>
                props.navigation.navigate('MarketSurvey', {
                  cropId: item.id,
                  companyCurrency,
                  ownerId: farmerId!,
                  owner,
                })
              }
              disabled={!item.hasSurvey}
            >
              <Text variant="TextMedium" tw={cn('text-lg', !item.hasSurvey && 'text-gray-400')}>
                {item.name || getDefaultCropValues(t).name}
              </Text>
              <Icon
                source={LanguageManager.isRTL ? 'chevron-left' : 'chevron-right'}
                size={20}
                color={item.hasSurvey ? colors.black : colors.gray[400]}
              />
            </TouchableOpacity>
            <Divider tw="w-full bg-gray-400" />
            {!item.hasSurvey ? (
              <View>
                <TouchableOpacity
                  tw="flex flex-row space-x-4 items-start w-full my-1 py-1"
                  onPress={() => props.navigation.navigate('BaseSurvey', { companyCurrency })}
                >
                  <Danger tw="w-7 h-7 flex-shrink-0" />
                  <Text variant="TextMedium" tw="flex-1 flex-wrap">
                    <Trans
                      i18nKey="Dashboard.History.survey.fillMessage"
                      values={{ crop: item.name || getDefaultCropValues(t).name }}
                      components={[
                        <Text key="0" tw="text-blue-500">
                          {''}
                        </Text>,
                      ]}
                    />
                  </Text>
                </TouchableOpacity>
                <Divider tw="w-full bg-gray-400 mt-1" />
              </View>
            ) : null}
          </View>
        )}
        nestedScrollEnabled
      />
    </View>
  );
}

export default withSafeArea(
  withErrorBoundary(MarketSurveyBase, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
