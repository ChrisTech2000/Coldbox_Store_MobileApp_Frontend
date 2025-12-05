import Clipboard from '@react-native-clipboard/clipboard';
import isEmpty from 'lodash/isEmpty';
import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Icon } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import InAppNotifications from '#common/InAppNotifications';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { useTranslationUtils } from '#i18n/utils';
import { parsePoint } from '#screens/Dashboard/Management/utils';
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

    const point = parsePoint(location.point);
    return `${location.street ? location.street + ' ' : ''}${location.streetNumber ? location.streetNumber + ', ' : ''} ${location.city}${point.latitude ? ` (${point.latitude}, ${point.longitude})` : ''}`;
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
          <TouchableOpacity
            tw="flex flex-row items-center space-x-1"
            onPress={() => copyToClipboard(address)}
            activeOpacity={0.7}
          >
            <Text>{address}</Text>
            <Icon source="content-copy" size={15} color={paperTheme.colors.primary} />
          </TouchableOpacity>
        ) : (
          <ActivityIndicator animating color={paperTheme.colors.primary} size={12} />
        )}
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
                        DEFAULT_CURRENCY_CODE,
                        coolingUnit?.commonPricingType?.value ?? 0
                      ),
                    }
                  )
                : ''}
            </Text>
          </View>

          {pickupMethod === EPickUpMethod.DELIVERY ? (
            <Touchable
              tw="py-2 px-1"
              hitSlop={{ top: 20, bottom: 20, left: 10, right: 10 }}
              onPress={(evt) => {
                evt.stopPropagation();
                emitter.emit(APP_EVENTS.DISPATCH_SHOPPING_CART_DELIVERY_INFORMATION, {
                  orderId: orderId,
                  coolingUnitId: coolingUnit.id,
                  companyId,
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
              value: formatCurrencyWithSymbol(
                DEFAULT_CURRENCY_CODE,
                coolingUnit?.commonPricingType?.value ?? 0
              ),
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
