import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import { View } from 'react-native';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { MarketplaceRouteProps } from '#navigation/Dashboard/Main/MarketplaceStack';

import CompanyFilters from './components/CompanyFilter';
import CoolingUnitFilters from './components/CoolingUnitFilter';
import CropTypeFilters from './components/CropTypeFilter';
import RangePrice from './components/RangePrice';
import MarketplaceFormManager, { type FormValues } from './modules/MarketplaceFormManager';
import { type FilterItem, useMarketplaceFilters } from './store';

function MarketplaceFilters(props: MarketplaceRouteProps<'MarketplaceFilters'>) {
  return (
    <React.Fragment>
      <ScrollView tw="px-4 pt-3 bg-white" showsVerticalScrollIndicator={false}>
        <View tw="flex-1 pb-8">
          <MarketplaceFormManager
            initialValues={_buildInitialValues()}
            onSubmit={(values) => {
              const { min, max, ...rest } = values;
              const filters: Array<FilterItem> = Object.entries(rest).flatMap(([key, items]) =>
                items.length > 0
                  ? items.map((item) => ({
                      key: key as keyof Omit<FormValues, 'min' | 'max'>,
                      label: item.label,
                      value: item.value,
                    }))
                  : []
              );
              if (min > 0 && max > 0) {
                filters.push({
                  key: 'priceRange',
                  label: `$${min}KG - $${max}KG`,
                  value: [min, max],
                });
              }
              useMarketplaceFilters.getState().addFilters(filters, true);
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
            emitter.emit(APP_EVENTS.DISPATCH_MARKETPLACE_FILTERS_FORM_RESET, _buildInitialValues());
            props.navigation.goBack();
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
            props.navigation.goBack();
          }}
        >
          Apply
        </Button>
      </View>
    </React.Fragment>
  );
}

function _buildInitialValues(): FormValues<number> {
  const deepCopy = cloneDeep(useMarketplaceFilters.getState().filters);
  const defaultValues: FormValues<number> = {
    companies: [],
    coolingUnits: [],
    crops: [],
    min: 0,
    max: 0,
  };
  if (deepCopy.length === 0) return defaultValues;
  for (const filter of deepCopy) {
    if (filter.key === 'priceRange') {
      defaultValues.min = filter.value[0];
      defaultValues.max = filter.value[1];
      continue;
    }
    defaultValues[filter.key].push({ label: filter.label, value: filter.value });
  }
  return defaultValues;
}

export default withSafeArea(
  withErrorBoundary(MarketplaceFilters, {
    fallback: <GenericError />,
    onError: (error) => console.error('Error caught:', error),
  })
);
