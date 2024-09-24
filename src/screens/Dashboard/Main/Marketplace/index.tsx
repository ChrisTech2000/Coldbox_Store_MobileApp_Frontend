import React from 'react';
import { SectionList, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';

import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { Text } from '#ui/components/Text';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { API_BASE_URL } from '#constants/environment';

import AddToCartModal from './components/AddToCartModal';
import CompanyBottomSheet from './components/CompanyBottomSheet';
import MarketplaceFiltersSection from './components/MarketplaceFiltersSection';
import MarketplaceItemWrapper from './components/MarketplaceItem';

function MarketplaceRoot() {
  return (
    <React.Fragment>
      <MarketplaceFiltersSection />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View tw="flex-1 pb-8">
          <SectionList
            tw="px-4 pt-3"
            sections={MOCKS}
            keyExtractor={(item) => `section-list-item-#${item.id}`}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderSectionHeader={({ section }) => (
              <View tw="flex-row items-center space-x-2">
                <MaterialCommunityIcon
                  name="map-marker-outline"
                  size={28}
                  color={colors.zinc[600]}
                />
                <Text variant="TextMedium" tw="text-base">
                  {section.title}
                </Text>
              </View>
            )}
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
                  coolingUnitName={item.coolingUnit.name}
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

const MOCKS = [
  {
    title: '1 to 5 KM away from you',
    data: [
      {
        id: 1,
        cropName: 'Banana',
        movementCode: 'CU05/3-1',
        cropImage: 'crop_images/apple.png',
        crateWeight: 2,
        price: 1.23,
        shelfLife: 2,
        company: {
          name: 'Company name',
          country: 'Nigeria',
          address: '5 street, Colorado, Australia',
          latitude: 123,
          longitude: 123,
        },
        coolingUnit: {
          name: 'Cooling unit name',
        },
      },
    ],
  },
];
