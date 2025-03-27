import type { AxiosError } from 'axios';

import { ECouponsEndpoints } from '#constants/api.routes';
import type { CreateCouponParams, GetCouponListParams } from '#types/api.params';
import type { CreateCouponResponse, GetCouponListResponse } from '#types/api.responses';

import HttpClient from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';
import { subs, query } from './utils';

class CouponService extends HttpClient {
  public getCouponList = async (params?: GetCouponListParams): Promise<GetCouponListResponse> => {
    try {
      const { data } = await this.get<GetCouponListResponse>(
        query(ECouponsEndpoints.LIST_OWN_COUPONS, {
          showRevoked: params?.revoked,
          ownedOnBehalfOfCompanyId: params?.ownedOnBehalfOfCompanyId,
        })
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public createCoupon = async (params: CreateCouponParams): Promise<CreateCouponResponse> => {
    try {
      const { data } = await this.post<CreateCouponResponse>(
        query(ECouponsEndpoints.LIST_OWN_COUPONS, {
          ownedOnBehalfOfCompanyId: params.ownedOnBehalfOfCompanyId,
        }),
        {
          code: params.code,
          discountPercentage: params.discountPercentage,
        }
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public revokeCoupon = async (params: {
    couponId: number;
    ownedOnBehalfOfCompanyId?: number;
  }): Promise<void> => {
    try {
      const base = subs(ECouponsEndpoints.REVOKE_COUPON, { couponId: params.couponId });
      await this.delete(query(base, { ownedOnBehalfOfCompanyId: params.ownedOnBehalfOfCompanyId }));
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new CouponService();
