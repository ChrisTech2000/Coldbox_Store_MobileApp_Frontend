import type { AxiosError } from 'axios';

import { MarketplaceEndpoints } from '#constants/api.routes';
import type { GetAvailableListingParams, UpdateListedCrateParams } from '#types/api.params';
import type { GetAvailableListingResponse } from '#types/api.responses';

import HttpClient from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';
import { subs } from './utils';

class MarketplaceService extends HttpClient {
  public upsertListedCrate = async (params: UpdateListedCrateParams) => {
    try {
      const { data } = await this.post(MarketplaceEndpoints.UPSERT_LISTED_CRATE, params);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getAvailableListing = async (
    params: GetAvailableListingParams
  ): Promise<GetAvailableListingResponse> => {
    try {
      const { data } = await this.get<GetAvailableListingResponse>(
        MarketplaceEndpoints.AVAILABLE_LISTING,
        {
          params: {
            ...params,
            location: params.location.join(','),
            filterByCoolingUnitsIds:
              !params?.filterByCoolingUnitsIds || params.filterByCoolingUnitsIds.length < 1
                ? undefined
                : params.filterByCoolingUnitsIds.join(','),
          },
        }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getSellerListedCratesByCrateId = async (crateId: number) => {
    try {
      const { data } = await this.get(
        subs(MarketplaceEndpoints.GET_SELLER_LISTED_CRATES_BY_CRATE_ID, { crateId })
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new MarketplaceService();
