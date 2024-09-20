import React from 'react';
import { View } from 'react-native';

import { ScrollView } from '#ui/components/ScrollView';
import { Button } from '#ui/components/Button';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { APP_EVENTS, emitter } from '#ui/lib/emitter';

import CompanyFilters from './components/CompanyFilter';
import MarketplaceFormManager, {
  DEFAULT_MARKETPLACE_FILTER_VALUES,
  type FormValues,
} from './modules/MarketplaceFormManager';
import CoolingUnitFilters from './components/CoolingUnitFilter';
import CropTypeFilters from './components/CropTypeFilter';
import RangePrice from './components/RangePrice';

import { type FilterItem, useMarketplaceFilters } from './store';

function MarketplaceFilters() {
  return (
    <React.Fragment>
      <ScrollView tw="px-4 pt-3 bg-white" showsVerticalScrollIndicator={false}>
        <View tw="flex-1 pb-8">
          <MarketplaceFormManager
            initialValues={{ companies: [], coolingUnits: [], crops: [], min: 0, max: 0 }}
            onSubmit={(values) => {
              const { min, max, ...rest } = values;
              const filters: Array<FilterItem> = Object.entries(rest).flatMap(([key, items]) =>
                items.length > 0
                  ? items.map((item) => ({
                      label: item.label,
                      value: item.value,
                      key: key as keyof Omit<FormValues, 'min' | 'max'>,
                    }))
                  : []
              );
              if (min > 0 && max > 0) {
                filters.push({
                  label: `$${min}KG - $${max}KG`,
                  value: [min, max],
                  key: 'priceRange',
                });
              }
              useMarketplaceFilters.getState().addFilters(filters);
            }}
          >
            <View tw="w-full">
              <CompanyFilters />
              <CoolingUnitFilters />
              <CropTypeFilters />
              <RangePrice />
            </View>
          </MarketplaceFormManager>
        </View>
      </ScrollView>

      <View tw="w-full bottom-0 left-0 py-6 px-4 flex-row items-center justify-evenly bg-zinc-50 border-t border-solid border-zinc-400">
        <Button
          tw="w-[47%]"
          mode="outlined"
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            emitter.emit(
              APP_EVENTS.DISPATCH_MARKETPLACE_FILTERS_FORM_RESET,
              DEFAULT_MARKETPLACE_FILTER_VALUES // TODO
            );
          }}
        >
          Cancel
        </Button>
        <Button
          tw="w-[47%]"
          mode="contained"
          uppercase
          onPress={(evt) => {
            evt.stopPropagation();
            emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_FILTERS_FORM_SUBMISSION);
          }}
        >
          Apply
        </Button>
      </View>
    </React.Fragment>
  );
}

export default withSafeArea(MarketplaceFilters);
