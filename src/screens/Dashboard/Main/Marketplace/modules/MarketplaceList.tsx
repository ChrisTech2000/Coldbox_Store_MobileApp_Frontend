import React, { useEffect, useMemo } from 'react';
import { FlatList, RefreshControl, SectionList, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import camelCase from 'lodash/camelCase';
import colors from 'tailwindcss/colors';

import { Text } from '#ui/components/Text';

import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { API_BASE_URL } from '#constants/environment';
import { paperTheme } from '#ui/lib/theme';
import { useMap } from '#ui/hooks/useMap';

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
              <MarketplaceItemWrapper.CompanyAction company={item.company} />
              <MarketplaceItemWrapper.BuyAction
                currencyValue={item.currencyValue}
                crateWeight={item.crateWeight}
                standardWeight={item.coolingUnit.standardWeight}
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

  const [unitMap, unitMapActions] = useMap<
    string,
    Pick<AvailableListingDatum, 'company' | 'coolingUnit'>
  >();

  useEffect(() => {
    const nextEntries = new Map(unitMap);

    for (const { coolingUnit, company } of listing) {
      const key = camelCase(coolingUnit.name);
      if (nextEntries.has(key)) continue;
      nextEntries.set(key, { company, coolingUnit });
    }

    const currentKeys = Array.from(unitMap.keys()).sort();
    const newKeys = Array.from(nextEntries.keys()).sort();

    if (JSON.stringify(newKeys) !== JSON.stringify(currentKeys)) {
      unitMapActions.setAll(nextEntries);
    }
  }, [listing, unitMap, unitMapActions]);

  const groupedData = useMemo(() => {
    const dataByDistance = listing.reduce<
      Record<string, Record<string, Array<AvailableListingDatum>>>
    >((acc, datum) => {
      const key = camelCase(datum.coolingUnit.name);
      const distanceBucket =
        datum.distance <= 5
          ? '1 to 5 KM away'
          : datum.distance <= 10
            ? '5 to 10 KM away'
            : datum.distance <= 25
              ? '10 to 25 KM away'
              : 'More than 25 KM away';

      acc[key] ??= {};
      acc[key][distanceBucket] ??= [];
      acc[key][distanceBucket].push(datum);

      return acc;
    }, {});

    return Object.entries(dataByDistance).flatMap(([key, distances]) =>
      Object.entries(distances).map(([distance, data]) => ({
        sectionKey: key,
        distance,
        data,
      }))
    );
  }, [listing]);

  return (
    <SectionList
      tw="px-4 pt-2"
      sections={groupedData}
      keyExtractor={(_, itemIdx) => `marketplace-nearby-list-item-#${itemIdx}`}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderSectionHeader={({ section }) => {
        const datum = unitMap.get(section.sectionKey);
        if (typeof datum === 'undefined') return null;
        return (
          <View tw="flex-col py-2">
            <View>
              <Text variant="TextMedium" tw="text-lg">
                {datum.coolingUnit.name}
              </Text>
            </View>
            <View tw="flex-row items-end justify-between">
              <MarketplaceItemWrapper.CompanyAction company={datum.company} truncate />
              <View tw="flex-row items-center space-x-2 mb-1.5">
                <MaterialCommunityIcon
                  name="map-marker-outline"
                  size={19}
                  color={colors.zinc[500]}
                />
                <Text tw="text-base text-zinc-500">{section.distance}</Text>
              </View>
            </View>
          </View>
        );
      }}
      renderItem={({ item }) => (
        <MarketplaceItemWrapper shelfLife={item.shelfLife}>
          <MarketplaceItemWrapper.Body
            shelfLife={item.shelfLife}
            cropName={item.crop.name}
            movementCode={item.movementCode}
            cropImageUri={`${API_BASE_URL}media/${item.crop.image}`}
          />
          <MarketplaceItemWrapper.BuyAction
            crateWeight={item.crateWeight}
            currencyValue={item.currencyValue}
            standardWeight={item.coolingUnit.standardWeight}
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
