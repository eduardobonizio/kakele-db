import Head from 'next/head';
import style from './ExpCalculator.module.css';
import { useState } from 'react';

import Input from '../../componentes/inputs/Input';
import { addDotToKks } from '../../data/kakeleActions';
import { totalExpToLevel } from '../../data/kakeleLevelCalc';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import { expCalculatorJsx as textOptions } from '../../data/dataLanguages';
import { useRouter } from 'next/router';

export default function ExpCalculator() {
  const { locale, locales } = useRouter();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [desiredLevel, setDesiredLevel] = useState(2);
  const [totalExp, setTotalExp] = useState(0);
  const [result, setResult] = useState(0);

  const text = textOptions[locale];

  const calExp = event => {
    event.preventDefault();
    const startingExp = totalExpToLevel(currentLevel - 1);
    const subtract = startingExp > totalExp ? startingExp : totalExp;
    const result = totalExpToLevel(desiredLevel - 1) - subtract;
    const total = result >= 0 ? result : 0;
    setResult(total);
  };

  return (
    <div className="container d-flex flex-column justify-content-around align-items-center">
      <Head>
        <title>{text.title}</title>
        {locales.map(loc => {
          return (
            <link
              rel="alternate"
              hrefLang={loc}
              href={`https://www.kakeletools.com/${loc}/experience-calculator`}
              key={loc}
            />
          );
        })}
        <meta name="description" content={text.description} />
        <meta property="og:title" content={text.title} key="title" />
        <link
          rel="canonical"
          href="https://www.kakeletools.com/experience-calculator"
        />
      </Head>
      <h1>{text.title}</h1>
      <div className={`form-group row ${style.formContainer}`}>
        <form action="" onSubmit={e => calExp(e)}>
          <Input
            type="number"
            value={currentLevel}
            onChange={e => setCurrentLevel(e.target.value)}
            labelText={text.initialLevel}
          />
          <Input
            type="number"
            value={desiredLevel}
            labelText={text.desiredLevel}
            onChange={e => setDesiredLevel(e.target.value)}
          />
          <Input
            type="number"
            value={totalExp}
            labelText={text.totalExp}
            onChange={e => setTotalExp(e.target.value)}
          />
          <div className="d-flex justify-content-around">
            <ButtonForKakele type="submit" text={text.calculate} />
          </div>
        </form>
        <div className="d-flex justify-content-around">
          <span>{`${text.result} ${addDotToKks(result)}`}</span>
        </div>
      </div>
    </div>
  );
}
