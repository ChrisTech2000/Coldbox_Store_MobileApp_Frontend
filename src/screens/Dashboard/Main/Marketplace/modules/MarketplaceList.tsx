import React, { useMemo } from 'react';
import { FlatList, RefreshControl, SectionList, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';

import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { API_BASE_URL } from '#constants/environment';
import { paperTheme } from '#ui/lib/theme';

import MarketplaceItemWrapper from '../components/MarketplaceItem';

import { useMarketplaceQueryParams } from '../store';
import { type AvailableListingDatum, useMarketplaceListing } from '../utils';

export default function MarketplaceList() {
  const sortBy = useMarketplaceQueryParams(useShallow((store) => store.sortBy));

  const { data, isLoading, isValidating, refetch } = useMarketplaceListing();

  if (isLoading) {
    return (
      <View tw="h-48 items-center justify-center">
        <ActivityIndicator animating color={paperTheme.colors.primary} size="small" />
      </View>
    );
  }

  switch (sortBy) {
    case 'nearby-me':
      return <_NearbyMeSection listing={data} isValidating={isValidating} refetch={refetch} />;

    default:
      return (
        <FlatList
          tw="px-4 pt-2"
          data={data}
          keyExtractor={(item) => `section-list-item-#${item.id}`}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <MarketplaceItemWrapper shelfLife={item.shelfLife}>
              <MarketplaceItemWrapper.Body
                shelfLife={item.shelfLife}
                cropName={item.crop.name}
                movementCode={item.movementCode}
                cropImageUri={`${API_BASE_URL}media/${item.crop.image}`}
              />
              <MarketplaceItemWrapper.CompanyAction
                company={item.company}
                coolingUnitName={item.coolingUnit.name}
              />
              <MarketplaceItemWrapper.BuyAction
                currencyValue={item.currencyValue}
                crateWeight={item.crateWeight}
                onAddFunc={() => {
                  emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_ADD_TO_CART_MODAL, item);
                }}
              />
            </MarketplaceItemWrapper>
          )}
          refreshControl={<RefreshControl refreshing={isValidating} onRefresh={refetch} />}
        />
      );
  }
}

function _NearbyMeSection(props: {
  listing: Array<AvailableListingDatum>;
  isValidating: boolean;
  refetch: () => void;
}) {
  const { listing, isValidating, refetch } = props;

  const groupedByDistance = useMemo(() => {
    const datums = listing.reduce(
      (acc: Record<string, Array<AvailableListingDatum>>, datum: AvailableListingDatum) => {
        let bucket: string;
        if (datum.distance <= 5) {
          bucket = '1 to 5 KM away';
        } else if (datum.distance <= 10) {
          bucket = '5 to 10 KM away';
        } else if (datum.distance <= 25) {
          bucket = '10 to 25 KM away';
        } else {
          bucket = 'More than 25 KM away';
        }
        if (!acc[bucket]) acc[bucket] = [];
        acc[bucket].push(datum);
        return acc;
      },
      {}
    );
    return Object.keys(datums).map((key) => ({
      title: key,
      data: datums[key],
    }));
  }, [listing]);

  return (
    <SectionList
      tw="px-4 pt-2"
      sections={groupedByDistance}
      keyExtractor={(item) => `marketplace-nearby-list-item-${item.id}`}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderSectionHeader={({ section }) => (
        <View tw="flex-row items-center space-x-2 py-2">
          <MaterialCommunityIcon name="map-marker-outline" size={28} color={colors.zinc[600]} />
          <Text variant="TextMedium" tw="text-base">
            {section.title}
          </Text>
        </View>
      )}
      renderItem={({ item }) => (
        <MarketplaceItemWrapper shelfLife={item.shelfLife}>
          <MarketplaceItemWrapper.Body
            shelfLife={item.shelfLife}
            cropName={item.crop.name}
            movementCode={item.movementCode}
            cropImageUri={`${API_BASE_URL}media/${item.crop.image}`}
          />
          <MarketplaceItemWrapper.CompanyAction
            company={item.company}
            coolingUnitName={item.coolingUnit.name}
          />
          <MarketplaceItemWrapper.BuyAction
            crateWeight={item.crateWeight}
            currencyValue={item.currencyValue}
            onAddFunc={() => {
              emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_ADD_TO_CART_MODAL, item);
            }}
          />
        </MarketplaceItemWrapper>
      )}
      refreshControl={<RefreshControl refreshing={isValidating} onRefresh={refetch} />}
    />
  );
}
