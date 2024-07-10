export type User = {
  id: number;
  firstName: string;
  lastName: string;
  gender: EApiGender;
  phone: string;
  email?: string;
  lastLogin: string;
  language?: string;
  role?: ERoles;
  username?: string; // we get this prop when we fetch the operators
};

export type Farmer = {
  id: number;
  user: User;
  birthday: Date;
  parentName: string;
  country: string;
  userCode: string;
  companies: Array<number>;
  coolingUnits: Array<number>;
};

export type Company = {
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
  crop: Array<number>;
  logo: string | null;

  bankDetails: BankDetails;
  bankAccount: number;
};

export type Pricing = {
  id: number;
  pricingType: EPricingType;
  fixedRate: number;
  dailyRate: number;
};

export type CommonPricingType = {
  type: EPricingType;
  value: number;
  pricingId: number;
  metric: ECoolingUnitMetric;
};

export type Crate = {
  id: number;
  produce: number; // the produce id
  coolingUnit: number; // the cooling unit id
  weight: number;
  remainingShelfLife: number;
  plannedDays: number;
  checkOut: Date; // TODO: confirm this type
  pricing: Array<Pricing>;
  coolingUnitMetric: ECoolingUnitMetric;
  checkInDate: Date;
  name: string;
  cropImage: string;
  movementCode: string;
  currentStorageDays: number;
  runDt: boolean;
  qualityDt: boolean;
  tag: string;
};

export type DashboardProduce = {
  additonalInfo: string;
  checkoutComplete: boolean;
  crates: Array<Crate>;
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
};

export type CoolingUnitCrop = {
  id: number;
  cropId: number;
  coolingUnitId: number;
  pricingId: number;
  active: boolean;
  pricing: Array<Pricing>;
};

export type CommodityInfo = {
  commodity: string;
  percentage: number;
  combinedWeight: number;
  cratesNumber: number;
  optimalStorageTemperature: string;
};

export type CommodityTotal = {
  totalWeight: number;
  totalCrates: number;
};

export type PowerOption = {
  id: number;
  coolingUnitId: number;
  powerConsumptionInMt: number;
  dailyRoomWattage: number;
  powerSourceDieselPercent: number;
  powerSourceGridPercent: number;
  powerSourcePvPercent: number;
  powerSourceBiomassPercent: number;
  powerSourceDieselConsumptionKwh: number;
  pvPanelCount: number;
  pvPanelSize: number;
  pvPanelWeight: number;
  pvPanelMaxPower: number;
  pvPanelType: string;
  batteryCount: number;
  batteryWeight: number;
  batteryCapacity: number;
  batteryMaxCurrent: number;
  batteryType: unknown; // TODO: figure out type
  batteryPeakEnergyStorage: number;
  refrigerantType: ERefrigerantType;
  powerSource: EPowerSource;
  electricityStorageSystem: EElectricStorageSystem;
  thermalStorageMethod: EThermalStorageSystem;
  roomInsulator: number;
  amountRefrigerant: number;
};

export type CoolingUnit = {
  id: number;
  name: string;
  location: number;
  metric: ECoolingUnitMetric;
  sensor: boolean;
  sensorList: Array<unknown>; // TODO: figure out type
  capacityInMetricTons: number;
  capacityInNumberCrates: number;
  occupancy: number;
  occupancyModifiedDate: Date;
  dateLastModified: Date;
  dateCreation: Date;
  dateOperatorAssigned: Array<Date>; // a date for each operator????
  coolingUnitType: ECoolingUnitType;
  crops: Array<CoolingUnitCrop>;
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
  ubibotSensorChannel: unknown; // TODO: figure out type
  sensorError: boolean;
  latestTemperatureTimestamp: Date;
  lastCheckInDate: Date;
  canDelete: boolean;
  editableCheckins: boolean; // @Note: not a typo
  commonPricingType: CommonPricingType;
  commodityTotal: CommodityTotal;
  powerOptions: Array<PowerOption>;
};

export type Crop = {
  id: number;
  cropTypeId: number;
  name: string;
  image: string;
  optimalStorageTemperature: string;
  approximateShelfLife: string;
  harvestedToday: number;
  harvestedYesterday: number;
  harvestedDayBeforeYesterday: number;
  harvestedBefore: number;
  sizeSelection1: number;
  sizeSelection2: number;
  sizeSelection3: number;
  digitalTwinIdentifier: string;
  dependentConstant: number;
  activationEnergyConstant: number;
};

export interface BankDetails {
  id: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

export interface DateOperatorAssigned {
  id: number;
  operatorId: number;
  date: string;
}

export interface FarmerSurvey {
  id: number;
  cropId: number;
  farmerSurveyId: number;
  averagePrice: number;
  unit: EFarmerSurveyQuantityUnit;
  quantityTotal: number;
  quantitySelfConsumed: number;
  quantitySold: number;
  quantityBelowMarketPrice: number;
  averageSeasonInMonths: number | null;
  currency: string;
  kgInUnit: number;
  reasonForLoss: Array<string>;
  dateFilledIn: Date;
  dateLastModified: Date;
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

export enum ECoolingUnitType {
  FARM_GATE_STORAGE_ROOM = 'FARM_GATE_STORAGE_ROOM',
  MARKET_STORAGE_ROOM = 'MARKET_STORAGE_ROOM',
  MOVABLE_UNIT = 'MOVABLE_UNIT',
  OTHER = 'OTHER',
}

export enum EPowerSource {
  GENERATOR = 'generator',
  GRID = 'grid',
  PV_PANELS = 'pvpanels',
  BIO_MASS = 'biomass',
  HYBRID = 'hybrid',
}

export enum EElectricStorageSystem {
  BATTERY = 'battery',
  THERMAL_STORAGE = 'thermal storage',
  ICE_PACK = 'ice-pack',
  HYBRID = 'hybrid',
  NONE = 'none',
}

export enum EThermalStorageSystem {
  PHASE_CHANGE_MATERIAL = 'phase change material',
  ICE_BLOCK_STORAGE = 'ice block storage',
  CHILLED_WATER_STORAGE = 'chilled water storage',
  OTHER = 'other',
  NONE = 'none',
}

export enum ERefrigerantType {
  R290 = 'R290',
  R410A = 'R-410A',
  R0407c = 'R-407c',
  R717 = 'R717',
  R600 = 'R600',
  R600A = 'R600A',
  R601 = 'R601',
  R601A = 'R601A',
  OTHER = 'Other',
}

export enum EPaymentType {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
}

export enum ECropType {
  FRUITS = 1,
  VEGETABLES = 2,
  ROOT_VEGETABLES = 3,
  OTHER = 4,
}

export enum EDateCropped {
  TODAY = '-1',
  YESTERDAY = '-2',
  DAY_BEFORE = '-3',
  EVEN_BEFORE = '-4',
}

export enum EFarmerSurveyQuantityUnit {
  KILOGRAMS = 'kg',
  CRATES = 'crates',
  BOXES = 'boxes',
  SACKS = 'sacks',
  BASKETS = 'baskets',
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
