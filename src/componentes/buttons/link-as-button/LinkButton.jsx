import React from 'react';

// eslint-disable-next-line react/display-name
const LinkButton = React.forwardRef(({ onClick, href, text }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      {text}
    </a>
  );
});

export default LinkButton;
