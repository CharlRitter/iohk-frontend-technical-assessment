'use client';

import React from 'react';
import { Bar, BarChart, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { ChartColours } from 'constants/common';
import { User, UserOverviewFilters } from 'types/common';
import { getAgeGroup, skipUserObject } from 'utils/common';

export type DependentsByAgeGroupProps = {
  data: User[];
  className?: string;
  filters?: UserOverviewFilters;
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

export default function DependentsByAgeGroup(props: DependentsByAgeGroupProps) {
  const { data, className, filters } = props;
  const ageGroupDependents: Record<string, number> = {};

  data.forEach((user: User) => {
    if (filters && skipUserObject(filters, user)) return;

    const ageGroup = getAgeGroup(user.birthDate);
    if (ageGroupDependents[ageGroup]) {
      ageGroupDependents[ageGroup] += user.dependants;
    } else {
      ageGroupDependents[ageGroup] = user.dependants;
    }
  });

  // Prepare data for the chart
  const chartData = Object.keys(ageGroupDependents).map((ageGroup) => ({
    ageGroup,
    dependents: ageGroupDependents[ageGroup]
  }));

  return (
    <div className={`block w-full ${className}`}>
      <h4 className="mb-2">Dependents by Age Group</h4>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="ageGroup" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="dependents" fill={ChartColours[4]}>
            <LabelList dataKey="dependents" fill="#fff" content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
