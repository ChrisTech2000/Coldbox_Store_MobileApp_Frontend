import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { paperTheme } from '#ui/lib/theme';

import { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';

function PaystackPayment(props: ShoppingCartStackRouteProps<'PaystackPayment'>) {
  return (
    <WebView
      source={{ uri: props.route.params.url }}
      style={{ flex: 1 }}
      renderLoading={() => (
        <View tw="flex-1 items-center justify-center">
          <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
        </View>
      )}
    />
  );
}

export default withSafeArea(PaystackPayment);
