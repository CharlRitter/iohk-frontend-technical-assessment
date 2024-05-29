'use client';

import React from 'react';
import { Bar, BarChart, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { ChartColours } from 'constants/common';
import { Gender } from 'constants/enum';
import { User, UserOverviewFilters } from 'types/common';
import { skipUserObject } from 'utils/common';

export type GenderByCountryProps = {
  data: User[];
  className?: string;
  filters?: UserOverviewFilters;
};

type GenderCounts = {
  country: string;
  male: number;
  female: number;
}[];

function renderCustomizedLabel(props: { x?: any; y?: any; width?: any; height?: any; value?: any; fill?: any }) {
  const { x, y, width, height, value, fill } = props;

  if (value === 0) return null;

  return (
    <text x={x + width / 2} y={y + height / 2} fill={fill} textAnchor="middle" dominantBaseline="middle">
      {value}
    </text>
  );
}

export default function GenderByCountry(props: GenderByCountryProps) {
  const { data, className, filters } = props;
  const genderCounts: GenderCounts = [];

  data.forEach((user: User) => {
    if (filters && skipUserObject(filters, user)) return;

    const isMale = user.gender.toLowerCase() === Gender.Male.toLowerCase();
    const isFemale = user.gender.toLowerCase() === Gender.Female.toLowerCase();

    let genderCountIndex = genderCounts.findIndex((genderCount) => genderCount.country === user.country);

    if (genderCountIndex === -1) {
      genderCounts.push({ country: user.country, male: 0, female: 0 });
      genderCountIndex = genderCounts.length - 1;
    }

    if (isMale) {
      genderCounts[genderCountIndex].male++;
    } else if (isFemale) {
      genderCounts[genderCountIndex].female++;
    }
  });

  return (
    <div className={`block w-full ${className}`}>
      <h4 className="mb-2">Gender Distribution by Country</h4>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={genderCounts}>
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="male" fill={ChartColours[0]}>
            <LabelList dataKey="male" fill="#fff" content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="female" fill={ChartColours[1]}>
            <LabelList dataKey="female" fill="#fff" content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
