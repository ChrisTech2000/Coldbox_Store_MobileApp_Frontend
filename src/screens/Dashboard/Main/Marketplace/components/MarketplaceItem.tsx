import React, { type PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';

import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import { cn } from '#ui/lib/cn';

export default function MarketplaceItemWrapper(props: PropsWithChildren) {
  return (
    <View tw="flex-row w-full my-3 rounded-lg overflow-hidden border border-solid border-zinc-300">
      <View tw="w-2 bg-red-700 h-full" />
      <View tw="p-3">{props.children}</View>
    </View>
  );
}

MarketplaceItemWrapper.Body = function _MarketplaceItemBody(props: {
  shelfLife: number;
  cropName: string;
  movementCode: string;
  cropImageUri: string;
}) {
  return (
    <View tw="w-full flex-row items-start justify-between">
      <View tw="flex-col">
        <View tw="flex-row items-center space-x-2">
          <MaterialCommunityIcon name="timer-outline" size={23} color={colors.red[700]} />
          <Text variant="TextMedium" tw="text-base text-red-700">
            {props.shelfLife} days left
          </Text>
        </View>

        <View tw="my-1.5">
          <Text variant="TextMedium" tw="text-xl">
            {props.cropName}
          </Text>
          <Text tw="text-base text-gray-500">{props.movementCode}</Text>
        </View>
      </View>

      <FastImage tw="w-24 h-20" resizeMode="contain" source={{ uri: props.cropImageUri }} />
    </View>
  );
};

MarketplaceItemWrapper.CompanyAction = function _MarketplaceItemBody(props: {
  company: { name: string; country: string; address: string; latitude: number; longitude: number };
  coolingUnitName: string;
  readOnly?: boolean;
}) {
  if (props.readOnly) {
    return (
      <Text tw="text-base text-gray-500">
        {props.company.name}&nbsp;-&nbsp;{props.coolingUnitName}
      </Text>
    );
  }

  return (
    <Touchable
      tw="flex-row items-center justify-center space-x-2.5 px-1.5 py-2 self-start mb-0.5"
      rippleColor={colors.zinc[200]}
      onPress={(evt) => {
        evt.stopPropagation();
        emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_COMPANY_MODAL, props.company);
      }}
    >
      <MaterialCommunityIcon
        name="information-outline"
        size={19}
        color={paperTheme.colors.primary}
      />
      <Text tw="text-base text-gray-500">
        {props.company.name}&nbsp;-&nbsp;{props.coolingUnitName}
      </Text>
    </Touchable>
  );
};

MarketplaceItemWrapper.BuyAction = function _MarketplaceItemBody(props: {
  crateWeight: number;
  price: number;
  onAddFunc?: () => void;
}) {
  const hasAction = typeof props.onAddFunc === 'function';

  return (
    <React.Fragment>
      <Divider tw="bg-gray-400 my-0.5" />

      <View tw="flex-row items-center py-1 justify-between">
        <View tw={cn('flex-row items-center justify-between pr-2', hasAction ? 'w-3/4' : 'w-full')}>
          <Text variant="TextMedium" tw="text-base">
            {props.crateWeight}KG available
          </Text>
          <Text variant="TextMedium" tw="text-base">
            ${props.price} / KG
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
              <Text variant="TextMedium" tw="text-base text-green-primary">
                ADD
              </Text>
            </Touchable>
          </React.Fragment>
        ) : null}
      </View>
    </React.Fragment>
  );
};
