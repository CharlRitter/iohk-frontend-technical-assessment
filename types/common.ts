export type AgeGroup = '0-19' | '20-34' | '35-49' | '50-64' | '65+';

export type User = {
  name: string;
  surname: string;
  number: number;
  gender: string;
  country: string;
  dependants: number;
  birthDate: string;
};

export type UserState = {
  users: User[];
};

export type UserOverviewFilters = {
  name: string | undefined;
  surname: string | undefined;
  number: number | undefined;
  gender: string | undefined;
  country: string | undefined;
  dependants: number | undefined;
  birthDate: string | undefined;
};
