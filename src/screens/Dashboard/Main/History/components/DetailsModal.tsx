import React, { useMemo } from 'react';
import { FlatList, ScrollView, View, Dimensions } from 'react-native';
import { Dialog, Divider, Icon } from 'react-native-paper';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { EInitiatedFor, EPaymentMethod, MovementCrate } from '#types/global';
import type { TranslationPaths } from '#i18n/index';

const DIALOG_MAX_HEIGHT = Dimensions.get('window').height * 0.7;

const PAYMENT_METHOD_TRANSLATIONS: Partial<Record<EPaymentMethod, TranslationPaths>> = {
  [EPaymentMethod.CASH]: 'Dashboard.Management.RevenueAnalysis.paymentType.cash',
  [EPaymentMethod.CREDIT_CARD]: 'Dashboard.Management.RevenueAnalysis.paymentType.creditCard',
  [EPaymentMethod.BANK_TRANSFER]: 'Dashboard.Management.RevenueAnalysis.paymentType.bankTransfer',
};

type DetailsModalProps = {
  isOpen: boolean;
  movement: GetMovementsHistoryResponse[number];
  dismiss: () => void;
};

type GroupedCrates = {
  [cropName: string]: Array<MovementCrate>;
};

export function DetailsModal({ isOpen, movement, dismiss }: DetailsModalProps) {
  const { t } = useTranslationUtils();

  const { data } = useApiCall(
    'getMovementOperators',
    ColdtivateService.getMovementOperators,
    movement.id,
    { defaultData: [], skip: !isOpen }
  );

  const groupedCrates = useMemo(() => {
    const grouped: GroupedCrates = {};

    movement.checkout?.crates.forEach((crate) => {
      const cropName = crate.crop?.name ?? '';

      if (!grouped[cropName]) {
        grouped[cropName] = [];
      }

      grouped[cropName].push(crate);
    });

    return Object.entries(grouped).map(([cropName, crates]) => ({
      cropName,
      crates,
    }));
  }, [movement]);

  if (movement.initiatedFor === EInitiatedFor.CHECK_IN) return null;
  const paymentMethod = PAYMENT_METHOD_TRANSLATIONS[movement.checkout.paymentMethod];

  return (
    <Dialog
      visible={isOpen}
      onDismiss={dismiss}
      style={{ backgroundColor: 'white', maxHeight: DIALOG_MAX_HEIGHT }}
    >
      <Dialog.Title>{t('Dashboard.History.stringTemplates.movementType.checkOut')}</Dialog.Title>
      <Dialog.ScrollArea tw="px-0">
        <ScrollView tw="px-6 py-2" showsVerticalScrollIndicator>
          <View tw="space-y-1">
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.Marketplace.owner')}:
              </Text>
              &nbsp;
              {movement.checkout.crates[0].ownerName}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.operatorNameLabel')}:
              </Text>
              &nbsp;
              {movement.operator ?? ''}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.operatorNumberLabel')}:
              </Text>
              &nbsp;
              {data[0]?.user.phone ?? ''}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.pdfModal.checkOut.checkOutLabel')}:
              </Text>
              &nbsp;
              {movement.code}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.checkOutDateLabel')}:
              </Text>
              &nbsp;
              {dateFmt(movement.date.toString(), 'dd-MM-yyyy')}
            </Text>
            <View tw="flex flex-row space-x-2 items-center">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.marketSurveyLabel')}:
              </Text>
              <Icon
                source={
                  !movement.checkout.hasMarketSurvey.length
                    ? 'close-circle-outline'
                    : 'check-circle-outline'
                }
                size={18}
                color={
                  !movement.checkout.hasMarketSurvey.length ? colors.red[400] : colors.green[400]
                }
              />
            </View>
          </View>

          <View tw="space-y-1 mt-4">
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.cratesLabel')}:
              </Text>
              &nbsp;
              {movement.checkout.crates.length}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.combinedWeightLabel')}:
              </Text>
              &nbsp;
              {movement.checkout.crates.reduce((acc, curr) => (acc += curr.initialWeight), 0)}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.paymentMethodLabel')}:
              </Text>
              &nbsp;
              {paymentMethod ? t(paymentMethod) : ''}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.pdfModal.checkOut.calculatedPriceLabel')}:
              </Text>
              &nbsp;
              {movement.checkout.calculatedPrice?.toFixed(2)}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.pdfModal.checkOut.discountLabel')}:
              </Text>
              &nbsp;
              {movement.checkout.discount?.toFixed(2)}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.pdfModal.checkOut.totalPrice')}:
              </Text>
              &nbsp;
              {movement.checkout.totalPrice?.toFixed(2)}
            </Text>
          </View>

          <Divider tw="my-2 bg-gray-400" />

          <Text variant="TextBold" tw="text-lg font-bold mb-2">
            {t('Dashboard.History.detailsModal.cratesLabel')}:
          </Text>

          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={groupedCrates}
            keyExtractor={(item, index) => `${item.cropName}-${index}`}
            renderItem={({ item }) => (
              <View tw="mb-8 space-y-2">
                <View tw="flex flex-row items-center mr-8">
                  <Text variant="TextMedium" tw="text-lg text-gray-400 w-1/2">
                    {t('Dashboard.History.detailsModal.cropTypeLabel')}:
                  </Text>
                  <Text variant="TextMedium" tw="text-lg">
                    {item.cropName}
                  </Text>
                </View>
                <View tw="flex flex-row items-center mr-8">
                  <Text variant="TextMedium" tw="text-lg text-gray-400 w-1/2">
                    {t('Dashboard.History.detailsModal.checkInCodeLabel')}:
                  </Text>
                  <Text variant="TextMedium" tw="text-lg">
                    {movement.code}
                  </Text>
                </View>
                <View tw="flex flex-row items-center mr-8">
                  <Text variant="TextMedium" tw="text-lg text-gray-400 w-1/2">
                    {t('Dashboard.History.detailsModal.crateIdsLabel')}:
                  </Text>
                  <Text variant="TextMedium" tw="text-lg">
                    {item.crates
                      .map((crate) => crate.tag ?? '')
                      .filter(Boolean)
                      .join(', ')}
                  </Text>
                </View>
                <View tw="flex flex-row items-center mr-8">
                  <Text variant="TextMedium" tw="text-lg text-gray-400 w-1/2">
                    {t('Dashboard.History.pdfModal.checkIn.numberOfCratesLabel')}:
                  </Text>
                  <Text variant="TextMedium" tw="text-lg">
                    {item.crates.length}
                  </Text>
                </View>
                <View tw="flex flex-row items-center mr-8">
                  <Text variant="TextMedium" tw="text-lg text-gray-400 w-1/2">
                    {t('Dashboard.History.stringTemplates.movementType.checkedIn')}:
                  </Text>
                  <Text variant="TextMedium" tw="text-lg">
                    {movement.date ? dateFmt(movement.date.toString(), 'dd-MM-yyyy') : ''}
                  </Text>
                </View>
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
