import type { AxiosError } from 'axios';

import { EMarketplaceEndpoints } from '#constants/api.routes';
import type { CheckoutWithPaystackResponse, GetCartResponse } from '#types/api.responses';
import { AddItemToCartParams } from '#types/api.params';

import HttpClient from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';
import { subs } from './utils';

class MarketplaceService extends HttpClient {
  public getCart = async (): Promise<GetCartResponse> => {
    try {
      const { data } = await this.get<GetCartResponse>(EMarketplaceEndpoints.GET_CART);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public checkoutWithPaystack = async (): Promise<CheckoutWithPaystackResponse> => {
    try {
      const { data } = await this.post<CheckoutWithPaystackResponse>(
        EMarketplaceEndpoints.CHECKOUT_WITH_PAYSTACK,
        {}
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public removeItemFromCart = async (crateId: number): Promise<GetCartResponse> => {
    try {
      const url = subs(EMarketplaceEndpoints.REMOVE_ITEM_FROM_CART, { crateId });
      const { data } = await this.delete<GetCartResponse>(url);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public addItemToCart = async (params: AddItemToCartParams): Promise<GetCartResponse> => {
    try {
      const { data } = await this.post<GetCartResponse>(EMarketplaceEndpoints.ADD_ITEM, params);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new MarketplaceService();
