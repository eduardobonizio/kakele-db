import React from 'react';

import styles from './ButtonForKakele.module.css';

export default function ButtonForKakele(props) {
  const { onClick, text } = props;
  return (
    <button type="button" className={styles.button} onClick={() => onClick()}>
      {text}
    </button>
  );
}
