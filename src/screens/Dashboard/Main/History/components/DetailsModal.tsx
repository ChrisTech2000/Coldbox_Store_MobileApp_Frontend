import React, { useMemo } from 'react';
import { Dimensions, FlatList, Platform, ScrollView, View } from 'react-native';
import { Dialog, Divider, Icon } from 'react-native-paper';
import colors from 'tailwindcss/colors';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { dateFmt, useTranslationUtils, type TranslationPaths, LanguageManager } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { EInitiatedFor, EPaymentMethod, MovementCrate } from '#types/global';
import { cn } from '#ui/lib/cn';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

const DIALOG_MAX_HEIGHT = Dimensions.get('window').height * 0.7;

const PAYMENT_METHOD_TRANSLATIONS: Partial<Record<EPaymentMethod, TranslationPaths>> = {
  [EPaymentMethod.CASH]: 'Dashboard.Management.RevenueAnalysis.paymentType.cash',
  [EPaymentMethod.CREDIT_CARD]: 'Dashboard.Management.RevenueAnalysis.paymentType.creditCard',
  [EPaymentMethod.BANK_TRANSFER]: 'Dashboard.Management.RevenueAnalysis.paymentType.bankTransfer',
};

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-4',
  ios: 'mx-4',
});

type DetailsModalProps = {
  isOpen: boolean;
  movement: GetMovementsHistoryResponse[number];
  dismiss: () => void;
};

export function DetailsModal({ isOpen, movement, dismiss }: DetailsModalProps) {
  const { t } = useTranslationUtils();

  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));
  const farmerCountry = useDashboardStore(useShallow((store) => store.farmerCountry));
  const locale = LanguageManager.read();

  const { data } = useApiCall(
    'getMovementOperators',
    ColdtivateService.getMovementOperators,
    movement.id,
    { defaultData: [], skip: !isOpen }
  );

  const [groupedCrates, cropsRecord] = useMemo(() => {
    const cropsRecord: Record<number, string> = {};
    if (!movement.checkout?.crates) return [[], cropsRecord];

    const groupedCrates = new Map<number, Array<MovementCrate>>();

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();

    for (const crate of movement.checkout.crates) {
      const translatedName = find(translationMap, {
        name: crate.crop?.name || '',
        country: companyCountry || farmerCountry || undefined,
        locale,
      });

      const datum = groupedCrates.get(crate.cropId);
      const newMovementCrate = {
        ...crate,
        crop: {
          id: crate.cropId,
          name: translatedName,
        },
      } satisfies MovementCrate;
      if (!datum) groupedCrates.set(crate.cropId, [newMovementCrate]);
      else groupedCrates.set(crate.cropId, [...datum, newMovementCrate]);
      cropsRecord[crate.cropId] = translatedName;
    }

    return [Array.from(groupedCrates.entries()), cropsRecord];
  }, [movement, companyCountry, farmerCountry, locale]);

  if (movement.initiatedFor === EInitiatedFor.CHECK_IN) return null;
  const paymentMethod = PAYMENT_METHOD_TRANSLATIONS[movement.checkout?.paymentMethod];

  return (
    <Dialog
      visible={isOpen}
      onDismiss={dismiss}
      style={{ backgroundColor: 'white', maxHeight: DIALOG_MAX_HEIGHT }}
    >
      <Dialog.Title>{t('Dashboard.History.stringTemplates.movementType.checkOut')}</Dialog.Title>
      <Dialog.ScrollArea tw="px-0">
        <ScrollView tw={cn('py-2', HORIZONTAL_SPACING)} showsVerticalScrollIndicator>
          <View tw="space-y-1">
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.Marketplace.owner')}:
              </Text>
              &nbsp;
              {movement.checkout?.crates[0].ownerName}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.operatorNameLabel')}:
              </Text>
              &nbsp;
              {movement.operator ?? ''}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.operatorNumberLabel')}:
              </Text>
              &nbsp;
              {data[0]?.user.phone ?? ''}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.pdfModal.checkOut.checkOutLabel')}:
              </Text>
              &nbsp;
              {movement.code}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.checkOutDateLabel')}:
              </Text>
              &nbsp;
              {dateFmt(movement.date.toString(), 'dd-MM-yyyy')}
            </Text>
            <View tw="flex flex-row space-x-2 items-center">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.marketSurveyLabel')}:
              </Text>
              <Icon
                source={
                  !movement.checkout?.hasMarketSurvey.length
                    ? 'close-circle-outline'
                    : 'check-circle-outline'
                }
                size={18}
                color={
                  !movement.checkout?.hasMarketSurvey.length ? colors.red[400] : colors.green[400]
                }
              />
            </View>
          </View>

          <View tw="space-y-1 mt-4">
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.cratesLabel')}:
              </Text>
              &nbsp;
              {movement.checkout?.crates.length}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.combinedWeightLabel')}:
              </Text>
              &nbsp;
              {movement.checkout?.crates.reduce((acc, curr) => (acc += curr.initialWeight), 0)}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.paymentMethodLabel')}:
              </Text>
              &nbsp;
              {paymentMethod ? t(paymentMethod) : ''}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.pdfModal.checkOut.calculatedPriceLabel')}:
              </Text>
              &nbsp;
              {movement.checkout?.calculatedPrice?.toFixed(2)}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.pdfModal.checkOut.discountLabel')}:
              </Text>
              &nbsp;
              {movement.checkout?.discount?.toFixed(2)}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.pdfModal.checkOut.totalPrice')}:
              </Text>
              &nbsp;
              {movement.checkout?.totalPrice?.toFixed(2)}
            </Text>
          </View>

          <Divider tw="my-2 bg-gray-400" />

          <Text variant="TextBold" tw="text-base font-bold mb-2">
            {t('Dashboard.History.detailsModal.cratesLabel')}:
          </Text>

          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={groupedCrates}
            extraData={cropsRecord}
            keyExtractor={([cropId], index) => `${cropId}-${index}`}
            renderItem={({ item: [cropId, crates] }) => (
              <View tw="mb-8 space-y-2">
                <Text variant="TextMedium" tw="flex flex-row text-base text-gray-400">
                  {t('Dashboard.History.detailsModal.cropTypeLabel')}:
                  <Text variant="TextMedium" tw="text-base">
                    {' '}
                    {cropsRecord[cropId]}
                  </Text>
                </Text>

                <Text variant="TextMedium" tw="flex flex-row text-base text-gray-400">
                  {t('Dashboard.History.detailsModal.checkInCodeLabel')}:
                  <Text variant="TextMedium" tw="text-base">
                    {' '}
                    {movement.code}
                  </Text>
                </Text>

                <Text variant="TextMedium" tw="flex flex-row items-center text-base text-gray-400">
                  {t('Dashboard.History.detailsModal.crateIdsLabel')}:
                  <Text variant="TextMedium" tw="text-base">
                    {crates
                      .map((crate) => crate.tag ?? '')
                      .filter(Boolean)
                      .join(', ')}
                  </Text>
                </Text>

                <Text variant="TextMedium" tw="flex flex-row items-center text-base text-gray-400">
                  {t('Dashboard.History.pdfModal.checkIn.numberOfCratesLabel')}:
                  <Text variant="TextMedium" tw="text-base">
                    {' '}
                    {crates.length}
                  </Text>
                </Text>

                <Text variant="TextMedium" tw="flex flex-row items-center text-base text-gray-400">
                  {t('Dashboard.History.stringTemplates.movementType.checkedIn')}:
                  <Text variant="TextMedium" tw="text-base">
                    {' '}
                    {movement.date ? dateFmt(movement.date.toString(), 'dd-MM-yyyy') : ''}
                  </Text>
                </Text>
              </View>
            )}
          />
        </ScrollView>
      </Dialog.ScrollArea>
      <Dialog.Actions>
        <Button
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            dismiss();
          }}
        >
          {t('actions.close')}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}
