import { JsonObject } from '#services/utils';
import { EPaymentType, ERoles, type Company, type User } from './global';

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
  link: {
    partOne: string;
    partTwo: string;
  };
}

export interface ResetPasswordParams extends JsonObject {
  code: string;
  phoneNumber: string;
  password: string;
}

export interface GetFarmerParams extends JsonObject {
  userId: number;
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
  operatorId: User;
  priceDiscount: number;
  currency: string;
  paymentType: EPaymentType;
  paid: boolean;
}

export interface CheckInParams extends JsonObject {
  farmerId: number;
  id?: number;
  produces: Array<{
    crop: { id: number };
    additionalInfo: string;
    crates: Array<{
      checkOut: Date | null;
      weight: number;
      tag: string; // the id defined during checkout
      coolingUnitId: number;
      plannedDays: number | undefined;
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
  latitude?: number;
  longitude?: number;
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
  country: string;
  parentName: string;
  updateUser: true;
}

export interface GetCoolingUnitsByStatusParams extends JsonObject {
  userId?: number;
  companyId?: number;
  isFarmer?: boolean;
  notEmpty: boolean;
}

export interface GetCompanyEmployeeParams extends JsonObject {
  registeredEmployeeId: number;
  companyId: number;
}

export interface UpdateFarmerCompany {
  farmerId: number;
  companyId: number;
}
