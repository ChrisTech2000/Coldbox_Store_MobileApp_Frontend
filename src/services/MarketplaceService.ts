import type { AxiosError } from 'axios';

import { EMarketplaceEndpoints } from '#constants/api.routes';
import type { AddItemToCartParams, AddUserBankAccountParams } from '#types/api.params';
import type {
  CheckoutWithPaystackResponse,
  GetAllOrdersResponse,
  GetAvailableBanksResponse,
  GetCartResponse,
} from '#types/api.responses';
import type { BankAccount } from '#types/global';

import HttpClient from './HttpClient';
import { subs } from './utils';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';

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

  public getOrder = async (orderId: number): Promise<GetCartResponse> => {
    try {
      const url = subs(EMarketplaceEndpoints.GET_ORDER, { orderId });
      const { data } = await this.get<GetCartResponse>(url);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getOrders = async (): Promise<Array<GetAllOrdersResponse>> => {
    try {
      const { data } = await this.get<Array<GetAllOrdersResponse>>(
        EMarketplaceEndpoints.GET_ORDERS
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getUserBankAccounts = async (): Promise<Array<BankAccount>> => {
    try {
      const { data } = await this.get<Array<BankAccount>>(
        EMarketplaceEndpoints.SELLER_BANK_ACCOUNTS
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getAvailableBanks = async (): Promise<GetAvailableBanksResponse> => {
    try {
      const { data } = await this.get<GetAvailableBanksResponse>(EMarketplaceEndpoints.GET_BANKS);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public addUserAccount = async (params: AddUserBankAccountParams): Promise<BankAccount> => {
    try {
      const { data } = await this.post<BankAccount>(
        EMarketplaceEndpoints.SELLER_BANK_ACCOUNTS,
        params
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
