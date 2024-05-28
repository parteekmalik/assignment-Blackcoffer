// context/todoContext.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NestedList } from "../Navigation";

export type NavigationCotextType = {
    currNavigation: string;
    modifyPath: (link: string) => void;
    isPathOpened({ currNavigation, link }: { currNavigation: string; link: string }): boolean;
    NavData: NestedList[];
};

export const NavigationCotext = React.createContext<NavigationCotextType>({
    currNavigation: "",
    modifyPath: (link: string) => {
        link;
    },
    isPathOpened: ({ currNavigation, link }: { currNavigation: string; link: string }) => {
        currNavigation;
        link;
        return true;
    },

    NavData: [],
});
// NavigationCotext
const NavigationCotextCoponent: React.FC<{
    children: React.ReactNode;
    isdebug: boolean;
}> = ({ children, isdebug }) => {
    const { pathname } = useLocation();
    useEffect(() => {
        setcurrNavigation(pathname);
        setpathnameNavigation(pathname);
    }, [pathname]);
    const [NavData, setNavData] = useState<NestedList[]>([]);
    useEffect(() => {
        const NavSet = async () => {
            fetch("http://localhost:3000/api/getNavData")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data: NestedList[]) => {
                    setNavData(data);
                });
        };
        NavSet();
    }, []);
    useEffect(() => console.log("isNavOpened", NavData), [NavData]);
    const [currNavigation, setcurrNavigation] = useState("");
    const [pathnameNavigation, setpathnameNavigation] = useState("");
    function modifyPath(link: string) {
        // console.log(isPathOpened({ currNavigation: pathname, link: link }));
        const newLink = link
            .split("/")
            .slice(0, link.split("/").length - 1)
            .join("/");
        if (isPathOpened({ currNavigation: pathname, link: link })) {
            setpathnameNavigation(newLink);
        }
        setcurrNavigation((prev) => {
            // console.log('setcurrNavigation', prev, link, pathname);
            if (link === pathname) {
                return pathname;
            }
            if (prev === link) {
                return newLink;
            }
            if (isPathOpened({ currNavigation: prev, link: link })) {
                return newLink;
            }
            return link;
        });
    }
    function isPathOpened({ currNavigation: currLink, link }: { currNavigation: string; link: string }) {
        const len = link.length;
        if (link === pathnameNavigation.slice(0, len)) return true;
        if (currLink.slice(0, len) === link.slice(0, len)) return true;
        return false;
    }
    return (
        <NavigationCotext.Provider
            value={{
                currNavigation,
                modifyPath,
                isPathOpened,

                NavData,
            }}
        >
            {isdebug && <div>{currNavigation}</div>}
            {children}
        </NavigationCotext.Provider>
    );
};
export default NavigationCotextCoponent;
