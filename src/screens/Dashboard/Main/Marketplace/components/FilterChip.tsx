import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

import { ScrollView } from '#ui/components/ScrollView';

import { useTranslationUtils } from '#i18n/utils';
import { useMarketplaceSwipe } from '#navigation/Dashboard/Main/Marketplace/MarketplaceTabs';

import { useMarketplaceFilters } from '../store';

export default function FilterChip() {
  const { t } = useTranslationUtils();
  const filters = useMarketplaceFilters((store) => store.filters);

  const { debouncedHandleSwipeEnable, debouncedHandleSwipeDisable } = useMarketplaceSwipe(
    filters.length
  );

  if (filters.length === 0) return null;

  return (
    <ScrollView
      tw="pl-3 py-4"
      horizontal
      showsHorizontalScrollIndicator={false}
      onTouchStart={debouncedHandleSwipeDisable}
      onTouchEnd={debouncedHandleSwipeEnable}
      onScrollBeginDrag={debouncedHandleSwipeDisable}
      onScrollEndDrag={debouncedHandleSwipeEnable}
    >
      <View tw="flex-row space-x-2 pr-5">
        <Chip
          tw="bg-transparent"
          mode="outlined"
          onClose={() => useMarketplaceFilters.getState().reset()}
        >
          {t('actions.clearAll')}
        </Chip>
        {filters.map((filter, filterIdx) => (
          <Chip
            key={`marketplace-filter-chip-#${filterIdx}`}
            tw="bg-transparent"
            mode="outlined"
            onClose={() => useMarketplaceFilters.getState().removeFilterByIndex(filterIdx)}
          >
            {filter.label}
          </Chip>
        ))}
      </View>
    </ScrollView>
  );
}
