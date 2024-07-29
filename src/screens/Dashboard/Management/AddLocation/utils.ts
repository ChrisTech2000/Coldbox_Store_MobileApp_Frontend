import { getAllISOCodes } from 'iso-country-currency';

import type { PreprocessedFormValues } from './components/FormManager';

export function pickFormValues(
  datums: PreprocessedFormValues
): Partial<PreprocessedFormValues> | undefined {
  const { _step, name, latitude, longitude, ...rest } = datums;
  switch (_step) {
    case 'geolocation':
    case 'coordinates':
      return { name, latitude, longitude };
    case 'address':
      return { name, ...rest };
    default:
      return undefined;
  }
}

export function getCountryFullName(companyCountry?: string): string | undefined {
  const document = getAllISOCodes().find((country) => country.iso === companyCountry);
  return document?.countryName;
}
