import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SearchItem.module.css";

import ButtonForKakele from "../../componentes/ButtonForKakele";
import ItemCard from "../../componentes/ItemCard";
import KakeleItemsFilters from "../../componentes/KakeleItemsFilters";
import { searchItemJsx as textOptions } from "../../data/dataLanguages";
import {
  filterItensByElement,
  filterItensByLevelAndClass,
  filterItensBySlot,
  findItemsByName,
} from "../../data/kakeleActions";
import { equipments, weapons, FAKE_ITEM } from "../../data/kakeleData";
import { updateCurrentSet } from "../../store/actions/kakeleCurrentSet.actions";
import Link from "next/link";

export default function SearchItem() {
  const dispatch = useDispatch();
  const currentSet = useSelector((state) => state.currentSet);
  const { level, itemName, element, slot, characterClass, orderBy, language } =
    useSelector((state) => state.currentKakeleFilters);
  const text = textOptions[language];
  const [foundItens, setFoundItens] = useState(false);

  const lookForItens = () => {
    const itensList = filterItensByLevelAndClass(
      [...equipments, ...weapons],
      level,
      characterClass
    );

    const itensListBySlot = filterItensBySlot(itensList, slot, [])
      .sort((a, b) => b.level - a.level)
      .sort((a, b) => b[orderBy] - a[orderBy]);

    const itensListByElement = filterItensByElement(itensListBySlot, element);

    const itensListByName = findItemsByName(itensListByElement, itemName);

    const result = itensListByName || itensListByElement;

    setFoundItens(result);
  };

  const equipItem = (item) => {
    dispatch(updateCurrentSet(item));

    if (
      (item.slot === "book" || item.slot === "shield") &&
      currentSet.weapon.twoHanded
    ) {
      dispatch(updateCurrentSet({ ...FAKE_ITEM, slot: "weapon" }));
    }

    if (item.slot === "book")
      dispatch(updateCurrentSet({ ...FAKE_ITEM, slot: "shield" }));

    if (item.slot === "shield")
      dispatch(updateCurrentSet({ ...FAKE_ITEM, slot: "book" }));
  };

  useEffect(() => lookForItens(), []);

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
              return (
                <ItemCard
                  index={i}
                  item={item}
                  key={item.nameEN}
                  equipItem={equipItem}
                />
              );
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
