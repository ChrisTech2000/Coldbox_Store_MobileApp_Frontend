export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: EApiGender;
  phone: string;
  email?: string;
  lastLogin: string;
}

export interface Company {
  id: number;
  hasCoolingUnits: boolean;
  name: string;
  country?: string;
  currency: string;
  digitalTwin: boolean;
  ml4Market: boolean;
  ml4Quality: boolean;
  ml4Farmers: boolean;
  dateJoined: Date;
  crop: number[];

  //TODO: figure out types
  // bankDetails
  // logo
  // bankAccount
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
