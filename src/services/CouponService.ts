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
        params: { show_revoked: params?.revoked ?? '' },
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
      const { data } = await this.post<CreateCouponResponse>(
        CouponsEndpoints.LIST_OWN_COUPONS,
        params
      );
      return data;
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public revokeCoupon = async (couponId: number): Promise<void> => {
    try {
      await this.delete(subs(CouponsEndpoints.REVOKE_COUPON, { couponId }));
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
