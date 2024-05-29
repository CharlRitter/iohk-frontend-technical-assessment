import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Metadata } from 'next';
import React from 'react';

import FooterBar from 'components/footer';
import HeaderBar from 'components/header';

import 'app/global.styles.scss';

export const metadata: Metadata = {
  title: 'IOHK Frontend Technical Assessment',
  description: 'Frontend Technical Assessment for Senior role',
  authors: [{ name: 'Charl Ritter' }],
  icons: 'https://realfi.co/favicon.ico',
  keywords: ['realfi', 'iohk', 'frontend technical assessment'],
  openGraph: {
    type: 'website',
    // url: 'https://example.com', //Left out due to it being an assessment
    title: 'IOHK Frontend Technical Assessment',
    description: 'Frontend Technical Assessment for Senior role',
    siteName: 'IOHK Frontend Technical Assessment'
    // images: [{ url: '' }] //Left out due to it being an assessment
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Layout>
          <HeaderBar />
          <Layout>
            <Row justify="center">
              <Col xs={24} sm={24} md={22} lg={20} xl={18}>
                <Content className="my-5 p-5 rounded-lg">{children}</Content>
              </Col>
            </Row>
          </Layout>
          <FooterBar />
        </Layout>
      </body>
    </html>
  );
}
