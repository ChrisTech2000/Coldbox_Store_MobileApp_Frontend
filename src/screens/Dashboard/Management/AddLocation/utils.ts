import { getAllISOCodes } from 'iso-country-currency';
import '@mapbox/mapbox-sdk';
import geocodingService, { type GeocodeService } from '@mapbox/mapbox-sdk/services/geocoding';

import { MAPBOX_ACCESS_TOKEN } from '#constants/environment';

import type { PreprocessedFormValues } from './components/FormManager';

export function getCountryFullName(companyCountry?: string): string | undefined {
  const document = getAllISOCodes().find((country) => country.iso === companyCountry);
  return document?.countryName;
}

export class Geocoder {
  private _client: GeocodeService;

  constructor() {
    this._client = geocodingService({ accessToken: MAPBOX_ACCESS_TOKEN });
  }

  public getCoordsFromAddress = async (datums: Omit<PreprocessedFormValues, '_step'>) => {
    const address = `${datums.streetNumber} ${datums.street}, ${datums.city}, ${datums.state}, ${datums.zipCode}, ${datums.country}`;

    const result = await this._client.forwardGeocode({ query: address, limit: 1 }).send();

    const location = result?.body?.features?.at(0)?.center;
    if (typeof location === 'undefined' || location.length !== 1) {
      throw new Error('No results found');
    }

    const [longitude, latitude] = location;
    return { longitude, latitude };
  };

  public getAddressFromCoords = async (
    datums: Pick<PreprocessedFormValues, 'latitude' | 'longitude'>
  ) => {
    const result = await this._client
      .reverseGeocode({ query: [datums.longitude, datums.latitude], limit: 1 })
      .send();

    const feature = result?.body?.features?.at(0);
    if (typeof feature === 'undefined') {
      throw new Error('No results found');
    }

    const _lookupMap: Readonly<Record<string, string>> = {
      postcode: 'zipCode',
      place: 'city',
      region: 'state',
      country: 'country',
    };

    const final = {} as Pick<PreprocessedFormValues, 'zipCode' | 'city' | 'state' | 'country'>;

    for (const item of feature.context) {
      const targetKey = item.id.split('.')[0];
      const key = _lookupMap?.[targetKey] as keyof typeof final | undefined;
      if (typeof key === 'undefined') continue;
      final[key] = item.text;
    }

    return final;
  };

  public getCoordsFromLocation = async (datums: { cityName: string; countryCode: string }) => {
    const result = await this._client
      .forwardGeocode({
        query: datums.cityName,
        countries: [datums.countryCode],
        limit: 1,
      })
      .send();

    const location = result?.body?.features?.[0]?.center;
    if (!location || location.length !== 2) {
      throw new Error('No results found or invalid location format');
    }

    const [longitude, latitude] = location;
    return { longitude, latitude };
  };
}
