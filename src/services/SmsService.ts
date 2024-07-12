import { ESMSEndpoints } from '#constants/api.routes';
import { AxiosError } from 'axios';

import { SendSMSParams } from '#types/api.params';

import HttpClient from './HttpClient';
import ErrorUtil, { CustomError } from './utils/ErrorUtil';

class SMSService extends HttpClient {
  public sendSMS = async (params: SendSMSParams): Promise<void> => {
    try {
      await this.post<void>(ESMSEndpoints.SEND_SMS, params, undefined, ['phoneNumber']);
    } catch (error) {
      const customError: CustomError = ErrorUtil.handleAxiosError(error as AxiosError);
      console.log(JSON.stringify(customError));
      throw customError;
    }
  };
}

export default new SMSService();
