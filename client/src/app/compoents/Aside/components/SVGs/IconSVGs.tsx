import React from 'react';
import AcademySVG from './Aside/AcademySVG';
import CalederSVG from './Aside/CalederSVG';
import ChatSVG from './Aside/ChatSVG';
import DashboardIcon from './Aside/DashboardIcon';
import EcommereceSVG from './Aside/EcommereceSVG';
import EmailSVG from './Aside/EmailSVG';
import ExpendedSVG from './Aside/ExpendedSVG';
import FontPagesSVG from './Aside/FontPagesSVG';
import InvoiceSVG from './Aside/InvoiceSVG';
import LogisticsSVG from './Aside/LogisticsSVG';
import UserSVG from './Aside/UserSVG';
import DefaultSVG from './Aside/DefaultSVG';

export type IconType =
  | 'AcademySVG'
  | 'CalederSVG'
  | 'ChatSVG'
  | 'DashboardIcon'
  | 'EcommereceSVG'
  | 'EmailSVG'
  | 'ExpendedSVG'
  | 'FontPagesSVG'
  | 'InvoiceSVG'
  | 'LogisticsSVG'
  | 'UserSVG'
  | undefined
  | null
  | '';

function IconSVGs({ icon }: { icon: IconType }) {
  switch (icon) {
    case 'AcademySVG':
      return <AcademySVG />;
    case 'CalederSVG':
      return <CalederSVG />;
    case 'ChatSVG':
      return <ChatSVG />;
    case 'DashboardIcon':
      return <DashboardIcon />;
    case 'EcommereceSVG':
      return <EcommereceSVG />;
    case 'EmailSVG':
      return <EmailSVG />;
    case 'ExpendedSVG':
      return <ExpendedSVG />;
    case 'FontPagesSVG':
      return <FontPagesSVG />;
    case 'InvoiceSVG':
      return <InvoiceSVG />;
    case 'LogisticsSVG':
      return <LogisticsSVG />;
    case 'UserSVG':
      return <UserSVG />;
    default:
      return <DefaultSVG />;
  }
}

export default IconSVGs;
