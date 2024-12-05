import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import isEmpty from 'lodash/isEmpty';
import Clipboard from '@react-native-clipboard/clipboard';

import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import InAppNotifications from '#common/InAppNotifications';

import { useTranslationUtils } from '#i18n/utils';
import ColdtivateService from '#services/ColdtivateService';
import { useApiCall } from '#services/hooks/useAPiCall';
import { EPickUpMethod, EPricingType, type CoolingUnit } from '#types/global';

import { formatCurrencyWithSymbol } from '../../Dashboard/CheckIn/utils';

type PickupDetailsCardProps = {
  companyId: number;
  coolingUnit: CoolingUnit;
  orderId: number;
  pickupMethod: EPickUpMethod;
};

export function PickupDetailsCard({
  companyId,
  coolingUnit,
  orderId,
  pickupMethod,
}: PickupDetailsCardProps) {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();

  const { data: location } = useApiCall('getLocation', ColdtivateService.getLocation, {
    companyId,
    locationId: coolingUnit.location,
  });

  const address = useMemo(() => {
    if (isEmpty(location)) return;
    return `${location.street ? location.street + ' ' : ''}${location.streetNumber ? location.streetNumber + ', ' : ''} ${location.city}${location.latitude ? ` (${location.latitude}, ${location.longitude})` : ''}`;
  }, [location]);

  const copyToClipboard = useCallback(
    (text: string) => {
      Clipboard.setString(text);
      toast.show(t('Dashboard.ProduceDetails.contactCopied'), { type: 'md_success' });
    },
    [toast]
  );

  return (
    <View tw="mb-4">
      <Text tw="text-base ml-1">{coolingUnit?.name ?? ''}</Text>
      <View tw="flex flex-row items-center space-x-1 mt-1 mb-2 ml-1">
        <MaterialIcon name="location-pin" size={18} color={paperTheme.colors.primary} />
        {address ? (
          <Text>{address}</Text>
        ) : (
          <ActivityIndicator animating color={paperTheme.colors.primary} size={12} />
        )}
        {address ? (
          <TouchableOpacity onPress={() => copyToClipboard(address)}>
            <Icon source="content-copy" size={15} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View tw="p-4 border border-gray-300 rounded-xl">
        <View tw="flex flex-row items-center justify-between">
          <View tw="flex flex-row items-center">
            <Text tw="font-bold text-base">{t('Dashboard.ShoppingCart.method')} </Text>
            <Text tw="text-base">
              {pickupMethod === EPickUpMethod.PICK_UP_SAME_DAY
                ? t('Dashboard.ShoppingCart.pickUpToday')
                : ''}
              {pickupMethod === EPickUpMethod.DELIVERY ? t('Dashboard.ShoppingCart.delivery') : ''}
              {pickupMethod === EPickUpMethod.KEEP_IN_STORAGE
                ? t(
                    coolingUnit?.commonPricingType?.type === EPricingType.PERIODICITY
                      ? 'Dashboard.ShoppingCart.keepInStorageDailyRate'
                      : 'Dashboard.ShoppingCart.keepInStorageFixedRate',
                    {
                      price: formatCurrencyWithSymbol(
                        'NGN', // TODO: get value from somewhere
                        coolingUnit?.commonPricingType?.value ?? 0
                      ),
                    }
                  )
                : ''}
            </Text>
          </View>

          {pickupMethod === EPickUpMethod.DELIVERY ? (
            <Touchable
              onPress={(evt) => {
                evt.stopPropagation();
                emitter.emit(APP_EVENTS.DISPATCH_SHOPPING_CART_DELIVERY_INFORMATION, {
                  orderId: orderId,
                  coolingUnitId: coolingUnit.id,
                });
              }}
            >
              <Text tw="text-base text-green-primary">
                {t('Dashboard.ShoppingCart.viewContacts')}
              </Text>
            </Touchable>
          ) : null}
        </View>
        {pickupMethod === EPickUpMethod.DELIVERY ? (
          <Text tw="text-sm text-gray-500 mt-2">
            {t('Dashboard.ShoppingCart.deliveryInfo', {
              value: formatCurrencyWithSymbol('NGN', coolingUnit?.commonPricingType?.value ?? 0),
            })}
          </Text>
        ) : pickupMethod === EPickUpMethod.PICK_UP_SAME_DAY ? (
          <Text tw="text-sm text-gray-500 mt-2">{t('Dashboard.ShoppingCart.pickUpTodayInfo')}</Text>
        ) : (
          <Text tw="text-sm text-gray-500 mt-2">
            {t('Dashboard.ShoppingCart.keepInStorageInfo')}
          </Text>
        )}
      </View>
    </View>
  );
}
