import React from 'react';
import style from './Alert.module.css';

export default function Alert(props) {
  const { message, timeOut, hideFunc } = props;
  setTimeout(hideFunc, timeOut);
  return (
    <div className={`alert alert-warning ${style.alert}`} role="alert">
      {message}
    </div>
  );
}
