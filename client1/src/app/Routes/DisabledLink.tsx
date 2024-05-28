import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface DisabledLinkProps extends LinkProps {
  disabled?: boolean;
}

const DisabledLink: React.FC<DisabledLinkProps> = ({ disabled, to, ...props }) => {
  if (disabled) {
    return (
      <span
        {...props}
        style={{
          color: 'gray',
          cursor: 'not-allowed',
          textDecoration: 'none',
          ...props.style,
        }}
        onClick={(e) => e.preventDefault()}
      >
        {props.children}
      </span>
    );
  }

  return <Link to={to} {...props} />;
};

export default DisabledLink;