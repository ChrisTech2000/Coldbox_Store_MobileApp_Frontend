import React from 'react';
import { View, Text } from 'react-native';

import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';
import { Button } from 'react-native';

function ShoppingCartRoot(props: ShoppingCartStackRouteProps<'Root'>) {
  return (
    <View tw="flex-1 items-center justify-center">
      <Text>Shopping Cart</Text>
      <Button
        onPress={() => props.navigation.navigate('OrderDetails')}
        title="Go to order details"
      />
    </View>
  );
}

export default withSafeArea(ShoppingCartRoot);
