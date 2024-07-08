import { getAllISOCodes } from 'iso-country-currency';
import { currencies } from 'currencies.json';

import type { Company } from '#types/global';

type Models = keyof Pick<Company, 'digitalTwin' | 'ml4Market' | 'ml4Quality' | 'ml4Farmers'>;

export function derivedSubjects(company: Company) {
  const models = new Set<Models>(['digitalTwin', 'ml4Market', 'ml4Quality', 'ml4Farmers']);

  for (const model of models) {
    if (model in company) continue;
    models.delete(model);
  }

  const bankNameValue: string | undefined =
    // eslint-disable-next-line
    // @ts-ignore
    typeof company.bankDetails !== 'undefined' && 'bankName' in company.bankDetails
      ? company.bankDetails.bankName === 'undefined'
        ? undefined
        : // eslint-disable-next-line
          // @ts-ignore
          (company.bankDetails.bankName as string)
      : undefined;

  return {
    models: Array.from(models),
    countryCode: company.country,
    currencyCode: company.currency,
    bankName: bankNameValue,
    companyLogo: company.logo,
    commodities: company.crop,
  };
}

export function countriesDict() {
  const dict = new Map<string, string>();

  for (const entry of getAllISOCodes()) {
    dict.set(entry.iso, entry.countryName);
  }

  return {
    values: () => Array.from(dict.values()),
    getISOByValue: (value: string): string | undefined => {
      for (const [countryISO, countryName] of dict) {
        if (countryName === value) return countryISO;
      }
      return undefined;
    },
    getValueByISO: (countryISO: string): string | undefined => dict.get(countryISO),
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
  };
}
