import React, { ReactNode, useState } from 'react';
import Aside from './compoents/Aside/Aside';
import Header from './compoents/Header';
import Footer from './compoents/Footer';
import { Outlet } from 'react-router-dom';

interface LayoutProps {}
const AsideWidth = 260;
const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className="flex min-h-screen">
      <Aside size={AsideWidth} />
      <div
        className={
          'flex grow p-2 flex-col ' +
          'desktop:pl-[260px] ' +
          ' laptop:pl-0 tablet:pl-0 mobile:pl-0 '
        }
      >
        <Header />
        <main
          className="flex grow justify-center items-start mt-[16px] "
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
