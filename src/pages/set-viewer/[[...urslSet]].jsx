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
  const {
    locale,
    locales,
    query: { urslSet },
  } = useRouter();
  const {
    actions: { updateCurrentSet },
  } = useAppContext();
  const text = textOptions[locale];
  const [showSet, setShowSet] = useState();

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

    const addMissingItens = (selectedItems, allItens) =>
      ALL_ITENS_SLOTS_LIST.reduce(
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

    const storedSet = loadSetFromLocalStorage();
    const selectedSet = urslSet ? urslSet[0] : storedSet;

    const itensTextToObject = (urlText, allItens) => {
      const itensOnUrl = urlParamsToObject(urlText);

      const allSlotItens = addMissingItens(itensOnUrl, allItens);

      const normalizedSet = normalizeSet(allSlotItens);

      return normalizedSet;
    };

    updateCurrentSet(itensTextToObject(storedSet, [...equipments, ...weapons]));

    setShowSet(itensTextToObject(selectedSet, [...equipments, ...weapons]));
  }, [locale, updateCurrentSet, urslSet]);

  const copyLink = () => {
    const origin = window.location.origin.toString();
    const setToArray = Object.values(showSet).map(item => item);
    const link = genereateLinkToViewSet(setToArray, origin, locale);
    if (link) copy(link);
  };

  return (
    <div className={`container ${styles.statusAndCardContainer}`}>
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
      </Head>

      <div className="d-flex flex-column">
        <div className={styles.statusContainer}>
          {showSet && (
            <ShowSetStatus itensListToShowStatus={showSet} locale={locale} />
          )}
        </div>
        <Link href="/search-item" passHref locale={locale}>
          <LinkButton text={text.searchItems} />
        </Link>
        <ButtonForKakele onClick={copyLink} text={text.copy} />
      </div>
      {showSet && (
        <div className={`row row-cols-auto ${styles.row}`}>
          {showSet.necklace && (
            <ItemCard
              item={showSet.necklace}
              index={showSet.necklace[locale]}
              locale={locale}
            />
          )}

          {showSet.helmet && (
            <ItemCard
              item={showSet.helmet}
              index={showSet.helmet[locale]}
              locale={locale}
            />
          )}

          {showSet.ring && (
            <ItemCard
              item={showSet.ring}
              index={showSet.ring[locale]}
              locale={locale}
            />
          )}

          {showSet.weapon && (
            <ItemCard
              item={showSet.weapon}
              index={showSet.weapon[locale]}
              locale={locale}
            />
          )}

          {showSet.armor && (
            <ItemCard
              item={showSet.armor}
              index={showSet.armor[locale]}
              locale={locale}
            />
          )}

          {showSet.shield && showSet.shield[locale] !== '-----------' && (
            <ItemCard
              item={showSet.shield || showSet.book}
              index={showSet.shield[locale] || showSet.book[locale]}
              locale={locale}
            />
          )}

          {showSet.book && showSet.book[locale] !== '-----------' && (
            <ItemCard
              item={showSet.book}
              index={showSet.book[locale]}
              locale={locale}
            />
          )}

          {showSet.book &&
            showSet.book[locale] === '-----------' &&
            showSet.shield &&
            showSet.shield[locale] === '-----------' && (
              <ItemCard
                item={showSet.shield}
                index={showSet.shield[locale]}
                locale={locale}
              />
            )}

          {showSet.accessorie && (
            <ItemCard
              item={showSet.accessorie}
              index={showSet.accessorie[locale]}
              locale={locale}
            />
          )}

          {showSet.pants && (
            <ItemCard
              item={showSet.pants}
              index={showSet.pants[locale]}
              locale={locale}
            />
          )}

          {showSet.shoe && (
            <ItemCard
              item={showSet.shoe}
              index={showSet.shoe[locale]}
              locale={locale}
            />
          )}
        </div>
      )}
    </div>
  );
}
