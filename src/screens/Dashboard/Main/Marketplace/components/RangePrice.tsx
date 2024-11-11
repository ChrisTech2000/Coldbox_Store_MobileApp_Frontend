import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

import { Text } from '#ui/components/Text';
import { Sup } from '#ui/components/SuperscriptText';
import { Input } from '#ui/components/Input';

import MarketplaceFormManager from '../modules/MarketplaceFormManager';

import { useTranslationUtils } from '#i18n/utils';
import { useManagementStore } from '#stores/management';
import { useDashboardStore } from '#stores/dashboard';
import { countriesDict } from '#screens/Dashboard/Management/CompanyDetails/utils';

import { DEFAULT_CURRENCY_CODE } from '../utils';

export default function RangePrice() {
  const { control } = MarketplaceFormManager.useForm();
  const { t } = useTranslationUtils();

  const [companyCountry] = useManagementStore(useShallow((store) => [store.company?.country]));
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const currencyCode = useMemo(() => {
    const datum = countriesDict().getByValue(companyCountry || farmerCountry || '');
    return datum?.currency || DEFAULT_CURRENCY_CODE;
  }, [companyCountry, farmerCountry]);

  return (
    <View tw="space-y-3 mt-4">
      <View tw="flex-row">
        <Text tw="text-base text-gray-600 ">{t('Dashboard.Marketplace.priceRange')}</Text>
        <Sup>({currencyCode})</Sup>
      </View>
      <View tw="flex-row items-center justify-between">
        <View tw="w-[47%]">
          <Text tw="text-base text-gray-600">{t('Dashboard.Marketplace.Filters.min')}</Text>
          <Controller
            control={control}
            name="min"
            render={({ field: { value, onChange } }) => (
              <Input
                tw="bg-white border rounded-sm h-14 rounded-md mt-2"
                keyboardType="numeric"
                defaultValue="0.00"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        <View tw="w-[47%]">
          <Text tw="text-base text-gray-600">{t('Dashboard.Marketplace.Filters.max')}</Text>
          <Controller
            control={control}
            name="max"
            render={({ field: { value, onChange } }) => (
              <Input
                tw="bg-white border rounded-sm h-14 rounded-md mt-2"
                keyboardType="numeric"
                defaultValue="0.00"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}
