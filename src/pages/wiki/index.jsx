import Head from 'next/head';
import styles from './ShowItem.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ItemCard from '../../componentes/others/item-card/ItemCard';

import { showItemJsx as textOptions } from '../../data/dataLanguages';
import { equipments, weapons } from '../../data/kakeleData';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';

export default function ShowItem() {
  const { query, locale } = useRouter();
  const allItens = [...equipments, ...weapons];
  const [item, setItem] = useState(allItens[0]);
  const [previousItemLink, setPreviousItemLink] = useState(
    `/wiki/${allItens[allItens.length - 1][locale]}`,
  );
  const [nextItemLink, setNextItemLink] = useState(
    `/wiki/${allItens[1][locale]}`,
  );
  const text = textOptions[locale];

  useEffect(() => {
    if (Object.keys(query).length > 0) {
      const [itemName] = query.item;
      const currentItem = allItens.find(
        e => e[locale] === itemName || e.namePTBR === itemName,
      );
      if (currentItem) {
        const itemIndex = allItens.indexOf(currentItem);
        const previousIndex =
          itemIndex < 1 ? allItens.length - 1 : itemIndex - 1;
        const nextIndex = itemIndex >= allItens.length - 1 ? 0 : itemIndex + 1;
        setPreviousItemLink(`/wiki/${allItens[previousIndex][locale]}`);
        setNextItemLink(`/wiki/${allItens[nextIndex][locale]}`);
        setItem(currentItem);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className={`container ${styles.itemContainer}`}>
      <Head>
        <title>Equipment Wiki - Kakele MMORPG</title>
        <meta
          name="description"
          content="See all items description, sources, and more informations of all items from Kakele MMORPG"
        />
        <meta
          property="og:title"
          content="Equipment Wiki - Kakele MMORPG"
          key="title"
        />
      </Head>
      <div className={`${styles.buttonContainer}`}>
        <Link href={previousItemLink} passHref>
          <LinkButton text={text.previous} />
        </Link>
        <Link href="/set" passHref>
          <LinkButton text={text.showSet} />
        </Link>
        <Link href={nextItemLink} passHref>
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
