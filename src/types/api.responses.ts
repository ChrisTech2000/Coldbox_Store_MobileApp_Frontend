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
