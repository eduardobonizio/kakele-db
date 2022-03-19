import React, { useState, useEffect } from 'react';

import { showSetStatusJsx as textOptions } from '../../../data/dataLanguages';
import { checkSetElement } from '../../../data/kakeleActions';
import { RARITY_BONUS } from '../../../lib/bless';
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

    const addBlessModifier = (status, ugradeBonus, bless, rarity) => {
      const totalStatus = status + ugradeBonus;
      const blessBonus = RARITY_BONUS[rarity][bless];
      return Math.floor(totalStatus + (totalStatus * blessBonus) / 100);
    };

    const sumStatusValues = () => {
      try {
        return itensList.reduce(
          (anterior, proximo) => {
            if (!proximo || proximo.level < 1) return anterior;
            return {
              armor:
                anterior.armor +
                addBlessModifier(
                  proximo.armor,
                  proximo.itemBonus.armor,
                  proximo.itemBonus.bless,
                  proximo.rarity.en,
                ),
              magic:
                anterior.magic +
                addBlessModifier(
                  proximo.magic,
                  proximo.itemBonus.magic,
                  proximo.itemBonus.bless,
                  proximo.rarity.en,
                ),
              attack:
                anterior.attack +
                addBlessModifier(
                  proximo.attack,
                  proximo.itemBonus.attack,
                  proximo.itemBonus.bless,
                  proximo.rarity.en,
                ),
            };
          },
          { armor: 0, magic: 0, attack: 0 },
        );
      } catch (e) {
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
