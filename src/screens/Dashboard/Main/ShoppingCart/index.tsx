import truncate from 'lodash/truncate';
import React from 'react';
import { FlatList, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button, Divider, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import ColdRoom from '#assets/icons/coldroom.svg';

import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import type { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';

import CartItemInput from './components/CartItemInput';
import { useCartItems, useMarketplaceCartStore } from './store';

// TODO → add text content to translations
function ShoppingCartRoot(props: ShoppingCartStackRouteProps<'Root'>) {
  const { t } = useTranslationUtils();

  const datums = useCartItems();

  if (datums.length === 0) {
    return (
      <View tw="flex-1 items-center justify-center space-y-3.5">
        <View tw="h-36 w-36 items-center justify-center rounded-full bg-zinc-100">
          <Icon name="cart-off" size={60} color={paperTheme.colors.primary} />
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
    <ScrollView tw="px-4 pt-3 bg-white" showsVerticalScrollIndicator={false}>
      <View tw="flex-1 pb-8">
        <FlatList
          data={datums}
          keyExtractor={(item) => `marketplace-shopping-cart-list-item-#${item.id}`}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View tw="flex-row space-x-3 my-2">
              <View tw="flex-col border border-solid border-zinc-300 rounded-xl w-[86%] p-4 space-y-3">
                <View tw="flex-row space-x-4">
                  <FastImage
                    resizeMode="contain"
                    tw="w-20 h-16"
                    source={{ uri: `${API_BASE_URL}media/${item.cropImage}` }}
                  />
                  <View tw="flex-1 flex-col space-y-0.5">
                    <View tw="flex-row items-center justify-between">
                      <Text variant="TextMedium" tw="text-lg">
                        {item.movementCode}
                      </Text>
                      <Text tw="text-base text-zinc-500">
                        {truncate(item.cropName, { length: 10 })}
                      </Text>
                    </View>
                    <View tw="flex-row items-center justify-between">
                      <Text tw="text-base text-zinc-500">{item.crateTag}</Text>
                      <Text tw="text-base text-zinc-500">{item.weight}KG available</Text>
                    </View>
                    <View tw="flex-row items-center justify-between">
                      <Text tw="text-base text-zinc-500">
                        {truncate(item.coolingUserCode, { length: 10 })}
                      </Text>
                      <Text tw="text-base text-zinc-500">
                        {truncate(item.sellerName, { length: 13 })}
                      </Text>
                    </View>
                  </View>
                </View>

                <Divider tw="bg-zinc-400" />

                <View tw="flex-row items-center justify-between">
                  <View tw="flex-row items-center rounded-xl space-x-2 px-2 w-[32%]">
                    <ColdRoom width={20} height={20} tw="text-green-primary" />
                    <Text variant="TextMedium" tw="text-base text-green-primary">
                      {truncate(item.coolingUnitName, { length: 9 })}
                    </Text>
                  </View>
                  <View tw="flex-row items-center rounded-xl space-x-2 px-2 w-[32%]">
                    <Icon name="office-building-outline" size={23} color={colors.zinc[500]} />
                    <Text variant="TextMedium" tw="text-base text-zinc-500">
                      {truncate(item.companyName, { length: 8 })}
                    </Text>
                  </View>
                  <View tw="flex-row items-center rounded-xl space-x-2 px-2 w-[32%]">
                    <Icon name="map-marker-outline" size={23} color={colors.zinc[500]} />
                    <Text variant="TextMedium" tw="text-base text-zinc-500">
                      {truncate(`${item.pickupDistance}KM away`, { length: 8 })}
                    </Text>
                  </View>
                </View>

                <Divider tw="bg-zinc-400" />

                <View tw="flex-row items-center justify-between">
                  <Text variant="TextMedium" tw="text-lg">
                    ${item.price.toFixed(2)}/KG
                  </Text>
                  <CartItemInput itemId={item.id} initialValue={item.quantity} />
                </View>
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
  );
}

export default withSafeArea(
  withErrorBoundary(ShoppingCartRoot, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
