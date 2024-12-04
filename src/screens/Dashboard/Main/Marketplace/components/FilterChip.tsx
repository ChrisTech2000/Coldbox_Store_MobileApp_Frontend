import React from 'react';
import { View, FlatList } from 'react-native';
import { Chip } from 'react-native-paper';

import { useTranslationUtils } from '#i18n/utils';

import { useMarketplaceFilters } from '../store';

export default function FilterChip() {
  const { t } = useTranslationUtils();
  const filters = useMarketplaceFilters((store) => store.filters);

  if (filters.length === 0) return null;

  return (
    <View tw="py-4">
      <FlatList
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        data={filters}
        ListHeaderComponent={
          <Chip
            tw="bg-transparent mr-2 ml-3"
            mode="outlined"
            onClose={() => useMarketplaceFilters.getState().reset()}
          >
            {t('actions.clearAll')}
          </Chip>
        }
        keyExtractor={(_, itemIdx) => `marketplace-filter-chip-#${itemIdx}`}
        renderItem={({ item, index }) => (
          <Chip
            tw="bg-transparent mr-2"
            mode="outlined"
            onClose={() => useMarketplaceFilters.getState().removeFilterByIndex(index)}
          >
            {item.label}
          </Chip>
        )}
      />
    </View>
  );
}
