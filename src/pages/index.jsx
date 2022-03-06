import Head from 'next/head';
import { useRouter } from 'next/router';
import { homeText as textOptions } from '../data/dataLanguages';

export default function HomeContent() {
  const { locale, locales } = useRouter();
  const text = textOptions[locale];

  return (
    <div className="container d-flex flex-column justify-content-center align-content-center">
      <Head>
        <title>{text.title}</title>
        {locales.map(loc => {
          return (
            <link
              rel="alternate"
              hrefLang={loc}
              href={`https://www.kakeletools.com/${loc}`}
              key={loc}
            />
          );
        })}
        <link
          rel="alternate"
          hrefLang="en"
          href={`https://www.kakeletools.com/`}
          key="defaulthome"
        />
        <meta name="description" content={text.description} />
        <meta property="og:title" content={text.title} key="title" />
        <link rel="canonical" href="https://www.kakeletools.com/" />
      </Head>
      <span className="d-flex align-self-center mt-3 mb-3">
        <h1>{text.h1}</h1>
      </span>
    </div>
  );
}
