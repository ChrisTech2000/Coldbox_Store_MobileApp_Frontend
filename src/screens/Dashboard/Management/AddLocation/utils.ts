import { getAllISOCodes } from 'iso-country-currency';
import '@mapbox/mapbox-sdk';
import geocodingService, { type GeocodeService } from '@mapbox/mapbox-sdk/services/geocoding';

import { MAPBOX_ACCESS_TOKEN } from '#constants/environment';

import type { PreprocessedFormValues } from './components/FormManager';

export function getCountryFullName(companyCountry?: string): string | undefined {
  const document = getAllISOCodes().find((country) => country.iso === companyCountry);
  return document?.countryName;
}

export enum EGeolocationError {
  INVALID_FORMAT = 'Invalid city format',
  LOW_CONFIDENCE = 'Low confidence or invalid type',
  UNRESOLVED_CITY = 'City could not be resolved',
  GENERAL_ERROR = 'Error during geocoding',
}

export class Geocoder {
  private _client: GeocodeService;

  constructor() {
    this._client = geocodingService({ accessToken: MAPBOX_ACCESS_TOKEN });
  }

  ///
  // Public Methods
  ///

  public getCoordsFromAddress = async (datums: Omit<PreprocessedFormValues, '_step'>) => {
    const result = await this._client
      .forwardGeocode({ query: this.buildAddressFromDatum(datums), limit: 1 })
      .send();

    const location = result?.body?.features?.at(0)?.center;
    if (typeof location === 'undefined' || location.length !== 2) {
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
    try {
      if (!/^[a-zA-Z\s]+$/.test(datums.cityName)) {
        throw new Error(EGeolocationError.INVALID_FORMAT);
      }

      const result = await this._client
        .forwardGeocode({
          query: datums.cityName,
          countries: [datums.countryCode],
          limit: 1,
        })
        .send();

      const location = result?.body?.features?.[0]?.center;
      if (location && location.length === 2) {
        const [longitude, latitude] = location;
        return { longitude, latitude };
      }

      const globalResult = await this._client
        .forwardGeocode({
          query: datums.cityName,
          limit: 1,
        })
        .send();

      const globalFeature = globalResult?.body?.features?.[0];
      if (globalFeature?.relevance < 0.8 || !globalFeature?.place_type.includes('place')) {
        throw new Error(EGeolocationError.LOW_CONFIDENCE);
      }

      if (globalFeature?.center?.length === 2) {
        const [longitude, latitude] = globalFeature.center;
        return { longitude, latitude };
      }

      throw new Error(EGeolocationError.UNRESOLVED_CITY);
    } catch (error) {
      console.log(error);
      const message = (error as Error).message ?? '';
      throw new Error(message);
    }
  };

  ///
  // Util functions
  ///

  public buildAddressFromDatum = (datum: Partial<Omit<PreprocessedFormValues, '_step'>>) => {
    const parts: Array<string> = [];

    if (datum?.streetNumber || datum?.street) {
      const streetAddress = [datum?.streetNumber, datum?.street].filter(Boolean).join(' ');
      parts.push(streetAddress);
    }

    if (datum.city) parts.push(datum.city);
    if (datum.state) parts.push(datum.state);
    if (datum?.zipCode) parts.push(datum.zipCode);
    if (datum.country) parts.push(datum.country);

    return parts.join(', ');
  };
}
