import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './ShowSet.module.css';

import copy from 'copy-to-clipboard';

import { showSetJsx as textOptions } from '../../data/dataLanguages';
import {
  addMissingItens,
  genereateLinkToViewSet,
  loadSetFromLocalStorage,
  normalizeSet,
} from '../../data/kakeleActions';
import Link from 'next/link';

import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import ShowSetStatus from '../../componentes/others/status-displayer/ShowSetStatus';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';
import { FAKE_SET } from '../../data/kakeleData';

export default function ShowSet() {
  const { locale, locales, query } = useRouter();
  const text = textOptions[locale];

  const [currentSet, updateCurrentSet] = useState(FAKE_SET);
  console.log(currentSet);
  useEffect(() => {
    const itensTextToObject = () => {
      const storedSet = loadSetFromLocalStorage() || [];

      const querySet = Object.keys(query).length > 0;

      const items = querySet ? query : storedSet;

      const allSlotItens = addMissingItens(items, locale);

      const normalizedSet = normalizeSet(allSlotItens, locale);

      return normalizedSet;
    };

    updateCurrentSet(itensTextToObject());
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
            updatedRecomendedSet={updateCurrentSet}
            recomendedSet={currentSet}
          />

          <ItemCard
            item={currentSet.helmet}
            index={currentSet.helmet[locale]}
            locale={locale}
            updatedRecomendedSet={updateCurrentSet}
            recomendedSet={currentSet}
          />

          <ItemCard
            item={currentSet.ring}
            index={currentSet.ring[locale]}
            locale={locale}
            updatedRecomendedSet={updateCurrentSet}
            recomendedSet={currentSet}
          />

          <ItemCard
            item={currentSet.weapon}
            index={currentSet.weapon[locale]}
            locale={locale}
            updatedRecomendedSet={updateCurrentSet}
            recomendedSet={currentSet}
          />

          <ItemCard
            item={currentSet.armor}
            index={currentSet.armor[locale]}
            locale={locale}
            updatedRecomendedSet={updateCurrentSet}
            recomendedSet={currentSet}
          />

          {currentSet.shield && currentSet.shield[locale] !== '-----------' && (
            <ItemCard
              item={currentSet.shield || currentSet.book}
              index={currentSet.shield[locale] || currentSet.book[locale]}
              locale={locale}
              updatedRecomendedSet={updateCurrentSet}
              recomendedSet={currentSet}
            />
          )}

          {currentSet.book && currentSet.book[locale] !== '-----------' && (
            <ItemCard
              item={currentSet.book}
              index={currentSet.book[locale]}
              locale={locale}
              updatedRecomendedSet={updateCurrentSet}
              recomendedSet={currentSet}
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
                updatedRecomendedSet={updateCurrentSet}
                recomendedSet={currentSet}
              />
            )}

          <ItemCard
            item={currentSet.accessorie}
            index={currentSet.accessorie[locale]}
            locale={locale}
            updatedRecomendedSet={updateCurrentSet}
            recomendedSet={currentSet}
          />

          <ItemCard
            item={currentSet.pants}
            index={currentSet.pants[locale]}
            locale={locale}
            updatedRecomendedSet={updateCurrentSet}
            recomendedSet={currentSet}
          />

          <ItemCard
            item={currentSet.shoe}
            index={currentSet.shoe[locale]}
            locale={locale}
            updatedRecomendedSet={updateCurrentSet}
            recomendedSet={currentSet}
          />
        </div>
      </div>
    </div>
  );
}
