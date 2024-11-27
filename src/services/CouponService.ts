import type { AxiosError } from 'axios';

import { CouponsEndpoints } from '#constants/api.routes';
import type { CreateCouponParams, GetCouponListParams } from '#types/api.params';
import type { CreateCouponResponse, GetCouponListResponse } from '#types/api.responses';

import HttpClient from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';
import { subs } from './utils';

class CouponService extends HttpClient {
  public getCouponList = async (params?: GetCouponListParams): Promise<GetCouponListResponse> => {
    try {
      const { data } = await this.get<GetCouponListResponse>(CouponsEndpoints.LIST_OWN_COUPONS, {
        params: {
          show_revoked: params?.revoked ?? '',
          owned_on_behalf_of_company_id: params?.ownedOnBehalfOfCompanyId ?? '',
        },
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public createCoupon = async (params: CreateCouponParams): Promise<CreateCouponResponse> => {
    try {
      let url = CouponsEndpoints.LIST_OWN_COUPONS.toString();

      if (params.ownedOnBehalfOfCompanyId) {
        url += `?owned_on_behalf_of_company_id=${params.ownedOnBehalfOfCompanyId}`;
      }

      const { data } = await this.post<CreateCouponResponse>(url, {
        code: params.code,
        discountPercentage: params.discountPercentage,
      });
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public revokeCoupon = async ({
    couponId,
    ownedOnBehalfOfCompanyId,
  }: {
    couponId: number;
    ownedOnBehalfOfCompanyId?: number;
  }): Promise<void> => {
    try {
      let url = subs(CouponsEndpoints.REVOKE_COUPON, { couponId });

      if (ownedOnBehalfOfCompanyId) {
        url += `?owned_on_behalf_of_company_id=${ownedOnBehalfOfCompanyId}`;
      }
      await this.delete(url);
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCoupon = async (couponId: number): Promise<CreateCouponResponse> => {
    try {
      const { data } = await this.get<CreateCouponResponse>(
        subs(CouponsEndpoints.REVOKE_COUPON, { couponId })
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new CouponService();
