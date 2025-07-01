import { AxiosError } from 'axios';
import { format } from 'date-fns';
import qs from 'qs';

import { EFarmerImpactEndpoints } from '#constants/api.routes';
import { FARMER_IMPACT_BASE_URL } from '#constants/environment';
import type { GetFarmerImpactParams } from '#types/api.params';
import type { FarmerBaseData, FarmerData, FarmerImpactData } from '#types/global';

import HttpClient, { HttpClientOptions } from './HttpClient';
import ErrorUtil, { CustomError } from './utils/ErrorUtil';
import { serialize } from './utils';

class FarmerImpactService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super({
      ...(options ?? ({} as HttpClientOptions)),
      baseURL: FARMER_IMPACT_BASE_URL,
    });
  }

  public getFarmerBaseImpact = async (farmer: number): Promise<FarmerBaseData | undefined> => {
    try {
      const query = qs.stringify({ farmer });
      const { data } = await this.axios.post<FarmerBaseData>(
        EFarmerImpactEndpoints.GET_FARMER_BASE,
        query
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getFarmerImpact = async (
    params: GetFarmerImpactParams
  ): Promise<Array<FarmerData> | undefined> => {
    try {
      const { unitIds, farmerId } = params;
      const endDate = format(new Date(params.endDate ?? new Date()), 'yyyy-MM-dd');
      const _startDate = params.startDate ?? new Date(2022, 9);
      const startDate = format(new Date(_startDate), 'yyyy-MM-dd');

      const _params = {
        unitIds: typeof unitIds === 'number' ? unitIds : unitIds.join(','),
        startDate,
        endDate,
        farmerId,
      };

      const query = qs.stringify(serialize(_params));

      const { data } = await this.axios.post<Array<FarmerData>>(
        EFarmerImpactEndpoints.GET_FARMER,
        query
      );
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getImpact = async (
    params: GetFarmerImpactParams
  ): Promise<FarmerImpactData | undefined> => {
    try {
      const { unitIds, farmerId } = params;
      const endDate = format(new Date(params.endDate ?? new Date()), 'yyyy-MM-dd');
      const _startDate = params.startDate ?? new Date(2022, 9);
      const startDate = format(new Date(_startDate), 'yyyy-MM-dd');

      const _params = {
        coolingUnitIds: typeof unitIds === 'number' ? unitIds : unitIds.join(','),
        startDate,
        endDate,
        farmerId2: farmerId,
      };

      const query = qs.stringify(serialize(_params));

      const { data } = await this.axios.post<FarmerImpactData>(
        EFarmerImpactEndpoints.GET_IMPACT,
        query
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

export default new FarmerImpactService();
