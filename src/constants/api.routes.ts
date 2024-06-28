export enum EAuthenticationEndpoints {
  RESET_PASSWORD = 'user/v1/reset-password/',
  SIGN_IN_ENDPOINT = 'user/v1/login/',
  SIGN_UP_AS_COMPANY_ENDPOINT = 'user/v1/service-provider-signup/',
  SIGN_UP_AS_COOLING_USER = 'user/v1/farmers/',
}

export enum EDashboardEndpoints {
  GET_DASHBOARD_PRODUCTS = '/storage/v1/produces/',
  GET_FARMER = 'user/v1/farmers/',
}
