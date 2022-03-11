import Head from 'next/head';
import styles from './SearchItem.module.css';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';

import { useAppContext } from '../../context/appContext/useAppState';
import { searchItemJsx as textOptions } from '../../data/dataLanguages';
import {
  filterItensByElement,
  filterItensByLevelAndClass,
  filterItensBySlot,
  findItemsByName,
  findItemsByRarity,
  loadAndAddMissingItems,
  loadSetFromLocalStorage,
} from '../../data/kakeleActions';
import { equipments, FAKE_SET, weapons } from '../../data/kakeleData';

import KakeleItemsFilters from '../../componentes/others/KakeleItemsFilters';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';
import { useRouter } from 'next/router';

export default function SearchItem() {
  const {
    state: { level, itemName, element, slot, characterClass, orderBy, rarity },
  } = useAppContext();
  const { locale, locales } = useRouter();
  const text = textOptions[locale];
  const [foundItens, setFoundItens] = useState(false);
  const [currentSet, setCurrentSet] = useState(loadAndAddMissingItems(locale));
  const [loadItens, setLoadItens] = useState(5);

  const changeToEquipedItems = (itemList, savedSet) => {
    const newList = [...itemList];

    itemList.forEach((item, index) => {
      if (!savedSet[item.slot]) return;
      if (item.en === savedSet[item.slot].en) {
        newList[index] = { ...savedSet[item.slot] };
      }
    });

    return newList;
  };

  const lookForItens = () => {
    const itensList = filterItensByLevelAndClass(
      [...equipments, ...weapons],
      level,
      characterClass,
    );

    const itensListBySlot = filterItensBySlot(itensList, slot, [])
      .sort((a, b) => b.level - a.level)
      .sort((a, b) => b[orderBy] - a[orderBy]);

    const itensListByElement = filterItensByElement(itensListBySlot, element);

    const itensListByRarity = findItemsByRarity(itensListByElement, rarity);

    const itensListByName =
      itemName !== '' ? findItemsByName(itensListByRarity, itemName) : false;

    const filtered = itensListByName || itensListByRarity;

    const storedSet = loadSetFromLocalStorage() || [];

    const curSet = loadAndAddMissingItems(locale, storedSet, storedSet);

    const result = changeToEquipedItems(filtered, curSet);

    setCurrentSet(curSet);
    setFoundItens(result);
    setLoadItens(5);
  };

  const updateOneItemOnly = (oldItem, newItem) => {
    const items = [...foundItens];
    const index = items.indexOf(oldItem);
    items[index] = newItem;
    setFoundItens(items);
  };

  useEffect(() => {
    lookForItens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // https://www.youtube.com/watch?v=NZKUirTtxcg
  const observer = useRef();
  const lastCardRef = useCallback(
    card => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setLoadItens(loadItens + 10);
        }
      });
      if (card) observer.current.observe(card);
    },
    [loadItens],
  );

  return (
    <div className="container">
      <Head>
        <title>{text.title}</title>

        {locales.map(loc => {
          return (
            <link
              rel="alternate"
              hrefLang={loc}
              href={`https://www.kakeletools.com/${loc}/search-item`}
              key={loc}
            />
          );
        })}
        <meta name="description" content={text.description} />
        <meta property="og:title" content={text.title} key="title" />
        <link rel="canonical" href="https://www.kakeletools.com/search-item" />
      </Head>

      <h1 className={styles.h1}>{text.title}</h1>

      <div className={styles.mainContainer}>
        <div className={`d-flex d-flex flex-column ${styles.filters}`}>
          <KakeleItemsFilters manualFilters locale={locale} />
          <div className="container-fluid d-flex justify-content-around">
            <ButtonForKakele onClick={lookForItens} text={text.search} />
            <Link href="/set-viewer" passHref locale={locale}>
              <LinkButton text={text.showSet} />
            </Link>
          </div>
        </div>

        <div className={`row row-cols-auto ${styles.row}`}>
          {foundItens.length > 0 ? (
            foundItens.slice(0, loadItens).map((item, i) => {
              if (item) {
                if (loadItens - 1 === i) {
                  return (
                    <div
                      className={`col ${styles.col}`}
                      key={item[locale]}
                      ref={lastCardRef}
                    >
                      <ItemCard
                        index={i}
                        item={item}
                        locale={locale}
                        currentSet={currentSet}
                        updateCurrentSet={setCurrentSet}
                        recomendedSet={item}
                        updatedRecomendedSet={i => updateOneItemOnly(item, i)}
                        onlyOneItem="true"
                      />
                    </div>
                  );
                }
                return (
                  <div className={`col ${styles.col}`} key={item[locale]}>
                    <ItemCard
                      index={i}
                      item={item}
                      locale={locale}
                      currentSet={currentSet}
                      updateCurrentSet={setCurrentSet}
                      recomendedSet={item}
                      updatedRecomendedSet={i => updateOneItemOnly(item, i)}
                      onlyOneItem="true"
                    />
                  </div>
                );
              }
              return false;
            })
          ) : (
            <span>{text.notFound}</span>
          )}
        </div>
      </div>
    </div>
  );
}
