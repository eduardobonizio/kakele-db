import React, { useState, useEffect } from 'react';

import { showSetStatusJsx as textOptions } from '../../../data/dataLanguages';
import { checkSetElement } from '../../../data/kakeleActions';

export default function ShowSetStatus(props) {
  const { itensListToShowStatus, locale } = props;
  const [element, setElement] = useState(false);
  const [itensList, setItensList] = useState(false);
  const text = textOptions[locale];

  useEffect(() => {
    const newItensList = [
      ...Object.values(itensListToShowStatus).map(item => item),
    ];
    setItensList(newItensList);

    const elementQuantity = checkSetElement(newItensList, locale);

    setElement(elementQuantity);
  }, [itensListToShowStatus, locale]);

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
