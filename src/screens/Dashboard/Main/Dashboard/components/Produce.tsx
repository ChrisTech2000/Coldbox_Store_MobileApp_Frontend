import Clipboard from '@react-native-clipboard/clipboard';
import { currencies } from 'currencies.json';
import isNil from 'lodash/isNil';
import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Divider, Icon } from 'react-native-paper';

import ColdRoom from '#assets/icons/coldroom.svg';
import MineCart from '#assets/icons/mine-cart.svg';
import InAppNotifications from '#common/InAppNotifications';
import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import { DashboardProduce, EPricingType } from '#types/global';

import { Text } from '#ui/components/Text';
import { cn } from '#ui/lib/cn';
import { useTailwindColors } from '#ui/hooks/useTailwindColors';
import RBAC from '#common/RBAC';

type ProduceProps = {
  currency: string;
  produce: DashboardProduce;
  onNavigate: () => void;
  // eslint-disable-next-line
  onLayout?: (event: any) => void;
};

export function Produce({ currency, produce, onNavigate, onLayout }: ProduceProps) {
  const { t } = useTranslationUtils();
  const toast = InAppNotifications.useToast();
  const colors = useTailwindColors();

  const generateDaysString = useCallback((days: number) => {
    return `${days} ${days > 1 ? t('Dashboard.CrateManagement.CheckOut.days') : t('Dashboard.CrateManagement.CheckOut.day')}`;
  }, []);

  const getPricing = useCallback((produce: DashboardProduce, currency: string) => {
    return `${produce.cratesCombinedCost}${currencies.find((c) => c.code === currency)?.symbol ?? ''}${produce.checkedInCrates[0]?.pricing[0]?.pricingType === EPricingType.PERIODICITY ? ` / ${t('Dashboard.CrateManagement.CheckOut.day')}` : ''}`;
  }, []);

  const copyToClipboard = useCallback(
    (text: string) => {
      Clipboard.setString(text);
      toast.show(t('Dashboard.ProduceDetails.contactCopied'), { type: 'md_success' });
    },
    [toast]
  );

  const amountOfListedCrates = useMemo(
    () =>
      produce.checkedInCrates.reduce(
        (acc, curr) => (curr?.listedInTheMarketplace ? (acc += 1) : acc),
        0
      ),
    [produce]
  );

  return (
    <View tw="flex flex-row w-[90%] mr-2 self-center mt-3" onLayout={onLayout}>
      <View
        tw={cn(
          'bg-green-400 w-2 rounded-l-lg border-y-4 border-green-400',
          produce.minimumRemainingShelfLife <= 7 &&
            produce.minimumRemainingShelfLife > 2 &&
            'bg-yellow-400 border-yellow-400',
          produce.minimumRemainingShelfLife <= 2 && 'bg-red-700 border-red-700',
          (isNil(produce.minimumRemainingShelfLife) || produce.minimumRemainingShelfLife === -1) &&
            'bg-gray-300 border-gray-300'
        )}
      />

      <View tw="h-full w-full bg-white rounded-r-lg border border-l-0 border-gray-300 py-2 pl-2 pr-10 space-y-3">
        <View tw="flex flex-row w-full justify-between items-start">
          <View tw="space-y-1">
            {!isNil(produce.minimumRemainingShelfLife) ? (
              <View tw="flex flex-row space-x-1 items-center">
                <Icon
                  source="timer-outline"
                  size={20}
                  color={
                    produce.minimumRemainingShelfLife > 7
                      ? colors.green[400]
                      : produce.minimumRemainingShelfLife <= 7 &&
                          produce.minimumRemainingShelfLife > 2
                        ? colors.yellow[400]
                        : colors.red[700]
                  }
                />
                <Text
                  variant="TextBold"
                  tw={cn(
                    'text-green-400 font-bold',
                    produce.minimumRemainingShelfLife <= 7 &&
                      produce.minimumRemainingShelfLife > 2 &&
                      'text-yellow-400',
                    produce.minimumRemainingShelfLife <= 2 && 'text-red-700'
                  )}
                >
                  {t('Dashboard.CrateManagement.CheckOut.daysLeft', {
                    amount: produce.minimumRemainingShelfLife,
                  })}
                </Text>
              </View>
            ) : null}

            <Text tw="text-base font-bold" numberOfLines={1}>
              {produce.cropName}
            </Text>

            <Text tw="text-gray-400">{produce.movementCode}</Text>
          </View>
          <FastImage
            resizeMode="contain"
            tw="w-14 h-14"
            source={{ uri: `${API_BASE_URL}media/${produce.cropImage}` }}
          />
        </View>

        <View tw="flex flex-row items-center justify-between">
          <View tw="flex flex-row items-center space-x-1">
            <MineCart width={14} height={14} />
            <Text variant="TextMedium" tw="text-base">
              {produce.cratesAmount}
            </Text>
          </View>

          <Text variant="TextMedium" tw="text-gray-400">
            {getPricing(produce, currency)}
          </Text>

          <View tw="flex flex-row items-center space-x-1">
            <ColdRoom width={16} height={16} tw="text-black" />
            <Text variant="TextMedium" tw="text-sm">
              {generateDaysString(produce.currentStorageDays)}
            </Text>
          </View>

          <RBAC.ProtectedResource action="VIEW" subject="MarketplaceListing">
            <View tw="flex flex-row items-center space-x-1">
              <Icon source="cart-outline" size={18} color={colors.gray[400]} />
              <Text variant="TextMedium" tw="text-base text-gray-400">
                {amountOfListedCrates}
              </Text>
            </View>
          </RBAC.ProtectedResource>
        </View>

        <Divider />

        <View tw="flex flex-row justify-between items-center">
          <View tw="flex flex-row items-center space-x-1">
            <Icon source="account-outline" size={20} color={colors.gray[400]} />
            <Text variant="TextMedium" tw="text-gray-400">
              {produce.owner} {!!produce.farmerId && `(#${produce.farmerId})`}
            </Text>
          </View>

          <View tw="flex flex-row items-center space-x-1">
            <Icon source="cellphone" size={20} color={colors.gray[400]} />
            <Text variant="TextMedium" tw="text-gray-400">
              {produce.ownerContact}
            </Text>
            <TouchableOpacity onPress={() => copyToClipboard(produce.ownerContact)}>
              <Icon source="content-copy" size={15} color={colors.green.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity tw="absolute right-[-3] top-[40%]" onPress={onNavigate}>
        <Icon source="chevron-right" size={30} />
      </TouchableOpacity>
    </View>
  );
}
