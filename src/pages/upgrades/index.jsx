import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Alert from '../../componentes/alert/Alert';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import InputCheckBox from '../../componentes/inputs/InputCheckBox';
import OrePriceUpdater from '../../componentes/others/OrePriceUpdater';
import UpgradeSelector from '../../componentes/others/UpgradeSelector';
import { oreCalculatorJsx as textOptions } from '../../data/dataLanguages';
import {
  addDotToKks,
  calculateOreQuantityAndPrice,
  calculateUpgradePriceWithOresPrice,
} from '../../data/kakeleActions';
import { UPGRADES_STAGES } from '../../data/kakeleData';

export default function OreCalculator() {
  const { locale, locales } = useRouter();
  const text = textOptions[locale];

  const [startUpgradeLvl, setStartUpgradeLvl] = useState(0);
  const [desiredUpgradeLvl, setDesiredUpgradeLvl] = useState(0);
  const [necessaryItens, setNecessaryItens] = useState();
  const [itemsToForge, setItemsToForge] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [addOrePriceToTotal, setAddOrePriceToTotal] = useState(false);
  const [oresPrice, setOresPrice] = useState({
    copperPrice: 0,
    tinPrice: 0,
    silverPrice: 0,
    ironPrice: 0,
    goldPrice: 0,
  });

  const updateItemsQuantityToForge = value => {
    if (value < 2) return setItemsToForge(1);
    if (value > 30) return setItemsToForge(30);
    setItemsToForge(value);
  };

  const calculateOres = () => {
    if (startUpgradeLvl >= desiredUpgradeLvl) {
      if (!showAlert) setShowAlert(!showAlert);
      setNecessaryItens();
      return;
    }

    const totalOres = calculateOreQuantityAndPrice(
      startUpgradeLvl,
      desiredUpgradeLvl,
      itemsToForge,
    );

    if (addOrePriceToTotal) {
      const newTotalPrice = calculateUpgradePriceWithOresPrice(
        totalOres,
        oresPrice,
      );
      setNecessaryItens(newTotalPrice);
      return;
    }
    setNecessaryItens(totalOres);
  };

  const changeOrePrices = (key, value) => {
    const newPrice = { ...oresPrice, [key]: Number(value) };
    localStorage.setItem('savedOrePrices', JSON.stringify(newPrice));
    setOresPrice(newPrice);
  };

  useEffect(() => {
    const savedPrices = JSON.parse(localStorage.getItem('savedOrePrices'));
    if (!savedPrices) return;

    setOresPrice(savedPrices);
  }, []);

  return (
    <div className="container ore-upgrader-container">
      <Head>
        <title>{text.title}</title>

        {locales.map(loc => {
          return (
            <link
              rel="alternate"
              hrefLang={loc}
              href={`https://www.kakeletools.com/${loc}/upgrades`}
              key={loc}
            />
          );
        })}
        <meta name="description" content={text.description} />
        <meta property="og:title" content={text.title} key="title" />
        <link rel="canonical" href="https://www.kakeletools.com/upgrades" />
      </Head>

      <h1>{text.title}</h1>
      <div className="d-flex flex-column ore-upgrader-filter-container">
        <UpgradeSelector
          elementId="upgrade-inicial"
          labelText={text.startUpgrade}
          onChange={setStartUpgradeLvl}
          optionsArray={UPGRADES_STAGES}
        />
        <UpgradeSelector
          elementId="upgrade-final"
          labelText={text.finishUpgrade}
          onChange={setDesiredUpgradeLvl}
          optionsArray={UPGRADES_STAGES}
        />
        <div className="input-group mb-2">
          <span className="input-group-text" id="how-many-items-to-forge">
            {text.howManyItems}
          </span>
          <input
            type="number"
            className="form-control"
            placeholder={text.howManyItemsTollTip}
            aria-label={text.howManyItemsTollTip}
            aria-describedby="how-many-items-to-forge"
            value={itemsToForge}
            onChange={e => updateItemsQuantityToForge(e.target.value)}
          />
        </div>
        <InputCheckBox
          labelText={text.buyOres}
          id="adicionarPrecoMinerios"
          onChangeFunc={setAddOrePriceToTotal}
          changeOnCheck={addOrePriceToTotal}
        />
        {addOrePriceToTotal && (
          <OrePriceUpdater
            oresPrice={oresPrice}
            setOresPrice={changeOrePrices}
            text={text}
          />
        )}
        <ButtonForKakele onClick={calculateOres} text="Calcular" />
        {necessaryItens && (
          <div>
            <h3>{text.necessaryItens}:</h3>
            <div>
              {text.kks}: {addDotToKks(necessaryItens.kks)}
            </div>
            <div>
              {text.copperOre}: {necessaryItens.cobre}
            </div>
            <div>
              {text.tinOre}: {necessaryItens.estanho}
            </div>
            <div>
              {text.silverOre}: {necessaryItens.prata}
            </div>
            <div>
              {text.ironOre}: {necessaryItens.ferro}
            </div>
            <div>
              {text.goldOre}: {necessaryItens.ouro}
            </div>
          </div>
        )}
        {showAlert && (
          <Alert
            message={text.alert}
            timeOut={2000}
            hideFunc={() => setShowAlert(!showAlert)}
          />
        )}
      </div>
    </div>
  );
}
