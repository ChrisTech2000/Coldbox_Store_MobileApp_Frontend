import '@mapbox/mapbox-sdk';
import geocodingClient, { type GeocodeService } from '@mapbox/mapbox-sdk/services/geocoding';
import GetLocation from 'react-native-get-location';
import ms from 'ms';

import { MAPBOX_ACCESS_TOKEN } from '#constants/environment';

import ErrorUtil, { EGeolocationError } from './utils/ErrorUtil';

export type GeoLocationAddress = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  street: string;
  streetNumber: string;
};

export class LocationGeocoder {
  private static _client: GeocodeService = geocodingClient({ accessToken: MAPBOX_ACCESS_TOKEN });

  public static async getCurrentLocation() {
    try {
      return await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: ms('6 seconds'),
      });
    } catch (exception) {
      const customError = ErrorUtil.handleLocationGeocodingError(exception);
      console.error(customError.toJSON());
      throw customError;
    }
  }

  public static async getCoordsFromAddress(datums: GeoLocationAddress) {
    try {
      const result = await LocationGeocoder._client
        .forwardGeocode({ query: LocationGeocoder.buildAddressFromDatum(datums), limit: 1 })
        .send();

      const location = result?.body?.features?.at(0)?.center;
      if (typeof location === 'undefined' || location.length !== 2) {
        throw new Error(EGeolocationError.NoResults);
      }

      const [longitude, latitude] = location;
      return { longitude, latitude };
    } catch (exception) {
      const customError = ErrorUtil.handleLocationGeocodingError(exception);
      console.error(customError.toJSON());
      throw customError;
    }
  }

  public static async getAddressFromCoords(
    datums: Pick<GeoLocationAddress, 'latitude' | 'longitude'>
  ) {
    try {
      const result = await LocationGeocoder._client
        .reverseGeocode({ query: [datums.longitude, datums.latitude], limit: 1 })
        .send();

      const feature = result?.body?.features?.at(0);
      if (typeof feature === 'undefined') {
        throw new Error(EGeolocationError.NoResults);
      }

      const _lookupMap: Readonly<Record<string, string>> = {
        postcode: 'zipCode',
        place: 'city',
        region: 'state',
        country: 'country',
      };

      const final = {} as Pick<GeoLocationAddress, 'zipCode' | 'city' | 'state' | 'country'>;

      for (const item of feature.context) {
        const targetKey = item.id.split('.')[0];
        const key = _lookupMap?.[targetKey] as keyof typeof final | undefined;
        if (typeof key === 'undefined') continue;
        final[key] = item.text;
      }

      return final;
    } catch (exception) {
      const customError = ErrorUtil.handleLocationGeocodingError(exception);
      console.error(customError.toJSON());
      throw customError;
    }
  }

  public static async getCoordsFromLocation(datums: { cityName: string; countryCode: string }) {
    try {
      if (!/^[a-zA-Z\s]+$/.test(datums.cityName)) {
        throw new Error(EGeolocationError.InvalidFormat);
      }

      const result = await LocationGeocoder._client
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

      const globalResult = await LocationGeocoder._client
        .forwardGeocode({
          query: datums.cityName,
          limit: 1,
        })
        .send();

      const globalFeature = globalResult?.body?.features?.[0];
      if (globalFeature?.relevance < 0.8 || !globalFeature?.place_type.includes('place')) {
        throw new Error(EGeolocationError.LowConfidence);
      }

      if (globalFeature?.center?.length === 2) {
        const [longitude, latitude] = globalFeature.center;
        return { longitude, latitude };
      }

      throw new Error(EGeolocationError.UnresolvedCity);
    } catch (exception) {
      const customError = ErrorUtil.handleLocationGeocodingError(exception);
      console.error(customError.toJSON());
      throw customError;
    }
  }

  public static buildAddressFromDatum(datum: Partial<GeoLocationAddress>) {
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
  }
}
