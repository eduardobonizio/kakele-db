import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import "./ShowSet.module.css";

import copy from "copy-to-clipboard";

import ButtonForKakele from "../../componentes/ButtonForKakele";
import ItemCard from "../../componentes/ItemCard";
import ShowSetStatus from "../../componentes/ShowSetStatus";
import { showSetJsx as textOptions } from "../../data/dataLanguages";
import {
  findItemByName,
  genereateLinkToViewSet,
  urlParamsToObject,
} from "../../data/kakeleActions";
import {
  equipments,
  weapons,
  ALL_ITENS_SLOTS_LIST,
  FAKE_ITEM,
} from "../../data/kakeleData";
import { updateCurrentSet } from "../../store/actions/kakeleCurrentSet.actions";
import Link from "next/link";

export default function ShowSet() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { urslSet } = router.query;
  const currentSet = useSelector((state) => state.currentSet);
  const { language } = useSelector((state) => state.currentKakeleFilters);
  const text = textOptions[language];

  const normalizeSet = (setItems) => {
    const shield =
      setItems.weapon.twoHanded || setItems.book.nameEN !== "-----------"
        ? { ...FAKE_ITEM, slot: "shield" }
        : { ...setItems.shield };
    const book =
      setItems.weapon.twoHanded || setItems.shield.nameEN !== "-----------"
        ? { ...FAKE_ITEM, slot: "book" }
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
      { ...selectedItems }
    );

  const itensOnUrlToItensList = (urlText, allItens) => {
    const itensOnUrl = urlParamsToObject(urlText);

    const allSlotItens = addMissingItens(itensOnUrl, allItens);

    const normalizedSet = normalizeSet(allSlotItens);

    dispatch(updateCurrentSet(normalizedSet));
  };

  useEffect(() => {
    itensOnUrlToItensList(urslSet, [...equipments, ...weapons]);
  }, [urslSet]);

  const copyLink = () => {
    const origin = window.location.origin.toString();
    const setToArray = Object.values(currentSet).map((item) => item);
    const link = genereateLinkToViewSet(setToArray, origin, language);
    if (link) copy(link);
  };

  return (
    <div className="container status-and-card-container">
      <div className="d-flex flex-column">
        {currentSet && <ShowSetStatus itensListToShowStatus={currentSet} />}
        <Link href="/search-item">
          <a>{text.searchItems}</a>
        </Link>
        <ButtonForKakele onClick={copyLink} text={text.copy} />
      </div>
      {currentSet && (
        <div className="row row-cols-auto d-flex justify-content-center">
          {currentSet.necklace && (
            <ItemCard
              item={currentSet.necklace}
              index={currentSet.necklace.nameEN}
            />
          )}

          {currentSet.helmet && (
            <ItemCard
              item={currentSet.helmet}
              index={currentSet.helmet.nameEN}
            />
          )}

          {currentSet.ring && (
            <ItemCard item={currentSet.ring} index={currentSet.ring.nameEN} />
          )}

          {currentSet.weapon && (
            <ItemCard
              item={currentSet.weapon}
              index={currentSet.weapon.nameEN}
            />
          )}

          {currentSet.armor && (
            <ItemCard item={currentSet.armor} index={currentSet.armor.nameEN} />
          )}

          {currentSet.shield && currentSet.shield.nameEN !== "-----------" && (
            <ItemCard
              item={currentSet.shield || currentSet.book}
              index={currentSet.shield.nameEN || currentSet.book.nameEN}
            />
          )}

          {currentSet.book && currentSet.book.nameEN !== "-----------" && (
            <ItemCard item={currentSet.book} index={currentSet.book.nameEN} />
          )}

          {currentSet.accessorie && (
            <ItemCard
              item={currentSet.accessorie}
              index={currentSet.accessorie.nameEN}
            />
          )}

          {currentSet.leg && (
            <ItemCard item={currentSet.leg} index={currentSet.leg.nameEN} />
          )}

          {currentSet.shoe && (
            <ItemCard item={currentSet.shoe} index={currentSet.shoe.nameEN} />
          )}
        </div>
      )}
    </div>
  );
}