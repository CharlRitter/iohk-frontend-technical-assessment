import { AgeGroup, User, UserOverviewFilters } from 'types/common';

export function getAgeGroup(birthDate: string): AgeGroup {
  const age = new Date().getFullYear() - new Date(birthDate).getFullYear();

  if (age < 20) return '0-19';
  if (age < 35) return '20-34';
  if (age < 50) return '35-49';
  if (age < 65) return '50-64';
  return '65+';
}

export function skipUserObject(filters: UserOverviewFilters, user: User): boolean {
  const filterKeys = Object.keys(filters);

  return !filterKeys.every((key) => {
    const filterValue = filters[key as keyof UserOverviewFilters];
    const userValue = user[key as keyof User];

    return filterValue === undefined || filterValue === userValue;
  });
}
