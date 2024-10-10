import type { AxiosError } from 'axios';

import { EMarketplaceEndpoints } from '#constants/api.routes';
import type { GetAvailableListingParams, UpdateListedCrateParams } from '#types/api.params';
import type {
  GetAvailableListingResponse,
  SellerListedCratesResponse,
  UpdateListedCrateResponse,
} from '#types/api.responses';

import HttpClient from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';
import { subs } from './utils';

class MarketplaceService extends HttpClient {
  public upsertListedCrate = async (
    params: UpdateListedCrateParams
  ): Promise<UpdateListedCrateResponse> => {
    try {
      const { data } = await this.post<UpdateListedCrateResponse>(
        EMarketplaceEndpoints.UPSERT_LISTED_CRATE,
        params
      );
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
        EMarketplaceEndpoints.AVAILABLE_LISTING,
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

  public getSellerListedCratesByCrateId = async (
    crateId: number
  ): Promise<SellerListedCratesResponse> => {
    try {
      const { data } = await this.get<SellerListedCratesResponse>(
        subs(EMarketplaceEndpoints.GET_SELLER_LISTED_CRATES_BY_CRATE_ID, { crateId })
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getSellerListedCrates = async (): Promise<Array<SellerListedCratesResponse>> => {
    try {
      const { data } = await this.get<Array<SellerListedCratesResponse>>(
        EMarketplaceEndpoints.UPSERT_LISTED_CRATE
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public delistCratesByCrateId = async (crateId: number) => {
    try {
      const { data } = await this.delete(
        subs(EMarketplaceEndpoints.GET_SELLER_LISTED_CRATES_BY_CRATE_ID, { crateId })
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
