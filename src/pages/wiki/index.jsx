import Head from 'next/head';
import styles from './ShowItem.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ItemCard from '../../componentes/others/item-card/ItemCard';

import { showItemJsx as textOptions } from '../../data/dataLanguages';
import { equipments, weapons } from '../../data/kakeleData';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';

export default function ShowItem() {
  const { query, locale, locales } = useRouter();

  const text = textOptions[locale];
  const allItens = [...equipments, ...weapons];
  const itemName = query.item || allItens[0]['en'];
  const currentItem = allItens.find(
    e => e[locale] === itemName || e['en'] === itemName,
  );
  const itemIndex = allItens.indexOf(currentItem);
  const previousIndex = itemIndex < 1 ? allItens.length - 1 : itemIndex - 1;
  const nextIndex = itemIndex >= allItens.length - 1 ? 0 : itemIndex + 1;

  const [item, setItem] = useState(false);
  const [previousItemLink, setPreviousItemLink] = useState(
    `/wiki?item=${allItens[previousIndex]['en']}`,
  );
  const [nextItemLink, setNextItemLink] = useState(
    `/wiki?item=${allItens[nextIndex]['en']}`,
  );

  if (item['en'] !== itemName) {
    setItem(currentItem);
    setPreviousItemLink(`/wiki?item=${allItens[previousIndex]['en']}`);
    setNextItemLink(`/wiki?item=${allItens[nextIndex]['en']}`);
  }

  return (
    <div className={`container ${styles.itemContainer}`}>
      <Head>
        <title>{`${item[locale]} ${text.title}`}</title>

        {locales.map(loc => {
          return (
            <link
              rel="alternate"
              hrefLang={loc}
              href={`https://www.kakeletools.com/${loc}/wiki?item=${itemName}`}
              key={loc}
            />
          );
        })}
        <meta
          name="description"
          content={`${item[locale]} ${text.oneItemDescription}`}
        />
        <meta
          property="og:title"
          content={`${item[locale]} ${text.title}`}
          key="title"
        />
        <link rel="canonical" href="https://www.kakeletools.com/wiki" />
      </Head>

      <div className={`${styles.buttonContainer}`}>
        <Link href={previousItemLink} passHref locale={locale}>
          <LinkButton text={text.previous} />
        </Link>
        <Link href="/set-viewer" passHref locale={locale}>
          <LinkButton text={text.showSet} />
        </Link>
        <Link href={nextItemLink} passHref locale={locale}>
          <LinkButton text={text.next} />
        </Link>
      </div>
      {item ? (
        <div className="row">
          <ItemCard item={item} locale={locale} />
        </div>
      ) : (
        <div>Item não encontrado</div>
      )}
    </div>
  );
}
