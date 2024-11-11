import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { CurrencyStandardization } from 'currency-format-utils';
import cloneDeep from 'lodash/cloneDeep';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import { ScrollView } from '#ui/components/ScrollView';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import type { MarketplaceRouteProps } from '#navigation/Dashboard/Main/MarketplaceStack';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';
import { useTranslationUtils } from '#i18n/utils';

import CompanyFilters from './components/CompanyFilter';
import CoolingUnitFilters from './components/CoolingUnitFilter';
import CropTypeFilters from './components/CropTypeFilter';
import RangePrice from './components/RangePrice';
import MarketplaceFormManager, { type FormValues } from './modules/MarketplaceFormManager';

import { type FilterItem, useMarketplaceFilters } from './store';
import { DEFAULT_CURRENCY_CODE } from './utils';

function MarketplaceFilters(props: MarketplaceRouteProps<'MarketplaceFilters'>) {
  const { t } = useTranslationUtils();

  const [companyCountry] = useManagementStore(useShallow((store) => [store.company?.country]));
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const currencyCode = useMemo(() => {
    const datum = countriesDict().getByValue(companyCountry || farmerCountry || '');
    return datum?.currency || DEFAULT_CURRENCY_CODE;
  }, [companyCountry, farmerCountry]);

  const currencyFormatterFunc = useCallback(
    (value: number) =>
      CurrencyStandardization.currencyCode({
        code: currencyCode,
        value: value,
        isCents: false,
      }).getValueFormated(),
    [currencyCode]
  );

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
              if (min > 0 || max > 0) {
                const minLabel = min > 0 ? `${currencyFormatterFunc(min)}/KG` : '';
                const maxLabel = max > 0 ? `${currencyFormatterFunc(max)}/KG` : '';
                const label = [minLabel, maxLabel].filter(Boolean).join(' - ');
                filters.push({
                  key: 'priceRange',
                  label,
                  value: [min, max],
                });
              }
              useMarketplaceFilters.getState().addFilters(filters, true);
              props.navigation.goBack();
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

      <HideWithKeyboardView tw="w-full bottom-0 left-0 py-6 px-4 flex-row items-center justify-evenly bg-zinc-50 border-t border-solid border-zinc-400">
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
          {t('actions.cancel')}
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
          {t('actions.apply')}
        </Button>
      </HideWithKeyboardView>
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
  }),
  ['bottom'],
  true
);
