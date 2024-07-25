export type User = {
  id: number;
  firstName: string;
  lastName: string;
  gender: EApiGender;
  phone: string;
  email?: string;
  lastLogin: string | null;
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
  userCode: string | null;
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
  unit: EUnitOfMeasurement;
  quantityTotal: number;
  quantitySelfConsumed: number;
  quantitySold: number;
  quantityBelowMarketPrice: number;
  averageSeasonInMonths: number | null;
  currency: string;
  kgInUnit: number;
  reasonForLoss: Array<string> | string;
  dateFilledIn: Date;
  dateLastModified: Date;
}

export interface CompanyData {
  compAverageRoomOccupancy: { [key: string]: number };
  compBeneficiaries: { [key: string]: number };
  compBeneficiariesFem: { [key: string]: number };
  compBeneficiariesMa: { [key: string]: number };
  compCapNumCrates: { [key: string]: number };
  compCapTons: { [key: string]: number };
  compCoolUsers: { [key: string]: number };
  compCoolUsersFem: { [key: string]: number };
  compCoolUsersMa: { [key: string]: number };
  compCoolUsersOt: { [key: string]: number };
  compCountry: { [key: string]: string };
  compCratesIn: { [key: string]: number };
  compCratesOut: { [key: string]: number };
  compFarmers: { [key: string]: number };
  compKgIn: { [key: string]: number };
  compKgOut: { [key: string]: number };
  compLogo: { [key: string]: string };
  compName: { [key: string]: string };
  compOp: { [key: string]: number };
  compOpFem: { [key: string]: number };
  compOpMa: { [key: string]: number };
  compOpOt: { [key: string]: number };
  compOpsIn: { [key: string]: number };
  compOpsOut: { [key: string]: number };
  compRegUsers: { [key: string]: number };
  compRegUsersFem: { [key: string]: number };
  compRegUsersMa: { [key: string]: number };
  compRegUsersOt: { [key: string]: number };
  compRevenue: { [key: string]: number };
  compRevenueUsd: { [key: string]: number };
  compTraders: { [key: string]: number };
  compUnspecUserType: { [key: string]: number };
  companyId: { [key: string]: number };
  coolingUnitTypes: {
    [key: string]: {
      farmGateStorageRoom: number;
      // TODO: this might need completion
    };
  };
  currency: { [key: string]: string };
  reportDate: { [key: string]: string };
}

type Co2Crops = {
  co2From: number;
  co2To: number;
};

type Co2Metrics = {
  companyId: string;
  co2Crops: Co2Crops;
  coolingUnitId: string;
};

export type ImpactMetric = {
  name: string;
  value: number | string;
};

type ImpactMetrics = {
  companyId: ImpactMetric | number;
  unitName: ImpactMetric | number;
  baselineQuantityTotalMonth: ImpactMetric | number;
  avgBaselineKgSellingPriceMonth: ImpactMetric | number;
  baselineKgLossMonth: ImpactMetric | number;
  baselineKgSoldMonth: ImpactMetric | number;
  avgBaselinePercLossMonth: ImpactMetric | number;
  avgBaselineFarmerRevenueMonth: ImpactMetric | number;
  avgMonthlyKgSellingPrice: ImpactMetric | number;
  monthlyKgCheckin: ImpactMetric | number;
  monthlyKgLoss: ImpactMetric | number;
  avgMonthlyPercLoss: ImpactMetric | number;
  avgMonthlyPercFoodlossEvolution: ImpactMetric | number;
  avgMonthlyFarmerRevenue: ImpactMetric | number;
  avgMonthlyPercRevenueIncreaseEvolution: ImpactMetric | number;
  avgMonthlyPercRevenueIncreaseEvolution2: ImpactMetric | number;
  avgMonthlyKgSellingPriceEvolution: ImpactMetric | number;
  avgMonthlyPercUnitSellingPriceEvolution: ImpactMetric | number;
  avgMonthlyFarmerRevenueEvolution: ImpactMetric | number;
  latestSurveyDate: ImpactMetric | number;
  numPostHarvestSurveys: ImpactMetric | number;
  possiblePostCheckoutSurveyRoom: ImpactMetric | number;
  totalPostCheckoutSurveyUnit: ImpactMetric | number;
};

export type ImpactData = {
  impactMetrics: ImpactMetrics;
  co2Metrics: Co2Metrics[];
};

export type CoolingUnitImpact = {
  averageRoomOccupancy: number;
  capNumCrates: number;
  capTons: number;
  checkInCratesCrop: number;
  checkInKgCrop: number;
  checkOutCratesCrop: number;
  checkOutKgCrop: number;
  co2Crops: number;
  compName: number;
  compPricing: number;
  companyId: number;
  coolUnitType: number;
  coolingUnitId: number;
  currency: number;
  isUnitDeleted: number;
  roomActiveFem: number;
  roomActiveMa: number;
  roomActiveOt: number;
  roomActiveUserIds: number;
  roomActiveUsers: number;
  roomBeneficiaries: number;
  roomBeneficiariesFem: number;
  roomBeneficiariesMa: number;
  roomCratesIn: number;
  roomCratesOut: number;
  roomKgIn: number;
  roomKgOut: number;
  roomOp: number;
  roomOpFem: number;
  roomOpMa: number;
  roomOpOt: number;
  roomOpsIn: number;
  roomOpsOut: number;
  roomRevenue: number;
  roomRevenueUsd: number;
  state: number;
  totCo2: number;
  unitName: number;
};

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

export enum EUnitOfMeasurement {
  KILOGRAMS = 'kg',
  CRATES = 'crates',
  BOXES = 'boxes',
  SACKS = 'sacks',
  BASKETS = 'baskets',
}

export enum EMovementType {
  OUT = 'out',
  IN = 'in',
}

export enum ESellingLocation {
  FARM = 'farm-gate',
  MARKET = 'local-market',
  BOTH = 'Both',
}

export enum EImpactMode {
  COMPANY = 'company',
  COOLING_UNIT = 'cooling_unit',
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

export const MAP_APP_UNIT_OF_MEASUREMENT_TO_API = {
  [EUnitOfMeasurement.KILOGRAMS]: 'KILOGRAMS',
  [EUnitOfMeasurement.CRATES]: 'CRATES',
  [EUnitOfMeasurement.BOXES]: 'BOXES',
  [EUnitOfMeasurement.SACKS]: 'SACKS',
  [EUnitOfMeasurement.BASKETS]: 'BASKETS',
};
