import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Dialog, Divider, Icon, Portal } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';
import { useShallow } from 'zustand/react/shallow';

import CheckIn from '#assets/icons/check-in.svg';
import CheckOut from '#assets/icons/check-out.svg';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import * as BottomSheet from '#ui/components/BottomSheet';

import InAppNotifications from '#common/InAppNotifications';
import { LanguageManager, dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useAuthStore } from '#stores/auth';
import { useManagementStore, type ManagementCompany } from '#stores/management';
import { type GetMovementsHistoryResponse } from '#types/api.responses';
import { EInitiatedFor, EPricingType, ERoles, type Company, type CoolingUnit } from '#types/global';
import { useDashboardStore } from '#stores/dashboard';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import { isWithinLast24Hours } from '../utils/dates';
import { sortMovementCrops } from '../utils/sortMovements';
import { DetailsModal } from './DetailsModal';
import { MarketplaceDetailsModal } from './MarketplaceDetailsModal';
import { MovementDiagram } from './MovementDiagram';
import { PDFModal } from './PDFModal';

type Movement = GetMovementsHistoryResponse[number];

type MovementProps = {
  movement: Movement;
  movements: Movement[];
  coolingUnit: CoolingUnit | null;
  selectedCompany: Company | ManagementCompany | null;
  navigateToCheckIn?: (movement: Movement, coolingUnitId?: number) => void;
  navigateToMarketSurvey?: () => void;
};

function canEditCheckIn(movement: Movement, allMovements: Movement[]): boolean {
  if (!movement?.checkin || !allMovements.length || !isWithinLast24Hours(movement.date))
    return false;

  const checkInDate = new Date(movement.date);
  const checkInCrateIds = movement.checkin.crates.map((crate) => crate.id);

  return !allMovements.some((movement) => {
    if (movement.initiatedFor !== EInitiatedFor.CHECK_OUT || !movement.checkout) return false;

    const checkoutDate = new Date(movement.date);
    const checkoutCrateIds = movement.checkout.crates.map((crate) => crate.id);

    return (
      checkoutDate > checkInDate &&
      checkoutCrateIds.some((crateId) => checkInCrateIds.includes(crateId))
    );
  });
}

export function Movement({
  movement,
  movements,
  coolingUnit,
  selectedCompany,
  navigateToCheckIn,
  navigateToMarketSurvey,
}: MovementProps) {
  const { t } = useTranslationUtils();
  const company = useManagementStore((store) => store.company);
  const user = useAuthStore((store) => store.user);
  const toast = InAppNotifications.useToast();

  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState<boolean>(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isMarketplaceDetailsModalOpen, setIsMarketplaceDetailsModalOpen] =
    useState<boolean>(false);

  const [modalRef, modalActions] = BottomSheet.useBottomSheet();

  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));
  const locale = LanguageManager.read();

  const crops = useMemo(() => {
    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    const translatedCrops = sortMovementCrops(movement, t).map((cropName) =>
      find(translationMap, {
        name: cropName,
        country: company?.country || farmerCountry || undefined,
        locale,
      })
    );

    const sorted = [...translatedCrops].sort((a, b) =>
      a.localeCompare(b, locale, { sensitivity: 'base' })
    );

    if (sorted.length <= 2) return sorted.join(', ');

    return t('Dashboard.History.cropsLabel', {
      crop: sorted.at(0),
      amount: sorted.length - 1,
    });
  }, [movement, t, company?.country, farmerCountry, locale]);

  const isCheckIn = movement.initiatedFor === EInitiatedFor.CHECK_IN;
  const isCheckOut = movement.initiatedFor === EInitiatedFor.CHECK_OUT;
  const isMarketplaceOrder = movement.initiatedFor === EInitiatedFor.MARKETPLACE_ORDER;

  const price = useMemo(() => {
    if (isCheckOut)
      return `${movement.checkout?.totalPrice.toFixed(2)} ${company?.currency ?? selectedCompany?.currency}`;

    const totalCalculatedPrice =
      movement.checkin?.crates.reduce((acc, crate) => {
        return acc + (crate.calculatedTotalPrice || 0);
      }, 0) || 0;

    const isDailyRate =
      movement.checkin?.crates[0]?.effectivePricingType === EPricingType.PERIODICITY;
    const suffix = isDailyRate ? `/ ${t('Dashboard.CrateManagement.CheckIn.day')}` : '';

    return `${totalCalculatedPrice.toFixed(2)} ${company?.currency ?? selectedCompany?.currency} ${suffix}`;
  }, [isCheckOut, movement, company, selectedCompany, t]);

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
  }, [navigateToCheckIn, movement, coolingUnit]);

  const fillMarketSurvey = useCallback(() => {
    navigateToMarketSurvey?.();
    setIsOptionsModalOpen(false);
  }, [navigateToMarketSurvey]);

  const optionsMenu = useMemo(() => {
    return [
      ...(!isMarketplaceOrder
        ? [
            {
              label: t('Dashboard.History.optionsMenu.common.pdfReceipt'),
              action: seePDFModal,
            },
          ]
        : []),
      ...(!isCheckIn && !isMarketplaceOrder
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
          modalActions.open();
          setIsOptionsModalOpen(false);
        },
      },
      ...(isCheckIn && user?.role === ERoles.OPERATOR
        ? [
            {
              label: t('Dashboard.History.optionsMenu.checkIn.edit'),
              action: editCheckIn,
              disabled: !canEditCheckIn(movement, movements),
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
  }, [
    isCheckIn,
    isCheckOut,
    isMarketplaceOrder,
    movement,
    movements,
    user,
    t,
    modalActions,
    seePDFModal,
    seeDetailsModal,
    fillMarketSurvey,
    editCheckIn,
    seeMarketplaceDetailsModal,
    toast,
  ]);

  return (
    <View tw="w-full">
      <TouchableOpacity
        tw="w-full flex flex-row items-center"
        onPress={() => setIsOptionsModalOpen(true)}
        activeOpacity={0.7}
      >
        <View tw="w-[98%] flex flex-row items-center justify-between my-2 space-x-1">
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

          <View tw="w-5">
            <Icon source="dots-vertical" size={20} />
          </View>
        </View>
        {movement.checkout?.marketSurveyDelay ? <View tw="w-2 h-2 bg-red-700 rounded-xl" /> : null}
      </TouchableOpacity>
      <Divider tw="w-full bg-gray-400" />
      <Portal>
        {isOptionsModalOpen ? (
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
                    <Text
                      variant="TextMedium"
                      tw={cn('text-base', item.disabled && 'text-gray-400')}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={Divider}
              />
            </Dialog.Content>
          </Dialog>
        ) : null}

        {isPDFModalOpen ? (
          <PDFModal
            isOpen={isPDFModalOpen}
            dismiss={() => setIsPDFModalOpen(false)}
            movement={movement}
            companyName={selectedCompany?.name ?? company?.name ?? ''}
            coolingUnit={coolingUnit}
            currency={company?.currency ?? ''}
          />
        ) : null}
        {isDetailsModalOpen ? (
          <DetailsModal
            isOpen={isDetailsModalOpen}
            movement={movement}
            dismiss={() => setIsDetailsModalOpen(false)}
          />
        ) : null}

        {isMarketplaceDetailsModalOpen ? (
          <MarketplaceDetailsModal
            isOpen={isMarketplaceDetailsModalOpen}
            movement={movement}
            dismiss={() => setIsMarketplaceDetailsModalOpen(false)}
          />
        ) : null}

        <BottomSheet.Root ref={modalRef}>
          <BottomSheet.Content>
            <MovementDiagram movement={movement} coolingUnit={coolingUnit as CoolingUnit} />
          </BottomSheet.Content>
        </BottomSheet.Root>
      </Portal>
    </View>
  );
}

type Props = { movementType: EInitiatedFor };

const _IconByMovementType = React.memo(
  function IconByMovementType({ movementType }: Props) {
    switch (movementType) {
      case EInitiatedFor.CHECK_IN:
        return (
          <CheckIn width={20} height={20} fill={colors.green[500]} stroke={colors.green[500]} />
        );
      case EInitiatedFor.CHECK_OUT:
        return <CheckOut width={20} height={20} fill={colors.red[700]} stroke={colors.red[700]} />;
      case EInitiatedFor.MARKETPLACE_ORDER:
        return <MaterialIcon name="cart-outline" size={25} color={colors.blue[500]} />;
      default:
        return null;
    }
  },
  (prev, next) => prev.movementType === next.movementType
);
