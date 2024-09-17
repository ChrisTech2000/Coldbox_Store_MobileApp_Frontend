import React, { useRef } from 'react';
import { View } from 'react-native';
import { Divider, IconButton, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';

import { paperTheme } from '#ui/lib/theme';
import { Modalize } from 'react-native-modalize';

// TODO → add text content to translations
export default function OrderDetailsCard() {
  const modalRef = useRef<Modalize>(null);

  return (
    <React.Fragment>
      <View tw="flex-col space-y-5">
        <Text tw="text-base text-green-primary font-bold">Order</Text>
        <View tw="flex-col border border-solid border-zinc-300 rounded-xl px-4 py-2.5 space-y-1">
          <View tw="flex-row items-center h-8">
            <Text tw="text-base text-zinc-500 w-[45%]">Produce</Text>
            <Text tw="text-base">2 KG</Text>
          </View>
          <View tw="flex-row items-center h-8">
            <Text tw="text-base text-zinc-500 w-[45%]">Subtotal</Text>
            <Text tw="text-base">$ 0.00</Text>
          </View>
          <View tw="flex-row items-center h-8">
            <Text tw="text-base text-zinc-500 w-[45%]">Discount</Text>
            <View tw="flex-row items-center space-x-1">
              <Icon name="minus" size={14} color={paperTheme.colors.error} />
              <Text tw="text-base" style={{ color: paperTheme.colors.error }}>
                $0.00
              </Text>
            </View>
          </View>
          <View tw="flex-row items-center h-8">
            <View tw="flex-row items-center space-x-1 w-[45%]">
              <Text tw="text-base text-zinc-500">Service fees</Text>
              <IconButton
                tw="p-0 m-0"
                icon="information-outline"
                size={17}
                iconColor={colors.gray[600]}
                containerColor={colors.transparent}
                onPress={(evt) => {
                  evt.stopPropagation();
                  modalRef.current?.open();
                }}
              />
            </View>
            <View tw="flex-row items-center space-x-1">
              <Icon name="plus" size={16} color={paperTheme.colors.scrim} />
              <Text tw="text-base">$ 0.00</Text>
            </View>
          </View>
          <View tw="flex-row items-center h-8">
            <Text variant="TextMedium" tw="text-base text-zinc-500 w-[45%]">
              Total
            </Text>
            <Text variant="TextMedium" tw="text-base">
              $ 0.00
            </Text>
          </View>
        </View>
      </View>

      <Portal>
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
            <Text tw="text-2xl">Service fees</Text>

            <View>
              <View tw="flex-row items-center justify-between py-3.5">
                <Text tw="text-base">Marketplace fee</Text>
                <Text tw="text-base text-zinc-500">$0.00</Text>
              </View>
              <Divider tw="bg-zinc-400" />
              <View tw="flex-row items-center justify-between py-3.5">
                <Text tw="text-base">Payment fee</Text>
                <Text tw="text-base text-zinc-500">$0.00</Text>
              </View>
            </View>
          </View>
        </Modalize>
      </Portal>
    </React.Fragment>
  );
}
