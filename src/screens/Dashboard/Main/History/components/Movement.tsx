import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Dialog, Divider, Icon, Portal } from 'react-native-paper';
import colors from 'tailwindcss/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';

import { Text } from '#ui/components/Text';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { useAuthStore } from '#stores/auth';
import ColdtivateService from '#services/ColdtivateService';
import { type ManagementCompany, useManagementStore } from '#stores/management';
import { type GetMovementsHistoryResponse } from '#types/api.responses';
import {
  ECoolingUnitMetric,
  EMovementType,
  EPricingType,
  ERoles,
  type Company,
  type CoolingUnit,
} from '#types/global';
import { cn } from '#ui/lib/cn';

import { isWithinLast24Hours } from '../utils/dates';
import { DetailsModal } from './DetailsModal';
import { PDFModal } from './PDFModal';

type Movement = GetMovementsHistoryResponse[number];

type MovementProps = {
  movement: Movement;
  movementsWithCheckout: Array<string>;
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
  movementsWithCheckout,
  selectedCompany,
  navigateToCheckIn,
  navigateToMarketSurvey,
}: MovementProps) {
  const { t } = useTranslationUtils();
  const company = useManagementStore((store) => store.company);
  const user = useAuthStore((store) => store.user);

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
    if (!isCheckIn)
      return `${movement.totalPrice} ${company?.currency ?? selectedCompany?.currency}`;

    const price = coolingUnit?.commonPricingType?.value ?? 0;
    const suffix =
      coolingUnit?.commonPricingType?.type === EPricingType.PERIODICITY
        ? `/ ${t('Dashboard.CrateManagement.CheckIn.day')}`
        : '';

    if (coolingUnit?.commonPricingType?.metric === ECoolingUnitMetric.CRATES) {
      return `${price * movement.cratesNumber} ${company?.currency ?? selectedCompany?.currency} ${suffix}`;
    }

    return `${movement.cratesWeight * price} ${company?.currency ?? selectedCompany?.currency} ${suffix}`;
  }, [isCheckIn, movement, selectedCompany]);

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
      movement.owner,
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
              disabled:
                !isWithinLast24Hours(movement.date) ||
                movementsWithCheckout.includes(movement.code),
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
              action: () => ColdtivateService.sendCheckOutSmsReport(movement.id),
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
      <View tw="flex flex-row items-center justify-between my-2">
        {movement.code.startsWith('MO-') ? (
          <MaterialIcon name="cart-outline" size={25} color={colors.blue[400]} />
        ) : isCheckIn ? (
          <CheckIn width={20} height={20} fill={colors.green[500]} stroke={colors.green[500]} />
        ) : (
          <CheckOut width={20} height={20} fill={colors.orange[400]} stroke={colors.orange[400]} />
        )}
        <View tw="w-[50%] mx-2 h-full flex flex-col space-y-1">
          <View tw="flex flex-row items-center flex-wrap">
            <Text variant="TextBold" tw="text-base" numberOfLines={3}>
              <Text tw="text-base font-bold">{movement.code}</Text> - {movement.cratesNumber} -{' '}
              {crops}
            </Text>
          </View>
          <Text variant="TextMedium" tw="text-base">
            {dateFmt(movement.date.toString(), 'dd/MM/yyyy HH:mm a')}
          </Text>
        </View>

        <View tw="w-[35%] h-full flex flex-col justify-between space-y-1">
          <View>
            <Text variant="TextMedium" tw={cn('text-base', !isCheckIn && 'font-bold')}>
              {t('Dashboard.History.priceLabel')}:
            </Text>
            <Text variant="TextMedium" tw={cn('text-base', !isCheckIn && 'font-bold')}>
              {price}
            </Text>
          </View>

          <Text variant="TextMedium" tw="text-base" numberOfLines={1}>
            {movement.owner}
          </Text>
        </View>

        <TouchableOpacity tw="w-5" onPress={() => setIsOptionsModalOpen(true)}>
          <Icon source="dots-vertical" size={20} />
        </TouchableOpacity>
      </View>
      <Divider tw="w-full bg-gray-400" />
      <Portal>
        <Dialog
          visible={isOptionsModalOpen}
          onDismiss={() => setIsOptionsModalOpen(false)}
          style={{ backgroundColor: 'white' }}
        >
          <Dialog.Content tw="px-0">
            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={optionsMenu}
              keyExtractor={(item, index) => `opt-${item.label}-#${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  tw="w-full py-2.5 px-6"
                  onPress={item.action}
                  disabled={item.disabled}
                >
                  <Text variant="TextMedium" tw={cn('text-base', item.disabled && 'text-gray-400')}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={Divider}
            />
          </Dialog.Content>
        </Dialog>
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
