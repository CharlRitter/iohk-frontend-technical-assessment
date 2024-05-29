'use client';

import { Select } from 'antd';
import React from 'react';

import { Gender } from 'constants/enum';
import { UserOverviewFilters } from 'types/common';

import './styles.scss';

export type OverviewFilterProps = {
  className?: string;
  filters: UserOverviewFilters;
  onFilterChange: (filters: UserOverviewFilters) => void;
};

export default function OverviewFilter(props: OverviewFilterProps) {
  const { className, filters, onFilterChange } = props;
  const options = [
    {
      value: Gender.Female.toString(),
      label: Gender.Female
    },
    {
      value: Gender.Male.toString(),
      label: Gender.Male
    }
  ];

  return (
    <div className={`flex gap-3 items-center rounded-lg realfi-overview-filter p-3 ${className}`}>
      <p>Filter:</p>
      <Select
        placeholder="Gender"
        onChange={(value: string | undefined) => onFilterChange({ ...filters, gender: value })}
        options={options}
        allowClear
      />
    </div>
  );
}
