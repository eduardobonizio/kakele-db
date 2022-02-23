import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import ItemCard from '../../componentes/ItemCard';
import { useAppContext } from '../../componentes/useAppState';
import { showItemJsx as textOptions } from '../../data/dataLanguages';
import { equipments, weapons } from '../../data/kakeleData';
import './ShowItem.module.css';

export default function ShowItem() {
  const router = useRouter();
  const allItens = [...equipments, ...weapons];
  const {
    state: { language },
  } = useAppContext();
  const [item, setItem] = useState(allItens[0]);
  const [previousItemLink, setPreviousItemLink] = useState(
    `/item/${allItens[allItens.length - 1].nameEN}`,
  );
  const [nextItemLink, setNextItemLink] = useState(
    `/item/${allItens[1].nameEN}`,
  );
  const text = textOptions[language];

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      const [itemName] = router.query.item;
      const currentItem = allItens.find(
        e => e.nameEN === itemName || e.namePTBR === itemName,
      );
      if (currentItem) {
        const itemIndex = allItens.indexOf(currentItem);
        const previousIndex =
          itemIndex < 1 ? allItens.length - 1 : itemIndex - 1;
        const nextIndex = itemIndex >= allItens.length - 1 ? 0 : itemIndex + 1;
        setPreviousItemLink(`/item/${allItens[previousIndex].nameEN}`);
        setNextItemLink(`/item/${allItens[nextIndex].nameEN}`);
        setItem(currentItem);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <div className="container d-flex flex-column align-items-center show-item-container">
      {item ? (
        <div className="row">
          <ItemCard item={item} />
        </div>
      ) : (
        <div>Item não encontrado</div>
      )}
      <div className="button-container">
        <Link href={previousItemLink}>
          <a>{text.previous}</a>
        </Link>
        <Link href="/set">
          <a>{text.showSet}</a>
        </Link>
        <Link href={nextItemLink}>
          <a>{text.next}</a>
        </Link>
      </div>
    </div>
  );
}
