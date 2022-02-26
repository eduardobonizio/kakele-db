import Head from 'next/head';
import style from './ExpCalculator.module.css';
import { useState } from 'react';

import Input from '../../componentes/inputs/Input';
import { useAppContext } from '../../context/appContext/useAppState';
import { addDotToKks } from '../../data/kakeleActions';
import { totalExpToLevel } from '../../data/kakeleLevelCalc';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import { expCalculatorJsx as textOptions } from '../../data/dataLanguages';
import { useRouter } from 'next/router';

export default function ExpCalculator() {
  const { locale } = useRouter();
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
        <title>Exp Calculator - Kakele MMORPG</title>
        <meta name="description" content="Exp calculator for Kakele MMORPG" />
        <meta
          property="og:title"
          content="Exp Calculator - Kakele MMORPG"
          key="title"
        />
      </Head>
      <h3>{text.title}</h3>
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

// export async function getStaticProps({ params, locale }) {
//   const allItems = [...equipments, ...weapons];
//   const currentItem = allItems.find(item => item[locale] === params.name[0]);
//   const index = allItems.indexOf(currentItem);

//   const previousItem =
//     index <= 0 ? allItems[allItems.length - 1] : allItems[index - 1];
//   const nextItem =
//     index >= allItems.length - 1 ? allItems[0] : allItems[index + 1];
//   return {
//     props: {
//       item: currentItem,
//       previousItemLink: `/wiki/${previousItem[locale]}`,
//       nextItemLink: `/wiki/${nextItem[locale]}`,
//       locale,
//     },
//   };
// }

// export async function getStaticPaths({ locales }) {
//   const allPaths = locales
//     .map(locale => {
//       return [...equipments, ...weapons].map(item => {
//         if (!item[locale]) return;
//         return {
//           params: { name: [item[locale]] },
//           locale: locale,
//         };
//       });
//     })
//     .reduce((curr, next) => {
//       return [...curr, ...next];
//     }, []);

//   return {
//     paths: allPaths,
//     fallback: false,
//   };
// }
