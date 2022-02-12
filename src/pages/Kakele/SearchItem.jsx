/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import './css/SearchItem.css';

import { updateCurrentSet } from '../../store/actions/kakeleCurrentSet.actions';
import ButtonForKakele from './Componentes/ButtonForKakele';
import ItemCard from './Componentes/ItemCard';
import {
  filterItensByElement,
  filterItensByLevelAndClass,
  filterItensBySlot,
  genereateLinkToViewSet,
} from './kakele';
import {
  ALL_ITENS_SLOTS_LIST,
  ALL_ITENS_SLOTS_LIST_PT_BR,
  ITEM_FILTERS,
  ITEM_FILTERS_PT_BR,
  CHARACTER_CLASS,
  CHARACTER_CLASS_PT_BR,
  equipments,
  weapons,
} from './kakeleData';

export default function SearchItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentSet = useSelector(state => state.currentSet);
  const [level, setLevel] = useState(1);
  const [element, setElement] = useState('All');
  const [slotToFilter, setSlotToFilter] = useState('All');
  const [characterClass, setCharacterClass] = useState(CHARACTER_CLASS[0]);
  const [orderBy, setOrderBy] = useState(ITEM_FILTERS[0]);
  const [foundItens, setFoundItens] = useState(false);

  const lookForItens = () => {
    const itensList = filterItensByLevelAndClass(
      [...equipments, ...weapons],
      level,
      characterClass,
    );

    const itensListBySlot = filterItensBySlot(itensList, slotToFilter, [])
      .sort((a, b) => b.level - a.level)
      .sort((a, b) => b[orderBy] - a[orderBy]);

    const itensListByElement = filterItensByElement(itensListBySlot, element);

    setFoundItens(itensListByElement);
  };

  const equipItem = item => {
    dispatch(updateCurrentSet(item));
  };

  useEffect(() => lookForItens(), []);

  const copyLink = () => {
    const origin = window.location.origin.toString();
    const setToArray = Object.values(currentSet).map(item => item);
    const link = genereateLinkToViewSet(setToArray, false);
    if (link) navigate(link);
  };

  return (
    <div className="container d-flex kakele-search-item">
      <div className="d-flex d-flex flex-column kakele-search-item-filters">
        <div className="input-group mb-2">
          <span className="input-group-text" id="nivel-do-personagem">
            Nivel
          </span>
          <input
            type="number"
            className="form-control"
            placeholder="Nivel do Personagem"
            aria-label="Nivel do Personagem"
            aria-describedby="nivel-do-personagem"
            value={level}
            onChange={e => setLevel(Number(e.target.value))}
          />
        </div>
        <div className="input-group mb-2">
          <label className="input-group-text" htmlFor="classe-do-personagem">
            Classe
          </label>
          <select
            className="form-select"
            id="classe-do-personagem"
            onChange={e => setCharacterClass(e.target.value)}
          >
            {CHARACTER_CLASS.map((charClass, i) => (
              <option value={charClass} key={i}>
                {CHARACTER_CLASS_PT_BR[charClass]}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group mb-2">
          <label className="input-group-text" htmlFor="slot-do-item">
            Slot do item
          </label>
          <select
            className="form-select"
            id="slot-do-item"
            onChange={e => setSlotToFilter(e.target.value)}
          >
            <option defaultValue value="All">
              Todos
            </option>
            {ALL_ITENS_SLOTS_LIST.map((slot, i) => (
              <option value={slot} key={i}>
                {ALL_ITENS_SLOTS_LIST_PT_BR[slot]}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group mb-2">
          <label className="input-group-text" htmlFor="elemento-do-set">
            Elemento
          </label>
          <select
            className="form-select"
            id="elemento-do-set"
            onChange={e => setElement(e.target.value)}
          >
            <option defaultValue value="All">
              Todos
            </option>
            <option defaultValue value="Light">
              Luz
            </option>
            <option value="Dark">Trevas</option>
            <option value="Nature">Natureza</option>
          </select>
        </div>

        <div className="input-group mb-2">
          <label className="input-group-text" htmlFor="filtro">
            Ordenar por
          </label>
          <select
            className="form-select"
            id="filtro"
            onChange={e => setOrderBy(e.target.value)}
          >
            {ITEM_FILTERS.map((status, i) => (
              <option value={status} key={i}>
                {ITEM_FILTERS_PT_BR[status]}
              </option>
            ))}
          </select>
        </div>
        <ButtonForKakele onClick={lookForItens} text="Procurar" />
        <ButtonForKakele onClick={copyLink} text="Ver set" />
      </div>
      <div className="row row-cols-auto">
        {foundItens.length > 0 ? (
          foundItens.map((item, i) => {
            if (item) {
              return (
                <ItemCard index={i} item={item} key={i} equipItem={equipItem} />
              );
            }
          })
        ) : (
          <span>Nem um item encontrado</span>
        )}
      </div>
    </div>
  );
}
