import { type CoolingUnit, ERoles, type Company, type User } from './global';

export interface SignInResponse {
  refresh: string;
  access: string;
  user: User;
  role: ERoles;
  company: Company;
}

export interface SignUpAsCompanyResponse {
  company: Company;
  user: User;
}

export interface SignUpAsCoolingUserResponse {
  id: number;
  user: User;
  userCode: string;
}

export interface ResetPasswordResponse {}

export interface GetFarmerResponse {
  id: number;
  user: User;
  birthday: Date;
  parentName: string;
  country: string;
  userCode: string;
  companies: number[];
  coolingUnits: number[];
}

export type GetLocationsResponse = Array<{
  id: number;
  coolingUnits: Array<CoolingUnit>;
  company: Company;
  name: string;
  state: string;
  city: string;
  street: string;
  streetNumber: unknown | null;
  zipCode: string;
  latitude: number;
  longitude: number;
  deleted: boolean;
  dateCreation: string;
  dateLastModified: string;
}>;
