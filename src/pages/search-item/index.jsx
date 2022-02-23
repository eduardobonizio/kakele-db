import React, { useState } from 'react';

import ButtonForKakele from '../../componentes/ButtonForKakele';
import ItemCard from '../../componentes/ItemCard';
import KakeleItemsFilters from '../../componentes/KakeleItemsFilters';
import { searchItemJsx as textOptions } from '../../data/dataLanguages';
import {
  filterItensByElement,
  filterItensByLevelAndClass,
  filterItensBySlot,
  findItemsByName,
} from '../../data/kakeleActions';
import { equipments, weapons } from '../../data/kakeleData';
import Link from 'next/link';
import { useAppContext } from '../../componentes/useAppState';

import './SearchItem.module.css';

export default function SearchItem() {
  const {
    state: {
      level,
      itemName,
      element,
      slot,
      characterClass,
      orderBy,
      language,
    },
  } = useAppContext();
  const text = textOptions[language];
  const [foundItens, setFoundItens] = useState(false);

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

    const itensListByName = findItemsByName(itensListByElement, itemName);

    const result = itensListByName || itensListByElement;

    setFoundItens(result);
  };

  return (
    <div className="container d-flex kakele-search-item">
      <div className="d-flex d-flex flex-column kakele-search-item-filters">
        <KakeleItemsFilters manualFilters />
        <ButtonForKakele onClick={lookForItens} text={text.search} />
        <Link href="set">
          <a>{text.showSet}</a>
        </Link>
      </div>
      <div className="row row-cols-auto">
        {foundItens.length > 0 ? (
          foundItens.map((item, i) => {
            if (item) {
              return <ItemCard index={i} item={item} key={item.nameEN} />;
            }
            return false;
          })
        ) : (
          <span>{text.notFound}</span>
        )}
      </div>
    </div>
  );
}
