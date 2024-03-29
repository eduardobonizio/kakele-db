import React from 'react';
import { useAppContext } from '../../context/appContext/useAppState';

import {
  ITEM_FILTERS_NAME,
  kakeleItemsFiltersJsx as textOptions,
  SLOTS_NAMES,
} from '../../data/dataLanguages';
import {
  ALL_ITENS_SLOTS_LIST,
  ITEM_FILTERS,
  ITEM_RARITY,
} from '../../data/kakeleData';

export default function KakeleItemsFilters(props) {
  const { statusPrincipal, manualFilters, locale } = props;
  const {
    state: {
      level,
      element,
      characterClass,
      mainStat,
      itemName,
      slot,
      orderBy,
      rarity,
      ignoreUltraRare,
    },
    actions: { updateFilter },
  } = useAppContext();
  const text = textOptions[locale];

  return (
    <>
      <div className="input-group mb-2">
        {manualFilters && (
          <div className="input-group mb-2">
            <span className="input-group-text" id="nome-do-item">
              {text.itemName}
            </span>
            <input
              type="text"
              className="form-control"
              placeholder={text.itemName}
              aria-label="Nome do item"
              aria-describedby="nome-do-item"
              value={itemName}
              onChange={e => updateFilter('itemName', e.target.value)}
            />
          </div>
        )}
        <span className="input-group-text" id="nivel-do-personagem">
          {text.characterLevel}
        </span>
        <input
          type="number"
          className="form-control"
          placeholder="Nivel do Personagem"
          aria-label="Nivel do Personagem"
          aria-describedby="nivel-do-personagem"
          value={level}
          onChange={e => updateFilter('level', e.target.value)}
        />
      </div>
      <div className="input-group mb-2">
        <label className="input-group-text" htmlFor="classe-do-personagem">
          {text.characterClass}
        </label>
        <select
          className="form-select"
          id="classe-do-personagem"
          defaultValue={characterClass}
          onChange={e => updateFilter('characterClass', e.target.value)}
        >
          <option value="Alchemist">{text.alchemist}</option>
          <option value="Hunter">{text.hunter}</option>
          <option value="Berserker">{text.berserker}</option>
          <option value="Warrior">{text.warrior}</option>
          <option value="Mage">{text.mage}</option>
          {manualFilters && <option value="All">{text.anyClass}</option>}
        </select>
      </div>

      {statusPrincipal && (
        <div className="input-group mb-2">
          <label className="input-group-text" htmlFor="status-principal">
            {text.mainStat}
          </label>
          <select
            className="form-select"
            id="status-principal"
            defaultValue={mainStat}
            onChange={e => updateFilter('mainStat', e.target.value)}
          >
            <option value="armor">{text.armor}</option>
            <option value="magic">{text.magic}</option>
            <option value="attack">{text.attack}</option>
          </select>
        </div>
      )}

      <div className="input-group mb-2">
        <label className="input-group-text" htmlFor="elemento-do-set">
          {text.element}
        </label>
        <select
          className="form-select"
          id="elemento-do-set"
          defaultValue={element}
          onChange={e => updateFilter('element', e.target.value)}
        >
          <option value="All">{text.all}</option>
          <option value="Light">{text.light}</option>
          <option value="Dark">{text.dark}</option>
          <option value="Nature">{text.nature}</option>
        </select>
      </div>

      {manualFilters && (
        <>
          <div className="input-group mb-2">
            <label className="input-group-text" htmlFor="slot-do-item">
              {text.itemSlot}
            </label>
            <select
              className="form-select"
              id="slot-do-item"
              defaultValue={slot}
              onChange={e => updateFilter('slot', e.target.value)}
            >
              <option value="All">{text.all}</option>
              {ALL_ITENS_SLOTS_LIST.map(curSlot => (
                <option value={curSlot} key={curSlot}>
                  {SLOTS_NAMES[locale][curSlot]}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group mb-2">
            <label className="input-group-text" htmlFor="raridade">
              {text.itemRarity}
            </label>
            <select
              className="form-select"
              id="raridade"
              defaultValue={rarity}
              onChange={e => updateFilter('rarity', e.target.value)}
            >
              {Object.keys(ITEM_RARITY).map(rar => (
                <option value={rar} key={rar}>
                  {ITEM_RARITY[rar][locale]}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group mb-2">
            <label className="input-group-text" htmlFor="filtro">
              {text.orderBy}
            </label>
            <select
              className="form-select"
              id="filtro"
              defaultValue={orderBy}
              onChange={e => updateFilter('orderBy', e.target.value)}
            >
              {ITEM_FILTERS.map(status => (
                <option value={status} key={status}>
                  {ITEM_FILTERS_NAME[locale][status]}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      <div className="input-group mb-2 d-flex">
        <label
          className="input-group-text"
          htmlFor="flexSwitchCheckDefault"
          data-toggle="tooltip"
          data-placement="top"
          title={text.ignoreSuperRareItemsToolTip}
        >
          <input
            className="m-1"
            type="checkbox"
            id="flexSwitchCheckDefault"
            onChange={() => updateFilter('ignoreUltraRare', !ignoreUltraRare)}
            checked={ignoreUltraRare}
          />
          {text.ignoreSuperRareItems}
        </label>
      </div>
    </>
  );
}
