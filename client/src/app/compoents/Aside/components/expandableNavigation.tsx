import React, { MouseEventHandler, ReactNode, useState } from 'react';
import DefaultSVG from './SVGs/DefaultSVG';
import ExpendedSVG from './SVGs/ExpendedSVG';
import { Link } from 'react-router-dom';

type NestedList = {
  name: string;
  icon?: ReactNode;
  list?: NestedList[];
  type: 'normal' | 'last' | 'SectionTitleNav';
};

function MainNav({ navigation }: { navigation: NestedList[] }) {
  const renderList = ({
    item,
    depth,
    link,
  }: {
    link: string;
    item: NestedList;
    // list: NestedList<string>;
    depth: number;
  }) => {
    if (item.type === 'last') {
      return <NavLink Name={item.name} link={link} depth={depth}></NavLink>;
    } else if (item.type === 'SectionTitleNav')
      return (
        <li>
          <span className=" p-[0px_12px] m-[16px_12px_6px] text-custom-sm opacity-[.4]">
            {item.name}
          </span>
        </li>
      );
    else if (item.type === 'normal')
      return (
        <>
          <ExpandableNav
            headTitle={item.name}
            icon={depth >= 0 && !item.icon ? <DefaultSVG /> : item.icon}
          >
            {item.list &&
              item.list.map((Item, index) => {
                return renderList({
                  item: Item,
                  depth: depth + 1,
                  link: link + '/' + Item.name.toLowerCase(),
                });
              })}
          </ExpandableNav>
        </>
      );
  };
  return (
    <ul
      className=" text-AsideText w-full text-[15px] flex flex-col overflow-hidden hover:scroll overflow-y-scroll scrollbar grow"
      style={{ scrollbarWidth: 'thin' }}
    >
      {navigation.map((item) =>
        renderList({ item, depth: -1, link: item.name.toLowerCase() })
      )}
    </ul>
  );
}

function ExpandableNav({
  icon,
  children,
  headTitle,
}: {
  icon: ReactNode;
  children: ReactNode | ReactNode[];
  headTitle: string;
}) {
  const [isExpanded, setisExpanded] = useState(false);

  return (
    <DefaultLayout
      onClick={() => setisExpanded((prev) => !prev)}
      ulChildren={{ list: children, isvisible: isExpanded }}
    >
      {icon}
      <span>{headTitle}</span>
      {children && (
        <i className={' ml-auto ' + (isExpanded ? 'rotate-90' : '')}>
          <ExpendedSVG />
        </i>
      )}
    </DefaultLayout>
  );
}

function NavLink(props: {
  Name: string;
  onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  depth: number;
  link: string;
}) {
  return (
    <Link to={props.link}>
      <DefaultLayout onClick={() => console.log('clicked!!!')}>
        <DefaultSVG marginRight={13} marginLeft={5 + 10 * props.depth} />
        <span>{props.Name}</span>
        <span>{props.depth}</span>
      </DefaultLayout>
    </Link>
  );
}

function DefaultLayout({
  children,
  ulChildren,
  onClick,
}: {
  children: ReactNode;
  ulChildren?: { list: ReactNode; isvisible: boolean };
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <li>
      <div
        onClick={onClick}
        className="cursor-pointer rounded-lg hover:bg-hoverColor flex 
        items-center p-[0px_12px] m-[0px_12px_6px] h-[44px] "
        style={{ width: 'cal(100%-24px)' }}
      >
        {children}
      </div>
      {ulChildren && (
        <ul
          className="display"
          style={ulChildren.isvisible ? {} : { display: 'none' }}
        >
          {ulChildren.list}
        </ul>
      )}
    </li>
  );
}

export default MainNav;
