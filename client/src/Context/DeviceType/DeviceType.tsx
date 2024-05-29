import React, { createContext, useContext, useEffect, useState } from "react";

// Define the type for our context
interface DeviceTypeContextProps {
    deviceType: TdeviceType;
    isNavOpened: boolean;
    setisNavOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with an initial value
export const DeviceTypeContext = createContext<DeviceTypeContextProps>({
    deviceType: "desktop",
    isNavOpened: false,
    setisNavOpened: () => {},
});

// Create a custom hook to use the DeviceTypeContext
export const useDeviceType = () => {
    const context = useContext(DeviceTypeContext);
    if (!context) {
        throw new Error("useDeviceType must be used within a DeviceTypeProvider");
    }
    return context;
};
type TdeviceType = "mobile" | "tablet" | "laptop" | "desktop";
// Create a provider component

export const DeviceTypeProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [deviceType, setDeviceType] = useState<TdeviceType>("desktop");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setDeviceType("mobile");
            } else if (window.innerWidth < 960) {
                setDeviceType("tablet");
            } else if (window.innerWidth < 1280) {
                setDeviceType("laptop");
            } else {
                setDeviceType("desktop");
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const [isNavOpened, setisNavOpened] = useState(false);

    return <DeviceTypeContext.Provider value={{ deviceType, isNavOpened,
      setisNavOpened, }}>{children}</DeviceTypeContext.Provider>;
};
