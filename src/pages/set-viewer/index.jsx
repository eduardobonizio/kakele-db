import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from './ShowSet.module.css';

import copy from 'copy-to-clipboard';

import { showSetJsx as textOptions } from '../../data/dataLanguages';
import {
  genereateLinkToViewSet,
  loadAndAddMissingItems,
  loadSetFromLocalStorage,
  loadSetFromQuery,
} from '../../data/kakeleActions';
import Link from 'next/link';

import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import ShowSetStatus from '../../componentes/others/status-displayer/ShowSetStatus';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';
import { ALL_ITENS_SLOTS_LIST, FAKE_SET } from '../../data/kakeleData';

export default function ShowSet() {
  const { locale, locales, query } = useRouter();
  const text = textOptions[locale];

  const [currentSet, setCurrentSet] = useState(FAKE_SET);
  const [viewQuerySet, setViewQuerySet] = useState(false);

  const copyLink = () => {
    const origin = window.location.origin.toString();
    const link = genereateLinkToViewSet(currentSet, origin, locale);
    if (link) copy(link);
  };

  useEffect(() => {
    const loadShowItens = () => {
      const storedSet = loadSetFromLocalStorage() || [];
      const querySet = Object.keys(query).length > 0;

      if (querySet) {
        const items = query;
        const querySet = loadSetFromQuery(items);
        console.log(querySet);
        setViewQuerySet(querySet);
      }

      const items = storedSet;
      const curSet = loadAndAddMissingItems(locale, storedSet, items);
      setCurrentSet(curSet);
      if (!querySet) setViewQuerySet(false);
    };

    loadShowItens();
  }, [locale, query]);

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

        {viewQuerySet ? (
          <div className={`row row-cols-auto ${styles.row}`}>
            {ALL_ITENS_SLOTS_LIST.map(key => {
              if (!viewQuerySet[key]) return;

              return (
                <ItemCard
                  key={key}
                  item={viewQuerySet[key]}
                  locale={locale}
                  currentSet={currentSet}
                  updateCurrentSet={item => ''}
                  updatedRecomendedSet={item => {
                    setCurrentSet({ ...currentSet, ...item });
                    setViewQuerySet({ ...viewQuerySet, ...item });
                  }}
                />
              );
            })}
          </div>
        ) : (
          <div className={`row row-cols-auto ${styles.row}`}>
            {ALL_ITENS_SLOTS_LIST.map(key => {
              if (!currentSet[key]) return;

              return (
                <ItemCard
                  key={key}
                  item={currentSet[key]}
                  locale={locale}
                  currentSet={currentSet}
                  updateCurrentSet={item => ''}
                  updatedRecomendedSet={item =>
                    setCurrentSet({ ...currentSet, ...item })
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
