import {
  EPaymentType,
  ERoles,
  type Farmer,
  type Company,
  type CoolingUnit,
  type User,
  Crop,
  Pricing,
  ECoolingUnitMetric,
  DateOperatorAssigned,
  CommodityInfo,
  CommonPricingType,
  CommodityTotal,
  PowerOption,
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

export type GetCompanyEmployeesResponse = {
  id: number;
  user: User;
  company: Company;
}[];

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
