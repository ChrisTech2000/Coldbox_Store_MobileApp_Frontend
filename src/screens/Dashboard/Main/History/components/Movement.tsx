import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Divider, Icon } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { EMovementType, type CoolingUnit } from '#types/global';

type MovementProps = {
  movement: GetMovementsHistoryResponse[number];
  coolingUnit: CoolingUnit | null;
};

export function Movement({ movement, coolingUnit }: MovementProps) {
  const { t } = useTranslationUtils();
  const { company } = useManagementStore();

  // const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>();

  const crops = useMemo(() => {
    return movement.movementCrops.map((crop) => crop.name).join(', ');
  }, [movement]);

  const isCheckIn = useMemo(() => {
    return movement.movementType === EMovementType.IN;
  }, [movement]);

  return (
    <View tw="w-full">
      <View tw="w-[40%] flex flex-row items-center justify-between space-x-2 my-2">
        {isCheckIn ? (
          <CheckIn width={25} height={25} fill={colors.green[500]} stroke={colors.green[500]} />
        ) : (
          <CheckOut width={25} height={25} fill={colors.orange[400]} stroke={colors.orange[400]} />
        )}
        <View>
          <View tw="flex flex-row items-center">
            <Text variant="TextBold" tw="text-base font-bold">
              {movement.code}
            </Text>
            <Text variant="TextMedium" tw="text-base w-24" numberOfLines={1}>
              {' '}
              - {movement.cratesNumber} - {crops}
            </Text>
          </View>
          <Text variant="TextMedium" tw="text-base" numberOfLines={1}>
            {dateFmt(movement.date.toString(), 'dd/MM/yyyy HH:mm a')}
          </Text>
        </View>

        <View>
          <Text
            variant="TextMedium"
            tw={cn('text-base', !isCheckIn && 'font-bold')}
            numberOfLines={1}
          >
            {t('Dashboard.History.priceLabel')}:{' '}
            {isCheckIn
              ? `${coolingUnit?.commonPricingType.value ?? 0} ${company?.currency} / ${t('Dashboard.CrateManagement.CheckIn.day')}`
              : `${movement.totalPrice} ${company?.currency}`}
          </Text>
          <Text variant="TextMedium" tw="text-base" numberOfLines={1}>
            {movement.farmer}
          </Text>
        </View>

        <View>
          <TouchableOpacity>
            <Icon source="dots-vertical" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <Divider tw="w-full bg-gray-400" />
    </View>
  );
}
