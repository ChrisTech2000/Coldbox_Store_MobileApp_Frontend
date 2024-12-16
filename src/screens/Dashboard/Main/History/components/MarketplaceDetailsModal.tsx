import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Dialog, Divider } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { EInitiatedFor, EPaymentGateway } from '#types/global';

const DIALOG_MAX_HEIGHT = Dimensions.get('window').height * 0.7;

type DetailsModalProps = {
  isOpen: boolean;
  movement: GetMovementsHistoryResponse[number];
  dismiss: () => void;
};

export function MarketplaceDetailsModal({ isOpen, movement, dismiss }: DetailsModalProps) {
  const { t } = useTranslationUtils();

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
        <ScrollView tw="px-6 py-2" showsVerticalScrollIndicator>
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
              {movement.checkin?.crates.length}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.combinedWeightLabel')}:
              </Text>
              &nbsp;
              {movement.checkin?.crates.reduce((acc, curr) => (acc += curr.weight), 0)}
              {t('Dashboard.ProduceDetails.kilogram')}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.Analytics.farmersAnalytics.crops')}:
              </Text>
              &nbsp;
              {Array.from(
                new Set(movement.checkin?.crates.map((crate) => crate.crop?.name ?? ''))
              ).join(', ')}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.paymentMethodLabel')}:
              </Text>
              &nbsp;
              {movement.checkout?.paymentGateway === EPaymentGateway.PAYTACK
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
              {movement.checkin?.crates.reduce((acc, curr) => (acc += curr.weight), 0)}
              {t('Dashboard.ProduceDetails.kilogram')}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.Analytics.farmersAnalytics.crops')}:
              </Text>
              &nbsp;
              {Array.from(
                new Set(movement.checkin?.crates.map((crate) => crate.crop?.name ?? ''))
              ).join(', ')}
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
