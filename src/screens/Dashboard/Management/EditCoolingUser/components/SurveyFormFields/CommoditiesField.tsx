import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Divider, Icon } from 'react-native-paper';

import { Text } from '#ui/components/Text';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import { paperTheme } from '#ui/lib/theme';
import reportCrash from '#ui/lib/reportCrash';

import type {
  CommoditySurveyPatcher,
  CoolingUserSurveyAggregatedData,
} from '../../CoolingUsersSurvey';
import {
  FarmersSurveyModal,
  type FarmerSurveySchemaType,
} from '#screens/Dashboard/Main/components/FarmerSurveyModal';
import { sanitizeString } from '#screens/Dashboard/Main/History/MarketSurvey/utils';

type FarmerSurveysList = CoolingUserSurveyAggregatedData['surveys'];
type FarmerSurveyItem = FarmerSurveysList[0];

type Props = {
  companyCurrency: string;
  farmerSurveys: FarmerSurveysList;
  commodityPatcher: ReturnType<CommoditySurveyPatcher>;
};

export default function CommoditiesField(props: Props) {
  const { companyCurrency, farmerSurveys, commodityPatcher } = props;

  const { t } = useTranslationUtils();

  const [selectedSurvey, setSelectedSurvey] = useState<FarmerSurveyItem | null>(null);
  const [isVisible, toggleVisibility] = useToggle(false);

  const defaultSurveyValues = useMemo(
    () =>
      selectedSurvey
        ? {
            weightDistribution: {
              totalProducedWeekly: selectedSurvey!.quantityTotal.toString(),
              quantitySelfConsumed: selectedSurvey!.quantitySelfConsumed.toString(),
              quantitySold: selectedSurvey!.quantitySold.toString(),
              quantityLost: selectedSurvey!.quantityBelowMarketPrice.toString(),
            },
            unitOfMeasurement: selectedSurvey!.unit,
            unitaryWeight: selectedSurvey!.kgInUnit.toString(),
            reasonsForSpoilage: sanitizeString(selectedSurvey?.reasonForLoss as string),
            averagePrice: selectedSurvey!.averagePrice.toString(),
          }
        : undefined,
    [selectedSurvey?.id]
  );

  const onDismissHandler = useCallback(() => {
    toggleVisibility();
    setSelectedSurvey(null);
  }, []);

  const onSubmit = useCallback(
    async (values: FarmerSurveySchemaType) => {
      const contextualCropId = selectedSurvey?.cropId;
      if (!contextualCropId) return; // safe guard
      try {
        const result = await commodityPatcher(contextualCropId)(values);
        if (result) onDismissHandler();
      } catch (exception) {
        reportCrash(exception as Error);
      }
    },
    [selectedSurvey?.cropId, commodityPatcher, onDismissHandler]
  );

  return (
    <React.Fragment>
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={farmerSurveys}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListHeaderComponent={() => (
          <View tw="space-y-2 my-2">
            <View tw="flex flex-row space-x-2 items-center">
              <Icon source="shopping-outline" size={25} color={paperTheme.colors.primary} />
              <Text variant="TextBold" tw="text-lg font-bold">
                {t('Dashboard.History.survey.baseSurvey.mostUsedCommoditiesQuestion')}
              </Text>
            </View>
            <Text tw="text-base">
              {t('Dashboard.History.survey.baseSurvey.fillCommoditiesMessage')}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={Divider}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={(evt) => {
              evt.stopPropagation();
              setSelectedSurvey(item);
              toggleVisibility();
            }}
          >
            <View tw="flex flex-row items-center justify-between space-y-2 pb-3">
              <Text tw="text-lg">
                {t('Dashboard.History.survey.baseSurvey.commodity')} {index + 1}
              </Text>
              <View tw="flex flex-row space-x-2 items-center">
                <Text tw="text-lg">{item.cropName}</Text>
                <Icon source={LanguageManager.isRTL ? 'chevron-left' : 'chevron-right'} size={20} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {isVisible && typeof defaultSurveyValues === 'object' ? (
        <FarmersSurveyModal
          isModalVisible={isVisible}
          companyCurrency={companyCurrency}
          cropName={selectedSurvey!.cropName}
          defaultValues={defaultSurveyValues}
          onDismiss={onDismissHandler}
          onSubmit={onSubmit}
        />
      ) : null}
    </React.Fragment>
  );
}
