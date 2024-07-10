import React, { useCallback } from 'react';
import { Image, View } from 'react-native';

import ColdRoom from '#assets/icons/coldroom.svg';
import MineCart from '#assets/icons/mine-cart.svg';
import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import { DashboardProduce, EPricingType } from '#types/global';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

type ProduceProps = {
  currency: string;
  produce: DashboardProduce;
  onNavigate: () => void;
};

export function Produce({ currency, produce, onNavigate }: ProduceProps) {
  const { t } = useTranslationUtils();

  const generateDaysString = useCallback((days: number) => {
    return `${days} ${days > 1 ? t('Dashboard.CrateManagement.CheckOut.days') : t('Dashboard.CrateManagement.CheckOut.day')}`;
  }, []);

  const getPricing = useCallback((produce: DashboardProduce, currency: string) => {
    return `${produce.cratesCombinedCost} ${currency}${produce.crates[0]?.pricing[0]?.pricingType === EPricingType.PERIODICITY ? ' / Day' : ''}`;
  }, []);

  return (
    <View tw="flex flex-row w-[90%] mr-2 self-center h-24 mt-3">
      <View
        tw={cn(
          'bg-green-400 w-2 rounded-l-sm border-y-4 border-green-400',
          produce.minimumRemainingShelfLife <= 7 &&
            produce.minimumRemainingShelfLife > 2 &&
            'bg-yellow-400 border-yellow-400',
          produce.minimumRemainingShelfLife < 2 && 'bg-red-500 border-red-500',
          (!produce.minimumRemainingShelfLife || produce.minimumRemainingShelfLife === -1) &&
            'bg-gray-300 border-gray-300'
        )}
      />
      <View tw="flex flex-row h-full w-full space-x-2 p-1 bg-white rounded-sm border border-l-0 border-gray-300">
        <View tw="justify-between items-center">
          <Image
            resizeMode="contain"
            tw="w-14 h-10"
            source={{ uri: `${API_BASE_URL}media/${produce.cropImage}` }}
          />
          <View tw="flex flex-row items-center space-x-1">
            <MineCart width={12} height={12} />
            <Text variant="TextMedium" tw="text-base">
              {produce.cratesAmount}
            </Text>
          </View>
        </View>
        <View tw="w-full justify-between">
          <View tw="flex flex-row items-center w-[80%] justify-between">
            <Text variant="TextBold" tw="font-bold text-base">
              {produce.movementCode}
            </Text>
            <View tw="items-end">
              {produce.minimumRemainingShelfLife && (
                <Text
                  variant="TextBold"
                  tw={cn(
                    'text-green-400 text-base font-bold',
                    produce.minimumRemainingShelfLife <= 7 &&
                      produce.minimumRemainingShelfLife > 2 &&
                      'text-yellow-400',
                    produce.minimumRemainingShelfLife < 2 && 'text-red-500'
                  )}
                >
                  {generateDaysString(produce.minimumRemainingShelfLife)}
                </Text>
              )}
              <Text variant="TextMedium" tw="underline text-green-primary" onPress={onNavigate}>
                See Details
              </Text>
            </View>
          </View>
          <View tw="flex flex-row items-center w-[80%] justify-between">
            <View>
              {produce.cropName.split(' ').map((name, index) => (
                <Text key={`${name}-${index}`} tw="text-gray-400">
                  {name}
                </Text>
              ))}
            </View>
            <Text variant="TextMedium" tw="text-gray-400">
              {produce.farmer}
            </Text>
          </View>
          <View tw="flex flex-row items-center w-[80%] justify-between">
            <Text variant="TextMedium" tw="text-gray-400">
              {getPricing(produce, currency)}
            </Text>
            <View tw="flex flex-row items-center space-x-1">
              <ColdRoom width={14} height={14} tw="text-black" />
              <Text variant="TextMedium" tw="text-base">
                {generateDaysString(produce.currentStorageDays)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
