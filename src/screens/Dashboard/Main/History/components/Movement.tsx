import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Dialog, Divider, Icon, Portal } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useAuthStore } from '#stores/auth';
import { useManagementStore, type ManagementCompany } from '#stores/management';
import { type GetMovementsHistoryResponse } from '#types/api.responses';
import {
  ECoolingUnitMetric,
  EMovementType,
  EPricingType,
  ERoles,
  type Company,
  type CoolingUnit,
} from '#types/global';

import { isWithinLast24Hours } from '../utils/dates';
import { DetailsModal } from './DetailsModal';
import { PDFModal } from './PDFModal';
import { MovementDiagram } from './MovementDiagram';

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

  const modalRef = useRef<Modalize>(null);

  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);

  const crops = useMemo(() => {
    const _crops = movement.movementCrops.map((crop) => crop.name);
    if (_crops.length <= 2) return _crops.join(', ');
    return t('Dashboard.History.cropsLabel', {
      crop: _crops[0],
      amount: _crops.length - 1,
    });
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
      {
        label: t('Dashboard.History.optionsMenu.common.seeMovement'),
        action: () => modalRef.current?.open(),
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
  }, [isCheckIn, movement, user, company, selectedCompany, price, t, modalRef]);

  return (
    <View tw="w-full">
      <View tw="w-full flex flex-row items-center justify-between my-2 space-x-1">
        <_IconByMovementType movementType={movement.movementType} />

        <View tw="h-full w-[80%] space-y-1">
          <Text tw="text-base" numberOfLines={3}>
            {movement.code} - {movement.cratesNumber} - {crops}
          </Text>

          <View tw="flex flex-row justify-between space-x-1">
            <View tw="w-[55%]">
              <Text tw="text-base text-gray-400">
                {dateFmt(movement.date.toString(), 'dd/MM/yyyy HH:mm a')}
              </Text>
              <Text tw="text-base text-gray-400">{movement.owner}</Text>
            </View>
            <View tw="w-[45%] items-end">
              <Text tw="text-base">{price}</Text>
              <Text tw="text-base">
                {movement.cratesWeight} {t('Dashboard.ProduceDetails.kilogram')}
              </Text>
            </View>
          </View>
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
        <Modalize
          ref={modalRef}
          modalStyle={{
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
          adjustToContentHeight
          withHandle={false}
        >
          <View tw="w-full items-center justify-center h-10">
            <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
          </View>

          <View tw="px-4 pb-4">
            <MovementDiagram
              movement={movement}
              coolingUnit={coolingUnit as CoolingUnit}
              //onClose={modalRef.current?.close}
            />
          </View>
        </Modalize>
      </Portal>
    </View>
  );
}

function _IconByMovementType(props: { movementType: EMovementType }) {
  switch (props.movementType) {
    case EMovementType.IN:
      return <CheckIn width={20} height={20} fill={colors.green[500]} stroke={colors.green[500]} />;
    case EMovementType.OUT:
      return <CheckOut width={20} height={20} fill={colors.red[700]} stroke={colors.red[700]} />;
    case EMovementType.MARKETPLACE:
      return <MaterialIcon name="cart-outline" size={25} color={colors.blue[500]} />;
    default:
      return null;
  }
}
