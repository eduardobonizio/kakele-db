import styles from './ItemCard.module.css';
import React from 'react';
import copy from 'copy-to-clipboard';

import { useRouter } from 'next/router';
import {
  elements,
  itemCardJsx as textOptions,
} from '../../../data/dataLanguages';
import { FAKE_ITEM } from '../../../data/kakeleData';
import { saveSetInLocalStorage } from '../../../data/kakeleActions';
import { useAppContext } from '../../../context/appContext/useAppState';

import Link from 'next/link';
import Image from 'next/image';

import ButtonForKakele from '../../buttons/buttton-for-kakele/ButtonForKakele';
import LinkButton from '../../buttons/link-as-button/LinkButton';

export default function ItemCard(props) {
  const {
    state: { currentSet },
    actions: { updateCurrentSet },
  } = useAppContext();
  const router = useRouter();
  const {
    locale,
    index,
    ignoredItens,
    ignoreItens,
    ignoreThisSlotsElement,
    ignoreElementForThisSlot,
    item,
    item: {
      sources,
      obsPtBr,
      energy,
      armor,
      magic,
      attack,
      level,
      slot,
      imgUrl,
    },
  } = props;

  const showDetails = router.pathname.includes('wiki');
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
      const whatToDo = decide(thisItem);

      updateCurrentSet({ ...currentSet, ...whatToDo });

      const newSet = Object.values({
        ...currentSet,
        ...whatToDo,
      }).map(item => item);

      saveSetInLocalStorage(newSet, locale);
    }
  };

  return (
    <div className={`card mb-2 ${styles.card}`}>
      <div className={`card-body pb-0 ${styles.cardBody}`}>
        <h6 className="card-title">{item[locale]}</h6>
        <div className="d-flex flex-column">
          <span className="card-text">
            {imgUrl && (
              <Image
                alt={item[locale]}
                src={imgUrl.replace('"', '').replace('"', '')}
                width={32}
                height={32}
              />
            )}
            <span>
              {`${text.element}: `}
              <span className={energy}>
                {elements[energy.toLowerCase()][locale]}
              </span>
            </span>
          </span>
          <span className="card-text">{`${text.armor}: ${armor}`}</span>
          <span className="card-text">{`${text.magic}: ${magic}`}</span>
          <span className="card-text">{`${text.attack}: ${attack}`}</span>
          <span className="card-text">{`${text.level}: ${level}`}</span>
          <span className="card-text">{`${text.slot}: ${slot}`}</span>
          {showDetails && (
            <>
              <span className="card-text">{`${text.sources}: ${sources}`}</span>
              <span className="card-text card-info">
                {`${text.info}: ${obsPtBr}`}
              </span>
            </>
          )}

          {currentSet[slot] &&
            currentSet[slot][locale] === item[locale] &&
            currentSet[slot][locale] !== '-----------' && (
              <span className={styles.equiped}>{text.equiped}</span>
            )}
        </div>
        {ignoredItens && (
          <>
            <div className="input-group mb-2">
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
            <div className="input-group mb-2">
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
            <Link href={`/wiki/${item[locale]}`} passHref locale={locale}>
              <LinkButton text={text.showItem} />
            </Link>
          )}

          <ButtonForKakele
            onClick={() => equipItem(item)}
            text={text.equipItem}
          />
        </div>
      </div>
    </div>
  );
}
