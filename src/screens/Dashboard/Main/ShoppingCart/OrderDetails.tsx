import React from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';

import OrderDetailsCard from './components/OrderDetailsCard';
import OrderPickupMethod from './components/OrderPickupMethod';
import PaymentMethod from './components/PaymentMethod';

// TODO → add text content to translations
function OrderDetails(props: ShoppingCartStackRouteProps<'OrderDetails'>) {
  return (
    <ScrollView tw="p-4 bg-white" showsVerticalScrollIndicator={false}>
      <View tw="flex-1 pb-8 space-y-6">
        <View>
          <OrderDetailsCard heading="Order" totalLabel="Total" />
        </View>
        <View>
          <OrderPickupMethod />
        </View>
        <View>
          <PaymentMethod />
        </View>
        <View tw="flex-col w-full mt-6">
          <View tw="flex-row items-center justify-between">
            <Text tw="text-lg">Subtotal</Text>
            <Text tw="text-lg">$ 0.00</Text>
          </View>
          <Divider tw="bg-zinc-400 my-3" />
          <Button
            tw="w-5/6 self-center my-4"
            mode="contained"
            uppercase
            onPress={(evt) => {
              evt.stopPropagation();
              props.navigation.navigate('OrderOverview');
            }}
          >
            Pay
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default withSafeArea(OrderDetails);
