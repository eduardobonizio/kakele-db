import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/appContext/useAppState';

import { showSetStatusJsx as textOptions } from '../../data/dataLanguages';
import { checkSetElement } from '../../data/kakeleActions';

export default function ShowSetStatus(props) {
  const { itensListToShowStatus } = props;
  const [element, setElement] = useState(false);
  const [itensList, setItensList] = useState(false);
  const {
    state: { language },
  } = useAppContext();
  const text = textOptions[language];

  useEffect(() => {
    const newItensList = [
      ...Object.values(itensListToShowStatus).map(item => item),
    ];
    setItensList(newItensList);

    const elementQuantity = checkSetElement(newItensList, language);

    setElement(elementQuantity);
  }, [itensListToShowStatus, language]);

  return (
    <div className="status-container">
      <h3>{text.attributes}</h3>
      <p>
        {text.armor}:{' '}
        {itensList &&
          itensList.reduce(
            (anterior, proximo) => anterior + (proximo.armor || 0),
            0,
          )}
      </p>
      <p>
        {text.magic}:{' '}
        {itensList &&
          itensList.reduce(
            (anterior, proximo) => anterior + (proximo.magic || 0),
            0,
          )}
      </p>
      <p>
        {text.attack}:{' '}
        {itensList &&
          itensList.reduce(
            (anterior, proximo) => anterior + (proximo.attack || 0),
            0,
          )}
      </p>
      {itensList && (
        <>
          <p>
            {text.element}:{' '}
            <span className={element.element}>{element.element}</span>
          </p>
          <p>{element.text}</p>
        </>
      )}
    </div>
  );
}
