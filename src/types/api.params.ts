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
  user: SignUpCoolingUser;
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
  crates: number[];
  operatorId: User;
  priceDiscount: number;
  currency: string;
  paymentType: EPaymentType;
  paid: boolean;
}
