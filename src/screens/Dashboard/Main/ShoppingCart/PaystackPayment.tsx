import React from 'react';
import { View } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { paperTheme } from '#ui/lib/theme';
import { GenericError } from '#ui/components/GenericError';
import { withErrorBoundary } from '#ui/primitives/error-boundary';

import { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';

const TRANSACTION_COMPLETED_URL = '/marketplace/paystack/transaction-completed';

function PaystackPayment(props: ShoppingCartStackRouteProps<'PaystackPayment'>) {
  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const { url } = navState;

    if (url.includes(TRANSACTION_COMPLETED_URL)) {
      props.navigation.navigate('OrderOverview', { orderId: props.route.params.orderId });
    }
  };

  return (
    <WebView
      source={{ uri: props.route.params.url }}
      style={{ flex: 1, marginTop: '20%' }}
      renderLoading={() => (
        <View tw="flex-1 items-center justify-center">
          <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
        </View>
      )}
      onNavigationStateChange={handleNavigationStateChange} // Listen for URL changes
    />
  );
}

export default withSafeArea(
  withErrorBoundary(PaystackPayment, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
