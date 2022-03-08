import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './ShowSet.module.css';

import copy from 'copy-to-clipboard';

import { showSetJsx as textOptions } from '../../data/dataLanguages';
import {
  findItemByName,
  genereateLinkToViewSet,
  loadSetFromLocalStorage,
  urlParamsToObject,
} from '../../data/kakeleActions';
import {
  equipments,
  weapons,
  ALL_ITENS_SLOTS_LIST,
  FAKE_ITEM,
} from '../../data/kakeleData';
import Link from 'next/link';

import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import { useAppContext } from '../../context/appContext/useAppState';
import ShowSetStatus from '../../componentes/others/status-displayer/ShowSetStatus';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';

export default function ShowSet() {
  const { locale, locales, query } = useRouter();
  const {
    state: { currentSet },
    actions: { updateCurrentSet },
  } = useAppContext();
  const text = textOptions[locale];

  useEffect(() => {
    const normalizeSet = setItems => {
      const shield =
        setItems.weapon.twoHanded || setItems.book[locale] !== '-----------'
          ? { ...FAKE_ITEM, slot: 'shield' }
          : { ...setItems.shield };
      const book =
        setItems.weapon.twoHanded || setItems.shield[locale] !== '-----------'
          ? { ...FAKE_ITEM, slot: 'book' }
          : { ...setItems.book };

      return { ...setItems, shield: { ...shield }, book: { ...book } };
    };

    const addMissingItens = (selectedItems, allItens) => {
      return ALL_ITENS_SLOTS_LIST.reduce(
        (current, next, index) => {
          const currentSlot = ALL_ITENS_SLOTS_LIST[index];

          const item = findItemByName(
            allItens,
            selectedItems[currentSlot],
            locale,
          ) || { ...FAKE_ITEM, slot: currentSlot };

          return {
            ...current,
            [currentSlot]: { ...item },
          };
        },
        { ...selectedItems },
      );
    };

    const itensTextToObject = allItens => {
      const storedSet = loadSetFromLocalStorage() || [];

      const querySet = Object.keys(query).length > 0;

      const items = querySet ? query : storedSet;

      const allSlotItens = addMissingItens(items, allItens);

      const normalizedSet = normalizeSet(allSlotItens);

      return normalizedSet;
    };

    updateCurrentSet(itensTextToObject([...equipments, ...weapons]));
  }, [locale, updateCurrentSet, query]);

  const copyLink = () => {
    const origin = window.location.origin.toString();
    const link = genereateLinkToViewSet(currentSet, origin, locale);
    if (link) copy(link);
  };

  return (
    <div className="container">
      <Head>
        <title>{text.title}</title>

        {locales.map(loc => {
          return (
            <link
              rel="alternate"
              hrefLang={loc}
              href={`https://www.kakeletools.com/${loc}/set-viewer`}
              key={loc}
            />
          );
        })}
        <meta name="description" content={text.description} />
        <meta property="og:title" content={text.title} key="title" />
        <link rel="canonical" href="https://www.kakeletools.com/set-viewer" />
      </Head>
      <h1 className={styles.h1}>{text.title}</h1>
      <div className={styles.statusAndCardContainer}>
        <div className="d-flex flex-column">
          <div className={styles.statusContainer}>
            {currentSet && (
              <ShowSetStatus
                itensListToShowStatus={currentSet}
                locale={locale}
              />
            )}
          </div>
          <Link href="/search-item" passHref locale={locale}>
            <LinkButton text={text.searchItems} />
          </Link>
          <ButtonForKakele onClick={copyLink} text={text.copy} />
        </div>
        <div className={`row row-cols-auto ${styles.row}`}>
          <ItemCard
            item={currentSet.necklace}
            index={currentSet.necklace[locale]}
            locale={locale}
          />

          <ItemCard
            item={currentSet.helmet}
            index={currentSet.helmet[locale]}
            locale={locale}
          />

          <ItemCard
            item={currentSet.ring}
            index={currentSet.ring[locale]}
            locale={locale}
          />

          <ItemCard
            item={currentSet.weapon}
            index={currentSet.weapon[locale]}
            locale={locale}
          />

          <ItemCard
            item={currentSet.armor}
            index={currentSet.armor[locale]}
            locale={locale}
          />

          {currentSet.shield && currentSet.shield[locale] !== '-----------' && (
            <ItemCard
              item={currentSet.shield || currentSet.book}
              index={currentSet.shield[locale] || currentSet.book[locale]}
              locale={locale}
            />
          )}

          {currentSet.book && currentSet.book[locale] !== '-----------' && (
            <ItemCard
              item={currentSet.book}
              index={currentSet.book[locale]}
              locale={locale}
            />
          )}

          {currentSet.book &&
            currentSet.book[locale] === '-----------' &&
            currentSet.shield &&
            currentSet.shield[locale] === '-----------' && (
              <ItemCard
                item={currentSet.shield}
                index={currentSet.shield[locale]}
                locale={locale}
              />
            )}

          <ItemCard
            item={currentSet.accessorie}
            index={currentSet.accessorie[locale]}
            locale={locale}
          />

          <ItemCard
            item={currentSet.pants}
            index={currentSet.pants[locale]}
            locale={locale}
          />

          <ItemCard
            item={currentSet.shoe}
            index={currentSet.shoe[locale]}
            locale={locale}
          />
        </div>
      </div>
    </div>
  );
}
