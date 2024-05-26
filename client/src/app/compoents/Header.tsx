import React, { useEffect, useLayoutEffect, useState } from 'react';
import SearchSVG from './Aside/components/SVGs/SearchSVG';
import PopupDialog from './SearchModal/PopupDialog';
import SearchModal from './SearchModal/SearchModal';

function Header({
  headingRef,
}: {
  headingRef?: React.MutableRefObject<HTMLElement | null>;
}) {
  const [issearchPopup, setissearchPopup] = useState(false);
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      setissearchPopup(true);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <header
      ref={headingRef}
      className="sticky top-0 w-full px-10 py-2 "
      style={{ insetBlockStart: '1rem' }}
    >
      <div className="rounded-lg flex border    p-2  ">
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
