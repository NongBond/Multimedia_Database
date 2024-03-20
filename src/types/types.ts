export type CountryType = {
  id: string;
  name: string;
  abbreviation: string;
  flag: string;
  athletes: AthleteType[];
  medals: MedalType[];
};

export type AthleteType = {
  id: string;
  bibNo: string;
  country: CountryType;
  name: string;
  gender: string;
  dateOfBirth: string;
  classification: string;
  picture: string;
  events: EventType[];
  medals: MedalType[];
};

export type EventType = {
  id: string;
  eventNumber: string;
  name: string;
  classification?: string;
  gender: string;
  date: string;
  time: string;
  stage: string;
  status: string;
  athletes: AthleteType[];
  medals: MedalType[];
  results: ResultType[];
};

export type MedalType = {
  id: string;
  createdAt: string;
  type: MedalTypeEnum;
  athlete: AthleteType;
  country: CountryType;
  event: EventType;
};

export type ResultType = {
  id: string;
  createdAt: string;
  result: string;
  event: EventType;
};

export enum MedalTypeEnum {
  GOLD = "GOLD",
  SILVER = "SILVER",
  BRONZE = "BRONZE",
}

export type UserType = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
  role: string;
  image: string;
};
