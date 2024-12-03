import React from 'react';
import { View } from 'react-native';
import colors from 'tailwindcss/colors';

import { useTranslationUtils } from '#i18n/utils';
import type { GetMovementsHistoryResponse } from '#types/api.responses';
import { type CoolingUnit, EMovementType } from '#types/global';
import { Text } from '#ui/components/Text';

import CheckOut from '#assets/icons/check-out.svg';
import ColdRoom from '#assets/icons/coldroom.svg';

type MovementDiagramProps = {
  coolingUnit: CoolingUnit;
  movement: GetMovementsHistoryResponse[number];
};

export function MovementDiagram({ coolingUnit, movement }: MovementDiagramProps) {
  const { t } = useTranslationUtils();

  const movementType = movement.movementType;

  if (movementType === EMovementType.IN) {
    return <View></View>;
  }

  if (movementType === EMovementType.OUT) {
    return (
      <View tw="px-4 pb-4 pt-2.5">
        <View tw="flex flex-row justify-between items-center">
          <View tw="flex flex-row items-center space-x-1">
            <Text tw="text-base">{coolingUnit.name}</Text>
            <ColdRoom width={20} height={20} tw="text-black" />
          </View>

          <View tw="flex flex-row items-center space-x-1">
            <Text tw="text-base">
              {t('Dashboard.History.stringTemplates.movementType.checkOut')}
            </Text>
            <CheckOut width={20} height={20} fill={colors.red[700]} stroke={colors.red[700]} />
          </View>
        </View>
      </View>
    );
  }

  if (movementType === EMovementType.MARKETPLACE) {
    return <View></View>;
  } else {
    return null;
  }
}
