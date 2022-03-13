import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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
  const [showAlert, setShowAlert] = useState(false);
  const [addOrePriceToTotal, setAddOrePriceToTotal] = useState(false);
  const [oresPrice, setOresPrice] = useState({
    copperPrice: 0,
    tinPrice: 0,
    silverPrice: 0,
    ironPrice: 0,
    goldPrice: 0,
  });

  const calculateOres = () => {
    if (startUpgradeLvl >= desiredUpgradeLvl) {
      if (!showAlert) setShowAlert(!showAlert);
      setNecessaryItens();
      return;
    }

    const totalOres = calculateOreQuantityAndPrice(
      startUpgradeLvl,
      desiredUpgradeLvl,
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
        <InputCheckBox
          labelText={text.buyOres}
          id="adicionarPrecoMinerios"
          onChangeFunc={setAddOrePriceToTotal}
          changeOnCheck={addOrePriceToTotal}
        />
        {addOrePriceToTotal && (
          <OrePriceUpdater
            oresPrice={oresPrice}
            setOresPrice={setOresPrice}
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
