import { getAllISOCodes } from 'iso-country-currency';
import '@mapbox/mapbox-sdk';
import geocodingService, { type GeocodeService } from '@mapbox/mapbox-sdk/services/geocoding';

import { MAPBOX_ACCESS_TOKEN } from '#constants/environment';

import type { PreprocessedFormValues } from './components/FormManager';

export function getCountryFullName(companyCountry?: string): string | undefined {
  const document = getAllISOCodes().find((country) => country.iso === companyCountry);
  return document?.countryName;
}

class Geocoder {
  private client: GeocodeService;

  constructor() {
    this.client = geocodingService({ accessToken: MAPBOX_ACCESS_TOKEN });
  }

  async getCoordsFromAddress(datums: Omit<PreprocessedFormValues, '_step'>) {
    const address = `${datums.streetNumber} ${datums.street}, ${datums.city}, ${datums.state}, ${datums.zipCode}, ${datums.country}`;

    const result = await this.client.forwardGeocode({ query: address, limit: 1 }).send();

    const location = result?.body?.features?.at(0)?.center;
    if (typeof location === 'undefined' || location.length !== 1) {
      throw new Error('No results found');
    }

    const [longitude, latitude] = location;
    return { longitude, latitude };
  }

  async getAddressFromCoords(datums: Pick<PreprocessedFormValues, 'latitude' | 'longitude'>) {
    const result = await this.client
      .reverseGeocode({ query: [datums.longitude, datums.latitude], limit: 1 })
      .send();

    const feature = result?.body?.features?.at(0);
    if (!feature) {
      throw new Error('No results found');
    }

    const _dict: Readonly<Record<string, string>> = Object.freeze({
      postcode: 'zipCode',
      place: 'city',
      region: 'state',
      country: 'country',
    });

    const entries: Array<[string, string]> = [];

    for (const item of feature.context) {
      const normalizedKey = item.id.split('.')[0];
      if (normalizedKey in _dict) {
        entries.push([_dict[normalizedKey], item.text]);
      }
    }

    return Object.fromEntries(entries) as Pick<
      PreprocessedFormValues,
      'zipCode' | 'city' | 'state' | 'country'
    >;
  }
}

export const geocoder = new Geocoder();
