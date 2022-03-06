import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Alert from '../../componentes/alert/Alert';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';
import Input from '../../componentes/inputs/Input';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import SacrificeItemCard from '../../componentes/others/sacrifice-item-card/SacrificeItemCard';
import UpgradeSelector from '../../componentes/others/UpgradeSelector';
import { blessJsx as textOptions } from '../../data/dataLanguages';
import {
  addDotToKks,
  filterItemsByName,
  findItemByName,
} from '../../data/kakeleActions';
import { BLESS_OPTIONS, equipments, weapons } from '../../data/kakeleData';
import { calcBlessPrice, findItensToSacrifice } from '../../lib/bless';
import style from './Bless.module.css';

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
  const [totalBlessPrice, setTotalBlessPrice] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

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

  const updateIgnoredItens = (saveItem, item) => {
    const itensToIgnore = [...ignoredItems, item];
    localStorage.setItem(
      'ignoredSacrificeItens',
      JSON.stringify(itensToIgnore),
    );
    setIgnoredItems(itensToIgnore);
    findItens(itensToIgnore);
  };

  const resetIgnoredItens = () => {
    localStorage.removeItem('ignoredSacrificeItens');
    setIgnoredItems([]);
    findItens([]);
  };

  const findItens = itensToIgnore => {
    if (currentBless >= desiredBless) {
      !showErrorMessage && setShowErrorMessage(!showErrorMessage);
      return;
    }
    const ignore = itensToIgnore || ignoredItems;
    const toSacrifice = findItensToSacrifice(
      [...weapons, ...equipments],
      selectedItem,
      currentBless,
      desiredBless,
      ignore,
    );

    const price = calcBlessPrice(
      selectedItem.rarity.en,
      currentBless,
      desiredBless,
    );
    setItensToSacrifice(toSacrifice);
    setTotalBlessPrice(price);
  };

  const changeItem = iName => {
    updateShowItem(iName);
    setIgnoredItems([]);
    findItens([]);
    setFoundItems([]);
    setIgnoredItems([]);
    setItensToSacrifice(false);
  };

  useEffect(() => {
    updateShowItem(query.item);
    const ignored =
      JSON.parse(localStorage.getItem('ignoredSacrificeItens')) || '';
    setIgnoredItems(ignored);
  }, [query.item]);

  return (
    <div className={`container ${style.mainContainer}`}>
      {showErrorMessage && (
        <Alert
          message="Bless atual não pode ser maior que a Bless desejada"
          timeOut={2000}
          hideFunc={() => setShowErrorMessage(!showErrorMessage)}
        />
      )}

      <h1>{text.h1}</h1>
      <div className={style.searchInput}>
        <Input
          type="text"
          value={itemName}
          onChange={e => searchItem(e.target.value)}
          labelText={text.searchLabel}
          placeholder={text.searchPlaceHolder}
        />

        {itemName && (
          <ul className={style.searchResult}>
            {foundItems.map((suggestion, index) => {
              if (!suggestion) return false;
              return (
                <li key={index}>
                  <Link
                    href={`/bless?item=${suggestion['en']}`}
                    locale={locale}
                    passHref
                  >
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
        {!selectedItem && <span>Escolha um item</span>}
      </div>
      <div className={style.content}>
        <div className={style.filtersContainer}>
          {query.item && selectedItem && (
            <div>
              <ItemCard index={0} item={selectedItem} locale={locale} />
              <UpgradeSelector
                elementId="bless-atual"
                labelText={text.actualBless}
                onChange={value => {
                  if (value > 9) return setCurrentBless(9);
                  if (value < 0) return setCurrentBless(0);
                  return setCurrentBless(value);
                }}
                optionsArray={BLESS_OPTIONS}
              />
              <UpgradeSelector
                elementId="bless-desejada"
                labelText={text.desiredBless}
                onChange={value => {
                  if (value > 10) return setDesiredBless(10);
                  if (value < 1) return setDesiredBless(1);
                  return setDesiredBless(value);
                }}
                optionsArray={[...BLESS_OPTIONS].slice(1, BLESS_OPTIONS.length)}
              />
              <div className="d-flex justify-content-between">
                <ButtonForKakele
                  onClick={() => findItens()}
                  text={text.search}
                  type="button"
                />
                <ButtonForKakele
                  onClick={() => resetIgnoredItens()}
                  text={text.resetIgnored}
                  type="button"
                />
              </div>
            </div>
          )}
        </div>
        <div>
          {totalBlessPrice > 0 && itensToSacrifice.length > 0 && (
            <div className={style.kksResult}>
              <span>Cash Total (KKs): {addDotToKks(totalBlessPrice)}</span>
            </div>
          )}
          {itensToSacrifice &&
            itensToSacrifice.map((item, i) => {
              return (
                <SacrificeItemCard
                  key={`${item['en']}${i}`}
                  style={style}
                  item={item}
                  locale={locale}
                  updateIgnoredItens={updateIgnoredItens}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Bless;
