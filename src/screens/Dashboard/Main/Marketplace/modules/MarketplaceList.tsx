import React, { useEffect, useMemo } from 'react';
import { FlatList, SectionList, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';
import { useShallow } from 'zustand/react/shallow';
import camelCase from 'lodash/camelCase';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import { Text } from '#ui/components/Text';

import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils } from '#i18n/utils';
import type { ValueOf } from '#types/miscellaneous';
import { useMap } from '#ui/hooks/useMap';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { paperTheme } from '#ui/lib/theme';
import type { TranslationPaths } from 'i18n/index';

import MarketplaceItemWrapper from '../components/MarketplaceItem';

import { useMarketplaceQueryParams } from '../store';
import { type AvailableListingDatum, DEFAULT_COORDINATES, useMarketplaceListing } from '../utils';

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
                owner={item.owner}
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
        />
      );
  }
}

const DISTANCE_BUCKETS = {
  DEFAULT: 0,
  WITHIN_5_KM: 1,
  WITHIN_10_KM: 2,
  WITHIN_25_KM: 3,
  BEYOND_25_KM: 4,
} as const;

const DISTANCE_BUCKETS_TRANSLATIONS: Record<
  ValueOf<typeof DISTANCE_BUCKETS>,
  TranslationPaths | undefined
> = {
  [DISTANCE_BUCKETS.DEFAULT]: undefined,
  [DISTANCE_BUCKETS.WITHIN_5_KM]: 'Dashboard.Marketplace.distance.withing5Km',
  [DISTANCE_BUCKETS.WITHIN_10_KM]: 'Dashboard.Marketplace.distance.within10Km',
  [DISTANCE_BUCKETS.WITHIN_25_KM]: 'Dashboard.Marketplace.distance.within25Km',
  [DISTANCE_BUCKETS.BEYOND_25_KM]: 'Dashboard.Marketplace.distance.beyond25Km',
};

type NearbyMeDatum = {
  sectionKey: string;
  distance: keyof typeof DISTANCE_BUCKETS_TRANSLATIONS;
  data: Array<AvailableListingDatum>;
};

function _NearbyMeSection(props: {
  listing: Array<AvailableListingDatum>;
  isValidating: boolean;
  refetch: () => void;
}) {
  const { listing } = props;

  const { t } = useTranslationUtils();
  const coordinates = useMarketplaceQueryParams((store) => store.location);
  const isLocationDenied = isEmpty(coordinates) || isEqual(coordinates, DEFAULT_COORDINATES);

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

  const groupedData: Array<NearbyMeDatum> = useMemo(() => {
    const dataByDistance = listing.reduce<
      Record<string, Record<NearbyMeDatum['distance'], Array<AvailableListingDatum>>>
    >((acc, datum) => {
      const key = camelCase(datum.coolingUnit.name);
      const distanceBucket = isLocationDenied
        ? DISTANCE_BUCKETS.DEFAULT
        : datum.distance <= 5
          ? DISTANCE_BUCKETS.WITHIN_5_KM
          : datum.distance <= 10
            ? DISTANCE_BUCKETS.WITHIN_10_KM
            : datum.distance <= 25
              ? DISTANCE_BUCKETS.WITHIN_25_KM
              : DISTANCE_BUCKETS.BEYOND_25_KM;

      acc[key] ??= {} as Record<NearbyMeDatum['distance'], Array<AvailableListingDatum>>;
      acc[key][distanceBucket] ??= [];
      acc[key][distanceBucket].push(datum);

      return acc;
    }, {});

    return Object.entries(dataByDistance).flatMap(([key, distances]) =>
      Object.entries(distances).map(([distance, data]) => ({
        sectionKey: key,
        distance: Number(distance) as NearbyMeDatum['distance'],
        data,
      }))
    );
  }, [listing, isLocationDenied]);

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
        const translationPath = DISTANCE_BUCKETS_TRANSLATIONS?.[section.distance];
        return (
          <View tw="flex-col py-2">
            <View>
              <Text variant="TextMedium" tw="text-lg">
                {datum.coolingUnit.name}
              </Text>
            </View>
            <View tw="flex-row items-end justify-between">
              <MarketplaceItemWrapper.CompanyAction company={datum.company} truncate />
              {typeof translationPath !== 'undefined' ? (
                <View tw="flex-row items-center space-x-2 mb-1.5">
                  <MaterialCommunityIcon
                    name="map-marker-outline"
                    size={19}
                    color={colors.zinc[500]}
                  />
                  <Text tw="text-base text-zinc-500">{t(translationPath)}</Text>
                </View>
              ) : null}
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
            owner={item.owner}
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
    />
  );
}
