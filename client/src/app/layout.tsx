import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Aside from './compoents/Aside/Aside';
import Footer from './compoents/Footer';
import Header from './compoents/Header';
import { useDeviceType } from '../Context/DeviceType/DeviceType';
import NavigationCotextCoponent from './compoents/Aside/components/context/NavigationCotext';

interface LayoutProps {}
const AsideWidth = 260;
const Layout: React.FC<LayoutProps> = () => {
  const { deviceType } = useDeviceType();

  return (
    <div className="flex min-h-screen">
      <NavigationCotextCoponent isdebug={false}>
        <Aside size={AsideWidth} />
      </NavigationCotextCoponent>
      <div
        className={
          'flex grow z-0 p-2 flex-col ' +
          (deviceType === 'desktop' ? ' pl-[268px] ' : ' ')
        }
      >
        <Header />
        <main
          className="flex grow justify-center w-full mx-auto items-start mt-[16px] "
          style={{ maxInlineSize: '1440px', marginInline: 'auto' }}
        >
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
