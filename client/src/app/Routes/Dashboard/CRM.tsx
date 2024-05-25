import React, { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

interface LayoutProps {}

const CRM: React.FC<LayoutProps> = ({}) => {
  const location = useLocation();
  return (
    <>
      <div>CRdfsdfsdM</div>
      <div>{location.pathname}</div>
      <Outlet />
    </>
  );
};

export default CRM;
