import type { AxiosError } from 'axios';

enum CustomErrorType {
  RequestFailed = 'RequestFailed',
  PermissionsError = 'PermissionsError',
  ServerError = 'ServerError',
  NetworkError = 'NetworkError',
  UnknownError = 'UnknownError',
}

export class CustomError extends Error {
  public type: CustomErrorType;
  public originalError?: AxiosError<unknown>;

  constructor(type: CustomErrorType, message: string, originalError?: AxiosError<unknown>) {
    super(message);
    this.name = 'CustomError';
    this.type = type;
    this.originalError = originalError;
    if (originalError?.stack) {
      this.stack += `\nCaused by: ${originalError.stack}`;
    }
  }
}

const STATUS_CODE_ERROR_MAP: Record<number, [CustomErrorType, string]> = {
  401: [
    CustomErrorType.PermissionsError,
    "You don't have the necessary credentials to fulfill the request.",
  ],
  403: [CustomErrorType.PermissionsError, 'You do not have permission to access this resource.'],
  404: [CustomErrorType.RequestFailed, 'The requested resource was not found.'],
  429: [CustomErrorType.RequestFailed, 'Too many requests. Please try again later.'],
};

export default {
  handleAxiosError: (error: AxiosError<unknown>): CustomError => {
    if (error.response) {
      const status = error.response.status;

      if (STATUS_CODE_ERROR_MAP[status]) {
        const [type, message] = STATUS_CODE_ERROR_MAP[status];
        return new CustomError(type, message, error);
      }

      if (status >= 500) {
        return new CustomError(
          CustomErrorType.ServerError,
          'A server error occurred. Please try again later.',
          error
        );
      }

      return new CustomError(
        CustomErrorType.RequestFailed,
        `Request failed with status: ${status}`,
        error
      );
    } else if (error.request) {
      return new CustomError(
        CustomErrorType.NetworkError,
        'A network error occurred. Please check your internet connection.',
        error
      );
    } else {
      return new CustomError(CustomErrorType.UnknownError, 'An unknown error occurred.', error);
    }
  },
};
