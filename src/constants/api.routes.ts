export enum EAuthenticationEndpoints {
  RESET_PASSWORD = 'user/v1/reset-password/',
  SIGN_IN_ENDPOINT = 'user/v1/login/',
  SIGN_UP_AS_COMPANY_ENDPOINT = 'user/v1/service-provider-signup/',
  SIGN_UP_AS_COOLING_USER = 'user/v1/farmers/',
}

export enum EUserEndpoints {
  GET_FARMER = 'user/v1/farmers/',
  GET_OPERATORS = 'user/v1/operators',
  GET_INVITED_OPERATORS = 'user/v1/operator-invite',
  UPDATE_USER = 'user/v1/users/:userId/',
  UPDATE_FARMER = 'user/v1/farmers/:farmerId/',
  GET_COMPANY_EMPLOYEES = 'user/v1/service-providers/',
}

export enum EStorageEndpoints {
  GET_COOLING_UNIT_CROPS = 'storage/v1/cooling-unit-crops/',
  GET_COOLING_UNITS = 'storage/v1/cooling-units/',
  GET_DASHBOARD_PRODUCTS = '/storage/v1/produces/',
  GET_FARMER_CRATES = '/storage/v1/crates/',
  GET_LOCATION = '/storage/v1/locations/:locationId/',
  GET_ALL_CROPS = '/storage/v1/crops/',
  GET_MANAGEMENT_LOCATIONS = '/storage/v1/locations/',
  GET_OPERATORS = 'user/v1/operators',
}

export enum EOperationEndpoints {
  CHECK_IN = 'operation/checkins/',
  CHECK_OUT = 'operation/checkouts/',
  MOVE_CHECKOUT = 'operation/move-checkout/',
}

export enum ECompanyEndpoints {
  GET_COMPANIES = 'user/v1/companies/',
  GET_COMPANY = 'user/v1/companies/:companyId/',
}
