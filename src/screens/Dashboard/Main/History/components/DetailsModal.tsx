import React from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Divider, Icon } from 'react-native-paper';

import { Modal } from '#ui/components/Modal';
import { Text } from '#ui/components/Text';

import { dateFmt, useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { GetMovementsHistoryResponse } from '#types/api.responses';
import colors from 'tailwindcss/colors';

type DetailsModalProps = {
  isOpen: boolean;
  movement: GetMovementsHistoryResponse[number];
  dismiss: () => void;
};

export function DetailsModal({ isOpen, movement, dismiss }: DetailsModalProps) {
  const { t } = useTranslationUtils();

  const { data } = useApiCall(
    'getMovementOperators',
    ColdtivateService.getMovementOperators,
    movement.id,
    { defaultData: [], skip: !isOpen }
  );

  return (
    <Modal visible={isOpen} onDismiss={dismiss}>
      <View tw="w-[90%] bg-white mx-5 py-1 max-h-[95%] space-y-2 rounded-3xl">
        <View tw="flex flex-row space-x-2 p-2">
          <TouchableOpacity onPress={dismiss}>
            <Icon source="arrow-left" size={25} />
          </TouchableOpacity>
          <Text variant="TitleMedium">
            {t('Dashboard.History.stringTemplates.movementType.checkOut')}
          </Text>
        </View>
        <Divider tw="w-full bg-gray-400" />

        <ScrollView tw="px-2" showsVerticalScrollIndicator={false}>
          <View tw="space-y-1">
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.pdfModal.coolingUserLabel')}:
              </Text>{' '}
              {movement.owner}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.operatorNameLabel')}:
              </Text>{' '}
              {movement.operator}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.operatorNumberLabel')}:
              </Text>{' '}
              {data[0]?.user.phone ?? ''}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.pdfModal.checkOut.checkOutLabel')}:
              </Text>{' '}
              {movement.code}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.checkOutDateLabel')}:
              </Text>{' '}
              {dateFmt(movement.date.toString(), 'dd-MM-yyyy')}
            </Text>
            <View tw="flex flex-row space-x-2 items-center">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.marketSurveyLabel')}:
              </Text>
              <Icon
                source={
                  !movement.hasMarketSurvey.length ? 'close-circle-outline' : 'check-circle-outline'
                }
                size={18}
                color={!movement.hasMarketSurvey.length ? colors.red[400] : colors.green[400]}
              />
            </View>
          </View>

          <View tw="space-y-1 mt-4">
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.cratesLabel')}:
              </Text>{' '}
              {movement.cratesCheckin.length}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.combinedWeightLabel')}:
              </Text>{' '}
              {movement.cratesWeight}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.detailsModal.paymentMethodLabel')}:
              </Text>{' '}
              {movement.paymentType}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.pdfModal.checkOut.calculatedPriceLabel')}:
              </Text>{' '}
              {movement.calculatedPrice?.toFixed(2)}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.pdfModal.checkOut.discountLabel')}:
              </Text>{' '}
              {movement.discount?.toFixed(2)}
            </Text>
            <Text variant="TextBold" tw="font-bold text-lg">
              <Text variant="TextMedium" tw="text-lg">
                {t('Dashboard.History.pdfModal.checkOut.totalPrice')}:
              </Text>{' '}
              {movement.totalPrice?.toFixed(2)}
            </Text>
          </View>

          <Divider tw="my-2 bg-gray-400" />

          <Text variant="TextBold" tw="text-lg font-bold mb-2">
            {t('Dashboard.History.detailsModal.cratesLabel')}:
          </Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={movement.cratesCheckin}
            keyExtractor={(item, index) => `${item.code}-${index}`}
            renderItem={({ item: crate }) => (
              <View tw="mb-8 space-y-2">
                <View tw="flex flex-row items-center mr-8">
                  <Text variant="TextMedium" tw="text-lg text-gray-400 w-1/2">
                    {t('Dashboard.History.detailsModal.cropTypeLabel')}:
                  </Text>
                  <Text variant="TextMedium" tw="text-lg">
                    {crate.name}
                  </Text>
                </View>
                <View tw="flex flex-row items-center mr-8">
                  <Text variant="TextMedium" tw="text-lg text-gray-400 w-1/2">
                    {t('Dashboard.History.detailsModal.checkInCodeLabel')}:
                  </Text>
                  <Text variant="TextMedium" tw="text-lg">
                    {crate.code}
                  </Text>
                </View>
                <View tw="flex flex-row items-center mr-8">
                  <Text variant="TextMedium" tw="text-lg text-gray-400 w-1/2">
                    {t('Dashboard.History.detailsModal.crateIdsLabel')}:
                  </Text>
                  <Text variant="TextMedium" tw="text-lg">
                    {crate.tag ?? ' '}
                  </Text>
                </View>
                <View tw="flex flex-row items-center mr-8">
                  <Text variant="TextMedium" tw="text-lg text-gray-400 w-1/2">
                    {t('Dashboard.History.pdfModal.checkIn.numberOfCratesLabel')}:
                  </Text>
                  <Text variant="TextMedium" tw="text-lg">
                    {crate.crateAmount}
                  </Text>
                </View>
                <View tw="flex flex-row items-center mr-8">
                  <Text variant="TextMedium" tw="text-lg text-gray-400 w-1/2">
                    {t('Dashboard.History.stringTemplates.movementType.checkedIn')}:
                  </Text>
                  <Text variant="TextMedium" tw="text-lg">
                    {crate.date ? dateFmt(crate.date.toString(), 'dd-MM-yyyy') : ''}
                  </Text>
                </View>
              </View>
            )}
            nestedScrollEnabled
          />
        </ScrollView>
      </View>
    </Modal>
  );
}
