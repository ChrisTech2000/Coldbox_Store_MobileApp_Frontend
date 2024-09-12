import React from 'react';
import { View } from 'react-native';
import { Divider, List, Switch } from 'react-native-paper';
import { Controller, type Control } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';

import type { SetupSchema } from './index';

export default function Sellable(props: { formControl: Control<SetupSchema, unknown> }) {
  return (
    <View tw="flex-col">
      <List.Item
        tw="p-0 m-0 mt-3"
        title={undefined}
        left={() => (
          <View tw="flex-row items-center space-x-2">
            <Icon name="information-outline" size={20} color={colors.gray[600]} />
            <Text tw="text-base self-center">Sell in the Marketplace</Text>
          </View>
        )}
        right={() => (
          <Controller
            control={props.formControl}
            name="isSellableInMarketplace"
            render={({ field: { value, onChange } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />
        )}
      />
      <Divider tw="bg-gray-400 mt-2" />
    </View>
  );
}
