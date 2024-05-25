import React from 'react';

function DefaultSVG({
  size = 12,
  marginRight = 13,
  marginLeft = 5,
  isSelected,
}: {
  size?: number;
  isSelected?: boolean;
  marginRight?: number;
  marginLeft?: number;
}) {
  return (
    <svg
      className={' ' + (isSelected === true ? 'text-white ' : 'text-black')}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      style={{
        marginRight,
        marginLeft,
      }}
      height={size}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0"
      />
    </svg>
  );
}

export default DefaultSVG;
