import { useAppContext } from '../../componentes/useAppState';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './set-maker.module.css';

import ButtonForKakele from '../../componentes/ButtonForKakele';
import ItemCard from '../../componentes/ItemCard';
import KakeleItemsFilters from '../../componentes/KakeleItemsFilters';
import ShowSetStatus from '../../componentes/ShowSetStatus';
import { setMakerJsx as textOptions } from '../../data/dataLanguages';
import {
  filterItensByLevelAndClass,
  findBestSet,
  genereateLinkToViewSet,
} from '../../data/kakeleActions';
import {
  equipments,
  weapons,
  ALL_ITENS_SLOTS_LIST,
} from '../../data/kakeleData';
import Link from 'next/link';

export default function SetMaker() {
  const {
    state: { level, element, characterClass, mainStat, language },
    actions,
  } = useAppContext();
  const text = textOptions[language];
  const [recomendedSet, setRecomendedSet] = useState(false);
  const [ignoredItens, setIgnoredItens] = useState([]);
  const [linkToSetPage, setLinkToSetPage] = useState();

  const [ignoreThisSlotsElement, setIgnoreThisSlotsElement] = useState([]);

  const generateLinkToShowSetPage = setToLink => {
    const link = genereateLinkToViewSet(setToLink, false, language);
    if (link) setLinkToSetPage(link);
  };

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
    generateLinkToShowSetPage(bestItens);
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
    <div className="container status-and-card-container">
      <div className="d-flex flex-column set-maker-filters-container">
        <h3 className="">{text.title}</h3>

        <KakeleItemsFilters statusPrincipal />
        <div className="container d-flex justify-content-around">
          <ButtonForKakele onClick={generateSet} text={text.generateSet} />
          {recomendedSet && (
            <Link href={linkToSetPage}>
              <a>{text.equipAll}</a>
            </Link>
          )}
        </div>
        <Link href="/search-item">
          <a>{text.searchItens}</a>
        </Link>

        <ShowSetStatus itensListToShowStatus={recomendedSet} />
      </div>
      <div className="row row-cols-auto">
        {recomendedSet &&
          recomendedSet.map((item, i) => {
            if (item) {
              return (
                <ItemCard
                  index={i}
                  ignoredItens={ignoredItens}
                  ignoreItens={ignoreItens}
                  ignoreThisSlotsElement={ignoreThisSlotsElement}
                  ignoreElementForThisSlot={ignoreElementForThisSlot}
                  item={item}
                  key={item.nameEN}
                />
              );
            }
            return false;
          })}
      </div>
    </div>
  );
}
