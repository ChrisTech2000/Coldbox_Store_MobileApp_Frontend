import { JsonObject } from '#services/utils';
import { ERoles, type Company, type User } from './global';

export interface SignInParams extends JsonObject {
  username: string;
  password: string;
  userType: Omit<ERoles, ERoles.AUTH>;
  language: string;
}

type SignUpEmployee = Omit<User, 'lastLogin' | 'id' | 'phone'> & {
  phone?: string;
  password: string;
};
type SignUpCoolingUser = Omit<User, 'lastLogin' | 'id'> & {
  password: string;
  country: string;
};

type SignUpCompany = Pick<Company, 'name' | 'country' | 'currency' | 'crop'> & { language: string };

export interface SignUpAsCompanyParams extends JsonObject {
  user: SignUpEmployee;
  company: SignUpCompany;
}

export interface SignUpAsCoolingUserParams extends JsonObject {
  user: SignUpCoolingUser;
}
