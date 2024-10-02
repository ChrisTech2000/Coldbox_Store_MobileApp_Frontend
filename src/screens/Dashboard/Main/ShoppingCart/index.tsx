import React from 'react';
import { View, FlatList } from 'react-native';
import { Divider, IconButton } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';
import { useTranslationUtils } from '#i18n/utils';
import { API_BASE_URL } from '#constants/environment';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';

import CartItemInput from './components/CartItemInput';
import CompanyBottomSheet, {
  type CompanyBottomSheetDatum,
} from '../Marketplace/components/CompanyBottomSheet';

import { useCartItems, useMarketplaceCartStore } from './store';

// TODO → add text content to translations
function ShoppingCartRoot(props: ShoppingCartStackRouteProps<'Root'>) {
  const { t } = useTranslationUtils();

  const datums = useCartItems();

  if (datums.length === 0) {
    return (
      <View tw="flex-1 items-center justify-center space-y-3.5">
        <View tw="h-36 w-36 items-center justify-center rounded-full bg-zinc-100">
          <MaterialCommunityIcon name="cart-off" size={60} color={paperTheme.colors.primary} />
        </View>
        <Text tw="text-base">Your cart is empty</Text>
      </View>
    );
  }

  const potentialPrice = datums.reduce(
    (total, item) => total + item.price * item.weight * item.quantity,
    0
  );

  return (
    <React.Fragment>
      <ScrollView tw="px-4 pt-3 bg-white" showsVerticalScrollIndicator={false}>
        <View tw="flex-1 pb-8">
          <FlatList
            data={datums}
            keyExtractor={(item) => `marketplace-shopping-cart-list-item-#${item.id}`}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View tw="flex-row w-full my-3 rounded-lg overflow-hidden border border-solid border-zinc-300 bg-white">
                <View tw="w-2 bg-red-700 h-full" />

                <View tw="flex-col p-3">
                  <View tw="w-full flex-row items-start justify-between">
                    <View tw="flex-col">
                      <View tw="flex-row items-center space-x-2">
                        <MaterialCommunityIcon
                          name="timer-outline"
                          size={23}
                          color={colors.red[700]}
                        />
                        <Text variant="TextMedium" tw="text-base text-red-700">
                          {item.shelfLife} days left
                        </Text>
                      </View>

                      <View tw="my-1.5">
                        <Text variant="TextMedium" tw="text-xl">
                          {item.cropName}
                        </Text>
                        <Text tw="text-base text-gray-500">{item.movementCode}</Text>
                      </View>
                    </View>
                    <FastImage
                      tw="w-20 h-16"
                      resizeMode="contain"
                      source={{ uri: `${API_BASE_URL}media/${item.cropImage}` }}
                    />
                  </View>
                  <Touchable
                    tw="flex-row items-center justify-center space-x-2.5 px-1.5 py-2 self-start mb-0.5"
                    rippleColor={colors.zinc[200]}
                    onPress={(evt) => {
                      evt.stopPropagation();
                      emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_COMPANY_MODAL, {
                        name: 'Mosano',
                        locationName: 'Portugal',
                        address: 'Rua D. João I, nº 256 4450-162 Matosinhos',
                        latitude: 41.178465,
                        longitude: -8.687502,
                      } satisfies CompanyBottomSheetDatum);
                    }}
                  >
                    <MaterialCommunityIcon
                      name="information-outline"
                      size={19}
                      color={paperTheme.colors.primary}
                    />
                    <Text tw="text-base text-gray-500">
                      {item.companyName}&nbsp;-&nbsp;{item.coolingUnitName}
                    </Text>
                  </Touchable>

                  <Divider tw="bg-gray-400 my-0.5 w-[97%] self-center" />
                  <View tw="flex-row items-center pt-1.5 pb-2.5 justify-between">
                    <View tw="flex-row items-center justify-between pr-2 w-full">
                      <Text variant="TextMedium" tw="text-base">
                        {item.weight}KG available
                      </Text>
                      <Text variant="TextMedium" tw="text-base">
                        ${item.price} / KG
                      </Text>
                    </View>
                  </View>

                  <Divider tw="bg-gray-400 my-0.5 w-[97%] self-center" />
                  <View tw="flex-row items-center justify-between pt-2">
                    <View>
                      <CartItemInput itemId={item.id} initialValue={item.quantity} />
                    </View>
                    <IconButton
                      mode="contained-tonal"
                      icon="trash-can-outline"
                      size={30}
                      tw="self-center"
                      iconColor={paperTheme.colors.error}
                      containerColor={colors.white}
                      onPress={(evt) => {
                        evt.stopPropagation();
                        useMarketplaceCartStore.getState().removeItem(item.id);
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
            ListFooterComponent={
              <View tw="flex-col w-full mt-6">
                <View tw="flex-row items-center justify-between">
                  <Text tw="text-lg">Total to pay</Text>
                  <Text tw="text-lg">${potentialPrice.toFixed(2)}</Text>
                </View>
                <Divider tw="bg-zinc-400 my-3" />
                <Button
                  tw="w-5/6 self-center my-4"
                  mode="contained"
                  uppercase
                  onPress={(evt) => {
                    evt.stopPropagation();
                    props.navigation.navigate('OrderDetails');
                  }}
                >
                  {t('actions.continue')}
                </Button>
              </View>
            }
          />
        </View>
      </ScrollView>

      <_PortalsWrapper />
    </React.Fragment>
  );
}

function _PortalsWrapper() {
  const isFocused = useIsFocused();
  if (!isFocused) return null;
  return (
    <React.Fragment>
      <CompanyBottomSheet />
    </React.Fragment>
  );
}

export default withSafeArea(
  withErrorBoundary(ShoppingCartRoot, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
