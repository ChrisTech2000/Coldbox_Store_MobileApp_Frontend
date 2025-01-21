import ms from 'ms';
import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { WebView, WebViewNavigation } from 'react-native-webview';

import { GenericError } from '#ui/components/GenericError';
import { paperTheme } from '#ui/lib/theme';
import { waitFor } from '#ui/lib/waitFor';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { ShoppingCartStackRouteProps } from '#navigation/Dashboard/Main/ShoppingCartStack';
import ColdtivateService from '#services/ColdtivateService';
import { useAuthStore } from '#stores/auth';
import { useDashboardStore } from '#stores/dashboard';
import useCartStore from '#stores/shoppingCart';
import { ERoles } from '#types/global';
import reportCrash from '#ui/lib/reportCrash';

import { useMarketplaceListing } from '../Marketplace/utils';

const TRANSACTION_COMPLETED_URL = '/payment/callback';
const TRANSACTION_CANCELLED_URL = '/payment/cancel';

function PaystackPayment(props: ShoppingCartStackRouteProps<'PaystackPayment'>) {
  const fetchCart = useCartStore((store) => store.fetchCart);
  const { refetch: refetchMarketplace } = useMarketplaceListing();
  const [refreshData, fetchGlobalInformation, farmerId] = useDashboardStore((store) => [
    store.refreshData,
    store.fetchGlobalInformation,
    store.farmerId,
  ]);
  const user = useAuthStore((store) => store.user);

  async function handleNavigationStateChange(navState: WebViewNavigation) {
    const { url } = navState;

    const { orderId, coolingUnitIds } = props.route.params || {};

    if (!orderId) return;

    if (url.includes(TRANSACTION_COMPLETED_URL)) {
      props.navigation.navigate('OrderOverview', { orderId });
      refetchMarketplace();

      const promises: Promise<unknown>[] = [];

      if (user?.role === ERoles.COOLING_USER && coolingUnitIds?.length > 0) {
        for (const id of coolingUnitIds) {
          promises.push(
            ColdtivateService.updateFarmer({
              farmerId: farmerId!,
              coolingUnitId: id,
              updateCoolingUnits: true,
            })
          );
        }
      }

      try {
        await Promise.all(promises);
      } catch (exception) {
        reportCrash(exception as Error);
      }

      fetchGlobalInformation(user!.id);
      refreshData.forEach((fn) => fn());
    }

    if (url.includes(TRANSACTION_CANCELLED_URL)) {
      props.navigation.navigate('IncompleteOrderOverview', { orderId });
      refreshData.forEach((fn) => fn());
      await waitFor(ms('2 second')).then(fetchCart);
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
