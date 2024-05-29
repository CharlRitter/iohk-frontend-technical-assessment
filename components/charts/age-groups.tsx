'use client';

import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { ChartColours } from 'constants/common';
import { AgeGroup, User, UserOverviewFilters } from 'types/common';
import { getAgeGroup, skipUserObject } from 'utils/common';

export type AgeGroupsProps = {
  data: User[];
  className?: string;
  filters?: UserOverviewFilters;
};

type PieChartLabelParams = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
};

function renderCustomizedLabel(params: PieChartLabelParams) {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = params;

  if (percent === 0) return null;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

export default function AgeGroups(props: AgeGroupsProps) {
  const { data, className, filters } = props;
  const ageGroups: Record<AgeGroup, number> = {
    '0-19': 0,
    '20-34': 0,
    '35-49': 0,
    '50-64': 0,
    '65+': 0
  };

  data.forEach((user) => {
    if (filters && skipUserObject(filters, user)) return;

    const group = getAgeGroup(user.birthDate);
    ageGroups[group]++;
  });

  const chartData = Object.entries(ageGroups).map(([ageGroup, count]) => ({
    name: ageGroup,
    value: count
  }));

  return (
    <div className={`block w-full ${className}`}>
      <h4 className="mb-2">Age Groups</h4>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            dataKey="value"
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={entry.name} fill={ChartColours[index % ChartColours.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
