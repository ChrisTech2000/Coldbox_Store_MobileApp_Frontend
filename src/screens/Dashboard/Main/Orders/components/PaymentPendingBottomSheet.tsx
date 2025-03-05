import React, { useState } from 'react';
import { type GestureResponderEvent } from 'react-native';
import { Divider, List } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import * as BottomSheet from '#ui/components/BottomSheet';

import { useTranslationUtils } from '#i18n/utils';

type EmitterData = {
  onPay: (evt: GestureResponderEvent) => void;
  onCancel: (evt: GestureResponderEvent) => void;
};

// TODO: implement cancel order
export default function PaymentPendingBottomSheet() {
  const { t } = useTranslationUtils();

  const [data, setData] = useState<EmitterData | undefined>(undefined);
  const [modalRef, modalActions] = BottomSheet.useBottomSheet();

  useAppEventListener(APP_EVENTS.DISPATCH_PAYMENT_PENDING_BOTTOM_SHEET, (data: EmitterData) => {
    setData(data);
    modalActions.open();
  });

  return (
    <BottomSheet.Root ref={modalRef} onClose={() => setData(undefined)}>
      <BottomSheet.Content tw="pt-2.5 space-y-2">
        <Text tw="text-xl">{t('Dashboard.MyOrders.status.payment-pending')}</Text>
        <List.Item
          title={t('Dashboard.ShoppingCart.pay')}
          onPress={async (evt: GestureResponderEvent) => {
            modalActions.close();
            data?.onPay?.(evt);
          }}
        />
        <Divider />
        <List.Item
          title={t('actions.cancel')}
          onPress={async (evt: GestureResponderEvent) => {
            modalActions.close();
            data?.onCancel?.(evt);
          }}
        />
      </BottomSheet.Content>
      <BottomSheet.Footer>
        <Button
          mode="outlined"
          tw="w-5/6 border-green-primary"
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
