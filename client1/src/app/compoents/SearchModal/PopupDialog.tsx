import React from 'react';

function PopupDialog({
  children,
  closeFn,
}: {
  closeFn: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div
        onClick={closeFn}
        className="absolute w-full h-full overflow-y-scroll bg-black opacity-[.6]"
      ></div>
      <div
        onClick={(e) => console.log('clicked dialog')}
        className=" z-10 px-16 py-5 text-black bg-white relative"
      >
        {children}
      </div>
    </div>
  );
}

export default PopupDialog;
