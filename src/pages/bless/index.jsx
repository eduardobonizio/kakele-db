import Head from 'next/head';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Alert from '../../componentes/alert/Alert';
import ButtonForKakele from '../../componentes/buttons/buttton-for-kakele/ButtonForKakele';
import LinkButton from '../../componentes/buttons/link-as-button/LinkButton';
import Input from '../../componentes/inputs/Input';
import BlessSelector from '../../componentes/others/BlessSelector';
import ItemCard from '../../componentes/others/item-card/ItemCard';
import SacrificeItemCard from '../../componentes/others/sacrifice-item-card/SacrificeItemCard';
import { blessJsx as textOptions } from '../../data/dataLanguages';
import {
  addDotToKks,
  filterItemsByName,
  findItemByName,
  loadAndAddMissingItems,
  loadSetFromLocalStorage,
} from '../../data/kakeleActions';
import {
  BLESS_OPTIONS,
  equipments,
  FAKE_SET,
  weapons,
} from '../../data/kakeleData';
import {
  calcBlessPrice,
  findItensToSacrifice,
  RARITY_BONUS,
} from '../../lib/bless';
import style from './Bless.module.css';

const Bless = () => {
  const { query, locale, locales } = useRouter();
  const text = textOptions[locale];
  const [itemName, setItemName] = useState('');
  const [foundItems, setFoundItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [ignoredItems, setIgnoredItems] = useState([]);
  const [desiredBless, setDesiredBless] = useState(0);
  const [currentBless, setCurrentBless] = useState(0);
  const [blessModifier, setBlessModifier] = useState(0);
  const [showStars, setShowStars] = useState(0);
  const [itensToSacrifice, setItensToSacrifice] = useState(false);
  const [totalBlessPrice, setTotalBlessPrice] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [currentSet, setCurrentSet] = useState(FAKE_SET);

  const searchItem = searchText => {
    setItemName(searchText);
    const allItems = [...equipments, ...weapons];
    const result = filterItemsByName(allItems, searchText, locale);
    setFoundItems(result);
  };

  const updateShowItem = (item, currSet = false) => {
    const allItems = [...equipments, ...weapons];
    const foundItem = findItemByName(allItems, item);
    const equipedItem = currSet[foundItem.slot] || currentSet[foundItem.slot];

    const useEquippedItem =
      equipedItem && equipedItem.level > 0 && equipedItem.en === foundItem.en;

    setSelectedItem(useEquippedItem ? equipedItem : foundItem);
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
    setShowStars(desiredBless);
    setItensToSacrifice(toSacrifice);
    setTotalBlessPrice(price);
    setBlessModifier(RARITY_BONUS[selectedItem.rarity.en][desiredBless]);
  };

  const changeItem = iName => {
    updateShowItem(iName);
    setIgnoredItems([]);
    setFoundItems([]);
    setIgnoredItems([]);
    setItensToSacrifice(false);
    setShowStars(0);
    setBlessModifier(0);
  };

  useEffect(() => {
    const storedSet = loadSetFromLocalStorage() || [];
    const curSet = loadAndAddMissingItems(locale, storedSet, storedSet);
    setCurrentSet(curSet);

    changeItem(query.item);
    updateShowItem(query.item, curSet);
    const ignored =
      JSON.parse(localStorage.getItem('ignoredSacrificeItens')) || '';
    setIgnoredItems(ignored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, query.item]);

  return (
    <div className={`container ${style.mainContainer}`}>
      <Head>
        <title>{text.title}</title>
        {locales.map(loc => {
          return (
            <link
              rel="alternate"
              hrefLang={loc}
              href={`https://www.kakeletools.com/${loc}/bless`}
              key={loc}
            />
          );
        })}
        <meta name="description" content={text.description} />
        <meta property="og:title" content={text.title} key="title" />
        <link rel="canonical" href="https://www.kakeletools.com/bless" />
      </Head>
      {showErrorMessage && (
        <Alert
          message={text.alert}
          timeOut={2000}
          hideFunc={() => setShowErrorMessage(!showErrorMessage)}
        />
      )}

      <h1>{text.title}</h1>
      <div className={style.searchInput}>
        <Input
          type="text"
          value={itemName}
          onChange={e => searchItem(e.target.value)}
          labelText={text.searchLabel}
          placeholder={text.searchPlaceHolder}
          autocomplete="off"
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
        {!selectedItem && <span>{text.chooseItem}</span>}
      </div>
      <div className={style.content}>
        <div className={style.filtersContainer}>
          {query.item && selectedItem && (
            <div>
              <ItemCard
                index={0}
                item={selectedItem}
                locale={locale}
                blessModifier={blessModifier}
                blessQuantity={showStars}
                recomendedSet={selectedItem}
                currentSet={currentSet}
                updateCurrentSet={setCurrentSet}
                updatedRecomendedSet={i => setSelectedItem(i)}
                onlyOneItem="true"
              />
              <BlessSelector
                elementId="bless-atual"
                labelText={text.actualBless}
                value={currentBless}
                onChange={value => {
                  if (value > 9) return setCurrentBless(9);
                  if (value < 0) return setCurrentBless(0);
                  return setCurrentBless(value);
                }}
                optionsArray={[...BLESS_OPTIONS]}
              />
              <BlessSelector
                elementId="bless-desejada"
                labelText={text.desiredBless}
                value={desiredBless}
                onChange={value => {
                  if (value > 10) return setDesiredBless(10);
                  if (value < 0) return setDesiredBless(0);
                  return setDesiredBless(value);
                }}
                optionsArray={[...BLESS_OPTIONS]}
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
          {/* {totalBlessPrice > 0 && itensToSacrifice.length > 0 && (
            <div className={style.kksResult}>
              <span>{`${text.priceText}: ${addDotToKks(
                totalBlessPrice,
              )}`}</span>
            </div>
          )} */}
          {itensToSacrifice && (
            <div className={style.kksResult}>
              <span>Itens necessários</span>
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
