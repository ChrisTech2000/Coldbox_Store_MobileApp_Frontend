import React from 'react';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';

import { Text } from '#ui/components/Text';
import { Sup } from '#ui/components/SuperscriptText';
import { Input } from '#ui/components/Input';

import MarketplaceFormManager from '../modules/MarketplaceFormManager';

export default function RangePrice() {
  const { control } = MarketplaceFormManager.useForm();

  return (
    <View tw="space-y-3 mt-4">
      <View tw="flex-row">
        <Text tw="text-base text-gray-600 ">Range Price / KG</Text>
        <Sup>(EUR)</Sup>
      </View>
      <View tw="flex-row items-center justify-between">
        <View tw="w-[47%]">
          <Text tw="text-base text-gray-600">Min</Text>
          <Controller
            control={control}
            name="min"
            render={({ field: { value, onChange } }) => (
              <Input
                tw="bg-white border rounded-sm h-14 rounded-md mt-2"
                keyboardType="numeric"
                defaultValue="0.00"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <View tw="w-[47%]">
          <Text tw="text-base text-gray-600">Max</Text>
          <Controller
            control={control}
            name="max"
            render={({ field: { value, onChange } }) => (
              <Input
                tw="bg-white border rounded-sm h-14 rounded-md mt-2"
                keyboardType="numeric"
                defaultValue="0.00"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}
