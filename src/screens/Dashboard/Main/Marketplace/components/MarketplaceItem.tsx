import React, { useState, type PropsWithChildren } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Divider } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';
import { useDebouncedCallback } from 'use-debounce';
import truncate from 'lodash/truncate';

import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { cn } from '#ui/lib/cn';
import { APP_EVENTS, emitter, useAppEventListener } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

import { useTranslationUtils } from '#i18n/utils';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';
import ColdtivateService from '#services/ColdtivateService';

import type { CompanyBottomSheetDatum } from './CompanyBottomSheet';

export default function MarketplaceItemWrapper(
  props: PropsWithChildren<{ shelfLife: number | null }>
) {
  const bgColor =
    props.shelfLife === null
      ? 'bg-gray-300'
      : props.shelfLife <= 2
        ? 'bg-red-700'
        : props.shelfLife <= 7
          ? 'bg-yellow-400'
          : 'bg-green-400';

  return (
    <View tw="flex-row w-full my-2 rounded-lg overflow-hidden border border-solid border-zinc-300 bg-white">
      {!bgColor ? null : <View tw={cn('w-2 h-full', bgColor)} />}
      <View tw="p-3">{props.children}</View>
    </View>
  );
}

MarketplaceItemWrapper.Body = function _MarketplaceItemBody(props: {
  shelfLife: number | null;
  cropName: string;
  movementCode: string;
  cropImageUri: string;
}) {
  const { t } = useTranslationUtils();

  const iconColor =
    props.shelfLife === null
      ? undefined
      : props.shelfLife <= 2
        ? colors.red[700]
        : props.shelfLife <= 7
          ? colors.yellow[400]
          : colors.green[400];

  const textColor =
    props.shelfLife === null
      ? undefined
      : props.shelfLife <= 2
        ? 'text-red-700'
        : props.shelfLife <= 7
          ? 'text-yellow-400'
          : 'text-green-400';

  return (
    <View tw="w-full flex-row items-start justify-between">
      <View tw="flex-col">
        {props.shelfLife !== null ? (
          <View tw="flex-row items-center space-x-2">
            <MaterialCommunityIcon name="timer-outline" size={23} color={iconColor} />
            <Text variant="TextMedium" tw={cn('text-sm', textColor)}>
              {props.shelfLife} {t('Dashboard.ShoppingCart.daysLeft')}
            </Text>
          </View>
        ) : null}

        <View tw="my-1.5">
          <Text variant="TextMedium" tw="text-lg">
            {props.cropName}
          </Text>
          <Text tw="text-base text-gray-500">{props.movementCode}</Text>
        </View>
      </View>

      <FastImage tw="w-14 h-14" resizeMode="contain" source={{ uri: props.cropImageUri }} />
    </View>
  );
};

MarketplaceItemWrapper.CompanyAction = function _CompanyAction(props: {
  company: { name: string; id: number; locationId: number | null };
  readOnly?: boolean;
  truncate?: boolean;
}) {
  const onPressHandler = useDebouncedCallback(async () => {
    if (!props.company.locationId) return;
    const result = await ColdtivateService.getLocation({
      companyId: props.company.id,
      locationId: props.company.locationId,
    });

    const datum = {
      name: result.company.name,
      locationName: result.name,
      address: [
        result.streetNumber,
        result.street,
        result.city,
        result.state,
        result.zipCode,
        countriesDict().getNameByISO(result.company.country ?? 'NG'),
      ]
        .filter(Boolean)
        .join(', '),
      latitude: result.latitude,
      longitude: result.longitude,
    } satisfies CompanyBottomSheetDatum;

    emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_COMPANY_MODAL, datum);
  }, 600);

  const text = props.truncate ? truncate(props.company.name, { length: 16 }) : props.company.name;

  if (props.readOnly) {
    return <Text tw="text-sm text-gray-500 py-2">{text}</Text>;
  }

  return (
    <Touchable
      tw="flex-row items-center justify-center space-x-1.5 px-0.5 py-1.5 self-start"
      rippleColor={colors.zinc[200]}
      onPress={async (evt) => {
        evt.stopPropagation();
        onPressHandler();
      }}
    >
      <MaterialCommunityIcon
        name="information-outline"
        size={18}
        color={paperTheme.colors.primary}
      />
      <Text tw="text-base text-gray-500">{text}</Text>
    </Touchable>
  );
};

MarketplaceItemWrapper.BuyAction = function _BuyAction(props: {
  crateWeight: number;
  currencyValue: string;
  standardWeight: number;
  onAddFunc?: () => void;
}) {
  const { t } = useTranslationUtils();
  const hasAction = typeof props.onAddFunc === 'function';

  const [isTooltipShowing, setIsTooltipShowing] = useState<boolean>(false);

  useAppEventListener(APP_EVENTS.DISPATCH_CLOSE_MARKETPLACE_TOOLTIPS, () =>
    setIsTooltipShowing(false)
  );

  return (
    <React.Fragment>
      <Divider tw="bg-gray-400 my-0.5" />

      <View tw="flex-row items-center py-1 justify-between">
        <View tw={cn('flex-row items-center justify-between pr-2', hasAction ? 'w-3/4' : 'w-full')}>
          <View tw="flex flex-row items-center space-x-1">
            <Text variant="TextMedium" tw="text-sm">
              {props.crateWeight}
              {t('Dashboard.ShoppingCart.weight')}
            </Text>
            <TouchableOpacity
              onPress={() => {
                emitter.emit(APP_EVENTS.DISPATCH_CLOSE_MARKETPLACE_TOOLTIPS);
                setIsTooltipShowing(!isTooltipShowing);
              }}
            >
              <MaterialCommunityIcon
                name="information-outline"
                size={15}
                color={colors.gray[700]}
              />
            </TouchableOpacity>
          </View>

          <Text variant="TextMedium" tw="text-sm">
            {props.currencyValue} {t('Dashboard.ShoppingCart.perKg')}
          </Text>
        </View>

        {hasAction ? (
          <React.Fragment>
            <View tw="w-[1px] bg-zinc-300 h-2/3" />
            <Touchable
              tw="flex-row items-center justify-center space-x-1.5 py-1.5 px-3 w-auto"
              rippleColor={colors.zinc[200]}
              onPress={(evt) => {
                evt.stopPropagation();
                props.onAddFunc?.();
              }}
            >
              <MaterialCommunityIcon name="cart-plus" size={19} color={paperTheme.colors.primary} />
              <Text variant="TextMedium" tw="text-sm text-green-primary uppercase">
                {t('actions.add')}
              </Text>
            </Touchable>
          </React.Fragment>
        ) : null}

        {isTooltipShowing ? (
          <TouchableWithoutFeedback onPress={() => setIsTooltipShowing(false)}>
            <View tw="absolute bottom-8 left-4 bg-gray-800 rounded-md px-2 py-1">
              <Text tw="text-white">
                {t('Dashboard.Marketplace.standardCrateWeight', { value: props.standardWeight })}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    </React.Fragment>
  );
};
