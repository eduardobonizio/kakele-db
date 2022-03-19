import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import NEW_ITEMS from '../../data/newItems.json';
import styles from './NewItems.module.css';
import { newItemsJsx as textOptions } from '../../data/dataLanguages';
import { loadAndAddMissingItems } from '../../data/kakeleActions';

const NewItemsPage = () => {
  const { locale, locales } = useRouter();
  const text = textOptions[locale];
  const [newItems, setNewItems] = useState(NEW_ITEMS);
  const [currentSet, setCurrentSet] = useState(loadAndAddMissingItems(locale));

  const updateOneItemOnly = (oldItem, newItem) => {
    const items = [...newItems];
    const index = items.indexOf(oldItem);
    items[index] = newItem;
    setNewItems(items);
  };

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
              <ItemCard
                index={index}
                item={item}
                locale={locale}
                onlyOneItem="true"
                updatedRecomendedSet={i => updateOneItemOnly(item, i)}
                currentSet={currentSet}
                updateCurrentSet={setCurrentSet}
                recomendedSet={item}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewItemsPage;
