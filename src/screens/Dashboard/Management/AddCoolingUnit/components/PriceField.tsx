import React from 'react';
import { Controller } from 'react-hook-form';

import { SuffixTextInput } from '#ui/components/SuffixTextInput';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../contexts/FormManager';
import DataAggregator from '../contexts/DataAggregator';

import { currenciesDict } from '../../CompanyDetails/utils';

export default function PriceField() {
  const { control, formState, watch } = FormManager.useFormManager();
  const { companyCurrency } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();

  const selectedPriceType = watch('priceType');

  const currencySymbol = React.useMemo(
    () => (companyCurrency ? currenciesDict().getSymbolByCode(companyCurrency) : undefined),
    [companyCurrency]
  );

  const textInputAffix =
    selectedPriceType === 'PERIODICITY'
      ? `${currencySymbol}/${t('Dashboard.Management.AddCoolingUnit.pricing.day')}`
      : currencySymbol;

  return (
    <React.Fragment>
      <Controller
        name="price"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <SuffixTextInput
            label={`${t('Dashboard.Management.AddCoolingUnit.fields.price')}*`}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!formState.errors.price}
            suffix={textInputAffix}
          />
        )}
      />
    </React.Fragment>
  );
}
