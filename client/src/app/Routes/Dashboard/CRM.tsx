import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface LayoutProps {}

const CRM: React.FC<LayoutProps> = ({}) => {
  return (
    <>
      <div>CRdfsdfsdM</div>
      <Outlet />
    </>
  );
};

export default CRM;
