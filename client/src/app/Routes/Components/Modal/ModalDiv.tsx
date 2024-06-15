import React from "react";

function ModalDiv({ children }: { children: React.ReactNode }) {
    return <div className="p-6  flex flex-col text-lightBlack h-full  bg-white  shadow-lg  border rounded">{children}</div>;
}

export default ModalDiv;
