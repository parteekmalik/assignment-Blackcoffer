import React, { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ModalDiv from '../../compoents/Modal/ModalDiv';

interface LayoutProps {}

const CRM: React.FC<LayoutProps> = ({}) => {
  const location = useLocation();
  return (
    <div className="flex flex-wrap ">
      <ModalDiv className=" basis-1/2">
        <div>CRdfsdfsdM</div>
        <div>{location.pathname}</div>
      </ModalDiv>
      <ModalDiv className=" basis-1/4">
        <div>CRdfsdfsdM</div>
        <div>{location.pathname}</div>
      </ModalDiv>
      <ModalDiv className=" basis-1/4">
        <div>CRdfsdfsdM</div>
        <div>{location.pathname}</div>
      </ModalDiv>
      <ModalDiv className=" basis-1/4">
        <div>CRdfsdfsdM</div>
        <div>{location.pathname}</div>
      </ModalDiv>
      <ModalDiv className=" basis-1/4">
        <div>CRdfsdfsdM</div>
        <div>{location.pathname}</div>
      </ModalDiv>
    </div>
  );
};

export default CRM;
