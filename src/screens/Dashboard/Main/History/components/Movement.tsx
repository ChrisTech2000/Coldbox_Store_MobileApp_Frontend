import React, { useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Divider, Icon, Portal } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';

import { Modal } from '#ui/components/Modal';
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

  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);

  const crops = useMemo(() => {
    return movement.movementCrops.map((crop) => crop.name).join(', ');
  }, [movement]);

  const isCheckIn = useMemo(() => {
    return movement.movementType === EMovementType.IN;
  }, [movement]);

  // TODO: add actions + disable options when appropriate
  const optionsMenu = useMemo(() => {
    return [
      {
        label: t('Dashboard.History.optionsMenu.common.pdfReceipt'),
        action: () => null,
      },
      ...(isCheckIn
        ? [
            {
              label: t('Dashboard.History.optionsMenu.checkIn.edit'),
              action: () => null,
              disabled: true,
            },
          ]
        : [
            {
              label: t('Dashboard.History.optionsMenu.checkOut.seeDetails'),
              action: () => null,
            },
            {
              label: t('Dashboard.History.optionsMenu.checkOut.smsReceipt'),
              action: () => null,
            },
            {
              label: t('Dashboard.History.optionsMenu.checkOut.marketSurvey'),
              action: () => null,
              disabled: true,
            },
          ]),
    ];
  }, [isCheckIn]);

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
          <TouchableOpacity onPress={() => setIsOptionsModalOpen(true)}>
            <Icon source="dots-vertical" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <Divider tw="w-full bg-gray-400" />
      <Portal>
        <Modal
          tw="w-2/3"
          visible={isOptionsModalOpen}
          onDismiss={() => setIsOptionsModalOpen(false)}
        >
          <View tw="w-full mx-16 px-3 bg-white rounded-sm py-1 max-h-80">
            <FlatList
              data={optionsMenu}
              keyExtractor={(item, index) => `faq-${item.label}-#${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  tw="space-y-2 w-full my-1"
                  onPress={item.action}
                  disabled={item.disabled}
                >
                  <Text variant="TextMedium" tw={cn('text-base', item.disabled && 'text-gray-400')}>
                    {item.label}
                  </Text>
                  <Divider tw="w-full bg-gray-400" />
                </TouchableOpacity>
              )}
              nestedScrollEnabled
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
}
