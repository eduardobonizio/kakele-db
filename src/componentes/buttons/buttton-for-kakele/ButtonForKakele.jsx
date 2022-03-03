import React from 'react';

import styles from './ButtonForKakele.module.css';

export default function ButtonForKakele(props) {
  const { onClick, text, type, disabled = false } = props;
  return (
    <button
      type={type || 'button'}
      className={styles.button}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
