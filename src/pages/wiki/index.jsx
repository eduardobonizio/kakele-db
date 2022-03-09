import Head from 'next/head';
import styles from './ShowItem.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import ItemCard from '../../componentes/others/item-card/ItemCard';

import { showItemJsx as textOptions } from '../../data/dataLanguages';
import { equipments, FAKE_SET, weapons } from '../../data/kakeleData';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';
import Input from '../../componentes/inputs/Input';
import {
  filterItemsByName,
  findItemByName,
  loadAndAddMissingItems,
} from '../../data/kakeleActions';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';

export default function ShowItem() {
  const { locale, locales } = useRouter();
  const text = textOptions[locale];
  const [currentSet, setCurrentSet] = useState(FAKE_SET);
  const [item, setItem] = useState({ ...equipments[0] });
  const [itemName, setItemName] = useState('');
  const [foundItems, setFoundItems] = useState([]);
  const [otherItems, setOtherItems] = useState({
    previous: weapons[weapons.length - 1].en,
    next: equipments[1].en,
  });

  const searchItem = searchText => {
    setItemName(searchText);
    const allItems = [...equipments, ...weapons];
    const result = filterItemsByName(allItems, searchText, locale);
    setFoundItems(result);
  };
  const changeItem = itemName => {
    const allItens = [...equipments, ...weapons];
    const newItem = findItemByName(allItens, itemName, locale);
    const itemIndex = allItens.indexOf(newItem);

    const previous = itemIndex < 1 ? allItens.length - 1 : itemIndex - 1;

    const nextIndex = itemIndex >= allItens.length - 1 ? 0 : itemIndex + 1;

    setItem(newItem);
    setOtherItems({
      previous: allItens[previous].en,
      next: allItens[nextIndex].en,
    });
    setItemName('');
  };

  useEffect(() => {
    const curSet = loadAndAddMissingItems(locale);
    if (curSet[item.slot].en === item.en) setItem(curSet[item.slot]);
    setCurrentSet(curSet);
  }, [item.en, item.slot, locale]);

  return (
    <div className={`container ${styles.itemContainer}`}>
      <Head>
        <title>{`${text.title}`}</title>

        {locales.map(loc => {
          return (
            <link
              rel="alternate"
              hrefLang={loc}
              href={`https://www.kakeletools.com/${loc}/wiki`}
              key={loc}
            />
          );
        })}
        <meta name="description" content={text.description} />
        <meta property="og:title" content={text.description} key="title" />
        <link rel="canonical" href="https://www.kakeletools.com/wiki" />
      </Head>
      <h1>{text.title}</h1>
      <div className={styles.searchInput}>
        <Input
          type="text"
          value={itemName}
          onChange={e => searchItem(e.target.value)}
          labelText={text.searchLabel}
          placeholder={text.searchPlaceHolder}
          autocomplete="off"
        />

        {itemName && (
          <ul className={styles.searchResult}>
            {foundItems.map((suggestion, index) => {
              if (!suggestion) return false;
              return (
                <li key={index}>
                  <Link href="/wiki" locale={locale} passHref>
                    <LinkButton
                      onClick={() => changeItem(suggestion['en'])}
                      text={suggestion[locale]}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className={`${styles.buttonContainer}`}>
        <ButtonForKakele
          onClick={() => changeItem(otherItems.previous)}
          text={text.previous}
          type="buttom"
        />
        <Link href="/set-viewer" passHref locale={locale}>
          <LinkButton text={text.showSet} />
        </Link>
        <ButtonForKakele
          onClick={() => changeItem(otherItems.next)}
          text={text.next}
          type="buttom"
        />
      </div>
      <div className="row">
        <ItemCard
          item={item}
          locale={locale}
          currentSet={currentSet}
          recomendedSet={item}
          updateCurrentSet={setCurrentSet}
          updatedRecomendedSet={item => setItem(item)}
          onlyOneItem="true"
        />
      </div>
    </div>
  );
}
