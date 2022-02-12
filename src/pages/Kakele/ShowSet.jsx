/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './css/ShowSet.css';

import ButtonForKakele from './Componentes/ButtonForKakele';
import ItemCard from './Componentes/ItemCard';
import ShowSetStatus from './Componentes/ShowSetStatus';
import { urlParamsToObject } from './kakele';
import { equipments, weapons, ALL_ITENS_SLOTS_LIST } from './kakeleData';

export default function ShowSet() {
  const navigate = useNavigate();
  const urlParams = useParams();
  const itensOnUrl = urlParamsToObject(urlParams);
  const [currentSet, setCurrentSet] = useState();

  const addMissingItens = selectedItems => {
    const fakeItem = {
      name: '-----------',
      level: 0,
      vocation: 'All',
      energy: 'None',
      attack: 0,
      armor: 0,
      Range: 0,
      value: 0,
      sources: '',
      magic: 0,
      haste: 0,
      slot: '',
    };
    const updatedCurrentSet = selectedItems;
    ALL_ITENS_SLOTS_LIST.forEach(slot => {
      if (!selectedItems[slot]) {
        fakeItem.slot = slot;
        updatedCurrentSet[slot] = { ...fakeItem, slot };
      }
    });

    setCurrentSet(updatedCurrentSet);
  };

  const itensOnUrlToItensList = () => {
    const allItens = [...equipments, ...weapons];
    const selectedItems = {};
    const itensList = Object.values(itensOnUrl).map(itemName =>
      allItens.forEach(item => {
        if (item.name === itemName) selectedItems[item.slot] = item;
      }),
    );

    addMissingItens(selectedItems);
  };

  useEffect(() => {
    itensOnUrlToItensList();
  }, []);

  return (
    <div className="container status-and-card-container">
      <div>
        {currentSet && <ShowSetStatus itensListToShowStatus={currentSet} />}
        <ButtonForKakele
          onClick={() => navigate('/kakele/search-item')}
          text="Procurar itens"
        />
      </div>
      {currentSet && (
        <div className="row row-cols-auto d-flex justify-content-center">
          {currentSet.necklace && (
            <ItemCard
              item={currentSet.necklace}
              index={currentSet.necklace.name}
            />
          )}

          {currentSet.helmet && (
            <ItemCard item={currentSet.helmet} index={currentSet.helmet.name} />
          )}

          {currentSet.ring && (
            <ItemCard item={currentSet.ring} index={currentSet.ring.name} />
          )}

          {currentSet.weapon && (
            <ItemCard item={currentSet.weapon} index={currentSet.weapon.name} />
          )}

          {currentSet.armor && (
            <ItemCard item={currentSet.armor} index={currentSet.armor.name} />
          )}

          {(currentSet.shield || currentSet.book) && (
            <ItemCard
              item={currentSet.shield || currentSet.book}
              index={currentSet.shield.name || currentSet.book.name}
            />
          )}

          {currentSet.accessorie && (
            <ItemCard
              item={currentSet.accessorie}
              index={currentSet.accessorie.name}
            />
          )}

          {currentSet.leg && (
            <ItemCard item={currentSet.leg} index={currentSet.leg.name} />
          )}

          {currentSet.shoe && (
            <ItemCard item={currentSet.shoe} index={currentSet.shoe.name} />
          )}
        </div>
      )}
    </div>
  );
}
