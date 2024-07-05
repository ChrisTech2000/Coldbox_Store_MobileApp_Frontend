export enum EAuthenticationEndpoints {
  RESET_PASSWORD = 'user/v1/reset-password/',
  SIGN_IN_ENDPOINT = 'user/v1/login/',
  SIGN_UP_AS_COMPANY_ENDPOINT = 'user/v1/service-provider-signup/',
  SIGN_UP_AS_COOLING_USER = 'user/v1/farmers/',
}

export enum EUserEndpoints {
  GET_FARMER = 'user/v1/farmers/',
}

export enum EStorageEndpoints {
  GET_COMPANIES = 'user/v1/companies/',
  GET_COOLING_UNITS = 'storage/v1/cooling-units/',
  GET_DASHBOARD_PRODUCTS = '/storage/v1/produces/',
  GET_FARMER_CRATES = '/storage/v1/crates/',
  GET_MANAGEMENT_LOCATIONS = '/storage/v1/locations/',
  GET_LOCATION = '/storage/v1/locations/:locationId/',
}

export enum EOperationEndpoints {
  CHECK_OUT = 'operation/checkouts/',
  CHECK_IN = 'operation/checkins/',
}
