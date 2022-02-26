import Head from 'next/head';
import styles from './SearchItem.module.css';
import React, { useState } from 'react';
import Link from 'next/link';

import { useAppContext } from '../../context/appContext/useAppState';
import { searchItemJsx as textOptions } from '../../data/dataLanguages';
import {
  filterItensByElement,
  filterItensByLevelAndClass,
  filterItensBySlot,
  findItemsByName,
} from '../../data/kakeleActions';
import { equipments, weapons } from '../../data/kakeleData';

import KakeleItemsFilters from '../../componentes/others/KakeleItemsFilters';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';
import { useRouter } from 'next/router';

export default function SearchItem() {
  const {
    state: { level, itemName, element, slot, characterClass, orderBy },
  } = useAppContext();
  const { locale, locales } = useRouter();
  const text = textOptions[locale];
  const [foundItens, setFoundItens] = useState(false);

  const lookForItens = () => {
    const itensList = filterItensByLevelAndClass(
      [...equipments, ...weapons],
      level,
      characterClass,
    );

    const itensListBySlot = filterItensBySlot(itensList, slot, [])
      .sort((a, b) => b.level - a.level)
      .sort((a, b) => b[orderBy] - a[orderBy]);

    const itensListByElement = filterItensByElement(itensListBySlot, element);

    const itensListByName = findItemsByName(itensListByElement, itemName);

    const result = itensListByName || itensListByElement;

    setFoundItens(result);
  };

  return (
    <div className={`container d-flex ${styles.container}`}>
      <Head>
        <title>{text.title}</title>

        {locales.map(loc => {
          return (
            <link
              rel="alternate"
              hrefLang={loc}
              href={`https://www.kakeletools.com/${loc}/search-item`}
              key={loc}
            />
          );
        })}
        <meta name="description" content={text.description} />
        <meta property="og:title" content={text.title} key="title" />
      </Head>
      <div className={`d-flex d-flex flex-column ${styles.filters}`}>
        <KakeleItemsFilters manualFilters locale={locale} />
        <div className="container-fluid d-flex justify-content-around">
          <ButtonForKakele onClick={lookForItens} text={text.search} />
          <Link href="/set-viewer" passHref locale={locale}>
            <LinkButton text={text.showSet} />
          </Link>
        </div>
      </div>
      <div className={`row row-cols-auto ${styles.row}`}>
        {foundItens.length > 0 ? (
          foundItens.map((item, i) => {
            if (item) {
              return (
                <div className={`col ${styles.col}`} key={item[locale]}>
                  <ItemCard index={i} item={item} locale={locale} />
                </div>
              );
            }
            return false;
          })
        ) : (
          <span>{text.notFound}</span>
        )}
      </div>
    </div>
  );
}
