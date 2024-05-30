import React from "react";

function ModalDiv({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    return (
        <div className={`p-[12px]  ${className}`} style={style}>
            <div className="p-6  flex flex-col text-lightBlack h-full shadow-lg  bg-white border rounded">{children}</div>
        </div>
    );
}

export default ModalDiv;
