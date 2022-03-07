import Head from 'next/head';
import { useRouter } from 'next/router';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import { NEW_ITEMS } from '../../data/kakeleData';
import styles from './NewItems.module.css';
import { newItemsJsx as textOptions } from '../../data/dataLanguages';

const NewItemsPage = () => {
  const { locale, locales } = useRouter();
  const text = textOptions[locale];
  const newItems = NEW_ITEMS;
  return (
    <div className={`container ${styles.mainContainer}`}>
      <Head>
        <title>{text.title}</title>

        {locales.map(loc => {
          return (
            <link
              rel="alternate"
              hrefLang={loc}
              href={`https://www.kakeletools.com/${loc}/new-items`}
              key={loc}
            />
          );
        })}
        <meta name="description" content={text.description} />
        <meta property="og:title" content={text.title} key="title" />
        <link rel="canonical" href="https://www.kakeletools.com/new-items" />
      </Head>
      <h1 className={styles.title}>{text.title}</h1>
      <div className={`row row-cols-auto ${styles.row}`}>
        {newItems
          .sort((a, b) => a.en - b.en)
          .map((item, index) => (
            <div className={`col ${styles.col}`} key={item[locale]}>
              <ItemCard index={index} item={item} locale={locale} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewItemsPage;
