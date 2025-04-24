import startCase from 'lodash/startCase';
import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import ColdtivateLogo from '#assets/images/coldtivate_logo.svg';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { API_BASE_URL } from '#constants/environment';
import { GetAllCropsResponse } from '#types/api.responses';

export function normalizeName(name: string) {
  return name.replace(/[^\w\s]/g, '').toLowerCase();
}

export function generateSecondColumnContent(
  sortedData: { key: string; val: number; index: number }[],
  crops: Array<GetAllCropsResponse>,
  cropsTranslations?: Record<number, string>,
  withAmount?: boolean,
  suffix?: string
) {
  return sortedData.map(({ key, val, index }) => {
    if (key.toLowerCase() === 'other') {
      return (
        <View
          key={`${key}-${val}-${index}`}
          tw={cn('w-[90%] flex flex-row space-x-1 items-center', withAmount ? 'pt-4' : '')}
        >
          <ColdtivateLogo
            width={withAmount ? 24 : 15}
            height={withAmount ? 24 : 12}
            tw="self-center"
          />
          <Text
            tw={cn('flex-wrap w-[90%] text-sm', withAmount ? 'font-bold' : '')}
            numberOfLines={3}
          >
            {`Other${withAmount ? `: ${val}` : ''}`}
          </Text>
        </View>
      );
    }

    const crop = crops.find(
      (crop) => normalizeName(crop.name).toLowerCase() === startCase(key).toLowerCase()
    );

    const cropName = (crop && cropsTranslations?.[crop.id]) ?? crop?.name ?? startCase(key);

    return (
      <View
        key={`${key}-${val}-${index}`}
        tw={cn('w-[90%] flex flex-row space-x-1 items-center', withAmount ? 'pt-4' : '')}
      >
        {crop ? (
          <FastImage
            resizeMode={withAmount ? 'stretch' : 'contain'}
            tw={cn(withAmount ? 'w-8 h-8 rounded-2xl' : 'w-4 h-4')}
            source={{ uri: `${API_BASE_URL}media/${crop?.image}` }}
          />
        ) : (
          <ColdtivateLogo
            width={withAmount ? 24 : 15}
            height={withAmount ? 24 : 12}
            tw="self-center"
          />
        )}

        <Text tw={cn('flex-wrap w-[90%] text-sm', withAmount ? 'font-bold' : '')} numberOfLines={3}>
          {`${cropName}${withAmount ? `: ${Number.isFinite(+val) ? (+val % 1 === 0 ? val : (+val).toFixed(2)) : val}` : ''} ${suffix ?? ''}`}
        </Text>
      </View>
    );
  });
}
