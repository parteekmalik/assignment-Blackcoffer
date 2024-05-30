import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDeviceType } from "../../Context/DeviceType/DeviceType";
import Aside from "./compoents/Aside/Aside";
import NavigationContextComponent from "./compoents/Aside/components/context/NavigationCotext";
import Header from "./compoents/Header";
import Footer from "./compoents/Footer";

interface LayoutProps {}

const AsideWidth = 260;

const Layout: React.FC<LayoutProps> = () => {
    const { deviceType } = useDeviceType();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/dashboard/crm", { replace: true });
        }
    }, [location, navigate]);

    return (
        <div className="flex min-h-screen">
            <NavigationContextComponent isDebug={false}>
                <Aside size={AsideWidth} />
            </NavigationContextComponent>
            <div className={"flex grow z-0 p-2 flex-col " + (deviceType === "desktop" ? " pl-[268px] " : " ")}>
                <Header />
                <main className="flex grow justify-center w-full mx-auto items-start mt-[16px]" style={{ maxInlineSize: "1440px", marginInline: "auto" }}>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
