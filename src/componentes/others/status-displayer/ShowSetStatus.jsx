import React, { useState, useEffect } from 'react';

import { showSetStatusJsx as textOptions } from '../../../data/dataLanguages';
import { checkSetElement } from '../../../data/kakeleActions';

export default function ShowSetStatus(props) {
  const { itensListToShowStatus, locale } = props;
  const [element, setElement] = useState(false);
  const [itensList, setItensList] = useState(false);
  const [statusTowShow, setStatusTowShow] = useState({
    armor: 0,
    magic: 0,
    attack: 0,
  });
  const text = textOptions[locale];

  useEffect(() => {
    const newItensList = [
      ...Object.values(itensListToShowStatus).map(item => item),
    ];
    setItensList(newItensList);

    const elementQuantity = checkSetElement(newItensList, locale);

    setElement(elementQuantity);
  }, [itensListToShowStatus, locale]);

  useEffect(() => {
    if (!itensList) return;
    const values = itensList.reduce(
      (anterior, proximo) => {
        if (!proximo) return anterior;
        return {
          armor: anterior.armor + proximo.armor + proximo.itemBonus.armor,
          magic: anterior.magic + proximo.magic + proximo.itemBonus.magic,
          attack: anterior.attack + proximo.attack + proximo.itemBonus.attack,
        };
      },
      { armor: 0, magic: 0, attack: 0 },
    );
    setStatusTowShow(values);
  }, [itensList]);

  return (
    <div className="status-container">
      <h3>{text.attributes}</h3>
      <p>{`${text.armor}: ${statusTowShow.armor}`}</p>
      <p>{`${text.magic}: ${statusTowShow.magic}`}</p>
      <p>{`${text.attack}: ${statusTowShow.attack}`}</p>
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
