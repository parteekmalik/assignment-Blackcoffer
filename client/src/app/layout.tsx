import React, { ReactNode, useState } from 'react';
import Aside from './compoents/Aside/Aside';
import Header from './compoents/Header';
import Footer from './compoents/Footer';
import { Outlet } from 'react-router-dom';

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const [AsideWidth, setAsideWidth] = useState(0);

  return (
    <div className="flex">
      <Aside setAsideWidth={setAsideWidth} />
      <div
        className="flex grow p-2 flex-col"
        style={{ paddingLeft: AsideWidth + 'px' }}
      >
        <Header />
        <main className="">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
