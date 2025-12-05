import {
  Bank,
  CartItem,
  ECoolingUnitMetric,
  EInitiatedFor,
  EOrderStatus,
  EPaymentGateway,
  EPaymentMethod,
  EPaymentThrough,
  EPickUpMethod,
  ERoles,
  ESellingLocation,
  MovementCrate,
  type CommodityInfo,
  type CommodityTotal,
  type CommonPricingType,
  type Company,
  type CoolingUnit,
  type Crop,
  type DateOperatorAssigned,
  type Farmer,
  type FarmerSurvey,
  type PowerOption,
  type Pricing,
  type User,
} from './global';

export type SignInResponse = {
  refresh: string;
  access: string;
  user: User;
  role: ERoles;
  company: Company;
};

export type RefreshSessionResponse = {
  access: string;
  refresh?: string; // Optional because backend returns new refresh token when ROTATE_REFRESH_TOKENS is enabled
};

export type SignUpAsCompanyResponse = {
  company: Company;
  user: User;
};

export type SignUpAsCoolingUserResponse = {
  id: number;
  user: User;
  userCode: string;
};

export type GetFarmerResponse = Array<Farmer>;

export type CheckOutResponse = {
  id: number;
  movement: number;
  paid: boolean;
  price: number;
  paymentThrough: EPaymentThrough;
  paymentGateway: EPaymentGateway;
  paymentMethod: EPaymentMethod;
  currency: string;
  priceDiscount: number;
};

export type CheckInWitCodeResponse = {
  message: string;
};

export type CheckInResponse = {
  id: number;
  movement: number;
  farmer: number;
  hasDt: string;
  cratesIds: Array<number>;
  produces: Array<{ id: number; cropId: number; cratesIds: Array<number> }>;
};

export type CheckOut = Array<{
  id: number;
  produce: number;
  coolingUnit: number;
  weight: number;
  remainingShelfLife: number | null;
  plannedDays: number | null;
  checkOut: number;
  pricing: Array<Pricing>;
  coolingUnitMetric: ECoolingUnitMetric;
  checkInDate: Date;
  name: string;
  cropImage: string;
  movementCode: string;
  currentStorageDays: number;
  runDt: boolean;
  qualityDt: number;
  tag: string | null;
  initialWeight: number;
}>;

export type GetCheckOutResponse = CheckOut | { message: string };

export type GetLocationResponse = {
  id: number;
  coolingUnits: Array<CoolingUnit>;
  company: Company;
  name: string;
  state: string;
  city: string;
  street: string;
  streetNumber: string | null;
  zipCode: string;
  point: string;
  deleted: boolean;
  dateCreation: string;
  dateLastModified: string;
};

export type AddLocationResponse = {
  city: string;
  company: Company;
  coolingUnits: Array<CoolingUnit>;
  dateCreation: string;
  dateLastModified: string;
  deleted: boolean;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  state: string;
  street: string;
  streetNumber: string;
  zipCode: string;
};

export type GetOperatorsResponse = {
  id: number;
  user: User;
  company: Company;
  coolingUnits: number[];
};

export type GetAllCropsResponse = {
  id: number;
  image: string;
  name: string;
  optimalStorageTemperature: string;
  approximateShelfLife: string;
  harvestedToday?: number;
  harvestedYesterday?: number;
  harvestedDayBeforeYesterday?: number;
  harvestedBefore?: number;
  sizeSelection1?: string;
  sizeSelection2?: string;
  sizeSelection3?: string;
  digitalTwinIdentifier?: string;
  dependentConstant?: number;
  activationEnergyConstant?: number;
  cropType: number;
};

export type GetCompanyEmployeesResponse = Array<{
  id: number;
  user: User;
  company: Company;
}>;

export type GetCoolingUnitsByStatusResponse = {
  id: number;
  name: string;
  location: number;
  metric: string;
  sensor: boolean;
  sensorList: Array<unknown>; // TODO: figure this structure data type
  capacityInMetricTons: number;
  capacityInNumberCrates: number;
  occupancy: number;
  occupancyModifiedDate: string;
  dateLastModified: string;
  dateCreation: string;
  dateOperatorAssigned: Array<DateOperatorAssigned>;
  coolingUnitType: string;
  crops: Array<Crop>;
  roomHeight: number;
  roomLength: number;
  roomWidth: number;
  roomWeight: number;
  operators: number[];
  latestTemperature: string;
  crateWeight: number;
  crateWidth: number;
  crateLength: number;
  crateHeight: number;
  commodityInfos: Array<CommodityInfo>;
  foodCapacityInMetricTons: number;
  public: boolean;
  commonPricingType: CommonPricingType;
  sensorError: boolean;
  latestTemperatureTimestamp: string;
  lastCheckInDate: string;
  canDelete: boolean;
  commodityTotal: CommodityTotal;
  powerOptions: Array<PowerOption>;
  editableCheckins: boolean;
}[];

export type GetCoolingUnitCropsResponse = Array<{
  id: number;
  fullCrop: Crop;
  active: true;
  crop: number;
  coolingUnit: number;
  pricing: number;
}>;

export type GetFarmerSurveysResponse = Array<{
  id: number;
  co: Array<FarmerSurvey>;
  userType: ERoles | string;
  experience: boolean;
  experienceDuration: number;
  dateFilledIn: Date;
  dateLastModified: Date;
  farmer: number;
}>;

export type UpdateFarmerSurveysResponse = Array<{
  id: number;
  farmerId: number;
  userType: ERoles | string;
  experience: boolean;
  experienceDuration: number;
  dateFilledIn: Date;
  dateLastModified: Date;
}>;

export type GetMovementsHistoryResponse = Array<{
  id: number;
  code: string;
  date: Date;
  initiatedFor: EInitiatedFor;
  order: Record<string, unknown>; // TODO: fix
  operator: string;
  coolingUnitId: number;
  checkin: {
    id: number;
    crates: Array<MovementCrate>;
    ownedByUserId: number;
    ownedOnBehalfOfCompanyId: number | null;
    ownerName?: string;
  };
  checkout: {
    id: number;
    paymentGateway: EPaymentGateway | null;
    paymentMethod: EPaymentMethod;
    paymentThrough: EPaymentThrough;
    crates: Array<MovementCrate>;
    hasMarketSurvey: Array<number>;
    marketSurveyDelay: boolean;
    calculatedPrice: number;
    discount: number;
    totalPrice: number;
  };
}>;

export type GetInvitedOperatorsResponse = {
  code: string;
  coolingUnits: Array<number>;
  expirationDate: string;
  phone: string;
  userType: number;
};

export type GetInvitedCompanyEmployeesResponse = Array<GetInvitedOperatorsResponse>;

export type GetMovementOperatorsResponse = Array<{
  id: number;
  user: User;
  company: Company;
  coolingUnits: Array<number>;
}>;

export type EditCheckInResponse = {
  message: string;
};

export interface GetCoolingUnitResponse {
  id: number;
  name: string;
  location: number;
  metric: string;
  sensor: boolean;
  capacityInMetricTons: number;
  capacityInNumberCrates: number;
  occupancy: number;
  occupancyModifiedDate: string;
  dateLastModified: string;
  dateCreation: string;
  dateOperatorAssigned: Array<DateOperatorAssigned>;
  coolingUnitType: string;
  crops: Array<{
    id: number;
    cropId: number;
    coolingUnitId: number;
    pricingId: number;
    active: boolean;
    pricing: {
      id: number;
      pricingType: string;
      fixedRate: number;
      dailyRate: number;
    };
  }>;
  roomHeight: number;
  roomLength: number;
  roomWidth: number;
  roomWeight: number;
  operators: Array<number>;
  latestTemperature: string;
  crateWeight: number;
  crateWidth: number;
  crateLength: number;
  crateHeight: number;
  commodityInfos: Array<CommodityInfo>;
  foodCapacityInMetricTons: number;
  public: boolean;
  commonPricingType: CommonPricingType;
  sensorError: boolean;
  latestTemperatureTimestamp: string;
  lastCheckInDate: string;
  canDelete: boolean;
  commodityTotal: CommodityTotal;
  powerOptions: Array<PowerOption>;
  editableCheckins: boolean;
}

export interface GetCoolingUnitSensorDataResponse {
  sensorData: Array<{
    id: number;
    sourceId: string;
    type: string;
    field: null | string;
    dateSensorFirstLinked: string;
    username: string;
  }>;
}

export type AddMarketSurveyResponse = {
  id: number;
  sellingPlace: ESellingLocation;
  price: number;
  currency: string;
  sellingUnit: string;
  sellingDate: Date;
  loss: number;
  reasonForLoss: Array<string>;
  kgInUnit: number;
  dateFilledIn: Date;
  checkout: number;
  market?: string | null;
  localMarket?: string | null;
  crop: number;
};

export type GetCoolingUnitCapacityResponse = Array<{
  id: number;
  usedCapacity: Array<number>;
}>;

export type GetCoolingUnitTemperaturesResponse = Array<{
  coolingUnit: number;
  datetimeStamp: string;
  id: number;
  setPointValue: unknown | null; // TODO: confirm type
  specificationType: string;
  value: string;
}>;

export type GetNotificationsResponse = Array<{
  id: number;
  coolingUnitName: string | null;
  crates: {
    crop: string;
    checkinDate: string;
    userId: number;
    farmerId: number;
    farmer: string;
    coolingUnit: string;
    coolingUnitId: number;
  };
  movementCode: string;
  seen: boolean;
  date: string;
  specificId: number;
  eventType:
    | 'SENSOR_ERROR'
    | 'TIME_TO_PICKUP'
    | 'MARKET_SURVEY'
    | 'FARMER_SURVEY'
    | 'CHECKIN_EDITED'
    | 'ORDER_REQUIRES_MOVEMENT'
    | 'LISTING_PRICE_UPDATED';
  user: number;
  marketListing: { currency: string; pricePerKg: number } | null;
}>;

export type ListUserSensorsResponse = {
  sources: Array<{
    id: string;
    name: string;
  }>;
};

export interface CreateCouponResponse {
  id: number;
  code: string;
  createdAt: string;
  discountPercentage: number;
  revokedAt: null | string;
}

export interface GetCouponListResponse {
  nodes: Array<CreateCouponResponse>;
}

export type CartDatumGetCartResponse = {
  id: number;
  items: Array<CartItem>;
  totalAmount: number;
  totalColdtivateAmount: number;
  totalCoolingFeesAmount: number;
  totalDiscountAmount: number;
  totalPaymentFeesAmount: number;
  totalProduceAmount: number;
  ownedOnBehalfOfCompanyId: number | undefined;
  pickupDetails: Array<{
    coolingUnitId: number;
    pickupMethod: EPickUpMethod;
  }>;
  currency: string;
};

export interface GetCartResponse {
  cart: CartDatumGetCartResponse;
}

export interface GetAllOrdersResponse extends CartDatumGetCartResponse {
  createdAt: string;
  status: EOrderStatus;
}
export type GetAllSalesResponse = Array<{
  createdAt: string;
  currency: string;
  id: number;
  items: [
    {
      coolingFeesAmount: number;
      couponId: string | null;
      crateAvailableWeight: number;
      discountAmount: number;
      marketListedCrateId: number;
      orderedEntireCrate: boolean;
      orderedProduceWeight: number;
      produceAmount: number;
      producePricePerKg: number;
      relCheckinMovementCode: string;
      relCompanyId: number;
      relCoolingUnitId: number;
      relCrateId: number;
      relCrateRemainingShelfLife: number;
      relCropId: number;
      totalAmount: number;
    },
  ];
  paymentPaidAt: string;
  buyerUserId: number;
  buyerCompanyId: number | null;
  totalAmountPaid: number;
  platformCommission: number;
  paymentFees: number;
  sellerPayout: number;
  timestamp: number;
  coolingUnitPayout: number;
}>;

export interface CheckoutWithPaystackResponse {
  orderId: number;
  authorizationUrl: string;
}
export interface GetAvailableListingResponse {
  nodes: Array<{
    availableWeightInKg: number;
    crateId: number;
    produceInfo: string;
    createdAt: string;
    currency: string;
    distance: number;
    id: number;
    lastUpdatedAt: string;
    pendingInCoolingFees: number;
    pendingInCoolingFeesPricePerKg: number;
    producePricePerKg: number;
    relCheckInMovementCode: string;
    relCompanyId: number;
    relCoolingUnitId: number;
    relCrateRemainingShelfLife: number;
    relCropId: number;
    weightLockedInPaymentPendingOrdersInKg: number;
    ownedByUserId: number | null;
    ownedOnBehalfOfCompanyId: number | null;
  }>;
  pagination: {
    itemsPerPage: number;
    page: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface UpdateListedCrateResponse {
  id: number;
  movement: number;
  ownerUser: number;
  ownerOnBehalfOfCompany: number | null; // if it's null the owner is the user, otherwise the owner is the company
  has_dt: string;
  produces: Array<{
    id: number;
    cropId: number;
    cratesIds: Array<number>;
  }>;
}

export interface GetAvailableBanksResponse {
  banks: Array<Bank>;
}

export interface ApplyCouponResponse {
  message: string;
  cart: CartDatumGetCartResponse;
}

export interface SetPickUpDetailsResponse extends ApplyCouponResponse {}

export type DeliveryContact = {
  id: number;
  deliveryCompanyName: string;
  phone: string;
  contactName: string;
  coolingUnitId: number | null;
  isActive: boolean;
  companyId: number;
};

export type GetDeliveryContactsResponse = DeliveryContact[];

export interface SellerListedCratesResponse {
  availableWeightInKg: number;
  crateId: number;
  createdAt: string;
  currency: string;
  distance: number | null;
  id: number;
  lastUpdatedAt: string;
  pendingInCoolingFees: number;
  pendingInCoolingFeesPricePerKg: number;
  producePricePerKg: number;
  relCheckInMovementCode: string;
  relCompanyId: number;
  relCoolingUnitId: number;
  relCrateRemainingShelfLife: number;
  relCropId: number;
  weightLockedInPaymentPendingOrdersInKg: number;
}

export interface GetSellerListedCrates {
  nodes: Array<SellerListedCratesResponse>;
}

export interface CheckMarketplaceEligibilityResponse {
  companies: Record<string, boolean>;
  users: Record<string, boolean>;
}

export interface ToggleCartOwnershipResponse {
  cart: CartDatumGetCartResponse;
  message: string;
}
