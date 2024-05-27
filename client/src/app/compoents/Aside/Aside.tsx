import React, { useContext } from 'react';
import { useDeviceType } from '../../../Context/DeviceType/DeviceType';
import {
  NavigationCotext,
} from './components/context/NavigationCotext';
import MainNav from './components/Navigation';
import CloseSVG from './components/SVGs/CloseSVG';
import LogoSVG from './components/SVGs/LogoSVG';

function Aside({
  size = 260,
}: {
  size?: number | string;
  setAsideWidth?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { deviceType } = useDeviceType();
  const { isNavOpened, setisNavOpened, NavData } = useContext(NavigationCotext);

  return (
    <aside
      className={
        'fixed flex   z-10  h-screen  ' +
        // +' desktop:translate-x-[0px] laptop:translate-x-[-260px] tablet:translate-x-[-260px] mobile:translate-x-[-260px] '
        (deviceType === 'desktop'
          ? '  '
          : isNavOpened
          ? ' w-screen '
          : ' translate-x-[-260px] ')
        // +' desktop:w-auto laptop:w-screen tablet:w-screen mobile:w-screen'
      }
    >
      <div
        className={
          'w-[260px] z-30 flex flex-col border-r h-full border-black bg-white '
        }
      >
        <div className="flex gap-2 p-[20px_2px_20px_8px] items-end mx-[12px]">
          <LogoSVG />
          <span className="text-xl  font-semibold">Vuexy</span>
          <div
            onClick={() => setisNavOpened!(false)}
            className="desktop:hidden ml-auto"
          >
            <CloseSVG />
          </div>
        </div>
        <MainNav navigation={NavData} />
      </div>
      <div
        onClick={() => setisNavOpened!(false)}
        className={
          '    h-full grow bg-black opacity-[.4] ' +
          (deviceType === 'desktop'
            ? ' hidden '
            : isNavOpened
            ? ''
            : ' hidden ')
        }
      ></div>
    </aside>
  );
}
export default Aside;
