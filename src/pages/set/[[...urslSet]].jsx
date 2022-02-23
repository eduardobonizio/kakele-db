import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import './ShowSet.module.css';

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
import ShowSetStatus from '../../componentes/others/ShowSetStatus';
import ItemCard from '../../componentes/others/item-card/ItemCard';

export default function ShowSet() {
  const router = useRouter();
  const {
    state: { currentSet, language },
    actions: { updateCurrentSet },
  } = useAppContext();
  const { urslSet } = router.query;
  const text = textOptions[language];
  const [showSet, setShowSet] = useState();

  const normalizeSet = setItems => {
    const shield =
      setItems.weapon.twoHanded || setItems.book.nameEN !== '-----------'
        ? { ...FAKE_ITEM, slot: 'shield' }
        : { ...setItems.shield };
    const book =
      setItems.weapon.twoHanded || setItems.shield.nameEN !== '-----------'
        ? { ...FAKE_ITEM, slot: 'book' }
        : { ...setItems.book };

    return { ...setItems, shield: { ...shield }, book: { ...book } };
  };

  const addMissingItens = (selectedItems, allItens) =>
    ALL_ITENS_SLOTS_LIST.reduce(
      (current, next, index) => {
        const currentSlot = ALL_ITENS_SLOTS_LIST[index];

        const item =
          findItemByName(allItens, selectedItems[currentSlot]) || FAKE_ITEM;

        return {
          ...current,
          [currentSlot]: { ...item },
        };
      },
      { ...selectedItems },
    );

  useEffect(() => {
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
  }, [updateCurrentSet, urslSet]);

  const copyLink = () => {
    const origin = window.location.origin.toString();
    const setToArray = Object.values(showSet).map(item => item);
    const link = genereateLinkToViewSet(setToArray, origin, language);
    if (link) copy(link);
  };

  return (
    <div className="container status-and-card-container">
      <div className="d-flex flex-column">
        {showSet && <ShowSetStatus itensListToShowStatus={showSet} />}
        <Link href="/search-item">
          <a>{text.searchItems}</a>
        </Link>
        <ButtonForKakele onClick={copyLink} text={text.copy} />
      </div>
      {showSet && (
        <div className="row row-cols-auto d-flex justify-content-center">
          {showSet.necklace && (
            <ItemCard item={showSet.necklace} index={showSet.necklace.nameEN} />
          )}

          {showSet.helmet && (
            <ItemCard item={showSet.helmet} index={showSet.helmet.nameEN} />
          )}

          {showSet.ring && (
            <ItemCard item={showSet.ring} index={showSet.ring.nameEN} />
          )}

          {showSet.weapon && (
            <ItemCard item={showSet.weapon} index={showSet.weapon.nameEN} />
          )}

          {showSet.armor && (
            <ItemCard item={showSet.armor} index={showSet.armor.nameEN} />
          )}

          {showSet.shield && showSet.shield.nameEN !== '-----------' && (
            <ItemCard
              item={showSet.shield || showSet.book}
              index={showSet.shield.nameEN || showSet.book.nameEN}
            />
          )}

          {showSet.book && showSet.book.nameEN !== '-----------' && (
            <ItemCard item={showSet.book} index={showSet.book.nameEN} />
          )}

          {showSet.accessorie && (
            <ItemCard
              item={showSet.accessorie}
              index={showSet.accessorie.nameEN}
            />
          )}

          {showSet.leg && (
            <ItemCard item={showSet.leg} index={showSet.leg.nameEN} />
          )}

          {showSet.shoe && (
            <ItemCard item={showSet.shoe} index={showSet.shoe.nameEN} />
          )}
        </div>
      )}
    </div>
  );
}
