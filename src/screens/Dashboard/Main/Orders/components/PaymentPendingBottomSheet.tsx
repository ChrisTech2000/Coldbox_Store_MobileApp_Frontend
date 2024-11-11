import React, { useRef, useState } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Divider, List, Portal } from 'react-native-paper';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';

import { useTranslationUtils } from '#i18n/utils';

type EmitterData = {
  onPay: (evt: GestureResponderEvent) => void;
  onCancel: (evt: GestureResponderEvent) => void;
};

// TODO: implement cancel order
export default function PaymentPendingBottomSheet() {
  const { t } = useTranslationUtils();

  const modalRef = useRef<Modalize>(null);
  const [data, setData] = useState<EmitterData | undefined>(undefined);

  useAppEventListener(APP_EVENTS.DISPATCH_PAYMENT_PENDING_BOTTOM_SHEET, (data: EmitterData) => {
    setData(data);
    modalRef.current?.open();
  });

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        adjustToContentHeight
        withHandle={false}
        onClose={() => setData(undefined)}
      >
        <View tw="w-full items-center justify-center h-10">
          <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
        </View>

        <View tw="px-4 pb-4 pt-2.5 space-y-2">
          <Text tw="text-xl">{t('Dashboard.MyOrders.status.payment-pending')}</Text>
          <List.Item
            title={t('Dashboard.ShoppingCart.pay')}
            onPress={async (evt: GestureResponderEvent) => {
              await data?.onPay(evt);
              modalRef.current?.close();
            }}
          />

          <Divider />

          <List.Item title={t('actions.cancel')} onPress={() => null} />
        </View>

        <View tw="flex flex-row w-full justify-evenly py-5 border-t border-solid border-zinc-300 mb-4">
          <Button
            mode="outlined"
            tw="w-5/6 border-green-primary"
            onPress={() => modalRef.current?.close()}
          >
            {t('Dashboard.ShoppingCart.gotItButton')}
          </Button>
        </View>
      </Modalize>
    </Portal>
  );
}
