// context/todoContext.tsx
import React, { useEffect, useState } from 'react';
import { NestedList } from '../expandableNavigation';
import { useLocation } from 'react-router-dom';

export type NavigationCotextType = {
  currNavigation: string;
  modifyPath: (link: string) => void;
};

export const NavigationCotext = React.createContext<NavigationCotextType>({
  currNavigation: '',
  modifyPath: (link: string) => {},
});
// NavigationCotext
const NavigationCotextCoponent: React.FC<{
  children: React.ReactNode;
  isdebug: boolean;
}> = ({ children, isdebug }) => {
  const { pathname } = useLocation();
  useEffect(() => setcurrNavigation(pathname), [pathname]);

  const [currNavigation, setcurrNavigation] = useState('');

  function modifyPath(link: string) {
    setcurrNavigation((prev) => {
      console.log('setcurrNavigation', prev, link, pathname);
      if (link === pathname) return pathname;
      if (
        prev === link ||
        machPartialString({ currNavigation: prev, link: link })
      )
        return link
          .split('/')
          .slice(0, link.split('/').length - 1)
          .join('/');
      return link;
    });
  }
  return (
    <NavigationCotext.Provider
      value={{
        currNavigation,
        modifyPath,
      }}
    >
      {isdebug && <div>{currNavigation}</div>}
      {children}
    </NavigationCotext.Provider>
  );
};
export function machPartialString({
  currNavigation,
  link,
}: {
  currNavigation: string;
  link: string;
}) {
  const len = link.length;

  if (currNavigation.slice(0, len) === link.slice(0, len)) return true;
  return false;
}
export default NavigationCotextCoponent;
