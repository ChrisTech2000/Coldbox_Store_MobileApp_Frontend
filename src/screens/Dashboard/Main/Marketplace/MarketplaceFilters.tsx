import cloneDeep from 'lodash/cloneDeep';
import React, { useMemo } from 'react';
import { Platform, Dimensions, View } from 'react-native';
import { useShallow } from 'zustand/react/shallow';

import { Button } from '#ui/components/Button';
import { GenericError } from '#ui/components/GenericError';
import HideWithKeyboardView from '#ui/components/HideWithKeyboardView';
import { ScrollView } from '#ui/components/ScrollView';
import { APP_EVENTS, emitter } from '#ui/lib/emitter';
import { withErrorBoundary } from '#ui/primitives/error-boundary';
import { withSafeArea } from '#ui/primitives/withSafeArea';

import { DEFAULT_CURRENCY_CODE } from '#constants/general';
import { useTranslationUtils } from '#i18n/utils';
import { MarketplaceRouteProps } from '#navigation/Dashboard/Main/Marketplace/MarketplaceStack';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import { cn } from '#ui/lib/cn';

import CompanyFilters from './components/CompanyFilter';
import CoolingUnitFilters from './components/CoolingUnitFilter';
import CropTypeFilters from './components/CropTypeFilter';
import RangePrice from './components/RangePrice';
import MarketplaceFormManager, { type FormValues } from './modules/MarketplaceFormManager';

import { formatCurrencyWithSymbol } from '../Dashboard/CheckIn/utils';
import { type FilterItem, useMarketplaceFilters } from './store';

const HORIZONTAL_SPACING = Platform.select({
  android: 'px-4',
  ios: 'mx-4',
});

const width = (Dimensions.get('window').width - 42) / 2;

function MarketplaceFilters(props: MarketplaceRouteProps<'MarketplaceFilters'>) {
  const { t } = useTranslationUtils();

  const [companyCountry] = useManagementStore(useShallow((store) => [store.company?.country]));
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const currencyCode = useMemo(() => {
    const datum = countriesDict().getByValue(companyCountry || farmerCountry || '');
    return datum?.currency || DEFAULT_CURRENCY_CODE;
  }, [companyCountry, farmerCountry]);

  return (
    <React.Fragment>
      <ScrollView tw={cn('pt-3 bg-white', HORIZONTAL_SPACING)} showsVerticalScrollIndicator={false}>
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
              const minSafe = min || 0;
              const maxSafe = max || 0;
              if (minSafe > 0 || maxSafe > 0) {
                const minLabel = `${formatCurrencyWithSymbol(currencyCode, minSafe)}/KG`;
                const maxLabel = `${formatCurrencyWithSymbol(currencyCode, maxSafe)}/KG`;
                filters.push({
                  key: 'priceRange',
                  label: [minLabel, maxLabel].join(' - '),
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

      <HideWithKeyboardView tw="w-full flex-row items-center justify-between px-4 pb-5 pt-4 absolute bottom-0 left-0 right-0 bg-white border-t-0.5 border-gray-600 border-solid">
        <Button
          style={{ width }}
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
          style={{ width }}
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

function _buildInitialValues(): FormValues<undefined | number> {
  const deepCopy = cloneDeep(useMarketplaceFilters.getState().filters);
  const defaultValues: FormValues<undefined | number> = {
    companies: [],
    coolingUnits: [],
    crops: [],
    min: undefined,
    max: undefined,
  };
  if (deepCopy.length === 0) return defaultValues;
  for (const filter of deepCopy) {
    if (filter.key === 'priceRange') {
      defaultValues.min = filter.value.at(0);
      defaultValues.max = filter.value.at(1);
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
