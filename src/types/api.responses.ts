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

export type CheckOutResponse = {
  id: number;
  movement: number;
  paid: boolean;
  price: number;
  paymentType: EPaymentType;
  currency: string;
  priceDiscount: number;
};
