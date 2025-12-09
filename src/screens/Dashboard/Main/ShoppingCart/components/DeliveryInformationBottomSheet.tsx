import Clipboard from '@react-native-clipboard/clipboard';
import truncate from 'lodash/truncate';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import DataloaderService from '#services/DataloaderService';

export type DeliveryInformationDatum = {
  orderId?: number;
  coolingUnitId: number;
  companyId: number;
  companyName?: string;
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

  const { data: company, refetch: refetchCompany } = useApiCall(
    'getMarketplaceCompanyById',
    DataloaderService.marketplaceCompanies.getById,
    datum?.companyId as number,
    { skip: !datum?.companyId || !isVisible }
  );

  const { data: coolingUnit, refetch: refetchCoolingUnit } = useApiCall(
    'getCoolingUnitById',
    DataloaderService.coolingUnits.getById,
    datum?.coolingUnitId as number,
    { skip: !datum?.coolingUnitId || !isVisible }
  );

  useEffect(() => {
    if (!isVisible) return;
    if (datum?.orderId) {
      refetchOrderContacts();
    } else {
      refetchCartContacts();
    }
    if (datum?.companyId) {
      refetchCompany();
    }
    if (datum?.coolingUnitId) {
      refetchCoolingUnit();
    }
  }, [
    datum?.orderId,
    datum?.coolingUnitId,
    datum?.companyId,
    isVisible,
    refetchCartContacts,
    refetchOrderContacts,
    refetchCompany,
    refetchCoolingUnit,
  ]);

  const { filteredContacts, isShowingLegacyContacts } = useMemo(() => {
    const source = datum?.orderId ? orderDeliveryContacts : cartDeliveryContacts;
    if (!source?.length) return { filteredContacts: [], isShowingLegacyContacts: false };
    const unitId = datum?.coolingUnitId;
    const companyId = datum?.companyId;
    if (!unitId) return { filteredContacts: source, isShowingLegacyContacts: false };

    const unitContacts = source.filter((c) => {
      const ids =
        c.coolingUnitId == null
          ? []
          : Array.isArray(c.coolingUnitId)
            ? c.coolingUnitId
            : [c.coolingUnitId];
      return ids.includes(unitId);
    });

    if (unitContacts.length) {
      return { filteredContacts: unitContacts, isShowingLegacyContacts: false };
    }

    const legacyContactsOnly = source.filter((c) => {
      const ids =
        c.coolingUnitId == null
          ? []
          : Array.isArray(c.coolingUnitId)
            ? c.coolingUnitId
            : [c.coolingUnitId];
      return ids.length === 0 && c.companyId === companyId;
    });

    return {
      filteredContacts: legacyContactsOnly,
      isShowingLegacyContacts: legacyContactsOnly.length > 0,
    };
  }, [
    cartDeliveryContacts,
    datum?.coolingUnitId,
    datum?.companyId,
    datum?.orderId,
    orderDeliveryContacts,
  ]);

  useAppEventListener<[{ coolingUnitId: number; orderId?: number; companyId: number }]>(
    APP_EVENTS.DISPATCH_SHOPPING_CART_DELIVERY_INFORMATION,
    (datum) => {
      setDatum(datum ?? null);
      setIsVisible(true);
      modalActions.open();
    }
  );

  return (
    <BottomSheet.Root
      ref={modalRef}
      isLoading={(datum?.orderId ? isLoadingOrderContacts : isLoadingCartContacts) || false}
    >
      <BottomSheet.Content tw="pt-2.5 space-y-3.5">
        <Text tw="text-md">{t('Dashboard.ShoppingCart.contactsForDelivery')}</Text>
        <Text tw="text-xl mb-1.5">{coolingUnit?.name ?? ''}</Text>

        {isShowingLegacyContacts && (
          <View tw="bg-orange-50 border border-orange-200 rounded-lg p-3 flex-row items-start">
            <Icon name="information-outline" size={20} color="#E17100" style={{ marginRight: 8 }} />
            <View tw="flex-1">
              <Text tw="text-sm font-semibold text-orange-900 mb-1">
                {t('Dashboard.ShoppingCart.contacts')}
              </Text>
              <Text tw="text-sm text-[#BB4D00] leading-5">
                {t('Dashboard.ShoppingCart.legacyContactsWarning', {
                  companyName: company.name ?? '',
                })}
              </Text>
            </View>
          </View>
        )}
        <FlatList
          data={filteredContacts ?? []}
          keyExtractor={(_, itemIdx) => `delivery-information-list-item-#${itemIdx}`}
          scrollEnabled={true}
          style={{ maxHeight: Dimensions.get('window').height * 0.5 }}
          ListEmptyComponent={
            <View tw="py-4 px-0">
              <Text tw="text-lg">{t('Dashboard.Management.Delivery.noAvailableContacts')}</Text>
            </View>
          }
          showsVerticalScrollIndicator={true}
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
            <Icon name="content-copy" size={16} color={paperTheme.colors.primary} />
          ) : null}
        </Touchable>
      )}
    />
  );
}
