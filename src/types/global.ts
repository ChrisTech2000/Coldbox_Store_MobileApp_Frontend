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
  isPhonePublic?: boolean;
  isEmailPublic?: boolean;
};

export type Farmer = {
  id: number;
  user: User;
  birthday: Date | null;
  parentName: string;
  country: string;
  userCode: string | null;
  companies: Array<number>;
  coolingUnits: Array<number>;
};

export type Company = {
  id: number;
  hasCoolingUnits?: boolean;
  hasLegacyContacts?: boolean;
  name: string;
  country?: string;
  currency: string;
  digitalTwin?: boolean;
  ml4Market?: boolean;
  ml4Quality?: boolean;
  ml4Farmers?: boolean;
  dateJoined?: Date;
  crop: Array<number>;
  logo: string | null;

  bankDetails?: BankDetails;
  bankAccount?: number;
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
  plannedDays: number | null;
  checkOut?: Date; // TODO: confirm this type
  pricing: Array<Pricing>;
  coolingUnitMetric: ECoolingUnitMetric;
  checkinDate: Date;
  name: string;
  cropImage: string;
  movementCode: string;
  currentStorageDays: number;
  runDt: boolean;
  qualityDt: boolean | number;
  tag: string;
  initialWeight: number;
  listedInTheMarketplace?: boolean;
  lockedWithinPendingOrders: boolean;

  // Backend-calculated pricing fields
  calculatedTotalPrice?: number;
  paidCoolingFeesFromMarketplace?: number;
  calculatedDailyRate?: number;
  calculatedFixedRate?: number;
  effectivePricingType?: EPricingType;
  cmpTotalInCoolingFees?: number;
};

export type DashboardProduce = {
  additionalInfo: string;
  checkoutComplete: boolean;
  checkedInCrates: Array<Crate>;
  cratesAmount: number;
  cratesCombinedCost: number;
  cratesCombinedWeight: number;
  cropId: number;
  cropImage: string;
  cropName: string;
  currentStorageDays: number;
  owner: string; // the cooling user's name
  ownerContact: string; // the cooling user's phone?
  ownedOnBehalfOfCompanyId: number | null;
  ownedByUserId: number;
  farmerId?: number;
  hasDigitalTwin: boolean;
  id: number;
  minimumRemainingShelfLife: number;
  movementCode: string;
  plannedDays: number | null;
  qualityDt: number;
  runDt: boolean;
  operatorContact: string;
  operatorName: string;
};

export type CoolingUnitCrop = {
  id: number;
  cropId: number;
  coolingUnitId?: number;
  pricingId?: number;
  active: boolean;
  pricing: Pricing;
};

export type CommodityInfo = {
  commodity: string;
  percentage: number;
  combinedWeight: number;
  cratesNumber: number;
  optimalStorageTemperature: string | null;
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
  latestTemperature: number;
  crateWeight: number;
  crateWidth: number;
  crateLength: number;
  crateHeight: number;
  commodityInfos: Array<CommodityInfo>;
  foodCapacityInMetricTons: number;
  public: boolean;
  sensorError: boolean;
  latestTemperatureTimestamp: Date;
  lastCheckInDate?: Date;
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
  optimalStorageTemperature: string | null;
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
      movableUnit: number;
      marketStorageRoom: number;
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

export type ImpactMetricType = {
  name: string;
  value: number | string;
};

export type ImpactMetric = ImpactMetricType | Array<ImpactMetricType>;

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
  impactMetrics: ImpactMetrics[];
  co2Metrics: Co2Metrics[];
};

export type CoolingUnitImpact = {
  averageRoomOccupancy: { [key: string]: number };
  capNumCrates: { [key: string]: number };
  capTons: { [key: string]: number };
  checkInCratesCrop: { [key: string]: { [key: string]: number } };
  checkInKgCrop: { [key: string]: { [key: string]: number } };
  checkOutCratesCrop: { [key: string]: { [key: string]: number } };
  checkOutKgCrop: { [key: string]: { [key: string]: number } };
  co2Crops: { [key: string]: { [key: string]: number } };
  compName: { [key: string]: string };
  compPricing: { [key: string]: string };
  companyId: { [key: string]: number };
  coolUnitType: { [key: string]: string };
  coolingUnitId: { [key: string]: number };
  currency: { [key: string]: string };
  isUnitDeleted: { [key: string]: number };
  roomActiveFem: { [key: string]: number };
  roomActiveMa: { [key: string]: number };
  roomActiveOt: { [key: string]: number };
  roomActiveUserIds: { [key: string]: number[] };
  roomActiveUsers: { [key: string]: number };
  roomBeneficiaries: { [key: string]: number };
  roomBeneficiariesFem: { [key: string]: number };
  roomBeneficiariesMa: { [key: string]: number };
  roomCratesIn: { [key: string]: number };
  roomCratesOut: { [key: string]: number };
  roomKgIn: { [key: string]: number };
  roomKgOut: { [key: string]: number };
  roomOp: { [key: string]: number };
  roomOpFem: { [key: string]: number };
  roomOpMa: { [key: string]: number };
  roomOpOt: { [key: string]: number };
  roomOpsIn: { [key: string]: number };
  roomOpsOut: { [key: string]: number };
  roomRevenue: { [key: string]: number };
  roomRevenueUsd: { [key: string]: number };
  state: { [key: string]: string };
  totCo2: { [key: string]: number };
  unitName: { [key: string]: string };
};

export type FarmerBaseData = {
  avgStorageDays: RecordValue<number>;
  farmerId: RecordValue<number>;
  firstName: RecordValue<string>;
  gender: RecordValue<EApiGender>;
  lastName: RecordValue<string>;
  totalStorageCost: RecordValue<number>;
  userType: RecordValue<ERoles>;
};

type CropData = {
  [key: string]: number;
};

type RecordValue<T> = {
  [key: string]: T;
};

export type FarmerData = {
  farmerId: RecordValue<number>;
  firstName?: RecordValue<string>;
  lastName?: RecordValue<string>;
  gender: RecordValue<string>;
  userType?: RecordValue<string>;
  coolingUnitId?: RecordValue<number>;
  roomCratesIn?: RecordValue<number>;
  roomOpsIn?: RecordValue<number>;
  roomKgIn?: RecordValue<number>;
  roomCratesOut?: RecordValue<number>;
  roomOpsOut?: RecordValue<number>;
  roomKgOut?: RecordValue<number>;
  checkInCratesCrop?: RecordValue<CropData>;
  checkInKgCrop?: RecordValue<CropData>;
  checkOutCratesCrop?: RecordValue<CropData>;
  checkOutKgCrop?: RecordValue<CropData>;
  unitName?: RecordValue<string>;
};

type AggregatedData = {
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

export type Top5Data = {
  farmerId: number;
  cropId: number;
  cropName: number;
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

type SurveyData = {
  farmerId: number;
  numFilledBaselineSurveys: number;
  numOfPossibleBaselineSurveys: number;
  numOfFilledPostcheckoutSurveys: number;
  numOfPossiblePostcheckoutSurveys: number;
  cropsWithBaselineSurveyToBeCompleted: string;
};

export type FarmerImpactData = {
  aggregated: AggregatedData;
  top5FoodLossEvolution: Record<string, Top5Data>;
  top5RevenueEvolution: Record<string, Top5Data>;
  surveys: SurveyData[];
};

export type PredictionCrop = {
  id: number;
  name: string;
};

export type PredictionState = {
  id: number;
  name: string;
};

export type PredictionMarket = {
  id: number;
  name: string;
};

export type AvailableMarketsDatum = Record<string, Record<string, Array<PredictionMarket>>>;

export type PredictionParams =
  | { availableCrops: Array<PredictionCrop>; availableStates: Array<PredictionState> }
  | { availableCrops: Array<PredictionCrop>; availableMarkets: AvailableMarketsDatum };

export type PastValue = {
  date: string;
  price: number | null;
};

export type ForecastValue = {
  date: string;
  price: number | null;
  onlyInterpolatedData: unknown | null;
};

export type PredictionData = {
  pastValues: PastValue[];
  forecastsValues: ForecastValue[];
};

export type PredictionTableData = Array<{
  state?: string;
  market?: string;
  date: string;
  price: number | null;
}>;

export type CartItem = {
  coolingFeesAmount: number;
  couponId: number | null;
  crateAvailableWeight: number;
  discountAmount: number;
  marketListedCrateId: number;
  orderedEntireCrate: boolean;
  orderedProduceWeight: number;
  postOrderCrateId: number | null;
  produceAmount: number;
  producePricePerKg: number;
  totalAmount: number;
  relCropId: number;
  relCoolingUnitId: number;
  relCompanyId: number;
  relCrateId: number;
  relCrateRemainingShelfLife: number | null;
  relCheckinMovementCode: string;
  relCouponCode: string | undefined;
  ownedByUserId: number | null;
  ownedOnBehalfOfCompanyId: number | null;
};

export type BankAccount = {
  id: number;
  createdAt: string; // ISO date string
  createdByUser: number;
  accountType: EBankAccountType;
  bankCode: string;
  countryCode: string;
  accountNumber: string;
  accountName: string;
  paystackSubaccountCode: string;
  ownedOnBehalfOfCompany: number | null;
};

export type Bank = {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string | null;
  payWithBank: boolean;
  supportsTransfer: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MovementCrate = {
  id: number;
  cropId: number;
  crop?: { id: number; name: string };
  remainingShelfLife: number;
  plannedDays: number | null;
  weight: number;
  initialWeight: number;
  amount: number;
  tag: string;
  fullyCheckedOut: boolean;
  daysInStorage: number;
  ownedByUserId?: number;
  ownedOnBehalfOfCompanyId?: number | null;
  ownerName?: string;
  affectedWeight?: number;

  // Backend-calculated pricing fields
  calculatedTotalPrice?: number;
  paidCoolingFeesFromMarketplace?: number;
  calculatedDailyRate?: number;
  calculatedFixedRate?: number;
  effectivePricingType?: EPricingType;
  cmpTotalInCoolingFees?: number;
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

export enum EBankAccountType {
  PERSONAL = 1,
  BUSINESS = 2,
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

export enum EPaymentThrough {
  DIRECT = 'DIRECT',
  COLDTIVATE = 'COLDTIVATE',
}

export enum EPaymentGateway {
  PAYSTACK = 'PAYSTACK',
  STRIPE = 'STRIPE',
}

export enum EPaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  QR_CODE = 'QR_CODE',
  BANK_TRANSFER = 'BANK_TRANSFER',
  USSD = 'USSD',
  OPAY = 'OPAY',
  UPI = 'UPI',
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

export enum EInitiatedFor {
  CHECK_IN = 'ci',
  CHECK_OUT = 'co',
  MARKETPLACE_ORDER = 'mo',
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

export enum EView {
  COMPARISON = 'comparison',
  AGGREGATED = 'aggregated',
}

export enum EOrderStatus {
  CART = 'cart',
  ABANDONED_CART = 'abandoned-cart',
  PAYMENT_PENDING = 'payment-pending',
  PAYMENT_EXPIRED = 'payment-expired',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

export enum EPickUpMethod {
  PICK_UP_SAME_DAY = 'pick-up-same-day',
  KEEP_IN_STORAGE = 'keep-in-storage',
  DELIVERY = 'delivery',
}

export enum ESensorType {
  ECOZEN = 'ecozen',
  VICTRON = 'victron',
  FIGORR = 'figorr',
  UBIBOT = 'ubibot',
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
