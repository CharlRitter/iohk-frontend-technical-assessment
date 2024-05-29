'use client';

import { Menu, MenuProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaChartPie, FaUser } from 'react-icons/fa6';

import './styles.scss';

type MenuItem = Required<MenuProps>['items'][number];

export default function HeaderBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<string>('/');
  const items: MenuItem[] = [
    {
      label: 'Users',
      key: '/',
      icon: <FaUser />,
      onClick: () => router.push('/')
    },
    {
      label: 'User Overview',
      key: '/user-overview',
      icon: <FaChartPie />,
      onClick: () => router.push('/user-overview')
    }
  ];

  useEffect(() => {
    if (pathname) {
      setCurrentPage(pathname);
    }
  }, [pathname]);

  return (
    <Header>
      <Menu
        onClick={(event) => setCurrentPage(event.key)}
        selectedKeys={[currentPage]}
        mode="horizontal"
        items={items}
      />
    </Header>
  );
}
