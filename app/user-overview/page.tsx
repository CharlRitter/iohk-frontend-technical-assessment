'use client';

import { Col, Row } from 'antd';
import React, { useState } from 'react';

import AgeGroups from 'components/charts/age-groups';
import DependentsByAgeGroup from 'components/charts/dependents-by-age-group';
import DependentsByCountry from 'components/charts/dependents-by-country';
import GenderByCountry from 'components/charts/gender-by-country';
import OverviewFilter from 'components/overview-filter';
import { dataset } from 'constants/dataset';
import { UserOverviewFilters } from 'types/common';

function getData() {
  return { users: dataset };
}

export default function UsersOverview() {
  const { users } = getData();
  const [filters, setFilters] = useState<UserOverviewFilters>({
    name: undefined,
    surname: undefined,
    number: undefined,
    gender: undefined,
    country: undefined,
    dependants: undefined,
    birthDate: undefined
  });

  return (
    <>
      <h1 className="mb-3">User Overview</h1>
      <OverviewFilter filters={filters} onFilterChange={setFilters} className="mb-3" />
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} className="flex justify-center">
          <DependentsByCountry className="mb-3" filters={filters} data={users} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} className="flex justify-center">
          <AgeGroups className="mb-3" filters={filters} data={users} />
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} className="flex justify-center">
          <GenderByCountry className="mb-3" filters={filters} data={users} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12} className="flex justify-center">
          <DependentsByAgeGroup className="mb-3" filters={filters} data={users} />
        </Col>
      </Row>
    </>
  );
}
