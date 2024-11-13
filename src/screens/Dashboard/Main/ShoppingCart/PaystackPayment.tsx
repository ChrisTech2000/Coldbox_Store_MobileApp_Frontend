import React from 'react';
import { View } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { ActivityIndicator } from 'react-native-paper';
import ms from 'ms';

import { withSafeArea } from '#ui/primitives/withSafeArea';
import { paperTheme } from '#ui/lib/theme';
import { GenericError } from '#ui/components/GenericError';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { waitFor } from '#ui/lib/waitFor';

import { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';
import useCartStore from '#stores/shoppingCart';
import { useDashboardStore } from '#stores/dashboard';

const TRANSACTION_COMPLETED_URL = '/payment/callback';
const TRANSACTION_CANCELLED_URL = '/payment/cancel';

function PaystackPayment(props: ShoppingCartStackRouteProps<'PaystackPayment'>) {
  const fetchCart = useCartStore((store) => store.fetchCart);
  const refreshData = useDashboardStore((store) => store.refreshData);

  async function handleNavigationStateChange(navState: WebViewNavigation) {
    const { url } = navState;

    if (url.includes(TRANSACTION_COMPLETED_URL)) {
      refreshData.forEach((fn) => fn());
      props.navigation.navigate('OrderOverview', { orderId: props.route.params.orderId });
    }

    if (url.includes(TRANSACTION_CANCELLED_URL)) {
      props.navigation.navigate('IncompleteOrderOverview', { orderId: props.route.params.orderId });
      waitFor(ms('2 second')).then(fetchCart);
    }
  }

  return (
    <WebView
      source={{ uri: props.route.params.url }}
      style={{ flex: 1, marginTop: '20%' }}
      renderLoading={() => (
        <View tw="flex-1 items-center justify-center">
          <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
        </View>
      )}
      onNavigationStateChange={handleNavigationStateChange}
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
