/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable immutable/no-let */
import React, { useState } from 'react';

import { minerios } from './kakeleData';

export default function OreCalculator() {
  console.log(minerios);
  const [startUpgradeLvl, setStartUpgradeLvl] = useState(0);
  const [finishUpgradeLvl, setFinishUpgradeLvl] = useState(5);
  const [itensNecessarios, setItensNecessarios] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [showOresPricesFiels, setShowOresPricesFiels] = useState(false);
  const [precoMinerios, setPrecoMinerios] = useState({
    precoCobre: 0,
    precoEstanho: 0,
    precoPrata: 0,
    precoFerro: 0,
    precoOuro: 0,
  });

  const calculateOreQuantityAndPrice = () => {
    if (startUpgradeLvl >= finishUpgradeLvl) {
      const FIVE_SECONDS = 5000;
      if (!showAlert) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, FIVE_SECONDS);
      }
      setItensNecessarios();
      return;
    }
    const total = {
      cobre: 0,
      estanho: 0,
      prata: 0,
      ferro: 0,
      ouro: 0,
      kks: 0,
    };
    for (let i = startUpgradeLvl + 5; i <= finishUpgradeLvl; i += 5) {
      const { cobre, estanho, prata, ferro, ouro, kks } = minerios[i];
      const { precoCobre, precoEstanho, precoPrata, precoFerro, precoOuro } =
        precoMinerios;
      total.cobre += cobre;
      total.estanho += estanho;
      total.prata += prata;
      total.ferro += ferro;
      total.ouro += ouro;
      if (showOresPricesFiels) {
        const precoTotalCobre = precoCobre * cobre;
        const precoTotalEstanho = precoEstanho * estanho;
        const precoTotalPrata = precoPrata * prata;
        const precoTotalFerro = precoFerro * ferro;
        const precoTotalOuro = precoOuro * ouro;
        total.kks +=
          kks +
          precoTotalCobre +
          precoTotalEstanho +
          precoTotalPrata +
          precoTotalOuro +
          precoTotalFerro;
      } else {
        total.kks += kks;
      }
    }
    setItensNecessarios(total);
  };

  return (
    <div className="container d-flex justify-content-center">
      {showAlert && (
        <div
          className="alert alert-warning position-absolute start-50 translate-middle alert-fixed"
          role="alert"
        >
          O upgrade desejado tem que ser maior que o upgrade atual
        </div>
      )}
      <div className="d-flex flex-column">
        <span className="mb-2">
          Selecione o upgrade atual e o upgrade desejado
        </span>
        <div className="input-group mb-2">
          <label
            className="input-group-text"
            htmlFor="inputGroupUpgradeInicial"
          >
            Upgrade atual
          </label>
          <select
            className="form-select"
            id="inputGroupUpgradeInicial"
            onChange={e => setStartUpgradeLvl(Number(e.target.value))}
          >
            <option defaultValue value="0">
              0
            </option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
            <option value="55">55</option>
            <option value="60">60</option>
            <option value="65">65</option>
            <option value="70">70</option>
          </select>
        </div>
        <div className="input-group mb-2">
          <label className="input-group-text" htmlFor="inputGroupUpgradeFinal">
            Upgrade desejado
          </label>
          <select
            className="form-select"
            id="inputGroupUpgradeFinal"
            onChange={e => setFinishUpgradeLvl(Number(e.target.value))}
          >
            <option defaultValue value="5">
              5
            </option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
            <option value="35">35</option>
            <option value="40">40</option>
            <option value="45">45</option>
            <option value="50">50</option>
            <option value="55">55</option>
            <option value="60">60</option>
            <option value="65">65</option>
            <option value="70">70</option>
          </select>
        </div>
        <div className="input-group mb-2">
          <div className="input-group-text">
            <input
              className="form-check-input"
              type="checkbox"
              id="adicionarPrecoMinerios"
              aria-label="Checkbox for following text input"
              onChange={() => setShowOresPricesFiels(!showOresPricesFiels)}
            />
          </div>
          <label htmlFor="adicionarPrecoMinerios" className="input-group-text">
            Vou comprar os minérios
          </label>
        </div>
        {showOresPricesFiels && (
          <div className="d-flex flex-column">
            <div className="input-group mb-2">
              <span className="input-group-text" id="preco-cobre-bruto">
                Preço Cobre Bruto
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="Preço do Cobre Bruto"
                aria-label="Preço do Cobre Bruto"
                aria-describedby="preco-cobre-bruto"
                value={precoMinerios.precoCobre}
                onChange={e =>
                  setPrecoMinerios({
                    ...precoMinerios,
                    precoCobre: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="input-group mb-2">
              <span className="input-group-text" id="preco-estanho-bruto">
                Preço Estanho Bruto
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="Preço do Estanho Bruto"
                aria-label="Preço do Estanho Bruto"
                aria-describedby="preco-estanho-bruto"
                value={precoMinerios.precoEstanho}
                onChange={e =>
                  setPrecoMinerios({
                    ...precoMinerios,
                    precoEstanho: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="input-group mb-2">
              <span className="input-group-text" id="preco-prata-bruta">
                Preço Prata Bruta
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="Preço da Prata Bruta"
                aria-label="Preço da Prata Bruta"
                aria-describedby="preco-prata-bruta"
                value={precoMinerios.precoPrata}
                onChange={e =>
                  setPrecoMinerios({
                    ...precoMinerios,
                    precoPrata: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="input-group mb-2">
              <span className="input-group-text" id="preco-ferro-bruto">
                Preço Ferro Bruto
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="Preço do Ferro Bruto"
                aria-label="Preço do Ferro Bruto"
                aria-describedby="preco-ferro-bruto"
                value={precoMinerios.precoFerro}
                onChange={e =>
                  setPrecoMinerios({
                    ...precoMinerios,
                    precoFerro: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="input-group mb-2">
              <span className="input-group-text" id="preco-ouro-bruto">
                Preço Ouro Bruto
              </span>
              <input
                type="number"
                className="form-control"
                placeholder="Preço do Ouro Bruto"
                aria-label="Preço do Ouro Bruto"
                aria-describedby="preco-ouro-bruto"
                value={precoMinerios.precoOuro}
                onChange={e =>
                  setPrecoMinerios({
                    ...precoMinerios,
                    precoOuro: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
        )}
        <button
          type="button"
          className="btn btn-light mb-2"
          onClick={calculateOreQuantityAndPrice}
        >
          Calcular
        </button>
        {itensNecessarios && (
          <div>
            <h3>Itens necessários:</h3>
            <div>
              Ouro (kks):{' '}
              {itensNecessarios.kks
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </div>
            <div>Cobre Bruto: {itensNecessarios.cobre}</div>
            <div>Estanho Bruto: {itensNecessarios.estanho}</div>
            <div>Prata Bruta: {itensNecessarios.prata}</div>
            <div>Ferro Bruto: {itensNecessarios.ferro}</div>
            <div>Ouro Bruto: {itensNecessarios.ouro}</div>
          </div>
        )}
      </div>
    </div>
  );
}