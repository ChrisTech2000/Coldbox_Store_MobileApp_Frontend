import React from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import AddToCartModal from './components/AddToCartModal';
import CompanyBottomSheet from './components/CompanyBottomSheet';
import MarketplaceFiltersSection from './components/MarketplaceFiltersSection';
import MarketplaceList from './modules/MarketplaceList';

function MarketplaceRoot() {
  return (
    <React.Fragment>
      <MarketplaceFiltersSection />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View tw="flex-1 pb-8">
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
  })
);
