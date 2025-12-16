import { currencies } from 'currencies.json';
import { getAllISOCodes } from 'iso-country-currency';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import moize from 'moize';
import ms from 'ms';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { cropTranslationLookup } from '#i18n/transl/misc/crops';
import { LanguageManager } from '#i18n/utils';
import { useDashboardStore } from '#stores/dashboard';
import { useManagementStore } from '#stores/management';
import type { GetAllCropsResponse } from '#types/api.responses';
import type { Company } from '#types/global';

type Models = keyof Pick<Company, 'digitalTwin' | 'ml4Market' | 'ml4Quality' | 'ml4Farmers'>;

export function derivedSubjects(company: Company) {
  const models = new Set<Models>(['digitalTwin', 'ml4Market', 'ml4Quality', 'ml4Farmers']);

  for (const model of models) {
    if (model in company) {
      const value = company[model];
      if (!value) models.delete(model);
    }
  }

  const bankNameValue: string | undefined =
    company.bankDetails &&
    typeof company.bankDetails === 'object' &&
    'bankName' in company.bankDetails
      ? company.bankDetails.bankName === 'undefined'
        ? undefined
        : (company.bankDetails.bankName as string)
      : undefined;

  const accountNameValue: string | undefined =
    company.bankDetails &&
    typeof company.bankDetails === 'object' &&
    'accountName' in company.bankDetails
      ? company.bankDetails.accountName === 'undefined'
        ? undefined
        : (company.bankDetails.accountName as string)
      : undefined;

  const accountNumberValue: string | undefined =
    company.bankDetails &&
    typeof company.bankDetails === 'object' &&
    'accountNumber' in company.bankDetails
      ? company.bankDetails.accountNumber === 'undefined'
        ? undefined
        : (company.bankDetails.accountNumber as string)
      : undefined;

  return {
    models: Array.from(models),
    countryCode: company.country,
    currencyCode: company.currency,
    companyLogo: company.logo as unknown as string,
    commodities: company.crop,
    bankName: bankNameValue,
    accountName: accountNameValue,
    accountNumber: accountNumberValue,
    companyName: company.name,
  };
}

const CACHE_MAX_AGE = ms('20 seconds');

type CountryDatum = { name: string; currencyCode: string; currency: string; ISO: string };

export function countriesDict() {
  const dict = new Map<string, CountryDatum>();

  for (const entry of getAllISOCodes()) {
    dict.set(entry.iso, {
      name: entry.countryName,
      currencyCode: entry.symbol,
      currency: entry.currency,
      ISO: entry.iso,
    });
  }

  return {
    values: () => Array.from(dict.values()),
    getISOByName: moize(
      (value: string): string | undefined => {
        for (const [countryISO, { name }] of dict) {
          if (name === value) return countryISO;
        }
        return undefined;
      },
      { maxAge: CACHE_MAX_AGE }
    ),
    getNameByISO: (countryISO: string): string | undefined => dict.get(countryISO)?.name,
    getByValue: moize(
      (value: string) => {
        for (const [iso, datum] of dict.entries()) {
          if (iso === value || datum.name === value) return datum;
        }
        return undefined;
      },
      { maxAge: CACHE_MAX_AGE }
    ),
  };
}

type CurrencyDatum = { name: string; symbol: string; code: string };

export function currenciesDict() {
  const dict = new Map<string, CurrencyDatum>();

  for (const entry of currencies) {
    dict.set(entry.code, {
      name: entry.name,
      symbol: entry.symbol,
      code: entry.code,
    });
  }

  return {
    values: (): Array<string> => {
      const list: Array<string> = [];
      for (const datum of dict.values()) {
        list.push(datum.name);
      }
      return list;
    },
    getCodeByName: (name: string): string | undefined => {
      for (const datum of dict.values()) {
        if (datum.name === name) return datum.code;
      }
      return undefined;
    },
    getValueByCode: (code: string): string => {
      const datum = dict.get(code);
      if (!datum) return '';
      return [datum.symbol, datum.name].join(' - ');
    },
    getSymbolByCode: (code: string): string | undefined => {
      const datum = dict.get(code);
      return datum?.symbol;
    },
  };
}

export function useTranslatedCrops(crops: Array<GetAllCropsResponse>): Array<GetAllCropsResponse> {
  const [companyCountry] = useManagementStore(useShallow((store) => [store.company?.country]));
  const [farmerCountry] = useDashboardStore(useShallow((store) => [store.farmerCountry]));

  const locale = LanguageManager.read();

  return useMemo(() => {
    if (isEmpty(crops)) return [];
    const { buildMap, find } = cropTranslationLookup();
    const lookupMap = buildMap();

    return cloneDeep(crops)
      .map((crop) => {
        crop.name = find(lookupMap, {
          name: crop.name,
          country: companyCountry || farmerCountry || '',
          locale,
        });
        return crop;
      })
      .sort((a, b) => a.name.localeCompare(b.name, locale, { sensitivity: 'base' }));
  }, [crops, companyCountry, farmerCountry, locale]);
}
