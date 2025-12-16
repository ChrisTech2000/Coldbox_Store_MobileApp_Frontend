import React, { useState } from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import * as BottomSheet from '#ui/components/BottomSheet';
import { Button } from '#ui/components/Button';
import { CurrencyText } from '#ui/components/CurrencyText';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';

import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { useTranslationUtils } from '#i18n/utils';
import { GetAllSalesResponse } from '#types/api.responses';

type SaleItem = GetAllSalesResponse[number];

export default function FeeBreakdownBottomSheet() {
  const { t } = useTranslationUtils();

  const [data, setData] = useState<SaleItem | undefined>(undefined);
  const [modalRef, modalActions] = BottomSheet.useBottomSheet();

  useAppEventListener(APP_EVENTS.DISPATCH_FEE_BREAKDOWN_BOTTOM_SHEET, (saleData: SaleItem) => {
    modalActions.open();
    setData(saleData);
  });

  const coolingFee = data?.coolingUnitPayout ?? 0;
  const amountReceived = data?.sellerPayout ?? 0;
  const soldFor = coolingFee + amountReceived;
  const currency = data?.currency ?? DEFAULT_CURRENCY_CODE;

  return (
    <BottomSheet.Root ref={modalRef} onClose={() => setData(undefined)}>
      <BottomSheet.Content tw="pt-2.5 space-y-3.5">
        <Text tw="text-xl font-semibold">{t('Dashboard.MyOrders.transactionDetails')}</Text>

        <View tw="bg-green-50 rounded-lg p-4 space-y-3">
          <View tw="flex-row justify-between items-center">
            <Text tw="text-base">{t('Dashboard.MyOrders.soldFor')}</Text>
            <CurrencyText
              currency={currency}
              amount={soldFor}
              containerTw="text-base"
              symbolTw="text-gray-500"
            />
          </View>

          <View tw="flex-row justify-between items-center">
            <Text tw="text-base">{t('Dashboard.MyOrders.coolingFees')}</Text>
            <View tw="flex-row">
              <Text tw="text-base text-red-600">-</Text>
              <CurrencyText
                currency={currency}
                amount={coolingFee}
                containerTw="text-base text-red-600"
                symbolTw="text-gray-500"
                amountTw="text-red-600"
              />
            </View>
          </View>

          <Divider tw="bg-emerald-500 h-[1px]" />

          <View tw="flex-row justify-between items-center">
            <Text tw="text-base">{t('Dashboard.MyOrders.amountReceived')}</Text>
            <CurrencyText
              currency={currency}
              amount={amountReceived}
              containerTw="text-base text-green-primary"
              symbolTw="text-gray-500"
              amountTw="text-green-primary font-bold"
            />
          </View>
        </View>

        <View tw="space-y-3">
          <View>
            <Text tw="text-base">
              <Text tw="font-semibold">{t('Dashboard.MyOrders.soldFor')}:</Text>{' '}
              {t('Dashboard.MyOrders.soldForDescription')}
            </Text>
          </View>

          <View>
            <Text tw="text-base">
              <Text tw="font-semibold">{t('Dashboard.MyOrders.coolingFees')}:</Text>{' '}
              {t('Dashboard.MyOrders.coolingFeeDescription')}
            </Text>
          </View>

          <View>
            <Text tw="text-base">
              <Text tw="font-semibold">{t('Dashboard.MyOrders.amountReceived')}:</Text>{' '}
              {t('Dashboard.MyOrders.amountReceivedDescription')}
            </Text>
          </View>
        </View>
      </BottomSheet.Content>
      <BottomSheet.Footer>
        <Button
          mode="contained"
          tw="w-5/6"
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            modalActions.close();
          }}
        >
          {t('Dashboard.ShoppingCart.gotItButton')}
        </Button>
      </BottomSheet.Footer>
    </BottomSheet.Root>
  );
}
