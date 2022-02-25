import Head from 'next/head';
import { useRouter } from 'next/router';
import { homeContentJsx as textOptions } from '../data/dataLanguages';

export default function HomeContent() {
  const { locale } = useRouter();
  const text = textOptions[locale];

  return (
    <div className="container d-flex flex-column justify-content-center align-content-center">
      <Head>
        <title>Kakele MMORPG</title>
        <meta
          name="description"
          content="Create and share sets with your friends with auto set generator, manual set generator. Also Exp calculator, upgrade calculator and items informations"
        />
        <meta property="og:title" content="Kakele MMORPG" key="title" />
      </Head>

      <span className="d-flex align-self-center mt-3 mb-3">{locale}</span>
    </div>
  );
}
