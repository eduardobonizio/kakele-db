import React, { useState } from 'react';

import copy from 'copy-to-clipboard';

import {
  filterItensByLevenAndClass,
  findBestSet,
  checkSetElement,
  genereateLinkToViewSet,
} from './kakele';
import { equipments, weapons, ALL_ITENS_SLOTS_LIST } from './kakeleData';

export default function SetMaker() {
  const [classe, setClasse] = useState('Alchemist');
  const [elemento, setElemento] = useState('Light');
  const [level, setLevel] = useState(1);
  const [statusPrincipal, setStatusPrincipal] = useState('Armor');
  const [ignorarElemento, setIgnorarElemento] = useState(false);
  const [exibirSet, setExibirSet] = useState(false);
  const [itensIgnorados, setItensIgnorados] = useState([]);
  const [slotsComElementoIgnorado, setSlotsComElementoIgnorado] = useState([]);

  const gerarSet = () => {
    const itensList = filterItensByLevenAndClass(
      [...equipments, ...weapons],
      level,
      classe,
    );
    const bestItens = ALL_ITENS_SLOTS_LIST.map(slot =>
      findBestSet(
        itensList,
        statusPrincipal,
        slot,
        classe,
        itensIgnorados,
        ignorarElemento,
        slotsComElementoIgnorado,
        elemento,
      ),
    );

    setExibirSet(bestItens);
  };

  const ignorarItem = (nomeDoItem, ignorar) => {
    if (ignorar) {
      const novosItensIgnorados = [...itensIgnorados, nomeDoItem];
      setItensIgnorados(novosItensIgnorados);
      return;
    }
    const itemNaoMaisIgnorado = itensIgnorados.filter(
      item => item !== nomeDoItem,
    );
    setItensIgnorados(itemNaoMaisIgnorado);
  };

  const ignorarSlot = (slot, ignorar) => {
    if (ignorar) {
      const novosSlotsIgnorados = [...slotsComElementoIgnorado, slot];
      setSlotsComElementoIgnorado(novosSlotsIgnorados);
      return;
    }
    const slotNaoMaisIgnorado = slotsComElementoIgnorado.filter(
      item => item !== slot,
    );
    setSlotsComElementoIgnorado(slotNaoMaisIgnorado);
  };

  const gerarLink = () => {
    const origin = window.location.origin.toString();
    const link = genereateLinkToViewSet(exibirSet, origin);
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
            onChange={e => setClasse(e.target.value)}
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
            onChange={e => setStatusPrincipal(e.target.value)}
          >
            <option defaultValue value="Armor">
              Amadura
            </option>
            <option value="Magic">Magia</option>
            <option value="Attack">Ataque</option>
          </select>
        </div>

        {!ignorarElemento && (
          <div className="input-group mb-2">
            <label className="input-group-text" htmlFor="elemento-do-set">
              Elemento
            </label>
            <select
              className="form-select"
              id="elemento-do-set"
              onChange={e => setElemento(e.target.value)}
            >
              <option defaultValue value="Light">
                Luz
              </option>
              <option value="Dark">Trevas</option>
              <option value="Nature">Natureza</option>
            </select>
          </div>
        )}

        <div className="input-group mb-2">
          <div className="input-group-text">
            <input
              className="form-check-input"
              type="checkbox"
              id="ignorar-elemento"
              aria-label="Checkbox for following text input"
              onChange={() => setIgnorarElemento(!ignorarElemento)}
            />
          </div>
          <label htmlFor="ignorar-elemento" className="input-group-text">
            Ignorar Elemento
          </label>
        </div>
        <button type="button" className="btn btn-light mb-2" onClick={gerarSet}>
          Gerar set
        </button>
        <button
          type="button"
          className="btn btn-light mb-2"
          onClick={gerarLink}
        >
          Copiar link
        </button>
        <div>
          <h3>Atributos do set</h3>
          <p>
            Armadura:
            {exibirSet &&
              exibirSet.reduce(
                (anterior, proximo) => anterior + (proximo.Armor || 0),
                0,
              )}
          </p>
          <p>
            Magia:{' '}
            {exibirSet &&
              exibirSet.reduce(
                (anterior, proximo) => anterior + (proximo.Magic || 0),
                0,
              )}
          </p>
          <p>
            Ataque:{' '}
            {exibirSet &&
              exibirSet.reduce(
                (anterior, proximo) => anterior + (proximo.Attack || 0),
                0,
              )}
          </p>
          <p>Elemento: {exibirSet && checkSetElement(exibirSet)}</p>
        </div>
      </div>
      <div className="row">
        {exibirSet &&
          exibirSet.map((item, i) => {
            if (item) {
              return (
                <div className="col" key={i}>
                  <div className="card mb-2">
                    <div
                      className="card-body pb-0"
                      style={{ minWidth: '200px' }}
                    >
                      <h6 className="card-title">
                        {item.Equipment || item.Weapon}
                      </h6>
                      <div className="d-flex flex-column mb-1">
                        <span className="card-text">
                          Elemento: {item.Energy}
                        </span>
                        <span className="card-text">
                          Armadura: {item.Armor}
                        </span>
                        <span className="card-text">Magia: {item.Magic}</span>
                        <span className="card-text">Ataque: {item.Attack}</span>
                        <span className="card-text">Nivel: {item.Level}</span>
                      </div>
                      <div className="input-group mb-2">
                        <div className="input-group-text">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name={item.Equipment || item.Weapon}
                            id={`exclude-item-${i}`}
                            checked={
                              itensIgnorados.includes(item.Equipment) ||
                              itensIgnorados.includes(item.Weapon)
                            }
                            aria-label="Checkbox for following text input"
                            onChange={e =>
                              ignorarItem(e.target.name, e.target.checked)
                            }
                          />
                        </div>
                        <label
                          htmlFor={`exclude-item-${i}`}
                          className="input-group-text"
                        >
                          Não incluir
                        </label>
                      </div>
                      <div className="input-group mb-2">
                        <div className="input-group-text">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name={item.Slot}
                            id={`ignore-slot-element-${i}`}
                            checked={slotsComElementoIgnorado.includes(
                              item.Slot,
                            )}
                            aria-label="Checkbox for following text input"
                            onChange={e =>
                              ignorarSlot(e.target.name, e.target.checked)
                            }
                          />
                        </div>
                        <label
                          htmlFor={`ignore-slot-element-${i}`}
                          className="input-group-text"
                        >
                          Ignora elemento dessa peça
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
