import { AxiosError } from 'axios';
import { LocationError } from 'react-native-get-location/dist';

//
// API ERRORS
//

enum CustomErrorType {
  RequestFailed = 'RequestFailed',
  PermissionsError = 'PermissionsError',
  ServerError = 'ServerError',
  NetworkError = 'NetworkError',
  UnknownError = 'UnknownError',
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

//
// LOCATION GEOCODING ERRORS
//

export enum EGeolocationError {
  InvalidFormat = 'InvalidFormat',
  LowConfidence = 'LowConfidence',
  UnresolvedCity = 'UnresolvedCity',
  GeneralError = 'GeneralError',
  NoResults = 'NoResults',
  LocationPermission = 'LocationPermission',
}

const GEOLOCATION_ERROR_MESSAGES: Record<EGeolocationError, string> = {
  [EGeolocationError.InvalidFormat]: 'Invalid city format',
  [EGeolocationError.LowConfidence]: 'Low confidence or invalid type',
  [EGeolocationError.UnresolvedCity]: 'City could not be resolved',
  [EGeolocationError.GeneralError]: 'Error during geocoding',
  [EGeolocationError.NoResults]: 'No results found',
  [EGeolocationError.LocationPermission]: 'Location permission not granted',
};

//
// IMPLEMENTATION
//

export class CustomError<T = CustomErrorType, E = unknown> extends Error {
  public type: T;
  public originalError?: E;
  public timestamp: string;
  public isCustomError: boolean = true;

  constructor(type: T, message: string, originalError?: E) {
    super(message);

    this.name = 'CustomError';
    this.type = type;
    this.originalError = originalError;
    this.timestamp = new Date().toISOString();

    if (originalError) {
      const errorStack = this._getErrorStack(originalError);
      if (errorStack) {
        this.stack += `\nCaused by: ${errorStack}`;
      }
    }
  }

  private _getErrorStack(error: unknown): string | undefined {
    if (error instanceof AxiosError) {
      return error.stack;
    } else if (error instanceof Error) {
      return error.stack;
    } else if (typeof error === 'object' && error !== null) {
      return (error as { stack?: string })?.stack;
    } else if (typeof error === 'string') {
      return error;
    }
    return undefined;
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      stack: this.stack,
      timestamp: this.timestamp,
      originalError:
        this.originalError instanceof Error
          ? {
              name: this.originalError.name,
              message: this.originalError.message,
              stack: this.originalError.stack,
            }
          : this.originalError,
    };
  }
}

//
// HANDLERS
//

export default {
  handleAxiosError: (error: AxiosError<unknown>): CustomError<CustomErrorType> => {
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
  handleLocationGeocodingError: (
    error: unknown
  ): CustomError<EGeolocationError, LocationError | Error | unknown> => {
    if (error instanceof LocationError) {
      return new CustomError(
        EGeolocationError.LocationPermission,
        GEOLOCATION_ERROR_MESSAGES[EGeolocationError.LocationPermission],
        error
      );
    }

    if (error instanceof Error) {
      const errorMessage = error.message as EGeolocationError;

      const type = Object.values(EGeolocationError).includes(errorMessage)
        ? errorMessage
        : EGeolocationError.GeneralError;

      const message = GEOLOCATION_ERROR_MESSAGES?.[type] || 'Unknown geocoding error';
      return new CustomError(type, message, error);
    }

    return new CustomError(
      EGeolocationError.GeneralError,
      GEOLOCATION_ERROR_MESSAGES[EGeolocationError.GeneralError],
      error
    );
  },
};
