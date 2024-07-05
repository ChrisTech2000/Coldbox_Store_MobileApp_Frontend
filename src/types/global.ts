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
  username?: string; // we get this prop when we fetch the operators
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
  bankDetails: unknown;
  bankAccount: unknown;
}

export interface Pricing {
  id: number;
  pricingType: EPricingType;
  fixedRate: number;
  dailyRate: number;
}

export interface CommonPricingType {
  type: EPricingType;
  value: number;
  pricingId: number;
  metric: ECoolingUnitMetric;
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

export interface Crop {
  id: number;
  cropId: number;
  coolingUnitId: number;
  pricingId: number;
  active: boolean;
  pricing: Pricing[];
}

export interface CommodityInfo {
  commodity: string;
  percentage: number;
  combinedWeight: number;
  cratesNumber: number;
  optimalStorageTemperature: string;
}

export interface CommodityTotal {
  totalWeight: number;
  totalCrates: number;
}

export interface PowerOption {
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
}

export interface CoolingUnit {
  id: number;
  name: string;
  location: number;
  metric: ECoolingUnitMetric;
  sensor: boolean;
  sensorList: unknown[]; // TODO: figure out type
  capacityInMetricTons: number;
  capacityInNumberCrates: number;
  occupancy: number;
  occupancyModifiedDate: Date;
  dateLastModified: Date;
  dateCreation: Date;
  dateOperatorAssigned: Date[]; // a date for each operator????
  coolingUnitType: ECoolingUnitType;
  crops: Crop[];
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
  commodityInfos: CommodityInfo[];
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
  powerOptions: PowerOption[];
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
