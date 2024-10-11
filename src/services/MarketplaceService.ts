import type { AxiosError } from 'axios';

import { EMarketplaceEndpoints } from '#constants/api.routes';
import type {
  AddItemToCartParams,
  AddPaystackBankAccountParams,
  CreateDeliveryContactParams,
  DeleteDeliveryContactParams,
  SetPickUpDetailsParams,
} from '#types/api.params';
import type {
  ApplyCouponResponse,
  CheckoutWithPaystackResponse,
  GetAllOrdersResponse,
  GetAvailableBanksResponse,
  GetCartResponse,
  GetDeliveryContactsResponse,
  SetPickUpDetailsResponse,
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

  public payWithPaystack = async (orderId: number): Promise<CheckoutWithPaystackResponse> => {
    try {
      const url = subs(EMarketplaceEndpoints.PAY_WITH_PAYSTACK, { order: orderId });
      const { data } = await this.post<CheckoutWithPaystackResponse>(url, {});
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

  public getOrder = async (orderId: number): Promise<GetAllOrdersResponse> => {
    try {
      const url = subs(EMarketplaceEndpoints.GET_ORDER, { orderId });
      const { data } = await this.get<GetAllOrdersResponse>(url);
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

  public getCartDeliveryContacts = async (): Promise<GetDeliveryContactsResponse> => {
    try {
      const { data } = await this.get<GetDeliveryContactsResponse>(
        EMarketplaceEndpoints.GET_CART_DELIVERY_CONTACTS
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getOrderDeliveryContacts = async (
    orderId: number
  ): Promise<GetDeliveryContactsResponse> => {
    try {
      const url = subs(EMarketplaceEndpoints.GET_ORDER_DELIVERY_CONTACTS, { orderId });
      const { data } = await this.get<GetDeliveryContactsResponse>(url);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public addPaystackAccount = async (
    params: AddPaystackBankAccountParams
  ): Promise<BankAccount> => {
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

  public applyCoupon = async (couponCode: string): Promise<ApplyCouponResponse> => {
    try {
      const { data } = await this.post<ApplyCouponResponse>(EMarketplaceEndpoints.APPLY_COUPON, {
        couponCode,
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public clearCoupon = async (couponCode: string): Promise<ApplyCouponResponse> => {
    try {
      const { data } = await this.post<ApplyCouponResponse>(EMarketplaceEndpoints.CLEAR_COUPON, {
        couponCode,
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public setPickUpMethods = async (
    params: SetPickUpDetailsParams
  ): Promise<SetPickUpDetailsResponse> => {
    try {
      const { data } = await this.post<SetPickUpDetailsResponse>(
        EMarketplaceEndpoints.SET_PICKUP_DETAILS,
        {
          ...params,
        }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public createDeliveryContact = async (
    params: CreateDeliveryContactParams
  ): Promise<GetDeliveryContactsResponse> => {
    try {
      const { data } = await this.post<GetDeliveryContactsResponse>(
        EMarketplaceEndpoints.COMPANY_DELIVERY_CONTACTS,
        { ...params }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public listDeliveryContacts = async (companyId: number): Promise<GetDeliveryContactsResponse> => {
    try {
      const url = subs(EMarketplaceEndpoints.LIST_COMPANY_DELIVERY_CONTACTS, { companyId });
      const { data } = await this.get<GetDeliveryContactsResponse>(url);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public deleteDeliveryContactId = async (
    params: DeleteDeliveryContactParams
  ): Promise<unknown> => {
    try {
      const url = subs(EMarketplaceEndpoints.DELETE_DELIVERY_CONTACT, {
        contactId: params.contactId,
        companyId: params.companyId,
      });
      const { data } = await this.delete<unknown>(url);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new MarketplaceService();
