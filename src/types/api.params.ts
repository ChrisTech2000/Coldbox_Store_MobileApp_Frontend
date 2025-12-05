import type { SensorDatum } from '#screens/Dashboard/Management/AddCoolingUnit/contexts/FormManager';
import { JsonObject } from '#services/utils';
import {
  EBankAccountType,
  EImpactMode,
  EPaymentGateway,
  EPaymentMethod,
  EPaymentThrough,
  EPickUpMethod,
  ERoles,
  ESellingLocation,
  ESensorType,
  type Company,
  type FarmerSurvey,
  type User,
} from './global';

type SignUpEmployee = Omit<User, 'lastLogin' | 'id' | 'phone'> & {
  phone?: string;
  password: string;
};
type SignUpCoolingUser = Omit<User, 'lastLogin' | 'id'> & {
  password: string;
  country: string;
};

type SignUpCompany = Pick<Company, 'name' | 'country' | 'currency' | 'crop'> & { language: string };

export interface SignInParams extends JsonObject {
  username: string;
  password: string;
  userType: Omit<ERoles, ERoles.AUTH>;
  language: string;
}

export interface SignUpAsCompanyParams extends JsonObject {
  user: SignUpEmployee;
  company: SignUpCompany;
}

export interface SignUpAsCoolingUserParams extends JsonObject {
  user: SignUpCoolingUser | Omit<SignUpCoolingUser, 'country'>;
  createUser?: boolean;
  parentName?: string;
}

export interface RequestPasswordResetParams extends JsonObject {
  phoneNumber: string;
}

export interface ResetPasswordParams extends JsonObject {
  code: string;
  phoneNumber: string;
  password: string;
}

export interface GetOperatorFarmersParams extends JsonObject {
  operator: number;
}

export interface GetCoolingUnitsParams extends JsonObject {
  company?: number;
  operator?: number;
}

export interface GetDashboardProducesParams extends JsonObject {
  coolingUnit: number;
}

export interface GetFarmerDashboardProducesParams extends JsonObject {
  coolingUnit: number;
  farmerId: number;
}
export interface GetFarmerCratesParams extends JsonObject {
  coolingUnit: number;
  farmer: number;
}

export interface CheckOutParams extends JsonObject {
  crates: Array<number>;
  discountAmount: number;
  currency: string;
  paymentThrough: EPaymentThrough;
  paymentGateway: EPaymentGateway | null;
  paymentMethod: EPaymentMethod;
  paid: boolean;
}

export interface CheckInParams extends JsonObject {
  farmerId: number;
  id?: number;
  produces: Array<{
    crop: { id: number };
    additionalInfo: string;
    crates: Array<{
      checkOut?: Date | null;
      weight: number;
      tag: string; // the id defined during checkout
      coolingUnitId: number;
      plannedDays: number | undefined;
      isSellable?: boolean;
    }>;
    harvestDate: number;
    initialGrade: unknown; // TODO: figure out type
    hasPicture: boolean;
  }>;
}

export interface GetCheckOutParams extends JsonObject {
  code: string;
}

export interface CheckOutWithCodeParams extends JsonObject {
  params: {
    code: string;
    days: number | undefined;
    farmer: number;
    coolingUnitId: number;
    tags: string[] | undefined;
  };
}

export interface GetLocationParams extends JsonObject {
  companyId: number;
  locationId: number;
}

export interface AddLocationParams extends JsonObject {
  name?: string;
  point?: string;
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  street?: string;
  streetNumber?: string;
}

export interface EditLocationParams extends AddLocationParams {
  locationId: number;
}

export interface GetCoolingUnitCropsParams extends JsonObject {
  coolingUnitId: number;
  crop: number;
}

export interface UpdateUserParams extends JsonObject, Omit<Partial<User>, 'id'> {
  coolingUnits?: Array<number> | null;
  parentName?: string;
  userId: number;
}

export interface UpdateCompanyParams extends JsonObject {
  accountName: string;
  accountNumber: string;
  bankName: string;
  models: Array<string>;
  name: string;
  country: string;
  crop: Array<number>;
  currency: string;
  companyId: number;
  logo: {
    uri: string;
    name?: string;
    type?: string;
  } | null;
}

export interface UpdateFarmerParams extends JsonObject {
  farmerId: number;
  country?: string;
  parentName?: string;
  updateUser?: true;
  coolingUnitId?: number;
  updateCoolingUnits?: boolean;
}

export interface GetCoolingUnitsByStatusParams extends JsonObject {
  userId?: number;
  companyId?: number;
  isFarmer?: boolean;
  notEmpty: boolean;
}

export interface GetFarmerSurveysParams extends JsonObject {
  farmerId: number;
}

type FarmerSurveyParams = Omit<
  FarmerSurvey,
  'id' | 'farmerSurveyId' | 'dateFilledIn' | 'dateLastModified'
>;

export interface UpdateFarmerSurveysParams extends JsonObject {
  farmer: number;
  userType: ERoles | string;
  experience: string | boolean;
  experienceDuration: number;
  commodities: Array<FarmerSurveyParams>;
}

export interface GetCompanyEmployeeParams extends JsonObject {
  registeredEmployeeId: number;
  companyId: number;
}

export interface GetMovementsHistoryParams extends JsonObject {
  coolingUnit: number;
  farmerId?: number;
}

export interface UpdateFarmerCompany extends JsonObject {
  farmerId: number;
  companyId: number;
}

export interface RemoveCompanyParams extends JsonObject {
  farmerId: number;
  companyId: number;
}

export interface SendOperatorInvitationParams extends JsonObject {
  phone: string;
  coolingUnits: Array<number>;
  userId: number;
  recaptchaToken?: string | null;
}

export interface SignupEmployeeByInviteParams extends JsonObject {
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  password: string;
  code: string;
}

export interface SignupOperatorByInviteParams extends JsonObject {
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  password: string;
  code: string;
}

export interface EditCheckInParams extends JsonObject {
  id: number;
  cropId: number;
  farmerId: number;
  plannedDays: number;
}

export interface AddCoolingUnitParams extends JsonObject {
  name: string;
  location: number;
  metric: string;
  capacityInNumberCrates: number;
  capacityInMetricTons: number;
  foodCapacityInMetricTons: number;
  fixedPrice: boolean;
  price: number;
  sensor: boolean;
  public: boolean;
  sensorData: SensorDatum | string;
  powerOptions: {
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
    batteryCount: number;
    batteryWeight: number;
    batteryCapacity: number;
    batteryMaxCurrent: number;
    batteryPeakEnergyStorage: number;
    refrigerantType: string | null;
    powerSource: string;
    electricityStorageSystem: string;
    thermalStorageMethod: string;
    amountRefrigerant: number;
    roomInsulator: number;
    batteryType: string | null;
    pvPanelType: string;
  };
  operators: Array<number>;
  crops: Array<number>;
  cropUpdates: Array<{
    id: number;
    pricingType: string;
    dailyRate: number;
    fixedRate: number;
  }>;
  crateWeight: number;
  crateLength: number;
  crateHeight: number;
  crateWidth: number;
  roomWeight: number;
  roomHeight: number;
  roomLength: number;
  roomWidth: number;
  coolingUnitType: string;
}

export type GetCoolingUnitParams = {
  coolingUnitId: number;
} & (
  | {
      operatorId: number;
    }
  | {
      companyId: number;
    }
);

export type GetCoolingUnitSensorDataParams = {
  coolingUnitId: number;
};

export interface EditCoolingUnitParams extends AddCoolingUnitParams {
  pricingId: number;
}

export interface AddMarketSurveyParams extends JsonObject {
  crop: number;
  checkout: number;
  sellingPlace: ESellingLocation;
  localMarket?: string | null;
  market?: string | null;
  price: number;
  reasonForLoss: Array<string>;
  sellingUnit: string;
  sellingDate: Date | null;
  kgInUnit: number;
  loss: number;
  currency: string;
}

export interface AddCoolingUnitTemperatureParams extends JsonObject {
  value: number;
  specificationType: 'TEMPERATURE';
  datetimeStamp: string;
  coolingUnit: number;
}

export interface GetRevenueAnalysisParams extends JsonObject {
  coolingUnits: number | Array<number>;
  // paymentThroughs: Array<EPaymentThrough>;
  // paymentGateways: Array<EPaymentGateway>;
  paymentMethods: Array<EPaymentMethod>;
}

export interface GetImpactParams extends JsonObject {
  companyId: number;
  coolingUnitId: number | number[];
  startDate?: Date;
  endDate?: Date;
  mode: EImpactMode;
}

export interface GetCoolingUnitImpactParams extends JsonObject {
  unitIds: number | number[];
  startDate?: Date;
  endDate?: Date;
}

export interface GetFarmerImpactParams extends JsonObject {
  farmerId: number;
  startDate: Date;
  endDate: Date;
  unitIds: number | number[];
}

export type VerifyEcozenSensorConnectivityParams = {
  username: string;
  password: string;
  sourceId: string;
};

export type ListUserSensorsParams = {
  username: string;
  password: string;
  integrationType: ESensorType;
};

export interface GetPredictionParams extends JsonObject {
  country: 'IN' | 'NG';
  cropId: number;
  stateId?: number;
  marketId?: number;
}

export type GetPredictionTableParams = {
  country: 'IN' | 'NG';
  cropId: number;
  days: Date[];
  statesIds?: number[];
  marketsIds?: Array<number>;
};

export interface CreateCouponParams extends JsonObject {
  code: string;
  discountPercentage: number;
  ownedOnBehalfOfCompanyId?: number;
}

export interface GetCouponListParams extends JsonObject {
  revoked?: 'only' | 'included';
  ownedOnBehalfOfCompanyId?: number;
}

export interface AddItemToCartParams extends JsonObject {
  crateId: number;
  orderedProduceWeight: number;
  updateStrategy: 'increase' | 'decrease' | 'replace';
}
export interface UpdateListedCrateParams extends JsonObject {
  crateIds: Array<number>;
  producePricePerKg: number;
}

export interface ListedCratesBaseParams {
  operatorOnBehalfOfSellerFarmerId?: number;
  operatorOnBehalfOfSellerUserId?: number;
  operatorOnBehalfOfSellerCompanyId?: number;
}

export interface GetAvailableListingParams extends JsonObject {
  location: [number, number] | [];
  sortBy?: 'price-asc' | 'price-desc' | 'nearby-me';
  filterByCoolingUnitIds?: Array<number>;
  page?: number;
  itemsPerPage?: number;
  filterByMaxDistanceInKm?: number;
}

export interface AddPaystackBankAccountParams extends JsonObject {
  accountType: EBankAccountType;
  bankCode: string;
  accountNumber: string;
  countryCode: string;
  accountName: string;
  companyId?: number;
  userId?: number;
}

export interface SetPickUpDetailsParams extends JsonObject {
  pickupDetails: Array<{
    coolingUnitId: number;
    pickupMethod: EPickUpMethod;
  }>;
}

export interface CreateDeliveryContactParams extends JsonObject {
  contactName: string;
  phone: string;
  deliveryCompanyName: string;
  coolingUnitIds?: number[];
  isActive?: boolean;
}

export interface UpdateDeliveryContactParams extends JsonObject {
  contactId: number;
  contactName?: string;
  phone?: string;
  deliveryCompanyName?: string;
  coolingUnitIds?: number[];
  isActive?: boolean;
}

export interface DeleteDeliveryContactParams extends JsonObject {
  contactId: number;
}

export interface CheckMarketplaceEligibilityParams extends JsonObject {
  userIds: number[];
  companyIds: number[];
}

export interface AddFirstPaystackBankAccountParams extends JsonObject {
  accountType: EBankAccountType;
  bankCode: string;
  accountNumber: string;
  countryCode: string;
  accountName: string;
  companyId?: number;
  ownedByUserId?: number;
}
