import { EPaymentType, ERoles, type Company, type CoolingUnit, type User } from './global';

export type SignInResponse = {
  refresh: string;
  access: string;
  user: User;
  role: ERoles;
  company: Company;
};

export type SignUpAsCompanyResponse = {
  company: Company;
  user: User;
};

export type SignUpAsCoolingUserResponse = {
  id: number;
  user: User;
  userCode: string;
};

export type GetFarmerResponse = {
  id: number;
  user: User;
  birthday: Date;
  parentName: string;
  country: string;
  userCode: string;
  companies: number[];
  coolingUnits: number[];
};

export type CheckOutResponse = {
  id: number;
  movement: number;
  paid: boolean;
  price: number;
  paymentType: EPaymentType;
  currency: string;
  priceDiscount: number;
};

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
