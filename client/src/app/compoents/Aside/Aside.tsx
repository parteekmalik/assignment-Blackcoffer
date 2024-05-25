import React, { useLayoutEffect, useRef } from 'react';
import MainNav from './components/Navigation';
import DashboardIcon from './components/SVGs/Aside/DashboardIcon';
import LogoSVG from './components/SVGs/LogoSVG';
import FontPagesSVG from './components/SVGs/Aside/FontPagesSVG';
import NavigationCotextCoponent from './components/context/NavigationCotext';
import AcademySVG from './components/SVGs/Aside/AcademySVG';
import LogisticsSVG from './components/SVGs/Aside/LogisticsSVG';
import EmailSVG from './components/SVGs/Aside/EmailSVG';
import ChatSVG from './components/SVGs/Aside/ChatSVG';
import CalederSVG from './components/SVGs/Aside/CalederSVG';
import InvoiceSVG from './components/SVGs/Aside/InvoiceSVG';
import UserSVG from './components/SVGs/Aside/UserSVG';
import EcommereceSVG from './components/SVGs/Aside/EcommereceSVG';

function Aside({
  setAsideWidth,
}: {
  setAsideWidth: React.Dispatch<React.SetStateAction<number>>;
}) {
  const AsideRef = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    setAsideWidth(AsideRef.current?.getBoundingClientRect().width ?? 0);
    setInterval(
      () => setAsideWidth(AsideRef.current?.getBoundingClientRect().width ?? 0),
      1000
    );
    console.log(AsideRef.current?.getBoundingClientRect());
  }, []);
  return (
    <aside
      ref={AsideRef}
      className="fixed w-[260px] border-black  h-screen flex flex-col border-r"
    >
      <div className="flex gap-2 p-[20px_2px_20px_8px] items-end mx-[12px]">
        <LogoSVG />
        <span className="text-xl  font-semibold">Vuexy</span>
      </div>
      <NavigationCotextCoponent isdebug={false}>
        <MainNav
          navigation={[
            {
              icon: <DashboardIcon />,
              name: 'Dashboard',
              type: 'normal',
              list: [
                { name: 'Analytics', type: 'last' },
                { name: 'CRM', type: 'last' },
                { name: 'Ecommerce', type: 'last' },
                { name: 'Academy', type: 'last' },
                { name: 'Logistics', type: 'last' },
              ],
            },
            {
              icon: <FontPagesSVG />,
              name: 'Font Pages',
              type: 'normal',
              list: [
                { name: 'Landing', type: 'last' },
                { name: 'Pricing', type: 'last' },
                { name: 'Payment', type: 'last' },
                { name: 'Checkout', type: 'last' },
                { name: 'Help Center', type: 'last' },
              ],
            },
            { name: 'APPS & PAGES', type: 'SectionTitleNav' },
            {
              icon: <EcommereceSVG />,
              name: 'Ecommerce',
              type: 'normal',
              list: [
                { name: 'Dashboard', type: 'last' },
                {
                  name: 'Product',
                  type: 'normal',
                  list: [
                    { name: 'List', type: 'last' },
                    { name: 'Add', type: 'last' },
                    { name: 'Category', type: 'last' },
                  ],
                },
                {
                  name: 'Order',
                  type: 'normal',
                  list: [
                    { name: 'List', type: 'last' },
                    { name: 'Details', type: 'last' },
                  ],
                },
                {
                  name: 'Customer',
                  type: 'normal',
                  list: [
                    { name: 'List', type: 'last' },
                    { name: 'Details', type: 'last' },
                  ],
                },
                { name: 'Manage Review', type: 'last' },
                { name: 'Referrals', type: 'last' },
                { name: 'Settings', type: 'last' },
              ],
            },
            {
              icon: <AcademySVG />,
              name: 'Academy',
              type: 'normal',
              list: [
                { name: 'Dashboard', type: 'last' },
                { name: 'My Cource', type: 'last' },
                { name: 'Course Details', type: 'last' },
              ],
            },
            {
              icon: <LogisticsSVG />,
              name: 'Logistics',
              type: 'normal',
              list: [
                { name: 'Dashboard', type: 'last' },
                { name: 'Fleet', type: 'last' },
              ],
            },
            { icon: <EmailSVG />, name: 'Email', type: 'normal' }, //TODO :create new type
            { icon: <ChatSVG />, name: 'Chat', type: 'normal' }, //TODO :create new type
            { icon: <CalederSVG />, name: 'Calener', type: 'normal' }, //TODO :create new type
            {
              icon: <InvoiceSVG />,
              name: 'Invoice',
              type: 'normal',
              list: [
                { name: 'List', type: 'last' },
                { name: 'Previer', type: 'last' },
                { name: 'Edit', type: 'last' },
                { name: 'Add', type: 'last' },
              ],
            },
            {
              icon: <UserSVG />,
              name: 'User',
              type: 'normal',
              list: [
                { name: 'List', type: 'last' },
                { name: 'View', type: 'last' },
              ],
            },
            {
              name: 'Roles & Permissions',
              type: 'normal',
              list: [
                { name: 'View', type: 'last' },
                { name: 'View', type: 'last' },
              ],
            },
            {
              name: 'Pages',
              type: 'normal',
              list: [
                { name: 'View', type: 'last' },
                { name: 'View', type: 'last' },
                { name: 'View', type: 'last' },
                { name: 'View', type: 'last' },
                {
                  name: 'Miscellaneous',
                  type: 'normal',
                  list: [
                    { name: 'View', type: 'last' },
                    { name: 'View', type: 'last' },
                    { name: 'View', type: 'last' },
                    { name: 'View', type: 'last' },
                  ],
                },
              ],
            },
            { name: 'Authentication', type: 'normal' },
            { name: 'Wizard Examples', type: 'normal' },
          ]}
        />
      </NavigationCotextCoponent>
    </aside>
  );
}

export default Aside;
