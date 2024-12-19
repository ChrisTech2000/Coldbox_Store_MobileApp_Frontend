import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { DashboardProduce } from '#types/global';
import { useTranslationUtils } from '#i18n/utils';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { Icon } from 'react-native-paper';
import { DisclaimerModal } from './DisclaimerModal';

type DTInfoProps = {
  produce: DashboardProduce;
};

export function DTInfo({ produce }: DTInfoProps) {
  const { t } = useTranslationUtils();

  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState<boolean>(false);

  const getPercentage = useCallback((produce: DashboardProduce) => {
    const quality = produce.qualityDt * 100;
    if (quality > 100) return 100;
    if (quality < 0 || isNaN(quality)) return 0;
    return quality;
  }, []);

  return (
    <View tw="w-full px-2">
      <View
        tw={cn(
          'w-full bg-green-300 rounded-lg h-3',
          produce.minimumRemainingShelfLife <= 7 &&
            produce.minimumRemainingShelfLife > 2 &&
            'bg-yellow-400',
          produce.minimumRemainingShelfLife < 2 && 'bg-red-500',
          (!produce.minimumRemainingShelfLife || produce.minimumRemainingShelfLife === -1) &&
            'bg-gray-300'
        )}
      />

      <View tw="flex flex-row items-center justify-between">
        <Text variant="TextMedium" tw="px-2">
          {getPercentage(produce)}%
        </Text>
        <Text variant="TextMedium" tw="px-2">
          {t('Dashboard.ProduceDetails.pickUp')}
        </Text>
        <Text
          variant="TextMedium"
          tw="px-2"
        >{`${produce.minimumRemainingShelfLife} ${t('Dashboard.ProduceDetails.days')}`}</Text>
      </View>

      <View tw="flex flex-row items-center justify-center mt-4">
        <Text variant="TextMedium" tw="text-gray-400 mr-1" numberOfLines={2}>
          {t('Dashboard.History.editCheckIn.disclaimer')}
        </Text>
        <TouchableOpacity onPress={() => setIsDisclaimerModalOpen(true)}>
          <Icon source="information" size={15} />
        </TouchableOpacity>
      </View>
      <DisclaimerModal
        isOpen={isDisclaimerModalOpen}
        dismiss={() => setIsDisclaimerModalOpen(false)}
      />
    </View>
  );
}
