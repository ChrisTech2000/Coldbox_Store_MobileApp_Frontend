export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: EApiGender;
  phone: string;
  email?: string;
  lastLogin: string;
  language?: string;
  role?: ERoles;
}

export interface Company {
  id: number;
  hasCoolingUnits: boolean;
  name: string;
  country?: string;
  currency: string;
  digitalTwin: boolean;
  ml4Market: boolean;
  ml4Quality: boolean;
  ml4Farmers: boolean;
  dateJoined: Date;
  crop: number[];
  logo: File | null;

  //TODO: figure out types
  // bankDetails
  // bankAccount
}

export interface Pricing {
  id: number;
  pricingType: EPricingType;
  fixedRate: number;
  dailyRate: number;
}

export interface Crate {
  id: number;
  produce: number; // the produce id
  coolingUnit: number; // the cooling unit id
  weight: number;
  remainingShelfLife: number;
  plannedDays: number;
  checkOut: Date; // TODO: confirm this type
  pricing: Pricing[];
  coolingUnitMetric: ECoolingUnitMetric;
  checkInDate: Date;
  name: string;
  cropImage: string;
  movementCode: string;
  currentStorageDays: number;
  runDt: boolean;
  qualityDt: boolean;
  tag: string;
}

export interface DashboardProduce {
  additonalInfo: string;
  checkoutComplete: boolean;
  crates: Crate[];
  cratesAmount: number;
  cratesCombinedCost: number;
  cratesCombinedWeight: number;
  cropId: number;
  cropImage: string;
  cropName: string;
  currentStorageDays: number;
  farmer: string; // the cooling user's name
  farmerContact: string; // the cooling user's phone?
  farmerId: number;
  hasDigitalTwin: boolean;
  id: number;
  minimumRemainingShelfLife: number;
  movementCode: string;
  plannedDays: number;
  qualityDt: number;
  runDt: boolean;
}

//////////////////////// ENUMS
export enum ECoolingUnitMetric {
  KILOGRAMS = 'KILOGRAMS',
  CRATES = 'CRATES',
}

export enum EPricingType {
  FIXED = 'FIXED',
  PERIODICITY = 'PERIODICITY',
}

export enum ERoles {
  AUTH = 'Auth',
  OPERATOR = 'Operator',
  COOLING_USER = 'Farmer',
  EMPLOYEE = 'Service Provider',
}

export enum EApiGender {
  FEMALE = 'fe',
  MALE = 'ma',
  OTHER = 'ot',
}

export enum EAppGender {
  FEMALE = 'Female',
  MALE = 'Male',
  OTHER = 'Other',
}

//////////////////////// MAPPERS
export const MAP_ROLES = {
  [ERoles.OPERATOR]: 'op',
  [ERoles.EMPLOYEE]: 'sp',
  [ERoles.COOLING_USER]: 'f',
};

export const MAP_API_GENDER_TO_APP = {
  [EApiGender.FEMALE]: EAppGender.FEMALE,
  [EApiGender.MALE]: EAppGender.MALE,
  [EApiGender.OTHER]: EAppGender.OTHER,
};

export const MAP_APP_GENDER_TO_API = {
  [EAppGender.FEMALE]: EApiGender.FEMALE,
  [EAppGender.MALE]: EApiGender.MALE,
  [EAppGender.OTHER]: EApiGender.OTHER,
};
