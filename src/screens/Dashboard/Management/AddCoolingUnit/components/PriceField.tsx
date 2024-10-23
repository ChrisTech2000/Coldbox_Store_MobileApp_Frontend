import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import { useTranslationUtils } from '#i18n/utils';

import FormManager from '../contexts/FormManager';
import DataAggregator from '../contexts/DataAggregator';

import { currenciesDict } from '../../CompanyDetails/utils';

const currencies = currenciesDict();

export default function PriceField() {
  const { control, formState, watch } = FormManager.useFormManager();
  const { companyCurrency } = DataAggregator.useDataAggregator();
  const { t } = useTranslationUtils();

  const selectedPriceType = watch('priceType');

  const currencySymbol = companyCurrency ? currencies.getSymbolByCode(companyCurrency) : undefined;
  const textInputAffix =
    selectedPriceType === 'PERIODICITY'
      ? `${currencySymbol}/${t('Dashboard.Management.AddCoolingUnit.pricing.day')}`
      : currencySymbol;

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="price"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label={`${t('Dashboard.Management.AddCoolingUnit.fields.price')}*`}
            mode="flat"
            dense
            value={value}
            keyboardType="numeric"
            onChangeText={onChange}
            onBlur={onBlur}
            error={!!errors.price}
            right={<TextInput.Affix text={textInputAffix} />}
          />
        )}
      />
    </React.Fragment>
  );
}
