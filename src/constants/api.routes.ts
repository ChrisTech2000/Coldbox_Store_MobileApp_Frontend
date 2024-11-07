/* eslint-disable @typescript-eslint/no-duplicate-enum-values */

export enum EAuthenticationEndpoints {
  RESET_PASSWORD = 'user/v1/reset-password/',
  REFRESH_TOKEN_ENDPOINT = 'user/token/refresh/',
  SIGN_IN_ENDPOINT = 'user/v1/login/',
  SIGN_UP_AS_COMPANY_ENDPOINT = 'user/v1/service-provider-signup/',
  SIGN_UP_AS_COOLING_USER = 'user/v1/farmers/',
  SIGN_UP_EMPLOYEE_BY_INVITE = 'user/v1/service-provider-invite-signup/',
  SIGN_UP_OPERATOR_BY_INVITE = 'user/v1/operator-invite-signup/',
  BACKEND_ANDROID_VERSION = 'storage/version-code/android/',
  BACKEND_IOS_VERSION = 'storage/version-code/ios/',
}

export enum EUserEndpoints {
  GET_COMPANY_EMPLOYEE = 'user/v1/service-providers/:registeredEmployeeId/',
  GET_COMPANY_EMPLOYEES = 'user/v1/service-providers/',
  GET_FARMER = 'user/v1/farmers/',
  GET_FARMER_SURVEYS = 'user/v1/farmer-survey/',
  GET_INVITED_COMPANY_EMPLOYEES = 'user/v1/service-provider-invite/',
  GET_INVITED_OPERATORS = 'user/v1/operator-invite/',
  GET_OPERATORS = 'user/v1/operators/',
  INVITE_EMPLOYEE = 'user/v1/service-provider-invite/',
  INVITE_OPERATOR = 'user/v1/operator-invite/',
  UPDATE_FARMER = 'user/v1/farmers/:farmerId/',
  UPDATE_FARMER_SURVEYS = 'user/v1/farmer-survey/:farmerId/',
  UPDATE_USER = 'user/v1/users/:userId/',
}

export enum EStorageEndpoints {
  GET_ALL_CROPS = '/storage/v1/crops/',
  GET_COOLING_UNIT_CROPS = 'storage/v1/cooling-unit-crops/',
  GET_COOLING_UNITS = 'storage/v1/cooling-units/',
  GET_DASHBOARD_PRODUCTS = '/storage/v1/produces/',
  GET_FARMER_CRATES = '/storage/v1/crates/',
  GET_LOCATION = '/storage/v1/locations/:locationId/',
  GET_MANAGEMENT_LOCATIONS = '/storage/v1/locations/',
  GET_OPERATORS = 'user/v1/operators/',
  GET_CAPACITY = 'storage/v1/cooling-unit-capacity/',
  GET_COOLING_UNIT = 'storage/v1/cooling-units/:coolingUnitId/',
  GET_TEMPERATURES = 'storage/v1/cooling-unit-temperatures/',
  ADD_COOLING_UNIT_TEMPERATURE = 'storage/v1/cooling-unit-specifications/',
}

export enum EOperationEndpoints {
  ADD_MARKET_SURVEY = 'operation/market-survey/',
  CHECK_IN = 'operation/checkins/',
  CHECK_OUT = 'operation/checkouts/',
  SEND_CHECK_OUT_SMS_REPORT = 'operation/checkouts/:movement_id/send_sms_report/',
  EDIT_CHECK_IN = '/operation/checkins/:id/',
  GET_COOLING_UNIT_REVENUE = '/operation/movements/revenue/',
  GET_COOLING_UNIT_USAGE = '/operation/movements/usage/',
  GET_MOVEMENTS = '/operation/movements/',
  MOVE_CHECKOUT = '/operation/move-checkout/',
}

export enum ECompanyEndpoints {
  GET_COMPANIES = 'user/v1/companies/',
  GET_COMPANY = 'user/v1/companies/:companyId/',
}

export enum ENotificationsEndpoints {
  GET_NOTIFICATIONS = '/user/v1/notification/',
  UPDATE_NOTIFICATION = 'user/v1/notification/:notificationId/',
}

export enum EImpactEndpoints {
  GET_COMPANY = '/company-slice/',
  GET_IMPACT = '/impact-slice/',
  GET_COOLING_UNIT = '/coolingunit-slice/',
}

export enum ESensorEndpoints {
  ECOZEN_CHECK = 'storage/v1/ecozen-test/',
  UBIBOT_CHECK = 'storage/v1/ubibot/',
  FIGORR_CHECK = 'storage/v1/figorr/',
}

export enum EFarmerImpactEndpoints {
  GET_FARMER_BASE = '/farmer-base-slice/',
  GET_FARMER = '/farmer-slice/',
  GET_IMPACT = '/impact-slice/',
}

export enum EPredictionEndpoints {
  GET_PREDICTION_PARAMS_NG = '/prediction/statesng/get_parameters_for_prediction/',
  GET_PREDICTION_PARAMS_IN = '/prediction/states/get_parameters_for_prediction/',
  GET_PREDICTION_NG = '/prediction/predictions/get_data_graph_ng',
  GET_PREDICTION_IN = '/prediction/predictions/get_data_graph',
  GET_PREDICTION_TABLE_NG = '/prediction/predictions/get_data_table_ng',
  GET_PREDICTION_TABLE_IN = '/prediction/predictions/get_data_table',
}

export enum CouponsEndpoints {
  LIST_OWN_COUPONS = 'marketplace/seller/coupons/',
  REVOKE_COUPON = 'marketplace/seller/coupons/:couponId/',
}

export enum EMarketplaceEndpoints {
  ADD_ITEM = 'marketplace/buyer/cart/items/',
  GET_CART = 'marketplace/buyer/cart/',
  GET_ORDER = 'marketplace/buyer/orders/:orderId/',
  GET_ORDERS = 'marketplace/buyer/orders/',
  REMOVE_ITEM_FROM_CART = 'marketplace/buyer/cart/items/:crateId/',
  CHECKOUT_WITH_PAYSTACK = 'marketplace/buyer/cart/checkout-with-paystack/',
  UPSERT_LISTED_CRATE = 'marketplace/seller/listed-crates/',
  AVAILABLE_LISTING = 'marketplace/buyer/available-listings/',
  GET_SELLER_LISTED_CRATES_BY_CRATE_ID = 'marketplace/seller/listed-crates/:crateId/',
  SELLER_BANK_ACCOUNTS = 'marketplace/seller/paystack-accounts/',
  GET_BANKS = 'marketplace/data/banks/',
  APPLY_COUPON = 'marketplace/buyer/cart/apply-coupon/',
  CLEAR_COUPON = 'marketplace/buyer/cart/clear-coupon/',
  PAY_WITH_PAYSTACK = 'marketplace/buyer/orders/:order/pay-with-paystack/',
  SET_PICKUP_DETAILS = 'marketplace/buyer/cart/set-pickup-details/',
  GET_CART_DELIVERY_CONTACTS = 'marketplace/buyer/cart/delivery-contacts/',
  GET_ORDER_DELIVERY_CONTACTS = 'marketplace/buyer/orders/:orderId/delivery-contacts/',
  COMPANY_DELIVERY_CONTACTS = 'marketplace/company/delivery-contacts/',
  LIST_COMPANY_DELIVERY_CONTACTS = 'marketplace/company/delivery-contacts/?company_id=:companyId',
  DELETE_DELIVERY_CONTACT = 'marketplace/company/delivery-contacts/:contactId/?company_id=companyId',
  TOGGLE_OWNERSHIP = 'marketplace/buyer/cart/toggle-ownership/',
}
