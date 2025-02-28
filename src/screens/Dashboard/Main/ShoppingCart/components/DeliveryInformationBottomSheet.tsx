import Clipboard from '@react-native-clipboard/clipboard';
import truncate from 'lodash/truncate';
import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { List } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { Button } from '#ui/components/Button';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, useAppEventListener } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import * as BottomSheet from '#ui/components/BottomSheet';

import InAppNotifications from '#common/InAppNotifications';
import { useTranslationUtils } from '#i18n/utils';
import MarketplaceService from '#services/MarketplaceService';
import { useApiCall } from '#services/hooks/useAPiCall';

export type DeliveryInformationDatum = {
  orderId?: number;
  coolingUnitId: number;
};

export default function DeliveryInformationBottomSheet() {
  const { t } = useTranslationUtils();

  const [datum, setDatum] = useState<DeliveryInformationDatum>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalRef, modalActions] = BottomSheet.useBottomSheet();

  const {
    data: cartDeliveryContacts,
    isLoading: isLoadingCartContacts,
    refetch: refetchCartContacts,
  } = useApiCall(
    'getCartDeliveryContacts',
    MarketplaceService.getCartDeliveryContacts,
    {},
    {
      skip: !!datum?.orderId || !isVisible,
      defaultData: [],
    }
  );

  const {
    data: orderDeliveryContacts,
    isLoading: isLoadingOrderContacts,
    refetch: refetchOrderContacts,
  } = useApiCall(
    'getOrderDeliveryContacts',
    MarketplaceService.getOrderDeliveryContacts,
    datum?.orderId as number,
    {
      skip: !datum?.orderId || !isVisible,
      defaultData: [],
    }
  );

  const data = datum?.orderId ? orderDeliveryContacts : cartDeliveryContacts;

  useAppEventListener<[{ coolingUnitId: number; orderId?: number }]>(
    APP_EVENTS.DISPATCH_SHOPPING_CART_DELIVERY_INFORMATION,
    (datum) => {
      setDatum(datum ?? null);
      setIsVisible(true);

      if (datum.orderId) refetchOrderContacts();
      else refetchCartContacts();

      modalActions.open();
    }
  );

  return (
    <BottomSheet.Root ref={modalRef} isLoading={isLoadingCartContacts || isLoadingOrderContacts}>
      <BottomSheet.Content tw="pt-2.5 space-y-3.5">
        <Text tw="text-2xl mb-1.5">{t('Dashboard.ShoppingCart.contactsForDelivery')}</Text>
        <FlatList
          data={data?.filter((item) => item.coolingUnitId === datum?.coolingUnitId) ?? []}
          keyExtractor={(_, itemIdx) => `delivery-information-list-item-#${itemIdx}`}
          scrollEnabled={false}
          ListEmptyComponent={
            <View tw="py-4 px-0">
              <Text tw="text-lg">{t('Dashboard.Management.Delivery.noAvailableContacts')}</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View tw="w-full border border-solid border-zinc-300 rounded-xl py-2 px-3 my-2">
              <_Field
                label={t('Dashboard.Management.Delivery.companyName')}
                value={item.deliveryCompanyName}
                mode="text"
              />
              <_Field
                label={t('Dashboard.ShoppingCart.contactName')}
                value={item.contactName}
                mode="text"
              />
              <_Field
                label={t('Dashboard.ShoppingCart.phoneNumber')}
                value={item.phone}
                mode="clipboard"
              />
            </View>
          )}
        />
      </BottomSheet.Content>
      <BottomSheet.Footer>
        <Button
          mode="outlined"
          tw="w-5/6"
          uppercase
          onPress={() => {
            setIsVisible(false);
            modalActions.close();
          }}
        >
          {t('Dashboard.ShoppingCart.gotItButton')}
        </Button>
      </BottomSheet.Footer>
    </BottomSheet.Root>
  );
}

function _Field(props: {
  mode: 'text' | 'clipboard' | 'highlight';
  label: string;
  value: string;
  smallText?: string;
}) {
  const { t } = useTranslationUtils();
  const { mode, label, value, smallText } = props;
  const toast = InAppNotifications.useToast();

  const copyToClipboard = useCallback(
    (text: string) => {
      Clipboard.setString(text);
      toast.show(t('Dashboard.ProduceDetails.contactCopied'), { type: 'md_success' });
    },
    [toast]
  );

  return (
    <List.Item
      title={undefined}
      tw="p-0 m-0"
      left={() => (
        <View>
          <Text tw={cn('text-lg', mode === 'clipboard' || (mode === 'highlight' && 'font-bold'))}>
            {label}
          </Text>
          {mode === 'highlight' ? <Text tw="text-zinc-500">{smallText}</Text> : null}
        </View>
      )}
      right={() => (
        <Touchable
          tw="flex-row items-center justify-center space-x-1.5 pl-1 pr-0.5"
          rippleColor={colors.zinc[200]}
          onPress={(evt) => {
            evt.stopPropagation();
            if (mode === 'clipboard') copyToClipboard(value);
          }}
        >
          <Text tw={cn('text-lg', mode === 'highlight' ? 'font-bold' : 'text-zinc-500')}>
            {truncate(value, { length: 28 })}
          </Text>
          {mode === 'clipboard' ? (
            <MaterialCommunityIcon
              name="content-copy"
              size={16}
              color={paperTheme.colors.primary}
            />
          ) : null}
        </Touchable>
      )}
    />
  );
}
