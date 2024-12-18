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

import InAppNotifications from '#common/InAppNotifications';
import { dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useAuthStore } from '#stores/auth';
import { useManagementStore, type ManagementCompany } from '#stores/management';
import { type GetMovementsHistoryResponse } from '#types/api.responses';
import {
  ECoolingUnitMetric,
  EInitiatedFor,
  EPricingType,
  ERoles,
  type Company,
  type CoolingUnit,
} from '#types/global';

import { isWithinLast24Hours } from '../utils/dates';
import { sortMovementCrops } from '../utils/sortMovements';
import { DetailsModal } from './DetailsModal';
import { MarketplaceDetailsModal } from './MarketplaceDetailsModal';
import { MovementDiagram } from './MovementDiagram';
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
    crops: Array<{ id: number; name: string }>,
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
  const toast = InAppNotifications.useToast();

  const modalRef = useRef<Modalize>(null);

  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isMarketplaceDetailsModalOpen, setIsMarketplaceDetailsModalOpen] =
    useState<boolean>(false);

  const crops = useMemo(() => {
    const _crops = sortMovementCrops(movement);
    if (_crops.length <= 2) return _crops.join(', ');
    return t('Dashboard.History.cropsLabel', {
      crop: _crops[0],
      amount: _crops.length - 1,
    });
  }, [movement]);

  const isCheckIn = movement.initiatedFor === EInitiatedFor.CHECK_IN;
  const isCheckOut = movement.initiatedFor === EInitiatedFor.CHECK_OUT;

  const price = useMemo(() => {
    if (isCheckOut)
      return `${movement.checkout?.totalPrice.toFixed(2)} ${company?.currency ?? selectedCompany?.currency}`;

    const price = coolingUnit?.commonPricingType?.value ?? 0;
    const suffix =
      coolingUnit?.commonPricingType?.type === EPricingType.PERIODICITY
        ? `/ ${t('Dashboard.CrateManagement.CheckIn.day')}`
        : '';

    if (coolingUnit?.commonPricingType?.metric === ECoolingUnitMetric.CRATES) {
      const _price = price * movement.checkin?.crates.length;
      return `${isNaN(_price) ? 0 : price} ${company?.currency ?? selectedCompany?.currency} ${suffix}`;
    }

    const _price =
      movement.checkin?.crates.reduce((acc, curr) => (acc += curr.initialWeight), 0) * price;
    return `${isNaN(_price) ? 0 : _price} ${company?.currency ?? selectedCompany?.currency} ${suffix}`;
  }, [isCheckOut, movement, selectedCompany]);

  const seePDFModal = useCallback(() => {
    setIsPDFModalOpen(true);
    setIsOptionsModalOpen(false);
  }, []);

  const seeDetailsModal = useCallback(() => {
    setIsDetailsModalOpen(true);
    setIsOptionsModalOpen(false);
  }, []);

  const seeMarketplaceDetailsModal = useCallback(() => {
    setIsMarketplaceDetailsModalOpen(true);
    setIsOptionsModalOpen(false);
  }, []);

  const editCheckIn = useCallback(() => {
    navigateToCheckIn?.(movement, coolingUnit?.id);
    setIsOptionsModalOpen(false);
  }, [navigateToCheckIn]);

  const fillMarketSurvey = useCallback(() => {
    navigateToMarketSurvey?.(
      movement.checkout?.crates[0].ownerName ?? '',
      movement.checkout?.crates
        ?.flatMap((crate) => crate.crop)
        .filter((crop) => crop && !movement.checkout?.hasMarketSurvey?.includes(crop.id)) as Array<{
        id: number;
        name: string;
      }>,
      movement.checkout?.id as number,
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
      ...(!isCheckIn
        ? [
            {
              label: t('Dashboard.History.optionsMenu.checkOut.smsReceipt'),
              action: async () => {
                await ColdtivateService.sendCheckOutSmsReport(movement.id);
                setIsOptionsModalOpen(false);
                toast.show(t('actions.done'), {
                  type: 'md_success',
                });
              },
            },
          ]
        : []),
      {
        label: t('Dashboard.History.optionsMenu.common.seeMovement'),
        action: () => {
          modalRef.current?.open();
          setIsOptionsModalOpen(false);
        },
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

      ...(isCheckOut
        ? [
            {
              label: t('Dashboard.History.optionsMenu.checkOut.seeDetails'),
              action: seeDetailsModal,
            },
            {
              label: t('Dashboard.History.optionsMenu.checkOut.marketSurvey'),
              action: fillMarketSurvey,
              disabled: !movement.checkout?.marketSurveyDelay,
            },
          ]
        : []),
      ...(!isCheckIn && !isCheckOut
        ? [
            {
              label: t('Dashboard.History.optionsMenu.checkOut.seeDetails'),
              action: seeMarketplaceDetailsModal,
            },
          ]
        : []),
    ];
  }, [isCheckIn, isCheckOut, movement, user, company, selectedCompany, price, t, modalRef]);

  return (
    <View tw="w-full">
      <View tw="w-full flex flex-row items-center justify-between my-2 space-x-1">
        <_IconByMovementType movementType={movement.initiatedFor} />

        <View tw="h-full w-[80%] space-y-1">
          <Text tw="text-base" numberOfLines={3}>
            {movement.code} -{' '}
            {movement.initiatedFor === EInitiatedFor.CHECK_IN
              ? movement.checkin?.crates.length
              : movement.checkout?.crates.length}{' '}
            - {crops}
          </Text>

          <View tw="flex flex-row justify-between space-x-1">
            <View tw="w-[55%]">
              <Text tw="text-base text-gray-400">
                {dateFmt(movement.date.toString(), 'dd/MM/yyyy HH:mm a')}
              </Text>
              <Text tw="text-base text-gray-400">
                {movement.initiatedFor === EInitiatedFor.CHECK_OUT
                  ? movement.checkout?.crates[0].ownerName
                  : movement.checkin?.ownerName}
              </Text>
            </View>
            <View tw="w-[45%] items-end">
              <Text tw="text-base">{price}</Text>
              <Text tw="text-base">
                {movement.initiatedFor === EInitiatedFor.CHECK_IN
                  ? movement.checkin?.crates.reduce((acc, curr) => (acc += curr.initialWeight), 0)
                  : movement.initiatedFor === EInitiatedFor.MARKETPLACE_ORDER
                    ? movement.checkout?.crates.reduce(
                        (acc, curr) => (acc += curr.affectedWeight ?? 0),
                        0
                      )
                    : movement.checkout?.crates.reduce(
                        (acc, curr) => (acc += curr.affectedWeight ?? 0),
                        0
                      )}{' '}
                {t('Dashboard.ProduceDetails.kilogram')}
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
        <MarketplaceDetailsModal
          isOpen={isMarketplaceDetailsModalOpen}
          movement={movement}
          dismiss={() => setIsMarketplaceDetailsModalOpen(false)}
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
            <MovementDiagram movement={movement} coolingUnit={coolingUnit as CoolingUnit} />
          </View>
        </Modalize>
      </Portal>
    </View>
  );
}

function _IconByMovementType(props: { movementType: EInitiatedFor }) {
  switch (props.movementType) {
    case EInitiatedFor.CHECK_IN:
      return <CheckIn width={20} height={20} fill={colors.green[500]} stroke={colors.green[500]} />;
    case EInitiatedFor.CHECK_OUT:
      return <CheckOut width={20} height={20} fill={colors.red[700]} stroke={colors.red[700]} />;
    case EInitiatedFor.MARKETPLACE_ORDER:
      return <MaterialIcon name="cart-outline" size={25} color={colors.blue[500]} />;
    default:
      return null;
  }
}
