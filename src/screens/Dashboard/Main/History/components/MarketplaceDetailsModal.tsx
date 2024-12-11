import React from 'react';
import { Dimensions, FlatList, ScrollView, View } from 'react-native';
import { Dialog, Divider } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import { startCase } from 'lodash';

const DIALOG_MAX_HEIGHT = Dimensions.get('window').height * 0.7;

type DetailsModalProps = {
  isOpen: boolean;
  movement: GetMovementsHistoryResponse[number];
  dismiss: () => void;
};

export function MarketplaceDetailsModal({ isOpen, movement, dismiss }: DetailsModalProps) {
  const { t } = useTranslationUtils();

  return (
    <Dialog
      visible={isOpen}
      onDismiss={dismiss}
      style={{ backgroundColor: 'white', maxHeight: DIALOG_MAX_HEIGHT }}
    >
      <Dialog.Title>{t('navigation.dashboard.Marketplace')} { }</Dialog.Title>
      <Dialog.ScrollArea tw="px-0">
        <ScrollView tw="px-6 py-2" showsVerticalScrollIndicator>
          <Text tw="text-base font-bold">
            {t('Dashboard.History.pdfModal.dateLabel')}:
          </Text>
          <Text tw="text-base">
            {dateFmt(movement.date.toString(), 'dd-MM-yyyy hh:mm:ss')}
          </Text>

          <Divider tw="my-4 bg-gray-400" />

          <View tw="space-y-1">
            <Text tw="text-base font-bold">
              {t('Dashboard.History.stringTemplates.movementType.checkedOut')}:
            </Text>

            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.cratesLabel')}:
              </Text>
              &nbsp;
              {movement.cratesNumber}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.combinedWeightLabel')}:
              </Text>
              &nbsp;
              {movement.cratesWeight}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.Analytics.farmersAnalytics.crops')}:
              </Text>
              &nbsp;
              {movement.movementCrops.map((crop) => crop.name).join(', ')}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.detailsModal.paymentMethodLabel')}:
              </Text>
              &nbsp;
              {movement.paymentGateway}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.pdfModal.checkOut.calculatedPriceLabel')}:
              </Text>
              &nbsp;
              {movement.calculatedPrice?.toFixed(2)}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.pdfModal.checkOut.discountLabel')}:
              </Text>
              &nbsp;
              {movement.discount?.toFixed(2)}
            </Text>
            <Text variant="TextBold" tw="font-bold text-base">
              <Text variant="TextMedium" tw="text-base">
                {t('Dashboard.History.pdfModal.checkOut.totalPrice')}:
              </Text>
              &nbsp;
              {movement.totalPrice?.toFixed(2)}
            </Text>
          </View>

          <Divider tw="my-4 bg-gray-400" />

          <View tw="space-y-1 mb-2">
            <Text tw="text-base font-bold">
              {t('Dashboard.History.stringTemplates.movementType.checkedIn')}:
            </Text>

            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={movement.cratesCheckin}
              keyExtractor={(item, index) => `${item.name}-${index}`}
              renderItem={({ item, index }) => (
                <View tw="mb-8 space-y-2">
                  <Text tw="text-base">
                    {startCase(t('Dashboard.CrateManagement.FarmerSurvey.modal.unit.singular.crates'))}
                    {' '}
                    {item.tag || index + 1}
                  </Text>
                  <View tw="flex flex-row items-center mr-8">
                    <Text variant="TextMedium" tw="text-base text-gray-400 w-1/2">
                      {t('Dashboard.History.detailsModal.cropTypeLabel')}:
                    </Text>
                    <Text variant="TextMedium" tw="text-base">
                      {item.name}
                    </Text>
                  </View>
                  <View tw="flex flex-row items-center mr-8">
                    <Text variant="TextMedium" tw="text-base text-gray-400 w-1/2">
                      {t('Dashboard.History.detailsModal.checkInCodeLabel')}:
                    </Text>
                    <Text variant="TextMedium" tw="text-base">
                      {movement.checkinCode}
                    </Text>
                  </View>
                  <View tw="flex flex-row items-center mr-8">
                    <Text variant="TextMedium" tw="text-base text-gray-400 w-1/2">
                      {t('Dashboard.History.pdfModal.weightLabel')}:
                    </Text>
                    <Text variant="TextMedium" tw="text-base">
                      {item.weight}
                    </Text>
                  </View>
                  <View tw="flex flex-row items-center mr-8">
                    <Text variant="TextMedium" tw="text-base text-gray-400 w-1/2">
                      {t('Dashboard.Marketplace.owner')}:
                    </Text>
                    <Text variant="TextMedium" tw="text-base">
                      {movement.owner}
                    </Text>
                  </View>
                </View>
              )}
            />
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
