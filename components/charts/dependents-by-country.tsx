'use client';

import React from 'react';
import { Bar, BarChart, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { ChartColours } from 'constants/common';
import { User, UserOverviewFilters } from 'types/common';
import { skipUserObject } from 'utils/common';

export type DependentsByCountryProps = {
  data: User[];
  className?: string;
  filters?: UserOverviewFilters;
};

type CountryDependents = {
  [key: string]: number;
};

function renderCustomizedLabel(props: { x?: any; y?: any; width?: any; height?: any; value?: any; fill?: any }) {
  const { x, y, width, height, value, fill } = props;

  if (value === 0) return null;

  return (
    <text x={x + width / 2} y={y + height / 2} fill={fill} textAnchor="middle" dominantBaseline="middle">
      {value}
    </text>
  );
}

export default function DependentsByCountry(props: DependentsByCountryProps) {
  const { data, className, filters } = props;
  const countryDependents: CountryDependents = {};

  data.forEach((user: User) => {
    if (filters && skipUserObject(filters, user)) return;

    if (countryDependents[user.country]) {
      countryDependents[user.country] += user.dependants;
    } else {
      countryDependents[user.country] = user.dependants;
    }
  });

  const chartData = Object.keys(countryDependents).map((country) => ({
    country,
    dependents: countryDependents[country]
  }));

  return (
    <div className={`block w-full ${className}`}>
      <h4 className="mb-2">Dependents by Country</h4>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="dependents" fill={ChartColours[3]}>
            <LabelList dataKey="dependents" fill="#fff" content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
