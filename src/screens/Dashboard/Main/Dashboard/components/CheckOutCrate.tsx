import React, { useCallback } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { API_BASE_URL } from '#constants/environment';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import type { Crate } from '#types/global';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import isNil from 'lodash/isNil';

type ProduceProps = {
  crate: Crate;
  cropName: string;
};

export function CheckoutCrate({ crate, cropName }: ProduceProps) {
  const { t } = useTranslationUtils();

  const generateDaysString = useCallback((days: number) => {
    return `${days} ${days > 1 ? t('Dashboard.CrateManagement.CheckOut.days') : t('Dashboard.CrateManagement.CheckOut.day')}`;
  }, []);

  return (
    <View
      tw={cn(
        'flex flex-row w-full self-center mr-2 mt-3',
        crate.lockedWithinPendingOrders && 'opacity-60'
      )}
    >
      <View
        tw={cn(
          'bg-green-400 w-2 rounded-l-sm border-y-4 border-green-400 py-3',
          crate.remainingShelfLife <= 7 &&
            crate.remainingShelfLife > 2 &&
            'bg-yellow-400 border-yellow-400',
          crate.remainingShelfLife <= 2 && 'bg-red-700 border-red-700',
          (isNil(crate.remainingShelfLife) || crate.remainingShelfLife === -1) &&
            'bg-gray-300 border-gray-300'
        )}
      />
      <View tw="flex flex-row items-center h-full w-full space-x-2 px-1 py-3 bg-white rounded-sm border border-l-0 border-gray-300">
        <FastImage
          resizeMode="contain"
          tw="w-20 h-16 mr-1"
          source={{ uri: `${API_BASE_URL}media/${crate.cropImage}` }}
        />
        <View tw="justify-between w-1/4">
          <Text variant="TextBold" tw="font-bold text-base">
            {crate.movementCode}
          </Text>
          <View>
            {cropName.split(' ').map((name, index) => (
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
          {crate.remainingShelfLife ? (
            <Text
              variant="TextBold"
              tw={cn(
                'text-base',
                'text-green-400',
                crate.remainingShelfLife <= 7 && crate.remainingShelfLife > 2 && 'text-yellow-400',
                crate.remainingShelfLife <= 2 && 'text-red-500',
                (isNil(crate.remainingShelfLife) || crate.remainingShelfLife === -1) &&
                  'text-gray-300'
              )}
            >
              {`${t('Dashboard.CrateManagement.CheckOut.ttp')}: ${generateDaysString(crate.remainingShelfLife)}`}
            </Text>
          ) : null}
          <Text variant="TextMedium">{`${t('Dashboard.CrateManagement.CheckOut.checkIn')}:`}</Text>
          <Text variant="TextMedium">{dateFmt(crate.checkinDate.toString(), 'MMM dd yyyy')}</Text>
          <Text variant="TextMedium">{`(${generateDaysString(crate.currentStorageDays)})`}</Text>
        </View>
      </View>
    </View>
  );
}
