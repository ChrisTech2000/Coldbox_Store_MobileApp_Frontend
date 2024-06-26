import { ERoles, type Company, type User } from './global';

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
