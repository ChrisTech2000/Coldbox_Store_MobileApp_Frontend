import React from 'react';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

import FormManager from '../contexts/FormManager';
import DataAggregator from '../contexts/DataAggregator';

import { currenciesDict } from '../../CompanyDetails/utils';

const currencies = currenciesDict();

export default function PriceField() {
  const { control, formState } = FormManager.useFormManager();
  const { companyCurrency } = DataAggregator.useDataAggregator();

  const currencySymbol = companyCurrency ? currencies.getSymbolByCode(companyCurrency) : undefined;
  const textInputAffix = currencySymbol ? `${currencySymbol}/day` : `/day`;

  const errors = formState.errors;

  return (
    <React.Fragment>
      <Controller
        name="price"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            tw="w-full bg-transparent mt-1"
            label="Price"
            mode="flat"
            dense
            value={value.toString()}
            keyboardType="numeric"
            onChangeText={(v) => onChange(parseInt(v || '0'))}
            onBlur={onBlur}
            error={!!errors.price}
            right={<TextInput.Affix text={textInputAffix} />}
          />
        )}
      />
    </React.Fragment>
  );
}
