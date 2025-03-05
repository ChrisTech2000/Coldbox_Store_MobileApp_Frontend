import React from 'react';
import { RefreshControl, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';

import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { APP_EVENTS, emitter, useAppEventListener } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import AddToCartModal from './components/AddToCartModal';
import CompanyBottomSheet from './components/CompanyBottomSheet';
import MarketplaceFiltersSection from './components/MarketplaceFiltersSection';
import MarketplaceList from './modules/MarketplaceList';

import { useMarketplaceListing } from './utils';

function MarketplaceRoot() {
  const { isLoading, isValidating, refetch } = useMarketplaceListing();

  const invalidateHandler = useDebouncedCallback(async () => {
    emitter.emit(APP_EVENTS.DISPATCH_INVALIDATE_MARKETPLACE_COORDINATES);
    await refetch();
  }, 340);

  useAppEventListener(APP_EVENTS.DISPATCH_INVALIDATE_MARKETPLACE_LISTING, async () => {
    await refetch();
  });

  return (
    <React.Fragment>
      <MarketplaceFiltersSection />
      {isLoading ? (
        <View tw="mt-16 items-center justify-center">
          <ActivityIndicator animating color={paperTheme.colors.primary} size="large" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          onTouchStart={() => emitter.emit(APP_EVENTS.DISPATCH_CLOSE_MARKETPLACE_TOOLTIPS)}
          refreshControl={
            <RefreshControl refreshing={isValidating} onRefresh={invalidateHandler} />
          }
        >
          <View tw="flex-1 mb-20">
            <MarketplaceList />
          </View>
        </ScrollView>
      )}
      <_PortalsWrapper />
    </React.Fragment>
  );
}

function _PortalsWrapper() {
  const isFocused = useIsFocused();
  if (!isFocused) return null;
  return (
    <React.Fragment>
      <AddToCartModal />
      <CompanyBottomSheet />
    </React.Fragment>
  );
}

export default withSafeArea(
  withErrorBoundary(MarketplaceRoot, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  }),
  ['bottom'],
  true
);
