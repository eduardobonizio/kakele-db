import Image from 'next/image';
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
  const [ignoredItems, setIgnoredItems] = useState([]);
  const [desiredBless, setDesiredBless] = useState(1);
  const [currentBless, setCurrentBless] = useState(0);
  const [itensToSacrifice, setItensToSacrifice] = useState(false);

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
    <div className={`container ${style.mainContainer}`}>
      <h1>{text.h1}</h1>
      <div className={style.content}>
        <div className={style.filtersContainer}>
          <div className={style.searchInput}>
            <Input
              type="text"
              value={itemName}
              onChange={e => searchItem(e.target.value)}
              labelText={text.searchLabel}
              placeholder={text.searchPlaceHolder}
            />
          </div>

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
              Bless atual{`  `}
              <input
                type="number"
                min={0}
                max={9}
                value={currentBless}
                onChange={e => {
                  if (e.target.value > 9) return setCurrentBless(9);
                  if (e.target.value < 0) return setCurrentBless(0);
                  return setCurrentBless(e.target.value);
                }}
              />
              <br />
              Bless desejada{`  `}
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
              <br />
              <div className="d-flex justify-content-between">
                <ButtonForKakele
                  onClick={() => {
                    const toSacrifice = findItensToSacrifice(
                      [...weapons, ...equipments],
                      selectedItem,
                      currentBless,
                      desiredBless,
                      ignoredItems,
                    );
                    setItensToSacrifice(toSacrifice);
                  }}
                  text="calcular"
                  type="button"
                />
                <ButtonForKakele
                  onClick={() => {
                    const toSacrifice = findItensToSacrifice(
                      [...weapons, ...equipments],
                      selectedItem,
                      currentBless,
                      desiredBless,
                      ignoredItems,
                    );
                    setItensToSacrifice(toSacrifice);
                  }}
                  text="Resetar ignorados"
                  type="button"
                />
              </div>
              <ItemCard index={0} item={selectedItem} locale={locale} />
            </div>
          ) : (
            <div>Escolha um item</div>
          )}
        </div>
        <div>
          {itensToSacrifice &&
            itensToSacrifice.map((item, i) => {
              return (
                <div key={`${item['en']}${i}`} className={style.resultCard}>
                  <div>
                    <Image
                      src={item.imgUrl.replace('"', '').replace('"', '')}
                      alt={item[locale]}
                      width="32"
                      height="32"
                    />
                  </div>
                  <div className="d-flex flex-column me-2">
                    <div>Item: {item[locale]}</div>
                    <div>
                      {`Quantidade para sacrificar: ${item.quantityToSacrifice}`}
                    </div>
                    <div>lvl: {item.level}</div>

                    <div>
                      <input
                        type="checkbox"
                        id={`ignore${item[locale]}`}
                        name="scales"
                        onClick={e => {
                          if (e.target.checked) {
                            return setIgnoredItems([
                              ...ignoredItems,
                              item['en'],
                            ]);
                          }
                          const removeThisItem = ignoredItems.filter(
                            curItem => curItem !== item['en'],
                          );
                          setIgnoredItems(removeThisItem);
                        }}
                      />
                      <label htmlFor={`ignore${item[locale]}`}>
                        Trocar Item
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Bless;
