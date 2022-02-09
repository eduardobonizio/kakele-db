import React, { useState } from 'react';

import copy from 'copy-to-clipboard';

import ButtonForKakele from './Componentes/ButtonForKakele';
import InputCheckBox from './Componentes/InputCheckBox';
import ItemCard from './Componentes/ItemCard';
import {
  filterItensByLevenAndClass,
  findBestSet,
  checkSetElement,
  genereateLinkToViewSet,
} from './kakele';
import { equipments, weapons, ALL_ITENS_SLOTS_LIST } from './kakeleData';

export default function SetMaker() {
  const [characterClass, setCharacterClass] = useState('Alchemist');
  const [element, setElement] = useState('Light');
  const [level, setLevel] = useState(1);
  const [mainStat, setMainStat] = useState('Armor');
  const [ignoreElement, setIgnoreElement] = useState(false);
  const [showSet, setShowSet] = useState(false);
  const [ignoredItens, setIgnoredItens] = useState([]);
  const [ignoreThisSlotsElement, setIgnoreThisSlotsElement] = useState([]);

  const generateSet = () => {
    const itensList = filterItensByLevenAndClass(
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
        ignoreElement,
        ignoreThisSlotsElement,
        element,
      ),
    );

    setShowSet(bestItens);
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

  const copyLink = () => {
    const origin = window.location.origin.toString();
    const link = genereateLinkToViewSet(showSet, origin);
    if (link) copy(link);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column">
        <h3 className="">Gerador de set</h3>
        <div className="input-group mb-2">
          <span className="input-group-text" id="nivel-do-personagem">
            Nivel do personagem
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
            Classe do personagem
          </label>
          <select
            className="form-select"
            id="classe-do-personagem"
            onChange={e => setCharacterClass(e.target.value)}
          >
            <option defaultValue value="Alchemist">
              Alquemista
            </option>
            <option value="Hunter">Caçador</option>
            <option value="Berserker">Furioso</option>
            <option value="Warrior">Guerreiro</option>
            <option value="Mage">Mago</option>
          </select>
        </div>

        <div className="input-group mb-2">
          <label className="input-group-text" htmlFor="status-principal">
            Status principal
          </label>
          <select
            className="form-select"
            id="status-principal"
            onChange={e => setMainStat(e.target.value)}
          >
            <option defaultValue value="Armor">
              Amadura
            </option>
            <option value="Magic">Magia</option>
            <option value="Attack">Ataque</option>
          </select>
        </div>

        {!ignoreElement && (
          <div className="input-group mb-2">
            <label className="input-group-text" htmlFor="elemento-do-set">
              Elemento
            </label>
            <select
              className="form-select"
              id="elemento-do-set"
              onChange={e => setElement(e.target.value)}
            >
              <option defaultValue value="Light">
                Luz
              </option>
              <option value="Dark">Trevas</option>
              <option value="Nature">Natureza</option>
            </select>
          </div>
        )}
        <InputCheckBox
          labelText="Ignorar Elemento"
          id="ignore-element"
          onChangeFunc={setIgnoreElement}
          changeOnCheck={ignoreElement}
        />
        <ButtonForKakele onClick={generateSet} text="Gerar set" />
        <ButtonForKakele onClick={copyLink} text="Copiar link" />
        <div>
          <h3>Atributos do set</h3>
          <p>
            Armadura:
            {showSet &&
              showSet.reduce(
                (anterior, proximo) => anterior + (proximo.Armor || 0),
                0,
              )}
          </p>
          <p>
            Magia:{' '}
            {showSet &&
              showSet.reduce(
                (anterior, proximo) => anterior + (proximo.Magic || 0),
                0,
              )}
          </p>
          <p>
            Ataque:{' '}
            {showSet &&
              showSet.reduce(
                (anterior, proximo) => anterior + (proximo.Attack || 0),
                0,
              )}
          </p>
          <p>Elemento: {showSet && checkSetElement(showSet)}</p>
        </div>
      </div>
      <div className="row">
        {showSet &&
          showSet.map((item, i) => {
            if (item) {
              return (
                <ItemCard
                  index={i}
                  ignoredItens={ignoredItens}
                  ignoreItens={ignoreItens}
                  ignoreThisSlotsElement={ignoreThisSlotsElement}
                  ignoreElementForThisSlot={ignoreElementForThisSlot}
                  item={item}
                  key={i}
                />
              );
            }
          })}
      </div>
    </div>
  );
}
