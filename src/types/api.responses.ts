import {
  ECoolingUnitMetric,
  EMovementType,
  EPaymentType,
  ERoles,
  ESellingLocation,
  FarmerImpactMetrics,
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
  paymentType: EPaymentType;
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
  latitude: number;
  longitude: number;
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
  ubibotSensorChannel?: unknown; // TODO: figure this structure data type
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
  coolingUnitId: number;
  code: string;
  date: Date;
  movementType: EMovementType;
  farmer: string;
  cratesWeight: number;
  movementCrops: Array<Pick<Crop, 'name' | 'id'>>;
  checkoutId?: number;
  hasMarketSurvey: Array<number>;
  marketSurveyDelay: boolean;
  calculatedPrice: number;
  discount: number;
  totalPrice: number;
  checkinDate: Date;
  cratesNumber: number;
  checkinCode: string;
  cratesCheckin: Array<{
    date: Date;
    name: string;
    code: string;
    crateAmount: number;
    remainingShelfLife: number;
    plannedDays: number | null;
    currentStorageDays: number;
    tag: string;
    weight: number;
  }>;
  paymentType: EPaymentType;
  operator: string;
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
  sensorList: unknown; // TODO: confirm type
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
    pricing: Array<{
      id: number;
      pricingType: string;
      fixedRate: number;
      dailyRate: number;
    }>;
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
  ubibotSensorChannel: unknown; // TODO: confirm type
  commonPricingType: CommonPricingType;
  sensorError: boolean;
  latestTemperatureTimestamp: string;
  lastCheckInDate: string;
  canDelete: boolean;
  commodityTotal: CommodityTotal;
  powerOptions: Array<PowerOption>;
  editableCheckins: boolean;
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

export type FarmersBaseSliceResponse = {
  farmerId: number;
  firstName: number;
  lastName: number;
  gender: number;
  userType: number;
  avgStorageDays: number;
  totalStorageCost: number;
};

export type FarmersSliceResponse = {
  farmerId: Record<string, number>;
  firstName?: Record<string, string>;
  lastName?: Record<string, string>;
  gender: Record<string, string>;
  userType?: Record<string, string>;
  coolingUnitId?: Record<string, number>;
  roomCratesIn?: Record<string, number>;
  roomOpsIn?: Record<string, number>;
  roomKgIn?: Record<string, number>;
  roomCratesOut?: Record<string, number>;
  roomOpsOut?: Record<string, number>;
  roomKgOut?: Record<string, number>;
  checkInCratesCrop?: Record<string, object>; // TODO: confirm object value type
  checkInKgCrop?: Record<string, object>; // TODO: confirm object value type
  checkOutCratesCrop?: Record<string, object>; // TODO: confirm object value type
  checkOutKgCrop?: Record<string, object>; // TODO: confirm object value type
  unitName?: Record<string, string>;
};

export type FarmersImpactSliceResponse = {
  aggregated: {
    farmerId: number;
    unitName: number;
    baselineQuantityTotalMonth: number;
    avgBaselineKgSellingPriceMonth: number;
    baselineKgLossMonth: number;
    baselineKgSoldMonth: number;
    avgBaselinePercLossMonth: number;
    avgBaselineFarmerRevenueMonth: number;
    avgMonthlyKgSellingPrice: number;
    monthlyKgCheckin: number;
    monthlyKgLoss: number;
    avgMonthlyPercLoss: number;
    avgMonthlyPercFoodlossEvolution: number;
    avgMonthlyFarmerRevenue: number;
    avgMonthlyPercRevenueIncreaseEvolution: number;
    avgMonthlyKgSellingPriceEvolution: number;
    avgMonthlyPercUnitSellingPriceEvolution: number;
    avgMonthlyFarmerRevenueEvolution: number;
    latestSurveyDate: number;
  };
  top5FoodLossEvolution: Record<string, FarmerImpactMetrics>;
  top5RevenueEvolution: Record<string, FarmerImpactMetrics>;
  surveys: Array<{
    farmerId: number;
    numFilledBaselineSurveys: number;
    numOfPossibleBaselineSurveys: number;
    numOfFilledPostcheckoutSurveys: number;
    numOfPossiblePostcheckoutSurveys: null | unknown; // TODO: confirm type
    cropsWithBaselineSurveyToBeCompleted: string;
  }>;
};
