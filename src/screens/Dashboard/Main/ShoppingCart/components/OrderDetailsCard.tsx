import React from 'react';
import { View } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

import { useTranslationUtils } from '#i18n/utils';
import { formatCurrencyWithSymbol } from '../../Dashboard/CheckIn/utils';

type OrderDetailsCardProps = {
  produceWeight: number;
  subtotal: number;
  discount: number;
  total: number;
  heading: string;
  totalLabel: string;
};

export default function OrderDetailsCard(props: OrderDetailsCardProps) {
  const { t } = useTranslationUtils();

  return (
    <React.Fragment>
      <View tw="flex-col space-y-1">
        <Text tw="text-base">{props.heading}</Text>
        <View tw="flex-col border border-solid border-zinc-300 rounded-xl px-4 py-2.5 space-y-1">
          <View tw="flex-row items-center justify-between h-8">
            <Text tw="text-base text-zinc-500">{t('Dashboard.ShoppingCart.produce')}</Text>
            <Text tw="text-base">
              {props.produceWeight}
              {t('Dashboard.ProduceDetails.kilogram').toUpperCase()}
            </Text>
          </View>

          {props.discount ? (
            <View>
              <View tw="flex-row items-center justify-between h-8">
                <Text tw="text-base text-zinc-500">{t('Dashboard.ShoppingCart.subtotal')}</Text>
                <Text tw="text-base">
                  {formatCurrencyWithSymbol(
                    'NGN', // TODO: get value from somewhere
                    props.subtotal
                  )}
                </Text>
              </View>

              <View tw="flex-row items-center justify-between h-8">
                <View tw="flex-row items-center space-x-1">
                  <Text tw="text-base text-zinc-500">{t('Dashboard.ShoppingCart.discount')}</Text>
                  <IconButton
                    tw="p-0 m-0"
                    icon="information-outline"
                    size={17}
                    iconColor={colors.gray[600]}
                    containerColor={colors.transparent}
                    onPress={(evt) => {
                      evt.stopPropagation();
                      emitter.emit(APP_EVENTS.DISPATCH_LIST_COUPONS_IN_CART_MODAL);
                    }}
                  />
                </View>

                <View tw="flex-row items-center space-x-1">
                  <Icon name="minus" size={14} color={paperTheme.colors.error} />
                  <Text tw="text-base" style={{ color: paperTheme.colors.error }}>
                    {formatCurrencyWithSymbol(
                      'NGN', // TODO: get value from somewhere
                      props.discount ? props.discount.toFixed(2) : 0
                    )}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          <Divider tw="bg-gray-400 my-0.5" />

          <View tw="flex-row items-center justify-between h-8">
            <Text variant="TextMedium" tw="text-lg text-zinc-500">
              {props.totalLabel}
            </Text>
            <Text variant="TextMedium" tw="text-lg">
              {formatCurrencyWithSymbol(
                'NGN', // TODO: get value from somewhere
                props.total
              )}
            </Text>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
}
