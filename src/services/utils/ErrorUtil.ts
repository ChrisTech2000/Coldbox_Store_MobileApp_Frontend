import { AxiosError } from 'axios';

export enum CustomErrorType {
  RequestFailed = 'RequestFailed',
  PermissionsError = 'PermissionsError',
  ServerError = 'ServerError',
  NetworkError = 'NetworkError',
  UnknownError = 'UnknownError',
}

export interface CustomError {
  type: CustomErrorType;
  message: string;
  originalError?: AxiosError<unknown>;
}

export default class ErrorUtil {
  public static handleAxiosError(error: AxiosError<unknown>): CustomError {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        return {
          type: CustomErrorType.PermissionsError,
          message: 'You don\t have the necessary credentials to fulfill the request.',
          originalError: error,
        };
      } else if (status >= 500) {
        return {
          type: CustomErrorType.ServerError,
          message: 'Server error occurred. Please try again later.',
          originalError: error,
        };
      } else {
        return {
          type: CustomErrorType.RequestFailed,
          message: 'Request failed with status: ' + status,
          originalError: error,
        };
      }
    } else if (error.request) {
      return {
        type: CustomErrorType.NetworkError,
        message: 'Network error occurred. Please check your internet connection.',
        originalError: error,
      };
    } else {
      return {
        type: CustomErrorType.UnknownError,
        message: 'An unknown error occurred.',
        originalError: error,
      };
    }
  }
}
