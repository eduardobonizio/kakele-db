import style from './LevelCalculator.module.css';
import { useState } from 'react';

import Input from '../../componentes/inputs/Input';
import { useAppContext } from '../../context/appContext/useAppState';
import { addDotToKks } from '../../data/kakeleActions';
import { totalExpToLevel } from '../../data/KakeleLevelCalc';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';

export default function LevelCalculator() {
  const {
    state: { language },
  } = useAppContext();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [desiredLevel, setDesiredLevel] = useState(2);
  const [totalExp, setTotalExp] = useState(0);
  const [result, setResult] = useState(0);

  const calExp = event => {
    event.preventDefault();
    const startingExp = totalExpToLevel(currentLevel);
    const subtract = startingExp > totalExp ? startingExp : totalExp;
    const result = totalExpToLevel(desiredLevel) - subtract;
    const total = result >= 0 ? result : 0;
    setResult(total);
  };

  return (
    <div className="container d-flex justify-content-around">
      <div className={`form-group row ${style.formContainer}`}>
        <form action="" onSubmit={e => calExp(e)}>
          <Input
            type="number"
            value={currentLevel}
            onChange={e => setCurrentLevel(e.target.value)}
            labelText="Level inicial: "
          />
          <Input
            type="number"
            value={desiredLevel}
            labelText="Level desejado: "
            onChange={e => setDesiredLevel(e.target.value)}
          />
          <Input
            type="number"
            value={totalExp}
            labelText="Sua exp total: "
            onChange={e => setTotalExp(e.target.value)}
          />
          <div className="d-flex justify-content-around">
            <ButtonForKakele type="submit" text={'calcular'} />
          </div>
        </form>
        <div className="d-flex justify-content-around">
          <div>Exp total para upar: {addDotToKks(result)}</div>
        </div>
      </div>
    </div>
  );
}
