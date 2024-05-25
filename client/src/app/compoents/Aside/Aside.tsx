import React, { useLayoutEffect, useRef } from 'react';
import MainNav from './components/expandableNavigation';
import DashboardIcon from './components/SVGs/DashboardIcon';
import LogoSVG from './components/SVGs/LogoSVG';
import FontPagesSVG from './components/SVGs/FontPagesSVG';
import NavigationCotextCoponent from './components/context/NavigationCotext';

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
        <span className="text-xl font-semibold">Vuexy</span>
      </div>
      {/* <MainNav>
        <ExpandableNav icon={<DashboardIcon />} headElement="Dashboard">
          <NavLink Name="Analytics"></NavLink>
          <NavLink Name="CRM"></NavLink>
          <NavLink Name="Ecommerce"></NavLink>
          <NavLink Name="Academy"></NavLink>
          <NavLink Name="Logistics"></NavLink>
        </ExpandableNav>
        <ExpandableNav icon={<FontPagesSVG />} headElement="Font Pages">
          <NavLink Name="Landing"></NavLink>

          <NavLink Name="Pricing"></NavLink>
          <NavLink Name="Payment"></NavLink>
          <NavLink Name="Checkout"></NavLink>
          <NavLink Name="Help Center"></NavLink>
        </ExpandableNav>
        <SectionTitleNav Name="APPS & PAGES" />
        <ExpandableNav icon={<FontPagesSVG />} headElement="Ecommerce">
          <NavLink Name="Dashboard" />
          <ExpandableNav icon={<DefaultSVG />} headElement="Product">
            <NavLink Name="List" />
            <NavLink Name="Add" />
            <NavLink Name="Category" />
          </ExpandableNav>
          <ExpandableNav icon={<DefaultSVG />} headElement="Order">
            <NavLink Name="List" />
            <NavLink Name="Details" />
          </ExpandableNav>
          <ExpandableNav icon={<DefaultSVG />} headElement="Customer">
            <NavLink Name="List" />
            <NavLink Name="Details" />
          </ExpandableNav>

          <NavLink Name="Manage Review" />
          <NavLink Name="Referrals" />
          <NavLink Name="Settings" />
        </ExpandableNav>
        <ExpandableNav icon={<></>} headElement="Academy">
          <NavLink Name="Dashboard" />
          <NavLink Name="My Cource" />
          <NavLink Name="Course Details" />
        </ExpandableNav>
        <ExpandableNav icon={<></>} headElement="Logistics">
          <NavLink Name="Dashboard" />
          <NavLink Name="Fleet" />
        </ExpandableNav>
        <ExpandableNav icon={<></>} headElement="Email"></ExpandableNav>
        <ExpandableNav icon={<></>} headElement="Chat"></ExpandableNav>
        <ExpandableNav icon={<></>} headElement="Calener"></ExpandableNav>
        <ExpandableNav icon={<></>} headElement="Invoice">
          <NavLink Name="List" />
          <NavLink Name="Previer" />
          <NavLink Name="Edit" />
          <NavLink Name="Add" />
        </ExpandableNav>
        <ExpandableNav icon={<></>} headElement="User">
          <NavLink Name="List" />
          <NavLink Name="View" />
        </ExpandableNav>
        <ExpandableNav icon={<></>} headElement="Roles & Permissions">
          <NavLink Name="View" />
          <NavLink Name="View" />
        </ExpandableNav>
        <ExpandableNav icon={<></>} headElement="Pages">
          <NavLink Name="View" />
          <NavLink Name="View" />
          <NavLink Name="View" />
          <NavLink Name="View" />
          <ExpandableNav icon={<></>} headElement="Miscellaneous">
            <NavLink Name="View" />
            <NavLink Name="View" />
            <NavLink Name="View" />
            <NavLink Name="View" />
          </ExpandableNav>
        </ExpandableNav>
        <ExpandableNav
          icon={<></>}
          headElement="Authentication"
        ></ExpandableNav>
        <ExpandableNav
          icon={<></>}
          headElement="Wizard Examples"
        ></ExpandableNav>
      </MainNav> */}
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
              icon: <FontPagesSVG />,
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
              name: 'Academy',
              type: 'normal',
              list: [
                { name: 'Dashboard', type: 'last' },
                { name: 'My Cource', type: 'last' },
                { name: 'Course Details', type: 'last' },
              ],
            },
            {
              name: 'Logistics',
              type: 'normal',
              list: [
                { name: 'Dashboard', type: 'last' },
                { name: 'Fleet', type: 'last' },
              ],
            },
            { name: 'Email', type: 'normal' }, //TODO :create new type
            { name: 'Chat', type: 'normal' }, //TODO :create new type
            { name: 'Calener', type: 'normal' }, //TODO :create new type
            {
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
