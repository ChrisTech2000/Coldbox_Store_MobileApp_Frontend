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
// PDF GENERATION ERRORS
//

export enum PdfErrorType {
  PermissionsError = 'PermissionsError',
  ConvertionError = 'ConvertionError',
  DownloadError = 'DownloadError',
  GeneralError = 'GeneralError',
}

const PDF_ERROR_MESSAGES: Record<PdfErrorType, string> = {
  [PdfErrorType.PermissionsError]: 'Storage permission denied',
  [PdfErrorType.ConvertionError]: 'PDF generation failed',
  [PdfErrorType.DownloadError]: 'Download failed',
  [PdfErrorType.GeneralError]: 'Internal error occurred',
};

//
// IMPLEMENTATION
//

export class CustomError<T = CustomErrorType, E = unknown> extends Error {
  public type: T;
  public originalError?: E;
  public timestamp: string;
  public isCustomError: boolean = true;
  public debugMessage: string;
  public context?: Record<string, unknown>;

  constructor(
    type: T,
    message: string,
    originalError?: E,
    debugMessage?: string,
    context?: Record<string, unknown>
  ) {
    super(message);

    this.name = 'CustomError';
    this.type = type;
    this.originalError = originalError;
    this.timestamp = new Date().toISOString();
    this.debugMessage = debugMessage || message;
    this.context = context;

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
      debugMessage: this.debugMessage,
      type: this.type,
      stack: this.stack,
      timestamp: this.timestamp,
      context: this.context,
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
  handleAxiosError: (error: AxiosError<unknown>) => {
    const method = error.config?.method?.toUpperCase();
    const url = error.config?.url;
    const baseURL = error.config?.baseURL;
    const fullUrl = baseURL && url ? `${baseURL}${url}` : url || 'unknown';

    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data;

      // Extract backend error message if available
      let backendMessage = '';
      if (responseData && typeof responseData === 'object') {
        const data = responseData as Record<string, unknown>;
        backendMessage = (data.message || data.error || data.detail || '') as string;
      }

      const context = {
        method,
        url: fullUrl,
        status,
        responseData,
        requestData: error.config?.data,
        headers: error.config?.headers,
      };

      if (STATUS_CODE_ERROR_MAP[status]) {
        const [type, message] = STATUS_CODE_ERROR_MAP[status];
        const debugMessage = `[${method} ${fullUrl}] ${status} - ${backendMessage || message}${
          backendMessage ? ` (Backend: ${backendMessage})` : ''
        }`;
        return new CustomError<CustomErrorType, AxiosError>(
          type,
          message,
          error,
          debugMessage,
          context
        );
      }

      if (status >= 500) {
        const debugMessage = `[${method} ${fullUrl}] ${status} Server Error - ${
          backendMessage || error.message
        }${backendMessage ? ` (Backend: ${backendMessage})` : ''}`;
        return new CustomError<CustomErrorType, AxiosError>(
          CustomErrorType.ServerError,
          'A server error occurred. Please try again later.',
          error,
          debugMessage,
          context
        );
      }

      const debugMessage = `[${method} ${fullUrl}] ${status} - ${backendMessage || error.message}${
        backendMessage ? ` (Backend: ${backendMessage})` : ''
      }`;
      return new CustomError<CustomErrorType, AxiosError>(
        CustomErrorType.RequestFailed,
        `Request failed with status: ${status}`,
        error,
        debugMessage,
        context
      );
    }

    if (error.request) {
      const debugMessage = `[${method} ${fullUrl}] Network Error - No response received. ${error.message}`;
      const context = {
        method,
        url: fullUrl,
        requestData: error.config?.data,
      };
      return new CustomError<CustomErrorType, AxiosError>(
        CustomErrorType.NetworkError,
        'A network error occurred. Please check your internet connection.',
        error,
        debugMessage,
        context
      );
    }

    const debugMessage = `[${method} ${fullUrl}] Unknown Error - ${error.message}`;
    return new CustomError<CustomErrorType, unknown>(
      CustomErrorType.UnknownError,
      'An unknown error occurred.',
      error,
      debugMessage
    );
  },
  handleLocationGeocodingError: (error: unknown) => {
    if (error instanceof LocationError) {
      const debugMessage = `Location Permission Error: ${error.message} (Code: ${error.code})`;
      const context = {
        errorCode: error.code,
        errorMessage: error.message,
      };
      return new CustomError<EGeolocationError, LocationError>(
        EGeolocationError.LocationPermission,
        GEOLOCATION_ERROR_MESSAGES[EGeolocationError.LocationPermission],
        error,
        debugMessage,
        context
      );
    }

    if (error instanceof Error) {
      const errorMessage = error.message as EGeolocationError;

      const type = Object.values(EGeolocationError).includes(errorMessage)
        ? errorMessage
        : EGeolocationError.GeneralError;

      const debugMessage = `Geolocation Error [${type}]: ${error.message}`;
      const context = {
        errorType: type,
        originalMessage: error.message,
      };

      return new CustomError<EGeolocationError, Error>(
        type,
        GEOLOCATION_ERROR_MESSAGES[type],
        error,
        debugMessage,
        context
      );
    }

    const debugMessage = `Geolocation Unknown Error: ${JSON.stringify(error)}`;
    return new CustomError<EGeolocationError, unknown>(
      EGeolocationError.GeneralError,
      GEOLOCATION_ERROR_MESSAGES[EGeolocationError.GeneralError],
      error,
      debugMessage
    );
  },
  handlePdfErrors: (error: unknown) => {
    let type: PdfErrorType = PdfErrorType.GeneralError;
    let message: string = PDF_ERROR_MESSAGES[PdfErrorType.GeneralError];
    let debugMessage = '';

    if (error instanceof Error) {
      const errorMessage = error.message as PdfErrorType;
      type = Object.values(PdfErrorType).includes(errorMessage)
        ? errorMessage
        : PdfErrorType.GeneralError;
      message = PDF_ERROR_MESSAGES[type];
      debugMessage = `PDF Error [${type}]: ${error.message}`;

      const context = {
        errorType: type,
        originalMessage: error.message,
      };

      return new CustomError<PdfErrorType, Error>(type, message, error, debugMessage, context);
    }

    debugMessage = `PDF Unknown Error: ${JSON.stringify(error)}`;
    return new CustomError<PdfErrorType, unknown>(type, message, error, debugMessage);
  },
};
