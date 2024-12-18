import React from 'react';
import { RefreshControl, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useDebouncedCallback } from 'use-debounce';

import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import AddToCartModal from './components/AddToCartModal';
import CompanyBottomSheet from './components/CompanyBottomSheet';
import MarketplaceFiltersSection from './components/MarketplaceFiltersSection';
import MarketplaceList from './modules/MarketplaceList';

import { useMarketplaceListing } from './utils';

function MarketplaceRoot() {
  const { isLoading, isValidating, refetch } = useMarketplaceListing();

  const closeMarketplaceTooltipsHandler = useDebouncedCallback(() => {
    emitter.emit(APP_EVENTS.DISPATCH_CLOSE_MARKETPLACE_TOOLTIPS);
  }, 340);

  return (
    <React.Fragment>
      <MarketplaceFiltersSection />

      <ScrollView
        showsVerticalScrollIndicator={false}
        onTouchStart={closeMarketplaceTooltipsHandler}
        refreshControl={
          <RefreshControl refreshing={isValidating || isLoading} onRefresh={refetch} />
        }
      >
        <View tw="flex-1 mb-20">
          <MarketplaceList />
        </View>
      </ScrollView>

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
