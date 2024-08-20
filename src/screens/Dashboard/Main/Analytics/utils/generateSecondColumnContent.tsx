import startCase from 'lodash/startCase';
import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import ColdtivateLogo from '#assets/images/coldtivate_logo.svg';

import { Text } from '#ui/components/Text';

import { API_BASE_URL } from '#constants/environment';
import { GetAllCropsResponse } from '#types/api.responses';

export function normalizeName(name: string) {
  return name.replace(/[^\w\s]/g, '').toLowerCase();
}

export function generateSecondColumnContent(
  sortedData: { key: string; val: number; index: number }[],
  crops: Array<GetAllCropsResponse>
) {
  return sortedData.map(({ key, val, index }) => {
    if (key.toLowerCase() === 'other') {
      return (
        <View key={`${key}-${val}-${index}`} tw="flex flex-row space-x-1 space-y-1 items-center">
          <ColdtivateLogo width={15} height={12} tw="self-center" />
          <Text tw="flex-wrap w-24" numberOfLines={1}>
            Other
          </Text>
        </View>
      );
    }

    const crop = crops.find(
      (crop) => normalizeName(crop.name).toLowerCase() === startCase(key).toLowerCase()
    );

    return (
      <View key={`${key}-${val}-${index}`} tw="flex flex-row space-x-1 space-y-1 items-center">
        <FastImage
          resizeMode="contain"
          tw="w-4 h-4"
          source={{ uri: `${API_BASE_URL}media/${crop?.image}` }}
        />
        <Text tw="flex-wrap w-24" numberOfLines={1}>
          {crop?.name}
        </Text>
      </View>
    );
  });
}
