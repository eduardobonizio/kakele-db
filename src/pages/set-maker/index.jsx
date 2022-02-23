import styles from './set-maker.module.css';
import React, { useState } from 'react';
import { useAppContext } from '../../context/appContext/useAppState';

import { setMakerJsx as textOptions } from '../../data/dataLanguages';
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
import ShowSetStatus from '../../componentes/others/ShowSetStatus';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';

export default function SetMaker() {
  const {
    state: { level, element, characterClass, mainStat, language },
  } = useAppContext();
  const text = textOptions[language];
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
        language,
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

  return (
    <div className={`container ${styles.statusAndCardContainer}`}>
      <div className={`d-flex flex-column ${styles.filtersContainer}`}>
        <h3 className="">{text.title}</h3>

        <KakeleItemsFilters statusPrincipal />
        <div className="container d-flex justify-content-around">
          <ButtonForKakele onClick={generateSet} text={text.generateSet} />
          {recomendedSet && (
            <Link href="/set" passHref>
              <LinkButton
                text={text.equipAll}
                onClick={() => saveSetInLocalStorage(recomendedSet)}
              />
            </Link>
          )}
        </div>
        <Link href="/search-item" passHref>
          <LinkButton text={text.searchItens} />
        </Link>

        <ShowSetStatus itensListToShowStatus={recomendedSet} />
      </div>
      <div className={`row row-cols-auto ${styles.row}`}>
        {recomendedSet &&
          recomendedSet.map((item, i) => {
            if (item) {
              return (
                <div className={`col ${styles.col}`} key={item.nameEN}>
                  <ItemCard
                    index={i}
                    ignoredItens={ignoredItens}
                    ignoreItens={ignoreItens}
                    ignoreThisSlotsElement={ignoreThisSlotsElement}
                    ignoreElementForThisSlot={ignoreElementForThisSlot}
                    item={item}
                    stleFromParent={styles}
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
