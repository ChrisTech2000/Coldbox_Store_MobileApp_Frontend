import type { AxiosError } from 'axios';

import { EMarketplaceEndpoints } from '#constants/api.routes';
import type {
  AddFirstPaystackBankAccountParams,
  AddItemToCartParams,
  AddPaystackBankAccountParams,
  CheckMarketplaceEligibilityParams,
  CreateDeliveryContactParams,
  DeleteDeliveryContactParams,
  GetAvailableListingParams,
  ListedCratesBaseParams,
  SetPickUpDetailsParams,
  UpdateDeliveryContactParams,
  UpdateListedCrateParams,
} from '#types/api.params';
import type {
  ApplyCouponResponse,
  CheckMarketplaceEligibilityResponse,
  CheckoutWithPaystackResponse,
  DeliveryContact,
  GetAllOrdersResponse,
  GetAllSalesResponse,
  GetAvailableBanksResponse,
  GetAvailableListingResponse,
  GetCartResponse,
  GetDeliveryContactsResponse,
  GetSellerListedCrates,
  SetPickUpDetailsResponse,
  ToggleCartOwnershipResponse,
  UpdateListedCrateResponse,
} from '#types/api.responses';
import type { BankAccount } from '#types/global';

import HttpClient from './HttpClient';
import { query, subs } from './utils';
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

  public recomputeCart = async (): Promise<GetCartResponse> => {
    try {
      const { data } = await this.post<GetCartResponse>(EMarketplaceEndpoints.GET_CART, {});
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

  public getUserBankAccounts = async (companyId?: number): Promise<Array<BankAccount>> => {
    try {
      const { data } = await this.get<Array<BankAccount>>(
        query(EMarketplaceEndpoints.SELLER_BANK_ACCOUNTS, { companyId })
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
        { ...params }
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
  ): Promise<DeliveryContact> => {
    try {
      const { coolingUnitIds, ...rest } = params;
      const { data } = await this.post<DeliveryContact>(
        EMarketplaceEndpoints.COMPANY_DELIVERY_CONTACTS,
        { ...rest, cooling_unit_ids: coolingUnitIds }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public listDeliveryContacts = async (
    companyId: number,
    coolingUnitId?: number,
    isActive?: boolean
  ): Promise<GetDeliveryContactsResponse> => {
    try {
      let url = subs(EMarketplaceEndpoints.LIST_COMPANY_DELIVERY_CONTACTS, { companyId });
      const params = new URLSearchParams();
      if (coolingUnitId !== undefined) {
        params.append('cooling_unit', coolingUnitId.toString());
      }
      if (isActive !== undefined) {
        params.append('is_active', isActive.toString());
      }
      if (params.toString()) {
        url += `&${params.toString()}`;
      }
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
      });
      const { data } = await this.delete<unknown>(url);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public updateDeliveryContact = async (
    params: UpdateDeliveryContactParams
  ): Promise<DeliveryContact> => {
    try {
      const { contactId, coolingUnitIds, ...body } = params;
      const url = subs(EMarketplaceEndpoints.UPDATE_DELIVERY_CONTACT, {
        contactId,
      });
      const { data } = await this.patch<DeliveryContact>(url, {
        ...body,
        cooling_unit_ids: coolingUnitIds,
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getLegacyContacts = async (companyId: number): Promise<GetDeliveryContactsResponse> => {
    try {
      const url = subs(EMarketplaceEndpoints.GET_LEGACY_CONTACTS, { companyId });
      const { data } = await this.get<GetDeliveryContactsResponse>(url);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public upsertListedCrate = async (
    params: ListedCratesBaseParams & UpdateListedCrateParams
  ): Promise<UpdateListedCrateResponse> => {
    try {
      const {
        operatorOnBehalfOfSellerFarmerId,
        operatorOnBehalfOfSellerUserId,
        operatorOnBehalfOfSellerCompanyId,
        ...body
      } = params;

      const { data } = await this.post<UpdateListedCrateResponse>(
        query(EMarketplaceEndpoints.UPSERT_LISTED_CRATE, {
          operatorOnBehalfOfSellerFarmerId,
          operatorOnBehalfOfSellerUserId,
          operatorOnBehalfOfSellerCompanyId,
        }),
        body
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
        query(EMarketplaceEndpoints.AVAILABLE_LISTING, params)
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getSellerListedCrates = async (
    params?: ListedCratesBaseParams
  ): Promise<GetSellerListedCrates> => {
    try {
      const { data } = await this.get<GetSellerListedCrates>(
        EMarketplaceEndpoints.UPSERT_LISTED_CRATE,
        { params }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public delistCratesByCrateId = async (
    params: ListedCratesBaseParams & { crateId: number }
  ): Promise<void> => {
    try {
      const { crateId, ...rest } = params;
      await this.delete(
        query(subs(EMarketplaceEndpoints.GET_SELLER_LISTED_CRATES_BY_CRATE_ID, { crateId }), rest)
      );
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public toggleCartOwnership = async (): Promise<ToggleCartOwnershipResponse> => {
    try {
      const { data } = await this.post<ToggleCartOwnershipResponse>(
        EMarketplaceEndpoints.TOGGLE_OWNERSHIP,
        {}
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public checkMarketplaceEligibility = async (
    params: CheckMarketplaceEligibilityParams
  ): Promise<CheckMarketplaceEligibilityResponse> => {
    try {
      const { data } = await this.post<CheckMarketplaceEligibilityResponse>(
        EMarketplaceEndpoints.CHECK_MARKETPLACE_ELIGIBILITY,
        { ...params }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public addFirstPaystackAccount = async (
    params: AddFirstPaystackBankAccountParams
  ): Promise<BankAccount> => {
    try {
      const { data } = await this.post<BankAccount>(
        EMarketplaceEndpoints.SET_FARMER_BANK_ACCOUNT,
        params
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getSales = async (): Promise<GetAllSalesResponse> => {
    try {
      const { data } = await this.get<GetAllSalesResponse>(EMarketplaceEndpoints.GET_MY_SALES);
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public cancelOrder = async (orderId: number): Promise<CheckoutWithPaystackResponse> => {
    try {
      const url = subs(EMarketplaceEndpoints.CANCEL_ORDER, { order: orderId });
      const { data } = await this.post<CheckoutWithPaystackResponse>(url, {});
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getFarmerBankAccounts = async (userId?: number): Promise<BankAccount> => {
    try {
      const { data } = await this.get<BankAccount>(
        query(EMarketplaceEndpoints.FARMER_BANK_ACCOUNTS, { userId })
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
