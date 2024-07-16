export enum EAuthenticationEndpoints {
  RESET_PASSWORD = 'user/v1/reset-password/',
  SIGN_IN_ENDPOINT = 'user/v1/login/',
  SIGN_UP_AS_COMPANY_ENDPOINT = 'user/v1/service-provider-signup/',
  SIGN_UP_AS_COOLING_USER = 'user/v1/farmers/',
  SIGN_UP_EMPLOYEE_BY_INVITE = 'user/v1/service-provider-invite-signup/',
  SIGN_UP_OPERATOR_BY_INVITE = 'user/v1/operator-invite-signup/',
}

export enum EUserEndpoints {
  GET_COMPANY_EMPLOYEE = 'user/v1/service-providers/:registeredEmployeeId/',
  GET_COMPANY_EMPLOYEES = 'user/v1/service-providers/',
  GET_FARMER = 'user/v1/farmers/',
  GET_FARMER_SURVEYS = 'user/v1/farmer-survey/',
  GET_INVITED_COMPANY_EMPLOYEES = 'user/v1/service-provider-invite',
  GET_INVITED_OPERATORS = 'user/v1/operator-invite',
  GET_OPERATORS = 'user/v1/operators',
  UPDATE_FARMER = 'user/v1/farmers/:farmerId/',
  UPDATE_FARMER_SURVEYS = 'user/v1/farmer-survey/:farmerId/',
  UPDATE_USER = 'user/v1/users/:userId/',
  INVITE_OPERATOR = 'user/v1/operator-invite/',
  INVITE_EMPLOYEE = 'user/v1/service-provider-invite/',
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
  GET_MOVEMENTS = '/operation/movements/',
  MOVE_CHECKOUT = 'operation/move-checkout/',
}

export enum ECompanyEndpoints {
  GET_COMPANIES = 'user/v1/companies/',
  GET_COMPANY = 'user/v1/companies/:companyId/',
}

export enum ESMSEndpoints {
  SEND_SMS = 'storage/v1/send-sms/',
}
