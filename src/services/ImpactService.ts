import { IMPACT_BACKUP_BASE_URL } from '#constants/environment';
import { EImpactEndpoints } from '#constants/api.routes';
import { AxiosError } from 'axios';
import qs from 'qs';

import type { CompanyData } from '#types/global';

import HttpClient, { HttpClientOptions } from './HttpClient';
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
}

export default new ImpactService();
