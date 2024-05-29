'use client';

import { Button, Tooltip } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React from 'react';
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';

export default function FooterBar() {
  return (
    <Footer className="justify-center items-center flex gap-2 p-3">
      <span>Charl Ritter</span>
      <Tooltip title="GitHub">
        <Button
          shape="circle"
          icon={<FaGithubSquare />}
          onClick={() => window.open('https://github.com/CharlRitter', '_blank')}
        />
      </Tooltip>
      <Tooltip title="LinkedIn">
        <Button
          shape="circle"
          icon={<FaLinkedin />}
          onClick={() => window.open('https://www.linkedin.com/in/charl-ritter-0a1a45130/', '_blank')}
        />
      </Tooltip>
    </Footer>
  );
}
