import React from 'react';

function ModalDiv({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`p-[12px] shadow-sm ${className}`} style={style}>
      {children}
    </div>
  );
}

export default ModalDiv;
