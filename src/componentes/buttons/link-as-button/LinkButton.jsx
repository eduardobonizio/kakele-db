import React from 'react';
import styles from './LinkButton.module.css';

// eslint-disable-next-line react/display-name
const LinkButton = React.forwardRef(({ onClick, href, text }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref} className={styles.link}>
      {text}
    </a>
  );
});

export default LinkButton;
