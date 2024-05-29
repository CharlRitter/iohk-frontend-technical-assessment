import { Table, TableProps } from 'antd';
import React from 'react';

import { dataset } from 'constants/dataset';
import { User } from 'types/common';

function getData() {
  return { users: dataset };
}

export default function Users() {
  const { users } = getData();
  const columns: TableProps<User>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname'
    }
  ];

  return (
    <>
      <h1 className='mb-3'>Users</h1>
      <Table columns={columns} dataSource={users} pagination={false} />
    </>
  );
}
