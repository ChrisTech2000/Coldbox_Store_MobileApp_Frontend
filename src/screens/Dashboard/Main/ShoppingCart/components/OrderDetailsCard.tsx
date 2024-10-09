import { CurrencyStandardization } from 'currency-format-utils';
import React from 'react';
import { View } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

import { useTranslationUtils } from '#i18n/utils';

type OrderDetailsCardProps = {
  produceWeight: number;
  subtotal: number;
  discount: number;
  coolingFees: number;
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
          <View tw="flex-row items-center justify-between h-8">
            <Text tw="text-base text-zinc-500">{t('Dashboard.ShoppingCart.subtotal')}</Text>
            <Text tw="text-base">
              {CurrencyStandardization.currencyCode({
                code: 'NGN', // TODO: get value from somewhere
                value: props.subtotal,
              }).getValueFormated()}
            </Text>
          </View>
          <View tw="flex-row items-center justify-between h-8">
            <View tw="flex-row items-center space-x-1">
              <Text tw="text-base text-zinc-500">{t('Dashboard.ShoppingCart.discount')}</Text>
              {props.discount ? (
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
              ) : null}
            </View>

            <View tw="flex-row items-center space-x-1">
              <Icon name="minus" size={14} color={paperTheme.colors.error} />
              <Text tw="text-base" style={{ color: paperTheme.colors.error }}>
                {CurrencyStandardization.currencyCode({
                  code: 'NGN', // TODO: get value from somewhere
                  value: props.discount ? props.discount.toFixed(2) : 0,
                }).getValueFormated()}
              </Text>
            </View>
          </View>

          <View tw="flex-row items-center justify-between h-8">
            <View tw="flex-row items-center space-x-1">
              <Text tw="text-base text-zinc-500">{t('Dashboard.ShoppingCart.marketFees')}</Text>
            </View>

            <View tw="flex-row items-center space-x-1">
              <Icon name="plus" size={16} color={paperTheme.colors.scrim} />
              <Text tw="text-base">
                {CurrencyStandardization.currencyCode({
                  code: 'NGN', // TODO: get value from somewhere
                  value: props.coolingFees,
                }).getValueFormated()}
              </Text>
            </View>
          </View>

          <Divider tw="bg-gray-400 my-0.5" />

          <View tw="flex-row items-center justify-between h-8">
            <Text variant="TextMedium" tw="text-lg text-zinc-500">
              {props.totalLabel}
            </Text>
            <Text variant="TextMedium" tw="text-lg">
              {CurrencyStandardization.currencyCode({
                code: 'NGN', // TODO: get value from somewhere
                value: props.total,
              }).getValueFormated()}
            </Text>
          </View>
        </View>
      </View>

      {/* <Portal> // TODO: delete if current impl is accepted
        <Modalize
          ref={modalRef}
          modalStyle={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
          adjustToContentHeight
          withHandle={false}
        >
          <View tw="w-full items-center justify-center h-10">
            <View tw="h-1 w-10 bg-zinc-500 rounded-md" />
          </View>

          <View tw="px-4 pb-4 pt-2.5 space-y-3.5">
            <Text tw="text-2xl">{t('Dashboard.ShoppingCart.fees')}</Text>

            <View>
              <View tw="flex-row items-center justify-between py-3.5">
                <Text tw="text-base">{t('Dashboard.ShoppingCart.marketFees')}</Text>
                <Text tw="text-base text-zinc-500">
                  {CurrencyStandardization.currencyCode({
                    code: 'NGN', // TODO: get value from somewhere
                    value: props.coolingFees,
                  }).getValueFormated()}
                </Text>
              </View>
              <Divider tw="bg-zinc-400" />
              <View tw="flex-row items-center justify-between py-3.5">
                <Text tw="text-base">{t('Dashboard.ShoppingCart.paymentFee')}</Text>
                <Text tw="text-base text-zinc-500">
                  {CurrencyStandardization.currencyCode({
                    code: 'NGN', // TODO: get value from somewhere
                    value: props.paymentFees,
                  }).getValueFormated()}
                </Text>
              </View>
            </View>
          </View>
        </Modalize>
      </Portal> */}
    </React.Fragment>
  );
}
