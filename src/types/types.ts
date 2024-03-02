export type CountryType = {
  id: number;
  name: string;
  flag: string;
};

export type AthleteType = {
  id: number;
  bibNo: number;
  country: CountryType;
  name: string;
  gender: string;
  dateOfBirth: string;
  classification: string;
  picture: string;
};

export type UserType = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
  role: string;
  picture: string;
};
