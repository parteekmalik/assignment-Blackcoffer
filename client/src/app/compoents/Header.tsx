import React from 'react';

function Header({
  headingRef,
}: {
  headingRef?: React.MutableRefObject<HTMLElement | null>;
}) {
  return (
    <header
      ref={headingRef}
      className="sticky top-0 w-full px-10 py-2 "
      style={{ insetBlockStart: '1rem' }}
    >
      <div className="rounded flex  border-2 border-black p-2  ">
        <div className=" flex justify-center items-center gap-3 hover:cursor-pointer text-[15px]  ">
          <div className="rounded-full hover:bg-slate-400 w-[38px] h-[38px] flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className=""
            >
              <path
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
              />
            </svg>
          </div>
          <div className="opacity-[.4] items-center flex gap-2">
            <span>Search</span>
            <span className="border p-[2px_4px] border-black rounded">⌘K</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
