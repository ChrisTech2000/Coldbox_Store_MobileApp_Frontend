import React from 'react';
import { FlatList, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { API_BASE_URL } from '#constants/environment';

import AddToCartModal from './components/AddToCartModal';
import CompanyBottomSheet from './components/CompanyBottomSheet';
import MarketplaceFiltersSection from './components/MarketplaceFiltersSection';
import MarketplaceItemWrapper from './components/MarketplaceItem';

import { useMarketplaceListing } from './utils';

function MarketplaceRoot() {
  const { data } = useMarketplaceListing();

  return (
    <React.Fragment>
      <MarketplaceFiltersSection />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View tw="flex-1 pb-8">
          <FlatList
            tw="px-4 pt-2"
            data={data}
            keyExtractor={(item) => `section-list-item-#${item.id}`}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <MarketplaceItemWrapper>
                <MarketplaceItemWrapper.Body
                  shelfLife={item.shelfLife}
                  cropName={item.cropName}
                  movementCode={item.movementCode}
                  cropImageUri={`${API_BASE_URL}media/${item.cropImage}`}
                />
                <MarketplaceItemWrapper.CompanyAction
                  company={item.company}
                  coolingUnitName={item.coolingUnitName}
                />
                <MarketplaceItemWrapper.BuyAction
                  crateWeight={item.crateWeight}
                  price={item.price}
                  onAddFunc={() => {
                    emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_ADD_TO_CART_MODAL, item);
                  }}
                />
              </MarketplaceItemWrapper>
            )}
          />
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
