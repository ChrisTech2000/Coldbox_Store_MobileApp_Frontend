import React from 'react';
import { Chip } from 'react-native-paper';

import { ScrollView } from '#ui/components/ScrollView';

import { useMarketplaceFilters } from '../store';
import { View } from 'react-native';

export default function FilterChip() {
  const filters = useMarketplaceFilters((store) => store.filters);

  if (filters.length === 0) return null;

  return (
    <ScrollView tw="pl-4 pt-3.5" horizontal showsHorizontalScrollIndicator={false}>
      <View tw="flex-row space-x-2 pr-5">
        <Chip
          tw="bg-transparent"
          mode="outlined"
          onClose={() => useMarketplaceFilters.getState().clearFilters()}
        >
          Clear all
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
