import { MouseEventHandler, ReactNode, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  machPartialString,
  NavigationCotext,
} from './context/NavigationCotext';
import DefaultSVG from './SVGs/DefaultSVG';
import ExpendedSVG from './SVGs/ExpendedSVG';

export type NestedList = {
  name: string;
  icon?: ReactNode;
  list?: NestedList[];
  type: 'normal' | 'last' | 'SectionTitleNav';
};

function MainNav({ navigation }: { navigation: NestedList[] }) {
  const { pathname } = useLocation();
  const { modifyPath, currNavigation } = useContext(NavigationCotext);

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
      return (
        <NavLink
          isSelected={machPartialString({ currNavigation: pathname, link })}
          Name={item.name}
          onClick={() => modifyPath(link)}
          link={link}
          depth={depth}
        ></NavLink>
      );
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
            isOpened={machPartialString({ currNavigation, link })}
            onClick={() => modifyPath(link)}
            headTitle={item.name}
            icon={depth >= 0 && !item.icon ? <DefaultSVG /> : item.icon}
          >
            {item.list &&
              item.list.map((Item, index) => {
                return renderList({
                  item: Item,
                  depth: depth + 1,
                  link: link + '/' + Item.name.toLowerCase().replace(' ', '-'),
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
        renderList({
          item,
          depth: -1,
          link: '/' + item.name.toLowerCase().replace(' ', '-'),
        })
      )}
    </ul>
  );
}

function ExpandableNav({
  icon,
  isOpened,
  children,
  headTitle,
  onClick,
}: {
  isOpened: boolean;
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children: ReactNode | ReactNode[];
  headTitle: string;
}) {
  return (
    <DefaultLayout
      onClick={onClick}
      ulChildren={{ list: children, isvisible: isOpened }}
    >
      {icon}
      <span>{headTitle}</span>
      {children && (
        <i className={' ml-auto ' + (isOpened ? 'rotate-90' : '')}>
          <ExpendedSVG />
        </i>
      )}
    </DefaultLayout>
  );
}

function NavLink(props: {
  Name: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  depth: number;
  link: string;
  isSelected: boolean;
}) {
  const { pathname } = useLocation();

  return (
    <Link to={props.link}>
      <DefaultLayout isSelected={props.isSelected} onClick={props.onClick}>
        <DefaultSVG marginRight={13} marginLeft={5 + 10 * props.depth} />
        <span>{props.Name}</span>
      </DefaultLayout>
    </Link>
  );
}

function DefaultLayout({
  children,
  ulChildren,
  isSelected,
  onClick,
}: {
  isSelected?: boolean;
  children: ReactNode;
  ulChildren?: { list: ReactNode; isvisible: boolean };
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <li>
      <div
        onClick={onClick}
        className={
          'cursor-pointer rounded-lg  flex items-center p-[0px_12px] m-[0px_12px_6px] h-[44px] ' +
          (isSelected ? ' bg-slate-400 ' : ' hover:bg-hoverColor ')
        }
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
