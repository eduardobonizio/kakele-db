import Head from 'next/head';
import styles from './set-maker.module.css';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/appContext/useAppState';

import { setCreatorPageText as textOptions } from '../../data/dataLanguages';
import {
  filterItensByLevelAndClass,
  findBestSet,
  saveSetInLocalStorage,
} from '../../data/kakeleActions';
import {
  equipments,
  weapons,
  ALL_ITENS_SLOTS_LIST,
} from '../../data/kakeleData';
import Link from 'next/link';

import ItemCard from '../../componentes/others/item-card/ItemCard';
import KakeleItemsFilters from '../../componentes/others/KakeleItemsFilters';
import ShowSetStatus from '../../componentes/others/status-displayer/ShowSetStatus';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import { useRouter } from 'next/router';

export default function SetMaker() {
  const {
    state: { level, element, characterClass, mainStat },
    actions: { updateFilter },
  } = useAppContext();
  const { locale, locales } = useRouter();
  const text = textOptions[locale];
  const [recomendedSet, setRecomendedSet] = useState(false);
  const [ignoredItens, setIgnoredItens] = useState([]);

  const [ignoreThisSlotsElement, setIgnoreThisSlotsElement] = useState([]);

  const generateSet = () => {
    const itensList = filterItensByLevelAndClass(
      [...equipments, ...weapons],
      level,
      characterClass,
    );

    const bestItens = ALL_ITENS_SLOTS_LIST.map(slot =>
      findBestSet(
        itensList,
        mainStat,
        slot,
        characterClass,
        ignoredItens,
        ignoreThisSlotsElement,
        element,
        locale,
      ),
    );
    setRecomendedSet(bestItens);
  };

  const ignoreItens = (itemName, ignore) => {
    if (ignore) {
      const newIgnoredItensList = [...ignoredItens, itemName];
      setIgnoredItens(newIgnoredItensList);
      return;
    }
    const removeFromIgnoredList = ignoredItens.filter(
      item => item !== itemName,
    );
    setIgnoredItens(removeFromIgnoredList);
  };

  const ignoreElementForThisSlot = (slot, ignore) => {
    if (ignore) {
      const novosSlotsIgnorados = [...ignoreThisSlotsElement, slot];
      setIgnoreThisSlotsElement(novosSlotsIgnorados);
      return;
    }
    const removeSlotFromIgnoredList = ignoreThisSlotsElement.filter(
      item => item !== slot,
    );
    setIgnoreThisSlotsElement(removeSlotFromIgnoredList);
  };

  useEffect(() => {
    if (characterClass === 'All') updateFilter('characterClass', 'Alchemist');
  }, [characterClass, updateFilter]);

  return (
    <div className={`container ${styles.statusAndCardContainer}`}>
      <Head>
        <title>{text.title}</title>

        {locales.map(loc => {
          return (
            <link
              rel="alternate"
              hrefLang={loc}
              href={`https://www.kakeletools.com/${loc}/set-creator`}
              key={loc}
            />
          );
        })}
        <meta name="description" content={text.description} />
        <meta property="og:title" content={text.title} key="title" />
        <link rel="canonical" href="https://www.kakeletools.com/set-creator" />
      </Head>

      <div className={`d-flex flex-column ${styles.filtersContainer}`}>
        <h1>{text.h1}</h1>

        <KakeleItemsFilters statusPrincipal locale={locale} />
        <div className="container-fluid d-flex justify-content-around">
          <ButtonForKakele onClick={generateSet} text={text.generateSet} />
          <Link href="/search-item" passHref locale={locale}>
            <LinkButton text={text.searchItens} />
          </Link>
          {recomendedSet && (
            <Link href="/set-viewer" passHref locale={locale}>
              <LinkButton
                text={text.equipAll}
                onClick={() => saveSetInLocalStorage(recomendedSet, locale)}
              />
            </Link>
          )}
        </div>

        <ShowSetStatus itensListToShowStatus={recomendedSet} locale={locale} />
      </div>
      <div className={`row row-cols-auto ${styles.row}`}>
        {recomendedSet &&
          recomendedSet.map((item, i) => {
            if (item) {
              return (
                <div className={`col ${styles.col}`} key={item[locale]}>
                  <ItemCard
                    index={i}
                    ignoredItens={ignoredItens}
                    ignoreItens={ignoreItens}
                    ignoreThisSlotsElement={ignoreThisSlotsElement}
                    ignoreElementForThisSlot={ignoreElementForThisSlot}
                    item={item}
                    stleFromParent={styles}
                    locale={locale}
                  />
                </div>
              );
            }
            return false;
          })}
      </div>
    </div>
  );
}
