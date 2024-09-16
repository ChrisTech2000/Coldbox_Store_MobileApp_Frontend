import React from 'react';
import { View, FlatList } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';
import truncate from 'lodash/truncate';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { useCartItems, useMarketplaceCartStore } from './store';
import { API_BASE_URL } from '#constants/environment';
import { paperTheme } from '#ui/lib/theme';

import CartItemInput from './components/CartItemInput';

function ShoppingCartRoot() {
  const datums = useCartItems();

  if (datums.length === 0) {
    return (
      <View tw="flex-1 items-center justify-center space-y-3.5">
        <View tw="h-36 w-36 items-center justify-center rounded-full bg-zinc-100">
          <Icon name="cart-remove" size={60} color={paperTheme.colors.primary} />
        </View>
        <Text tw="text-base">Your cart is empty</Text>
      </View>
    );
  }

  return (
    <ScrollView tw="px-4 pt-3 bg-white" showsVerticalScrollIndicator={false}>
      <View tw="flex-1 pb-8">
        <Button
          onPress={() => {
            useMarketplaceCartStore.getState().addItem({
              id: Math.random(),
              cropName: 'Wheat',
              movementCode: 'WHT2024',
              sellerName: 'John Doe Farms',
              cropImage: 'crop_images/apple.png',
              crateTag: 'CRT123456',
              weight: 2,
              price: 1.75,
              coolingUnitId: 5,
              coolingUnitName: 'Unit A',
              pickupDistance: 7.5,
              quantity: 1,
            });
          }}
        >
          Add
        </Button>
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
                      <Text variant="TextMedium" tw="text-base">
                        $ {item.price.toFixed(2)}/KG
                      </Text>
                    </View>
                    <View tw="flex-row items-center justify-between">
                      <Text tw="text-base text-zinc-600">
                        {truncate(item.cropName, { length: 10 })}
                      </Text>
                      <Text tw="text-base text-zinc-600">{item.weight}KG available</Text>
                    </View>
                    <View tw="flex-row items-center justify-between">
                      <Text tw="text-base text-zinc-600">
                        {truncate(item.crateTag, { length: 10 })}
                      </Text>
                      <Text tw="text-base text-zinc-600">
                        {truncate(item.sellerName, { length: 13 })}
                      </Text>
                    </View>
                  </View>
                </View>

                <View tw="flex-row items-center justify-between">
                  <View tw="flex-row items-center rounded-xl space-x-2 border border-solid border-zinc-500 px-2 py-1.5 w-[49%]">
                    <Icon name="account-circle-outline" size={23} color={colors.black} />
                    <Text variant="TextMedium" tw="text-base text-zinc-600">
                      {item.coolingUnitName}
                    </Text>
                  </View>
                  <View tw="flex-row items-center rounded-xl space-x-2 border border-solid border-zinc-500 px-2 py-1.5 w-[49%]">
                    <Icon name="map-marker-outline" size={23} color={colors.black} />
                    <Text variant="TextMedium" tw="text-base text-zinc-600">
                      {item.pickupDistance}KM away
                    </Text>
                  </View>
                </View>

                <View>
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
        />
      </View>
    </ScrollView>
  );
}

export default withSafeArea(ShoppingCartRoot);
