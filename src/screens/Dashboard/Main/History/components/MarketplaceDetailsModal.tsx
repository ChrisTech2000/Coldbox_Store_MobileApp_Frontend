import React, { useMemo } from 'react';
import { Dimensions, Platform, ScrollView, View } from 'react-native';
import { Dialog, Divider } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';
import { LanguageManager, dateFmt, useTranslationUtils } from '#i18n/utils';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { EInitiatedFor, EPaymentGateway } from '#types/global';
import { cn } from '#ui/lib/cn';

const DIALOG_MAX_HEIGHT = Dimensions.get('window').height * 0.7;

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-6',
  ios: 'mx-6',
});

type DetailsModalProps = {
  isOpen: boolean;
  movement: GetMovementsHistoryResponse[number];
  dismiss: () => void;
};

export function MarketplaceDetailsModal({ isOpen, movement, dismiss }: DetailsModalProps) {
  const companyCountry = useManagementStore(useShallow((store) => store.company?.country));
  const farmerCountry = useDashboardStore(useShallow((store) => store.farmerCountry));

  const { t } = useTranslationUtils();
  const locale = LanguageManager.read();

  const [checkoutCropNames, checkinCropNames] = useMemo(() => {
    const checkoutCrates = movement.checkout?.crates;
    const checkinCrates = movement.checkin?.crates;

    const { buildMap, find } = cropTranslationLookup();
    const translationMap = buildMap();
    const country = companyCountry || farmerCountry || undefined;

    const _translateCrates = (crates: typeof checkoutCrates) => {
      const cropSet = new Set<string>();
      for (const crate of crates) {
        const name = crate.crop?.name;
        if (!name) continue;
        const translated = find(translationMap, { name, country, locale });
        if (translated) cropSet.add(translated);
      }
      return Array.from(cropSet);
    };

    return [_translateCrates(checkoutCrates), _translateCrates(checkinCrates)];
  }, [movement, companyCountry, farmerCountry, locale]);

  if (movement.initiatedFor !== EInitiatedFor.MARKETPLACE_ORDER) return null;

  return (
    <Dialog
      visible={isOpen}
      onDismiss={dismiss}
      style={{ backgroundColor: 'white', maxHeight: DIALOG_MAX_HEIGHT }}
    >
      <Dialog.Title>
        {t('navigation.dashboard.Marketplace')} {}
      </Dialog.Title>
      <Dialog.ScrollArea tw="px-0">
        <ScrollView tw={cn('py-2', HORIZONTAL_SPACING)} showsVerticalScrollIndicator>
          <Text tw="text-base font-bold">{t('Dashboard.History.pdfModal.dateLabel')}:</Text>
          <Text tw="text-base">{dateFmt(movement.date.toString(), 'dd-MM-yyyy hh:mm:ss')}</Text>

          <Divider tw="my-4 bg-gray-400" />

          <View tw="space-y-1">
            <Text tw="text-base font-bold">
              {t('Dashboard.History.stringTemplates.movementType.checkedOut')}:
            </Text>

            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.Marketplace.owner')}:
              </Text>
              &nbsp;
              {Array.from(new Set(movement.checkout?.crates.map((crate) => crate.ownerName))).join(
                ', '
              )}
            </Text>
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
              {movement.checkout?.crates.reduce(
                (acc, curr) => (acc += curr.affectedWeight ?? 0),
                0
              )}
              {t('Dashboard.ProduceDetails.kilogram')}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.Analytics.farmersAnalytics.crops')}:
              </Text>
              &nbsp;
              {checkoutCropNames.join(', ')}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.paymentMethodLabel')}:
              </Text>
              &nbsp;
              {movement.checkout?.paymentGateway === EPaymentGateway.PAYSTACK
                ? 'PAYSTACK'
                : movement.checkout?.paymentGateway}
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

          <Divider tw="my-4 bg-gray-400" />

          <View tw="space-y-1 pb-6">
            <Text tw="text-base font-bold">
              {t('Dashboard.History.stringTemplates.movementType.checkedIn')}:
            </Text>

            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.Marketplace.owner')}:
              </Text>
              &nbsp;
              {movement.checkin?.ownerName}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.checkInCodeLabel')}:
              </Text>
              &nbsp;
              {movement.code}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.cratesLabel')}:
              </Text>
              &nbsp;
              {movement.checkin?.crates.length}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.combinedWeightLabel')}:
              </Text>
              &nbsp;
              {movement.checkin?.crates.reduce((acc, curr) => (acc += curr.initialWeight ?? 0), 0)}
              {t('Dashboard.ProduceDetails.kilogram')}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.Analytics.farmersAnalytics.crops')}:
              </Text>
              &nbsp;
              {checkinCropNames.join(', ')}
            </Text>
          </View>
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
