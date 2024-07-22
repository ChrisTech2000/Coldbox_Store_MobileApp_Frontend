import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Divider, Icon, Portal } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';

import { Modal } from '#ui/components/Modal';
import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import { ManagementCompany, useManagementStore } from '#stores/management';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { EMovementType, ERoles, type Company, type CoolingUnit } from '#types/global';

import { sendSMS } from '../utils/actions';
import { isWithinLast24Hours } from '../utils/dates';
import { DetailsModal } from './DetailsModal';
import { PDFModal } from './PDFModal';

type Movement = GetMovementsHistoryResponse[number];

type MovementProps = {
  movement: Movement;
  coolingUnit: CoolingUnit | null;
  selectedCompany: Company | ManagementCompany | null;
  navigateToCheckIn?: (movement: Movement, coolingUnitId?: number) => void;
  navigateToMarketSurvey?: (
    farmer: string,
    crops: Movement['movementCrops'],
    checkoutId?: number,
    companyCurrency?: string
  ) => void;
};

export function Movement({
  movement,
  coolingUnit,
  selectedCompany,
  navigateToCheckIn,
  navigateToMarketSurvey,
}: MovementProps) {
  const { t } = useTranslationUtils();
  const { company } = useManagementStore();
  const { user } = useAuthStore();

  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  const crops = useMemo(() => {
    return movement.movementCrops.map((crop) => crop.name).join(', ');
  }, [movement]);

  const isCheckIn = useMemo(() => {
    return movement.movementType === EMovementType.IN;
  }, [movement]);

  const price = useMemo(() => {
    return isCheckIn
      ? `${coolingUnit?.commonPricingType.value ?? 0} ${company?.currency} / ${t('Dashboard.CrateManagement.CheckIn.day')}`
      : `${movement.totalPrice} ${company?.currency}`;
  }, [isCheckIn]);

  const seePDFModal = useCallback(() => {
    setIsPDFModalOpen(true);
    setIsOptionsModalOpen(false);
  }, []);

  const seeDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(true);
    setIsOptionsModalOpen(false);
  }, []);

  const editCheckIn = useCallback(() => {
    navigateToCheckIn?.(movement, coolingUnit?.id);
    setIsOptionsModalOpen(false);
  }, [navigateToCheckIn]);

  const fillMarketSurvey = useCallback(() => {
    navigateToMarketSurvey?.(
      movement.farmer,
      movement.movementCrops.filter((crop) => !movement.hasMarketSurvey.includes(crop.id)),
      movement.checkoutId as number,
      selectedCompany?.currency ?? company?.currency
    );
    setIsOptionsModalOpen(false);
  }, [selectedCompany, company, navigateToMarketSurvey]);

  const optionsMenu = useMemo(() => {
    return [
      {
        label: t('Dashboard.History.optionsMenu.common.pdfReceipt'),
        action: seePDFModal,
      },
      ...(isCheckIn && user?.role === ERoles.OPERATOR
        ? [
            {
              label: t('Dashboard.History.optionsMenu.checkIn.edit'),
              action: editCheckIn,
              disabled: !isWithinLast24Hours(movement.date),
            },
          ]
        : []),
      ...(!isCheckIn
        ? [
            {
              label: t('Dashboard.History.optionsMenu.checkOut.seeDetails'),
              action: seeDetailsModal,
            },
            {
              label: t('Dashboard.History.optionsMenu.checkOut.smsReceipt'),
              action: async () =>
                await sendSMS(
                  user?.phone ?? '',
                  movement,
                  company?.name ?? selectedCompany?.name ?? '',
                  price,
                  t
                ),
            },
            {
              label: t('Dashboard.History.optionsMenu.checkOut.marketSurvey'),
              action: fillMarketSurvey,
              disabled: !movement.marketSurveyDelay,
            },
          ]
        : []),
    ];
  }, [isCheckIn, movement, user, company, selectedCompany, price, t]);

  return (
    <View tw="w-full">
      <View tw="w-[40%] flex flex-row items-center justify-between space-x-2 my-2">
        {isCheckIn ? (
          <CheckIn width={25} height={25} fill={colors.green[500]} stroke={colors.green[500]} />
        ) : (
          <CheckOut width={25} height={25} fill={colors.orange[400]} stroke={colors.orange[400]} />
        )}
        <View tw="w-full mr-4">
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

        <View tw="w-[90%]">
          <Text
            variant="TextMedium"
            tw={cn('text-base', !isCheckIn && 'font-bold')}
            numberOfLines={1}
          >
            {t('Dashboard.History.priceLabel')}: {price}
          </Text>
          <Text variant="TextMedium" tw="text-base" numberOfLines={1}>
            {movement.farmer}
          </Text>
        </View>

        <TouchableOpacity tw="w-5" onPress={() => setIsOptionsModalOpen(true)}>
          <Icon source="dots-vertical" size={20} />
        </TouchableOpacity>
      </View>
      <Divider tw="w-full bg-gray-400" />
      <Portal>
        <Modal visible={isOptionsModalOpen} onDismiss={() => setIsOptionsModalOpen(false)}>
          <View tw="bg-white rounded-3xl h-auto space-y-2 mx-16 px-3 py-2">
            <FlatList
              data={optionsMenu}
              keyExtractor={(item, index) => `opt-${item.label}-#${index}`}
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
        <PDFModal
          isOpen={isPDFModalOpen}
          dismiss={() => setIsPDFModalOpen(false)}
          movement={movement}
          companyName={selectedCompany?.name ?? company?.name ?? ''}
          coolingUnit={coolingUnit}
          currency={company?.currency ?? ''}
        />
        <DetailsModal
          isOpen={isDetailsModalOpen}
          movement={movement}
          dismiss={() => setIsDetailsModalOpen(false)}
        />
      </Portal>
    </View>
  );
}
