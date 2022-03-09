import styles from './ItemCard.module.css';
import React, { useState } from 'react';
import copy from 'copy-to-clipboard';

import { useRouter } from 'next/router';
import {
  elements,
  itemCardJsx as textOptions,
} from '../../../data/dataLanguages';
import { FAKE_ITEM } from '../../../data/kakeleData';
import {
  addMissingItens,
  loadSetFromLocalStorage,
  saveSetInLocalStorage,
} from '../../../data/kakeleActions';
import { useAppContext } from '../../../context/appContext/useAppState';

import Link from 'next/link';
import Image from 'next/image';

import ButtonForKakele from '../../buttons/buttton-for-kakele/ButtonForKakele';
import LinkButton from '../../buttons/link-as-button/LinkButton';
import StatusDiv from './status-div/StatusDiv';
import UpgradeDiv from './ugrade-div/UpgradeDiv';

export default function ItemCard(props) {
  const router = useRouter();

  const {
    state: { currentSet },
    actions: { udateOneEquipment, updateCurrentSet },
  } = useAppContext();

  const {
    locale,
    index,
    ignoredItens,
    ignoreItens,
    ignoreThisSlotsElement,
    ignoreElementForThisSlot,
    item,
    blessModifier = 0,
    blessQuantity = 0,
    updatedRecomendedSet,
    recomendedSet,
    item: {
      sources,
      info,
      energy,
      armor,
      magic,
      attack,
      level,
      slot,
      imgUrl,
      bonus,
      itemBonus,
    },
  } = props;
  console.log(currentSet);
  const [showUpdateItem, setShowUpdateItem] = useState(false);

  const updateStats = (newValue, stat) => {
    if (!showUpdateItem) setShowUpdateItem(!showUpdateItem);
    const updatedItemBonus = { ...itemBonus, [stat]: newValue };

    const newItem = {
      ...item,
      itemBonus: { ...updatedItemBonus },
    };

    if (recomendedSet) {
      const position = recomendedSet.indexOf(item);
      const curRecomendedSet = [...recomendedSet];
      curRecomendedSet[position] = newItem;

      updatedRecomendedSet([...curRecomendedSet]);
    }

    if (currentSet[slot].en !== item.en) return;
    udateOneEquipment(currentSet, newItem);
  };

  const showDetails =
    router.pathname.includes('wiki') || router.pathname.includes('new-items');
  const text = textOptions[locale];

  const decide = thisItem => {
    if (thisItem.slot === 'weapon') {
      return thisItem.twoHanded
        ? {
            weapon: thisItem,
            book: { ...FAKE_ITEM, sloot: 'book' },
            shield: { ...FAKE_ITEM, slot: 'shield' },
          }
        : { weapon: thisItem };
    }
    if (thisItem.slot === 'shield') {
      return currentSet.weapon.twoHanded
        ? {
            shield: thisItem,
            weapon: { ...FAKE_ITEM, slot: 'weapon' },
            book: { ...FAKE_ITEM, sloot: 'book' },
          }
        : { shield: thisItem, book: { ...FAKE_ITEM, sloot: 'book' } };
    }
    if (thisItem.slot === 'book') {
      return currentSet.weapon.twoHanded
        ? {
            book: thisItem,
            weapon: { ...FAKE_ITEM, slot: 'weapon' },
            shield: { ...FAKE_ITEM, sloot: 'shield' },
          }
        : {
            book: thisItem,
            shield: { ...FAKE_ITEM, sloot: 'shield' },
          };
    }
    return { [thisItem.slot]: thisItem };
  };

  const equipItem = thisItem => {
    if (thisItem[locale] !== '-----------') {
      if (showUpdateItem) setShowUpdateItem(!showUpdateItem);

      const updatedItem = {
        ...thisItem,
        ...itemBonus,
      };

      const whatToDo = decide(updatedItem);

      const oldSeld = loadSetFromLocalStorage();

      console.log('oldSeld', oldSeld);

      const newSet = addMissingItens({ ...oldSeld, ...whatToDo }, locale);

      console.log('newSet', newSet);

      updateCurrentSet(newSet);

      saveSetInLocalStorage(newSet);
    }
  };

  return (
    <div className={`card mb-2 ${styles.card}`}>
      <div className={`card-body pb-0 ${styles.cardBody}`}>
        <div className={styles.titleAndImgContainer}>
          <span className={styles.cardImage}>
            {imgUrl && (
              <Image
                alt={item[locale]}
                src={imgUrl.replace('"', '').replace('"', '')}
                width={32}
                height={32}
              />
            )}
          </span>
          <h6 className="card-title">{item[locale]}</h6>
        </div>
        <div className="d-flex flex-column">
          {blessQuantity < 1 && <i className="bi bi-star"></i>}
          {blessQuantity > 0 && (
            <div className={styles.stars}>
              {[...Array(blessQuantity).keys()].map(e => (
                <i key={e} className="bi bi-star-fill"></i>
              ))}
            </div>
          )}
          <div className={styles.statusAndUpgradeContainer}>
            <StatusDiv
              text={text}
              armor={armor}
              magic={magic}
              attack={attack}
              level={level}
              slot={slot}
              blessModifier={blessModifier}
              itemsUpgrades={itemBonus}
              styles={styles}
            />
            {item.level > 0 && (
              <UpgradeDiv
                text={text}
                armor={armor}
                magic={magic}
                attack={attack}
                level={level}
                slot={slot}
                blessModifier={blessModifier}
                styles={styles}
                upgrades={itemBonus}
                changeUpgrades={updateStats}
              />
            )}
          </div>
          <span>
            {`${text.element}: `}
            <span className={energy}>
              {elements[energy.toLowerCase()][locale]}
            </span>
          </span>
          <span className="card-text">
            {`${text.rarity}: `}
            <span className={item.rarity['en'].toLowerCase()}>
              {item.rarity[locale]}
            </span>
          </span>

          {showDetails && (
            <>
              <span className="card-text">{`${text.sources}: ${sources}`}</span>
              {info && (
                <span className="card-text card-info">
                  {`${text.info}: ${info[locale]}`}
                </span>
              )}
            </>
          )}

          {showDetails && bonus && (
            <span className="card-text">{`${text.bonus}: ${bonus[locale]}`}</span>
          )}
        </div>
        {ignoredItens && (
          <>
            <div className="input-group mb-1">
              <div className="input-group-text">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={item[locale]}
                  id={`exclude-item-${index}`}
                  checked={ignoredItens.includes(item[locale])}
                  aria-label="Checkbox for following text input"
                  onChange={e => ignoreItens(e.target.name, e.target.checked)}
                />
              </div>
              <label
                htmlFor={`exclude-item-${index}`}
                className="input-group-text"
              >
                {text.ignoreItem}
              </label>
            </div>
            <div className="input-group mb-1">
              <div className="input-group-text">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={slot}
                  id={`ignore-slot-element-${index}`}
                  checked={ignoreThisSlotsElement.includes(slot)}
                  aria-label="Checkbox for following text input"
                  onChange={e =>
                    ignoreElementForThisSlot(e.target.name, e.target.checked)
                  }
                />
              </div>
              <label
                htmlFor={`ignore-slot-element-${index}`}
                className="input-group-text"
              >
                {text.ignoreElement}
              </label>
            </div>
          </>
        )}
        <div className={styles.buttonContainer}>
          <ButtonForKakele
            onClick={() => copy(item[locale])}
            text={text.copy}
          />
          {!showDetails && (
            <Link href={`/wiki?item=${item['en']}`} passHref locale={locale}>
              <LinkButton text={text.showItem} />
            </Link>
          )}

          <ButtonForKakele
            onClick={() => equipItem(item)}
            text={
              showUpdateItem
                ? text.saveItem
                : currentSet[slot][locale] === item[locale]
                ? text.equiped
                : text.equipItem
            }
            disabled={
              !showUpdateItem && currentSet[slot][locale] === item[locale]
            }
          />
        </div>
      </div>
    </div>
  );
}
