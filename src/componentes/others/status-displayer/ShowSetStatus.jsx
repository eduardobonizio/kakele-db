import React, { useState, useEffect } from 'react';

import { showSetStatusJsx as textOptions } from '../../../data/dataLanguages';
import { checkSetElement } from '../../../data/kakeleActions';
import Input from '../../inputs/Input';
import styles from './ShowSetStatus.module.css';

export default function ShowSetStatus(props) {
  const {
    itensListToShowStatus,
    locale,
    level = false,
    savedCharLevel,
    setSavedCharLevel,
  } = props;
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

    const sumStatusValues = () => {
      try {
        return itensList.reduce(
          (anterior, proximo) => {
            if (!proximo) return anterior;
            return {
              armor: anterior.armor + proximo.armor + proximo.itemBonus.armor,
              magic: anterior.magic + proximo.magic + proximo.itemBonus.magic,
              attack:
                anterior.attack + proximo.attack + proximo.itemBonus.attack,
            };
          },
          { armor: 0, magic: 0, attack: 0 },
        );
      } catch {
        return { armor: 0, magic: 0, attack: 0 };
      }
    };

    const values = sumStatusValues();

    setStatusTowShow(values);
  }, [itensList]);

  const addLevel = !level ? Number(savedCharLevel) || 0 : Number(level);

  return (
    <div className="status-container">
      <h3 className={styles.h3}>{text.attributes}</h3>
      {level !== '' && !level && (
        <Input
          type="number"
          value={savedCharLevel}
          onChange={e => setSavedCharLevel(Number(e.target.value))}
          labelText="Char level"
          placeholder="level"
          autocomplete="off"
          style={styles}
        />
      )}

      <p>{`${text.armor}: ${statusTowShow.armor + addLevel}`}</p>
      <p>{`${text.magic}: ${statusTowShow.magic + addLevel}`}</p>
      <p>{`${text.attack}: ${statusTowShow.attack + addLevel}`}</p>
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
