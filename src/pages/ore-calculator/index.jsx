import Head from 'next/head';
import React, { useState } from 'react';
import Alert from '../../componentes/alert/Alert';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import InputCheckBox from '../../componentes/inputs/InputCheckBox';
import OrePriceUpdater from '../../componentes/others/OrePriceUpdater';
import UpgradeSelector from '../../componentes/others/UpgradeSelector';
import { useAppContext } from '../../context/appContext/useAppState';

import { oreCalculatorJsx as textOptions } from '../../data/dataLanguages';
import {
  activateAlert,
  addDotToKks,
  calculateOreQuantityAndPrice,
  calculateUpgradePriceWithOresPrice,
} from '../../data/kakeleActions';

export default function OreCalculator() {
  const {
    state: { language },
  } = useAppContext();
  const text = textOptions[language];

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
      if (!showAlert) activateAlert(setShowAlert);
      setNecessaryItens();
      return;
    }

    const totalOres = calculateOreQuantityAndPrice(desiredUpgradeLvl);

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
        <title>Kakele Tools - Upgrade calculator</title>
        <meta
          property="og:title"
          content="Kakele Tools - Upgrade calculator"
          key="title"
        />
      </Head>
      <div className="d-flex flex-column ore-upgrader-filter-container">
        <UpgradeSelector
          elementId="upgrade-inicial"
          labelText={text.startUpgrade}
          onChange={setStartUpgradeLvl}
        />
        <UpgradeSelector
          elementId="upgrade-final"
          labelText={text.finishUpgrade}
          onChange={setDesiredUpgradeLvl}
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
        {showAlert && <Alert message={text.alert} />}
      </div>
    </div>
  );
}
