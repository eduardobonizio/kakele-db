import Head from 'next/head';
import ButtonForKakele from '../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import { useAppContext } from '../context/appContext/useAppState';
import { homeContentJsx as textOptions } from '../data/dataLanguages';

export default function HomeContent() {
  const { state, actions } = useAppContext();
  const text = textOptions[state.language];

  const changeLanguage = newLanguage => {
    localStorage.setItem('language', newLanguage);
    actions.changeLanguage(newLanguage);
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-content-center">
      <Head>
        <title>Kakele Tools - Home</title>
        <meta
          name="description"
          content="Create and share sets with your friends with auto set generator, manual set generator. Exp calculator, upgrade calculator and items informations"
        />
        <meta property="og:title" content="Kakele Tools - Home" key="title" />
      </Head>

      <span className="d-flex align-self-center mt-3 mb-3">
        {text.selectLanguage}
      </span>
      <ButtonForKakele onClick={() => changeLanguage('EN')} text="English" />
      <ButtonForKakele
        onClick={() => changeLanguage('PTBR')}
        text="Português"
      />
    </div>
  );
}
