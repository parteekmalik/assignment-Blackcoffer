import React, { useContext, useLayoutEffect, useState } from 'react';
import SearchSVG from './Aside/components/SVGs/SearchSVG';
import PopupDialog from './SearchModal/PopupDialog';
import SearchModal from './SearchModal/SearchModal';
import CloseSVG from './Aside/components/SVGs/CloseSVG';
import {
  DeviceTypeContext,
  useDeviceType,
} from '../../Context/DeviceType/DeviceType';

function Header({
  headingRef,
}: {
  headingRef?: React.MutableRefObject<HTMLElement | null>;
}) {
  const [issearchPopup, setissearchPopup] = useState(false);
  const { setisNavOpened } = useContext(DeviceTypeContext);

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      setissearchPopup(true);
    }
  };
  const { deviceType } = useDeviceType();

  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <header
      ref={headingRef}
      className="sticky max-w-[1440px]  mx-auto top-0 w-full  "
      style={{ insetBlockStart: '1rem' }}
    >
      <div className="rounded-lg flex bg-white border px-10 py-2 shadow-md  p-2  ">
        <div
          onClick={() => (setisNavOpened ? setisNavOpened(true) : {})}
          className={
            'flex  justify-center items-center gap-3 h-auto hover:cursor-pointer text-[15px] ' +
            (deviceType === 'desktop' ? ' hidden ' : '')
          }
        >
          <CloseSVG />
        </div>
        <div
          className=" flex justify-center items-center gap-3 hover:cursor-pointer text-[15px]  "
          onClick={() => setissearchPopup(true)}
        >
          <div className="rounded-full hover:bg-lightBlack hover:bg-opacity-10 w-[38px] h-[38px] flex justify-center items-center">
            <SearchSVG />
          </div>
          <div className="opacity-[.4] items-center flex gap-2">
            <span>Search</span>
            <span className="border p-[2px_4px] border-black rounded">⌘K</span>
          </div>
        </div>
      </div>
      {issearchPopup && (
        <PopupDialog closeFn={() => setissearchPopup(false)}>
          <SearchModal />
        </PopupDialog>
      )}
    </header>
  );
}

export default Header;
