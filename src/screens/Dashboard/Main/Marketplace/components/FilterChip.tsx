import React from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

import { ScrollView } from '#ui/components/ScrollView';

import { useTranslationUtils } from '#i18n/utils';

import { useMarketplaceFilters } from '../store';

export default function FilterChip() {
  const filters = useMarketplaceFilters((store) => store.filters);
  const { t } = useTranslationUtils();

  if (filters.length === 0) return null;

  return (
    <ScrollView tw="pt-3.5 pl-3" horizontal showsHorizontalScrollIndicator={false}>
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
