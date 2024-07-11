import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';

import { Text } from '#ui/components/Text';

import { dateFmt } from '#i18n/utils';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { EMovementType } from '#types/global';

type MovementProps = {
  movement: GetMovementsHistoryResponse[number];
};

export function Movement({ movement }: MovementProps) {
  const crops = useMemo(() => {
    return movement.movementCrops.map((crop) => crop.name).join(', ');
  }, [movement]);

  return (
    <View tw="w-full truncate">
      <View tw="w-full flex flex-row items-center space-x-2 my-2 truncate">
        {movement.movementType === EMovementType.IN ? (
          <CheckIn width={25} height={25} fill={colors.green[500]} stroke={colors.green[500]} />
        ) : (
          <CheckOut width={25} height={25} fill={colors.orange[400]} stroke={colors.orange[400]} />
        )}
        <View tw="w-1/2 truncate">
          <View tw="flex flex-row items-center truncate">
            <Text variant="TextBold" tw="text-base font-bold truncate">
              {movement.code}
            </Text>
            <Text variant="TextMedium" tw="text-base w-32 h-6 truncate">
              {' '}
              - {movement.cratesNumber} - {crops}
            </Text>
          </View>
          <Text variant="TextMedium" tw="text-base truncate">
            {dateFmt(movement.date.toString(), 'dd/MM/yyyy HH:mm a')}
          </Text>
        </View>

        <View tw="w-1/2"></View>
      </View>
      <Divider tw="w-full bg-gray-400" />
    </View>
  );
}
