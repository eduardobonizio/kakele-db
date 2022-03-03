import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';
import Input from '../../componentes/inputs/Input';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import { blessJsx as textOptions } from '../../data/dataLanguages';
import { filterItemsByName, findItemByName } from '../../data/kakeleActions';
import { equipments, weapons } from '../../data/kakeleData';
import style from './Bless.module.css';
import { findItensToSacrifice } from './selectBlessItens';

const Bless = () => {
  const { query, locale } = useRouter();
  const text = textOptions[locale];
  const [itemName, setItemName] = useState('');
  const [foundItems, setFoundItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [ignoredItems, setiIgnoredItems] = useState(["Elora's Bow"]);
  const [desiredBless, setDesiredBless] = useState(1);

  const searchItem = searchText => {
    setItemName(searchText);
    const allItems = [...equipments, ...weapons];
    const result = filterItemsByName(allItems, searchText, locale);
    setFoundItems(result);
  };

  const updateShowItem = item => {
    const allItems = [...equipments, ...weapons];
    const foundItem = findItemByName(allItems, item);
    setSelectedItem(foundItem);
    setItemName('');
  };

  useEffect(() => {
    updateShowItem(query.item);
  }, [query.item]);

  return (
    <div className="container d-flex flex-column justify-content-around align-items-center">
      <h1>{text.h1}</h1>

      <inputContainer className={style.searchInput}>
        <Input
          type="text"
          value={itemName}
          onChange={e => searchItem(e.target.value)}
          labelText={text.searchLabel}
          placeholder={text.searchPlaceHolder}
        />
      </inputContainer>

      {itemName &&
        foundItems.map((suggestion, index) => {
          if (!suggestion) return false;
          return (
            <div key={index}>
              <Link
                href={`/bless?item=${suggestion['en']}`}
                locale={locale}
                passHref
              >
                <LinkButton
                  onClick={() => updateShowItem(suggestion['en'])}
                  text={suggestion[locale]}
                />
              </Link>
            </div>
          );
        })}

      {query.item && selectedItem ? (
        <div>
          <ButtonForKakele
            onClick={() =>
              findItensToSacrifice(
                [...weapons, ...equipments],
                selectedItem,
                desiredBless,
                ignoredItems,
              )
            }
            text="chama func"
            type="button"
          />

          <input
            type="number"
            min={1}
            max={10}
            value={desiredBless}
            onChange={e => {
              if (e.target.value > 10) return setDesiredBless(10);
              if (e.target.value < 1) return setDesiredBless(1);
              return setDesiredBless(e.target.value);
            }}
          />
          <ItemCard index={0} item={selectedItem} locale={locale} />
        </div>
      ) : (
        <div>Escolha um item</div>
      )}
    </div>
  );
};

export default Bless;
