import Head from 'next/head';
import styles from './set-maker.module.css';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/appContext/useAppState';

import { setCreatorPageText as textOptions } from '../../data/dataLanguages';
import {
  equipmentsArrayToObject,
  filterItensByLevelAndClass,
  findBestSet,
  saveSetInLocalStorage,
} from '../../data/kakeleActions';
import {
  equipments,
  weapons,
  ALL_ITENS_SLOTS_LIST,
  FAKE_SET,
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
  const [currentSet, setCurrentSet] = useState(FAKE_SET);
  const [ignoredItens, setIgnoredItens] = useState([]);
  const [showEquipAll, setShowEquipAll] = useState(false);

  const [ignoreThisSlotsElement, setIgnoreThisSlotsElement] = useState([]);

  const generateSet = () => {
    const itensList = filterItensByLevelAndClass(
      [...equipments, ...weapons],
      level,
      characterClass,
    );

    const bestItens = equipmentsArrayToObject(
      ALL_ITENS_SLOTS_LIST.map(slot =>
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
      ),
    );

    setShowEquipAll(true);
    setCurrentSet(bestItens);
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

  const equipAllListed = () => {
    saveSetInLocalStorage(currentSet);
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
        <div className={styles.buttonsContainer}>
          <ButtonForKakele onClick={generateSet} text={text.generateSet} />
          <Link href="/search-item" passHref locale={locale}>
            <LinkButton text={text.searchItens} />
          </Link>
          {showEquipAll && (
            <Link href="/set-viewer" passHref locale={locale}>
              <LinkButton text={text.equipAll} onClick={equipAllListed} />
            </Link>
          )}
        </div>

        <ShowSetStatus
          itensListToShowStatus={currentSet}
          locale={locale}
          level={level}
        />
      </div>
      <div className={`row row-cols-auto ${styles.row}`}>
        {Object.keys(currentSet).map((key, i) => {
          if (currentSet[key].level < 1) return;
          return (
            <div className={`col ${styles.col}`} key={currentSet[key].en + i}>
              <ItemCard
                index={key}
                ignoredItens={ignoredItens}
                ignoreItens={ignoreItens}
                ignoreThisSlotsElement={ignoreThisSlotsElement}
                ignoreElementForThisSlot={ignoreElementForThisSlot}
                item={currentSet[key]}
                stleFromParent={styles}
                locale={locale}
                currentSet={currentSet}
                updateCurrentSet={() => ''}
                updatedRecomendedSet={item =>
                  setCurrentSet({ ...currentSet, ...item })
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
