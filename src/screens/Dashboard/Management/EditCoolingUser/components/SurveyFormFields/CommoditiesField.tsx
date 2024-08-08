import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Divider, Icon } from 'react-native-paper';

import { Text } from '#ui/components/Text';

import { useTranslationUtils } from '#i18n/utils';
import { useToggle } from '#ui/hooks/useToggle';
import { paperTheme } from '#ui/lib/theme';

import type { CoolingUserSurveyAggregatedData } from '../../CoolingUsersSurvey';
import { FarmersSurveyModal } from '#screens/Dashboard/Main/components/FarmerSurveyModal';
import { sanitizeString } from '#screens/Dashboard/Main/History/MarketSurvey/utils';

type FarmerSurveysList = CoolingUserSurveyAggregatedData['surveys'];
type FarmerSurveyItem = FarmerSurveysList[0];

type Props = {
  farmerSurveys: FarmerSurveysList;
};

export default function CommoditiesField(props: Props) {
  const { farmerSurveys } = props;

  const { t } = useTranslationUtils();

  const [selectedSurvey, setSelectedSurvey] = useState<FarmerSurveyItem | null>(null);
  const [isVisible, toggleVisibility] = useToggle(false);

  return (
    <React.Fragment>
      <FlatList
        nestedScrollEnabled
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
                <Icon source="chevron-right" size={20} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {isVisible ? (
        <FarmersSurveyModal
          companyCurrency="EUR"
          cropName={selectedSurvey!.cropName}
          isModalVisible={isVisible}
          onDismiss={() => {
            toggleVisibility();
            setSelectedSurvey(null);
          }}
          onSubmit={(value) => console.log(value)}
          defaultValues={{
            weightDistribution: {
              totalProducedWeekly: selectedSurvey!.quantityTotal,
              quantitySelfConsumed: selectedSurvey!.quantitySelfConsumed,
              quantitySold: selectedSurvey!.quantitySold,
              quantityLost: selectedSurvey!.quantityBelowMarketPrice,
            },
            unitOfMeasurement: selectedSurvey!.unit,
            unitaryWeight: selectedSurvey!.kgInUnit,
            reasonsForSpoilage: sanitizeString(selectedSurvey?.reasonForLoss as string),
            averagePrice: selectedSurvey!.averagePrice,
          }}
        />
      ) : null}
    </React.Fragment>
  );
}
