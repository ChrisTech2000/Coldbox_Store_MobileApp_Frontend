import { EImpactEndpoints } from '#constants/api.routes';
import { IMPACT_BACKUP_BASE_URL } from '#constants/environment';
import { AxiosError } from 'axios';
import qs from 'qs';

import type { GetCoolingUnitImpactParams, GetImpactParams } from '#types/api.params';
import type { CompanyData, CoolingUnitImpact, ImpactData } from '#types/global';

import { format } from 'date-fns';
import HttpClient, { HttpClientOptions } from './HttpClient';
import { serialize } from './utils';
import ErrorUtil, { CustomError } from './utils/ErrorUtil';

class ImpactService extends HttpClient {
  constructor(options?: HttpClientOptions) {
    super({
      ...(options ?? ({} as HttpClientOptions)),
      baseURL: IMPACT_BACKUP_BASE_URL,
    });
  }

  public getCompanyImpact = async (companyId: number): Promise<CompanyData | undefined> => {
    try {
      const query = qs.stringify({ company_id: companyId });
      const { data } = await this.axios.post<CompanyData>(EImpactEndpoints.GET_COMPANY, query);
      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };

  public getCoolingUnitImpact = async (
    params: GetCoolingUnitImpactParams
  ): Promise<CoolingUnitImpact | undefined> => {
    try {
      const { unitIds } = params;
      const endDate = format(new Date(params.endDate ?? new Date()), 'yyyy-MM-dd');
      const _startDate = params.startDate ?? new Date(2022, 9);
      const startDate = format(new Date(_startDate), 'yyyy-MM-dd');

      const _params = {
        unitIds: typeof unitIds === 'number' ? unitIds : unitIds.join(','),
        startDate,
        endDate,
      };

      const query = qs.stringify(serialize(_params));
      const { data } = await this.axios.post<CoolingUnitImpact>(
        EImpactEndpoints.GET_COOLING_UNIT,
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

  public getImpact = async (params: GetImpactParams): Promise<ImpactData | undefined> => {
    try {
      const { coolingUnitId } = params;

      const endDate = format(new Date(params.endDate ?? new Date()), 'yyyy-MM-dd');
      const _startDate = params.startDate ?? new Date(2022, 9);
      const startDate = format(new Date(_startDate), 'yyyy-MM-dd');

      const _params = {
        view: 'aggregated',
        ...params,
        coolingUnitId: typeof coolingUnitId === 'number' ? coolingUnitId : coolingUnitId.join(','),
        startDate,
        endDate,
      };

      const query = qs.stringify(serialize(_params));
      const { data } = await this.axios.post<ImpactData>(EImpactEndpoints.GET_IMPACT, query);

      return data;
    } catch (error) {
      console.log(error);
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new ImpactService();
