import React from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Divider } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { Touchable } from '#ui/components/Touchable';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { paperTheme } from '#ui/lib/theme';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { API_BASE_URL } from '#constants/environment';

import OrderDetailsCard from './components/OrderDetailsCard';
import DeliveryInformationBottomSheet, {
  type DeliveryInformationDatum,
} from './components/DeliveryInformationBottomSheet';

// TODO → add text content to translations
function OrderOverview() {
  return (
    <React.Fragment>
      <ScrollView tw="px-4 bg-white" showsVerticalScrollIndicator={false}>
        <View tw="pt-14 pb-24">
          <View tw="flex-1 pb-8 space-y-6">
            <View tw="items-center justify-center space-y-1.5 py-4">
              <MaterialCommunityIcon
                name="checkbox-marked-circle-outline"
                color={paperTheme.colors.primary}
                size={65}
              />
              <Text tw="text-2xl">Thank You for Ordering</Text>
            </View>

            <View>
              <OrderDetailsCard heading="Order overview" totalLabel="Order total" />
            </View>

            <View tw="flex-col space-y-5">
              <Text tw="text-base text-green-primary font-bold">Pickup method</Text>
              <View tw="border border-solid border-zinc-300 rounded-xl px-4 py-2.5 space-y-1">
                <View tw="flex-row items-center justify-between">
                  <Text tw="text-base font-bold">Delivery</Text>
                  <Touchable
                    tw="p-2"
                    onPress={(evt) => {
                      evt.stopPropagation();
                      emitter.emit(APP_EVENTS.DISPATCH_SHOPPING_CART_DELIVERY_INFORMATION, [
                        {
                          companyName: 'Mosano',
                          phoneNumber: '+0123456789',
                          produces: [{ cropName: 'Banana', weight: 2, code: 'CU05-03' }],
                        },
                        {
                          companyName: 'Lorem Ipsum',
                          phoneNumber: '+0123456789',
                          produces: [{ cropName: 'Banana', weight: 2, code: 'CU05-03' }],
                        },
                      ] satisfies Array<DeliveryInformationDatum>);
                    }}
                  >
                    <Text tw="text-base text-green-primary">View contact(s)</Text>
                  </Touchable>
                </View>
              </View>
            </View>

            <View tw="space-y-5">
              <View tw="flex-row items-center justify-between">
                <Text tw="text-base text-green-primary font-bold">Payment method</Text>
              </View>
              <View tw="justify-center border border-solid border-zinc-300 rounded-xl px-4 h-14">
                <Text tw="text-lg font-bold">VISA ****0329</Text>
              </View>
            </View>

            <View tw="space-y-5">
              <Text tw="text-base text-green-primary font-bold">Products</Text>
              <View tw="border border-solid border-zinc-300 rounded-md p-3">
                <View tw="flex-row items-start justify-between">
                  <View tw="flex-col items-start">
                    <Text tw="text-lg font-bold">Banana</Text>
                    <Text tw="text-zinc-500">CU05/3-1</Text>
                  </View>
                  <FastImage
                    tw="w-24 h-20"
                    resizeMode="contain"
                    source={{ uri: `${API_BASE_URL}media/crop_images/apple.png` }}
                  />
                </View>
                <Divider tw="bg-gray-400 my-2" />
                <View tw="flex-row items-center justify-between py-1.5">
                  <Text tw="font-bold">2KG</Text>
                  <Text tw="font-bold">$0.00 / KG</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <_PortalsWrapper />

      <View tw="border-t border-solid border-zinc-400 absolute left-0 bottom-0 items-center justify-center w-full py-5 bg-white">
        <Button
          mode="outlined"
          tw="w-10/12"
          onPress={(evt) => {
            evt.stopPropagation();
            // TODO
          }}
        >
          Consult My Orders
        </Button>
      </View>
    </React.Fragment>
  );
}

function _PortalsWrapper() {
  const isFocused = useIsFocused();
  if (!isFocused) return null;
  return (
    <React.Fragment>
      <DeliveryInformationBottomSheet />
    </React.Fragment>
  );
}

export default withSafeArea(OrderOverview);
