import { AxiosError } from 'axios';
import qs from 'qs';

import { FARMER_BASE_URL } from '#constants/environment';
import type { Farmer } from '#types/global';

import HttpClient, { type HttpClientOptions } from './HttpClient';
import ErrorUtil, { type CustomError } from './utils/ErrorUtil';

const STATIC_START_DATE = '2022-10-01'; // copied from the web app :shrug:

class FarmerService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super({ ...options, baseURL: FARMER_BASE_URL } as HttpClientOptions);
  }

  public getFarmerBaseSlice = async (farmerId: number) => {
    try {
      const { data } = await this.axios.post(
        'farmer-base-slice/',
        qs.stringify({ farmer: farmerId })
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getFarmerSlice = async (farmer: Farmer) => {
    try {
      const currentDate = new Date();
      const dateOnly = currentDate.toISOString().split('T')[0];

      const { data } = await this.axios.post(
        'farmer-slice/',
        qs.stringify({
          farmer_id: farmer.id,
          unit_ids: farmer.coolingUnits.join(','),
          start_date: STATIC_START_DATE,
          end_date: dateOnly,
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getImpactSlice = async (farmer: Farmer) => {
    try {
      const currentDate = new Date();
      const dateOnly = currentDate.toISOString().split('T')[0];

      const { data } = await this.axios.post(
        'impact-slice/',
        qs.stringify({
          farmer_id_2: farmer.id,
          cooling_unit_ids: farmer.coolingUnits.join(','),
          start_date: STATIC_START_DATE,
          end_date: dateOnly,
        })
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new FarmerService();
