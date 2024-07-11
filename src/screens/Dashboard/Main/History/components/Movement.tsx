import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import { Text } from '#ui/components/Text';

import { GetMovementsHistoryResponse } from '#types/api.responses';

type MovementProps = {
  movement: GetMovementsHistoryResponse[number];
};

export function Movement({ movement }: MovementProps) {
  return (
    <View tw="w-full">
      <Text>{movement.code}</Text>
      <Divider tw="w-full bg-gray-400" />
    </View>
  );
}
