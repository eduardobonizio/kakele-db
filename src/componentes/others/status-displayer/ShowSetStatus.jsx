import React, { useState, useEffect } from 'react';

import { showSetStatusJsx as textOptions } from '../../../data/dataLanguages';
import { checkSetElement } from '../../../data/kakeleActions';
import Input from '../../inputs/Input';
import styles from './ShowSetStatus.module.css';

export default function ShowSetStatus(props) {
  const { itensListToShowStatus, locale, level = false } = props;
  const [element, setElement] = useState(false);
  const [itensList, setItensList] = useState(false);
  const [charLevel, setCharLevel] = useState(1);
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

  useEffect(() => {
    const savedLevel = localStorage.getItem('charLevel') || 1;
    setCharLevel(Number(savedLevel));
  }, []);

  const updateLevel = newValue => {
    const value = newValue > 1000 ? 1000 : newValue < 1 ? 1 : newValue;
    setCharLevel(value);
    localStorage.setItem('charLevel', JSON.stringify(value));
  };

  return (
    <div className="status-container">
      <h3>{text.attributes}</h3>
      {!level && (
        <Input
          type="number"
          value={charLevel}
          onChange={e => updateLevel(Number(e.target.value))}
          labelText="Char level"
          placeholder="Char level"
          autocomplete="off"
          style={styles}
        />
      )}

      <p>{`${text.armor}: ${
        statusTowShow.armor + (Number(level) || charLevel)
      }`}</p>
      <p>{`${text.magic}: ${
        statusTowShow.magic + +(Number(level) || charLevel)
      }`}</p>
      <p>{`${text.attack}: ${
        statusTowShow.attack + +(Number(level) || charLevel)
      }`}</p>
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
