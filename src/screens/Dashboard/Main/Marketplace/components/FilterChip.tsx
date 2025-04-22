import React, { useCallback, useMemo, useRef } from 'react';
import { FlatList, type NativeScrollEvent, type NativeSyntheticEvent, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';
import cloneDeep from 'lodash/cloneDeep';

import { LanguageManager, useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';
import { cropTranslationLookup } from '#i18n/transl/misc/crops';

import { useMarketplaceFilters } from '../store';

export default function FilterChip() {
  const [companyCountry] = useManagementStore(useShallow((store) => [store.company?.country]));
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const locale = LanguageManager.read();

  const { t } = useTranslationUtils();
  const filters = useMarketplaceFilters((store) => store.filters);

  const flatListRef = useRef<FlatList>(null);
  const lastOffset = useRef(0);

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    lastOffset.current = event.nativeEvent.contentOffset.x;
  }, []);

  const onContentSizeChange = useCallback(
    (contentWidth: number) => {
      if (flatListRef.current && filters.length > 0) {
        if (lastOffset.current >= contentWidth) {
          flatListRef.current.scrollToOffset({
            offset: 0,
            animated: true,
          });
        }
      }
    },
    [filters]
  );

  const datums = useMemo(() => {
    const { buildMap, find } = cropTranslationLookup();
    const lookupMap = buildMap();
    return cloneDeep(filters || []).map((filter) => ({
      ...filter,
      label: find(lookupMap, {
        name: filter.label,
        country: companyCountry || farmerCountry || undefined,
        locale,
      }),
    }));
  }, [filters, companyCountry, farmerCountry, locale]);

  if (filters.length === 0) return null;

  return (
    <View tw="py-4">
      <FlatList
        horizontal
        scrollEnabled
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={datums}
        ListHeaderComponent={
          <Chip
            tw="bg-transparent mr-2 ml-3"
            mode="outlined"
            onClose={() => useMarketplaceFilters.getState().reset()}
          >
            {t('actions.clearAll')}
          </Chip>
        }
        keyExtractor={(item, itemIdx) => `marketplace-filter-chip-${item.label}-#${itemIdx}`}
        renderItem={({ item, index }) => (
          <Chip
            key={item.label}
            tw="bg-transparent mr-2"
            mode="outlined"
            onClose={() => useMarketplaceFilters.getState().removeFilterByIndex(index)}
          >
            {item.label}
          </Chip>
        )}
        onScroll={onScroll}
        onContentSizeChange={onContentSizeChange}
      />
    </View>
  );
}
