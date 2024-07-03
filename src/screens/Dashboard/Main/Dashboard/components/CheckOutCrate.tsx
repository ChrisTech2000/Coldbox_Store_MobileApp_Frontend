import React, { useCallback } from 'react';
import { Image, View } from 'react-native';

import { API_BASE_URL } from '#constants/environment';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import type { Crate } from '#types/global';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

type ProduceProps = {
  crate: Crate;
};

export function CheckoutCrate({ crate }: ProduceProps) {
  const { t } = useTranslationUtils();

  const generateDaysString = useCallback((days: number) => {
    return `${days} ${days > 1 ? t('Dashboard.CrateManagement.CheckOut.days') : t('Dashboard.CrateManagement.CheckOut.day')}`;
  }, []);

  return (
    <View tw="flex flex-row w-full self-center mr-2 h-24 mt-3">
      <View
        tw={cn(
          'bg-green-400 w-2 rounded-l-sm border-y-4 border-green-400',
          !crate.remainingShelfLife && 'bg-gray-300 border-gray-300'
        )}
      />
      <View tw="flex flex-row items-center h-full w-full space-x-2 p-1 bg-white rounded-sm border border-l-0 border-gray-300">
        <Image
          resizeMode="contain"
          tw="w-20 h-16 mr-1"
          source={{ uri: `${API_BASE_URL}media/${crate.cropImage}` }}
        />
        <View tw="justify-between w-1/4">
          <Text variant="TextBold" tw="font-bold text-base">
            {crate.movementCode}
          </Text>
          <View>
            {crate.name.split(' ').map((name, index) => (
              <Text key={`${name}-${index}`} tw="text-gray-400">
                {name}
              </Text>
            ))}
          </View>
          <Text variant="TextMedium" tw="text-base">
            {`${crate.weight} ${t('Dashboard.ProduceDetails.kilogram')}`}
          </Text>
        </View>
        <View tw="pl-2">
          {crate.remainingShelfLife && (
            <Text variant="TextBold" tw="text-green-400 text-base">
              {`${t('Dashboard.CrateManagement.CheckOut.ttp')}: ${generateDaysString(crate.remainingShelfLife)}`}
            </Text>
          )}
          <Text variant="TextMedium">{`${t('Dashboard.CrateManagement.CheckOut.checkIn')}:`}</Text>
          <Text variant="TextMedium">{dateFmt(crate.checkInDate.toString(), 'MMM dd yyyy')}</Text>
          <Text variant="TextMedium">{`(${generateDaysString(crate.currentStorageDays)})`}</Text>
        </View>
      </View>
    </View>
  );
}
