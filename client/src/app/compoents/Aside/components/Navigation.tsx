import { MouseEventHandler, ReactNode, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DisabledLink from '../../../Routes/DisabledLink';
import { NavigationCotext } from './context/NavigationCotext';
import DefaultSVG from './SVGs/Aside/DefaultSVG';
import ExpendedSVG from './SVGs/Aside/ExpendedSVG';

export type NestedList = {
  name: string;
  icon?: ReactNode;
  list?: NestedList[];
  type: 'normal' | 'last' | 'SectionTitleNav';
};

function MainNav({ navigation }: { navigation: NestedList[] }) {
  const { pathname } = useLocation();
  const { modifyPath, currNavigation, isPathOpened } =
    useContext(NavigationCotext);

  const renderList = ({
    item,
    depth,
    link,
  }: {
    link: string;
    item: NestedList | NestedList[];
    // list: NestedList<string>;
    depth: number;
  }): React.ReactNode => {
    if (Array.isArray(item)) {
      return (
        <>
          {item.map((item, index) =>
            renderList({
              item,
              depth: depth + 1,
              link: '/' + item.name.toLowerCase().replace(' ', '-'),
            })
          )}
        </>
      );
    } else if (item.type === 'last') {
      return (
        <NavLink
          isSelected={isPathOpened({ currNavigation: pathname, link })}
          Name={item.name}
          onClick={() => modifyPath(link)}
          link={link}
          depth={depth}
        ></NavLink>
      );
    } else if (item.type === 'SectionTitleNav')
      return (
        <li>
          <span className=" text-AsideText p-[0px_12px] m-[16px_12px_6px] text-custom-sm opacity-[.4]">
            {item.name}
          </span>
        </li>
      );
    return (
      <DisabledLink disabled={item.list ? true : false} to={link}>
        <ExpandableNav
          isSelected={link === pathname}
          isOpened={isPathOpened({ currNavigation, link })}
          onClick={item.list ? () => modifyPath(link) : () => modifyPath(link)}
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
      </DisabledLink>
    );
  };
  return (
    <ul
      className=" text-black w-full text-[15px] flex flex-col overflow-hidden hover:scroll overflow-y-scroll scrollbar grow"
      style={{ scrollbarWidth: 'thin' }}
    >
      {renderList({ item: navigation, depth: 0, link: '' })}
    </ul>
  );
}

function ExpandableNav({
  icon,
  isOpened,
  children,
  headTitle,
  onClick,
  isSelected,
}: {
  isOpened: boolean;
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children: ReactNode | ReactNode[];
  headTitle: string;
  isSelected: boolean;
}) {
  return (
    <DefaultLayout
      onClick={onClick}
      ulChildren={{ list: children, isvisible: isOpened }}
      isSelected={isSelected}
    >
      {icon}
      <span className='text-AsideText'>{headTitle}</span>
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
        <DefaultSVG
          marginRight={13}
          marginLeft={5 + 10 * props.depth}
          isSelected={props.isSelected}
        />
        <span className='text-AsideText'>{props.Name}</span>
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
          (isSelected ? ' bg-main-purple text-white ' : ' hover:bg-hoverColor ')
        }
        style={{ width: 'cal(100%-24px)' }}
      >
        {children}
      </div>
      {ulChildren && (
        <ul style={ulChildren.isvisible ? {} : { display: 'none' }}>
          {ulChildren.list}
        </ul>
      )}
    </li>
  );
}

export default MainNav;
