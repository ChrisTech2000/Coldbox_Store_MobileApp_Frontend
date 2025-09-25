import { FlashList } from '@shopify/flash-list';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import React, { useEffect, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'tailwindcss/colors';
import { useShallow } from 'zustand/react/shallow';

import { GenericEmptyState } from '#ui/components/GenericEmptyState';
import { Text } from '#ui/components/Text';
import { useMap } from '#ui/hooks/useMap';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import { API_BASE_URL } from '#constants/environment';
import { useTranslationUtils, type TranslationPaths } from '#i18n/utils';
import { MOCKED_MARKETPLACE_DATA } from '#screens/Dashboard/Tutorial/utils/mockedData';
import { useTutorialStore } from '#stores/tutorial';
import type { ValueOf } from '#types/miscellaneous';

import MarketplaceItemWrapper from '../components/MarketplaceItem';
import { useMarketplaceQueryParams } from '../store';
import { DEFAULT_COORDINATES, useMarketplaceListing, type AvailableListingDatum } from '../utils';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const ESTIMATED_LIST_SIZE = {
  height: DEVICE_HEIGHT,
  width: DEVICE_WIDTH - 32, // px-4 -> 16px * 2 (L&R)
} as const;

export default function MarketplaceList() {
  const { data, isLoading } = useMarketplaceListing();
  const sortBy = useMarketplaceQueryParams(useShallow((store) => store.sortBy));
  if (isLoading) return null;

  switch (sortBy) {
    case 'nearby-me':
      return <_NearbyMeSection listing={data} />;

    default:
      return (
        <View tw="px-4 pt-2">
          <FlashList
            data={data}
            ListEmptyComponent={<GenericEmptyState />}
            keyExtractor={(item) => `marketplace-list-item-#${item.id}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <MarketplaceItemWrapper shelfLife={item.shelfLife}>
                <MarketplaceItemWrapper.Body
                  shelfLife={item.shelfLife}
                  cropName={item.crop.name}
                  produceInfo={item.produceInfo}
                  movementCode={item.movementCode}
                  cropImageUri={`${API_BASE_URL}media/${item.crop.image}`}
                  owner={item.owner}
                />
                <MarketplaceItemWrapper.CompanyAction
                  company={item.company}
                  coolingUnit={item.coolingUnit.name}
                />
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
            estimatedItemSize={20}
            estimatedListSize={ESTIMATED_LIST_SIZE}
          />
        </View>
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

const NEAR_ME_LIST_ORDER = [
  DISTANCE_BUCKETS.DEFAULT,
  DISTANCE_BUCKETS.WITHIN_5_KM,
  DISTANCE_BUCKETS.WITHIN_10_KM,
  DISTANCE_BUCKETS.WITHIN_25_KM,
  DISTANCE_BUCKETS.BEYOND_25_KM,
] as const;

type GroupedDatum = {
  sectionKey: string;
  distance: keyof typeof DISTANCE_BUCKETS_TRANSLATIONS;
  data: Array<AvailableListingDatum>;
};

type UnitMapValue = Pick<AvailableListingDatum, 'company' | 'coolingUnit'>;

type NearbyMeListItem =
  | {
      kind: 'sectionHeader';
      sectionKey: number;
      distance: keyof typeof DISTANCE_BUCKETS_TRANSLATIONS;
    }
  | {
      kind: 'row';
      sectionKey: number;
      distance: keyof typeof DISTANCE_BUCKETS_TRANSLATIONS;
      datum: AvailableListingDatum;
    };

function _NearbyMeSection(props: { listing: Array<AvailableListingDatum> }) {
  const { listing } = props;

  const { t } = useTranslationUtils();
  const coordinates = useMarketplaceQueryParams((store) => store.location);
  const isLocationDenied = isEmpty(coordinates) || isEqual(coordinates, DEFAULT_COORDINATES);

  const [unitMap, unitMapActions] = useMap<number, UnitMapValue>();
  const [isTutorialActive] = useTutorialStore((store) => [store.isTutorialActive]);

  useEffect(() => {
    const currentKeySet = new Set<number>(unitMap.keys());
    const nextEntries = new Map<number, UnitMapValue>();
    let hasChanges = false;

    for (const { coolingUnit, company } of listing) {
      if (!currentKeySet.has(coolingUnit.id)) {
        hasChanges = true;
        nextEntries.set(coolingUnit.id, { company, coolingUnit });
      }
    }

    if (hasChanges) {
      unitMapActions.setAll(new Map([...unitMap, ...nextEntries]));
    }
  }, [isTutorialActive, listing, unitMap, unitMapActions]);

  const groupedData: Array<NearbyMeListItem> = useMemo(() => {
    const data = isTutorialActive ? MOCKED_MARKETPLACE_DATA : listing;
    const dataByDistance = data.reduce<
      Record<number, Record<GroupedDatum['distance'], Array<AvailableListingDatum>>>
    >((acc, datum) => {
      const key = datum.coolingUnit.id;
      const distanceBucket = isLocationDenied
        ? DISTANCE_BUCKETS.DEFAULT
        : datum.distance <= 5
          ? DISTANCE_BUCKETS.WITHIN_5_KM
          : datum.distance <= 10
            ? DISTANCE_BUCKETS.WITHIN_10_KM
            : datum.distance <= 25
              ? DISTANCE_BUCKETS.WITHIN_25_KM
              : DISTANCE_BUCKETS.BEYOND_25_KM;

      acc[key] ??= {} as Record<GroupedDatum['distance'], Array<AvailableListingDatum>>;
      acc[key][distanceBucket] ??= [];
      acc[key][distanceBucket].push(datum);

      return acc;
    }, {});

    return NEAR_ME_LIST_ORDER.reduce<Array<NearbyMeListItem>>((items, currentDistance) => {
      for (const [key, distances] of Object.entries(dataByDistance)) {
        const data = distances?.[currentDistance];

        if (data?.length) {
          const sectionKey = Number(key);

          const sectionHeaderItem: NearbyMeListItem = {
            kind: 'sectionHeader',
            sectionKey,
            distance: currentDistance,
          };

          const rowItems = data.map(
            (item): NearbyMeListItem => ({
              kind: 'row',
              sectionKey,
              distance: currentDistance,
              datum: item,
            })
          );

          items.push(sectionHeaderItem, ...rowItems);
        }
      }

      return items;
    }, []);
  }, [isTutorialActive, listing, isLocationDenied]);

  const listExtraData = useMemo(() => ({ unitMap }), [unitMap]);

  return (
    <View tw="px-4 pt-2">
      <FlashList
        ListEmptyComponent={<GenericEmptyState />}
        data={groupedData}
        extraData={listExtraData}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, itemIdx) =>
          `marketplace-list-item-${item.kind}-${item.distance}-#${itemIdx}`
        }
        getItemType={(item) => item.kind}
        renderItem={({ item, extraData }) => {
          const _extraData = extraData as typeof listExtraData;

          switch (item.kind) {
            case 'sectionHeader': {
              const { sectionKey, distance } = item;
              const datum = _extraData.unitMap.get(sectionKey);
              if (typeof datum === 'undefined') return null;
              const translationPath = DISTANCE_BUCKETS_TRANSLATIONS?.[distance];
              return (
                <View tw="flex-col py-2">
                  <View>
                    <Text variant="TextMedium" tw="text-lg">
                      {datum.coolingUnit.name}
                    </Text>
                  </View>
                  <View tw="flex-row items-end justify-between">
                    <MarketplaceItemWrapper.CompanyAction
                      company={datum.company}
                      coolingUnit={datum.coolingUnit.name}
                      truncate
                    />
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
            }
            case 'row': {
              const { datum } = item;
              return (
                <MarketplaceItemWrapper shelfLife={datum.shelfLife}>
                  <MarketplaceItemWrapper.Body
                    shelfLife={datum.shelfLife}
                    cropName={datum.crop.name}
                    produceInfo={datum.produceInfo}
                    movementCode={datum.movementCode}
                    cropImageUri={`${API_BASE_URL}media/${datum.crop.image}`}
                    owner={datum.owner}
                  />
                  <MarketplaceItemWrapper.BuyAction
                    crateWeight={datum.crateWeight}
                    currencyValue={datum.currencyValue}
                    standardWeight={datum.coolingUnit.standardWeight}
                    onAddFunc={() => {
                      emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_ADD_TO_CART_MODAL, datum);
                    }}
                  />
                </MarketplaceItemWrapper>
              );
            }
            default:
              return null;
          }
        }}
        estimatedItemSize={25}
        estimatedListSize={ESTIMATED_LIST_SIZE}
      />
    </View>
  );
}
