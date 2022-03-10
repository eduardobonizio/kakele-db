import { elements } from './dataLanguages';
import {
  ALL_ITENS_SLOTS_LIST,
  equipments,
  FAKE_ITEM,
  UPGRADES_DATA,
  weapons,
} from './kakeleData';
import removeAccents from 'remove-accents';

const FIVE_SECONDS = 5000;

const urlParamsToObject = itemText => {
  if (itemText === '' || !itemText) return [];
  try {
    return JSON.parse(itemText);
  } catch (e) {
    if (itemText) return itemText;
    return [];
  }
};

const equipmentsArrayToObject = itemsList => {
  return itemsList.reduce((cur, next) => {
    if (!next) return cur;
    return {
      ...cur,
      [next.slot]: { ...next },
    };
  }, {});
};

const normalizeHandsItems = (thisItem, currentSet) => {
  if (!currentSet) return { [thisItem.slot]: thisItem };
  if (thisItem.slot === 'weapon') {
    return thisItem.twoHanded
      ? {
          weapon: thisItem,
          book: { ...FAKE_ITEM, sloot: 'book' },
          shield: { ...FAKE_ITEM, slot: 'shield' },
        }
      : { weapon: thisItem };
  }
  if (thisItem.slot === 'shield') {
    return currentSet.weapon && currentSet.weapon.twoHanded
      ? {
          shield: thisItem,
          weapon: { ...FAKE_ITEM, slot: 'weapon' },
          book: { ...FAKE_ITEM, sloot: 'book' },
        }
      : { shield: thisItem, book: { ...FAKE_ITEM, sloot: 'book' } };
  }
  if (thisItem.slot === 'book') {
    return currentSet.weapon && currentSet.weapon.twoHanded
      ? {
          book: thisItem,
          weapon: { ...FAKE_ITEM, slot: 'weapon' },
          shield: { ...FAKE_ITEM, sloot: 'shield' },
        }
      : {
          book: thisItem,
          shield: { ...FAKE_ITEM, sloot: 'shield' },
        };
  }
  return { [thisItem.slot]: thisItem };
};

const normalizeSet = (setItems, locale) => {
  if (setItems.shield.level < 1 && setItems.book.level < 1) {
    const newSet = { ...setItems };
    delete newSet.book;
    return newSet;
  }
  if (setItems.shield.level < 1) {
    const newSet = { ...setItems };
    delete newSet.shield;
    return newSet;
  }
  if (setItems.book.level < 1) {
    const newSet = { ...setItems };
    delete newSet.book;
    return newSet;
  }
  return setItems;
};

const addMissingItens = (
  selectedItems,
  locale,
  storedSet = {},
  allItens = [...equipments, ...weapons],
) => {
  return ALL_ITENS_SLOTS_LIST.reduce(
    (current, next, index) => {
      const currentSlot = ALL_ITENS_SLOTS_LIST[index];

      const item = findItemByName(
        allItens,
        selectedItems[currentSlot],
        locale,
      ) || { ...FAKE_ITEM, slot: currentSlot };

      const iBonus =
        selectedItems[currentSlot] && selectedItems[currentSlot].itemBonus
          ? selectedItems[currentSlot].itemBonus
          : storedSet[currentSlot] && storedSet[currentSlot].en === item.en
          ? storedSet[currentSlot].itemBonus
          : item.itemBonus;

      return {
        ...current,
        [currentSlot]: {
          ...item,
          itemBonus: iBonus,
        },
      };
    },
    { ...selectedItems },
  );
};

const genereateLinkToViewSet = (setList, origin, locale) => {
  if (!setList) return false;

  // Manter sempre a chave em ingles para o compartilhamento de link para o set não bugar
  const link = Object.keys(setList).reduce((anterior, proximo) => {
    if (setList[proximo].level > 0) {
      const adicionarTexto = `${setList[proximo].slot}=${setList[proximo].en}`;
      if (anterior === '?') return `${anterior}${adicionarTexto}`;
      return `${anterior}&&${adicionarTexto}`;
    }
    return anterior;
  }, '?');
  if (origin) return `${origin}/${locale}/set-viewer${link}`;
  return `/set-viewer/${link}`;
};

const saveSetInLocalStorage = newSet => {
  if (!newSet) return;

  localStorage.setItem('currentSet', JSON.stringify(newSet));

  return newSet;
};

const loadSetFromLocalStorage = () => {
  try {
    const currentSet = JSON.parse(localStorage.getItem('currentSet'));
    if (typeof currentSet === 'string') return false;
    return currentSet;
  } catch (error) {}
};

const loadAndAddMissingItems = (locale, storedSet = {}, items = {}) => {
  const allSlotItens = addMissingItens(items, locale, storedSet);
  const normalizedSet = normalizeSet(allSlotItens, locale);

  return normalizedSet;
};

const activateAlert = setShowAlert => {
  setShowAlert(true);
  setTimeout(() => {
    setShowAlert(false);
  }, FIVE_SECONDS);
};

const calculateUpgradePriceWithOresPrice = (totalOres, oresPrice) => {
  const { cobre, estanho, prata, ferro, ouro, kks } = totalOres;
  const { copperPrice, tinPrice, silverPrice, ironPrice, goldPrice } =
    oresPrice;

  const totalCopperPrice = copperPrice * cobre;
  const totalTinPrice = tinPrice * estanho;
  const totalSilverPrice = silverPrice * prata;
  const totalIronPrice = ironPrice * ferro;
  const totalGoldPrice = goldPrice * ouro;

  const totalPrice =
    kks +
    totalCopperPrice +
    totalTinPrice +
    totalSilverPrice +
    totalIronPrice +
    totalGoldPrice;

  return { ...totalOres, kks: totalPrice };
};

const calculateOreQuantityAndPrice = finishUpgradeLvl => {
  const upgradeXTimes = finishUpgradeLvl / 5;

  const result = UPGRADES_DATA.reduce(
    (current, next, index) => {
      const currentUpgradeIndex = upgradeXTimes - index;
      if (currentUpgradeIndex < 0) return current;
      const x = index * 5;
      const currentUpgradeKey = finishUpgradeLvl - x;
      const { cobre, estanho, prata, ferro, ouro, kks } =
        UPGRADES_DATA[currentUpgradeIndex][currentUpgradeKey];

      return {
        cobre: current.cobre + cobre,
        estanho: current.estanho + estanho,
        prata: current.prata + prata,
        ferro: current.ferro + ferro,
        ouro: current.ouro + ouro,
        kks: current.kks + kks,
      };
    },
    {
      cobre: 0,
      estanho: 0,
      prata: 0,
      ferro: 0,
      ouro: 0,
      kks: 0,
    },
  );
  return result;
};

const addDotToKks = number =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const filterItensBySlot = (itensList, slot, ignoreItensList, locale) => {
  const name = locale;

  return itensList.filter(
    item =>
      (item.slot === slot && !ignoreItensList.includes(item[name])) ||
      slot === 'All',
  );
};
const filterItensByElement = (itensList, element, ignoreElement) =>
  itensList.filter(
    item => item.energy === element || element === 'All' || ignoreElement,
  );

const filterItens = (
  itensList,
  slot,
  ignoreItensList,
  element,
  ignoreElement,
  language,
) => {
  const itensFilteredBySlot = filterItensBySlot(
    itensList,
    slot,
    ignoreItensList,
    language,
  );
  const itensFilteredBySlotAndElement = filterItensByElement(
    itensFilteredBySlot,
    element,
    ignoreElement,
  );

  return { itensFilteredBySlot, itensFilteredBySlotAndElement };
};

const getAlternativeStatus = (characterClass, mainStat) => {
  const priority = {
    Alchemist: {
      magic: 'armor',
      armor: 'magic',
      attack: 'armor',
    },
    Berserker: {
      attack: 'armor',
      armor: 'magic',
      magic: 'attack',
    },
    Hunter: {
      attack: 'armor',
      armor: 'magic',
      magic: 'attack',
    },
    Mage: {
      magic: 'armor',
      armor: 'magic',
      attack: 'armor',
    },
    Warrior: {
      armor: 'attack',
      attack: 'magic',
      magic: 'armor',
    },
  };

  return priority[characterClass][mainStat];
};

const findBestItem = (itensList, status, lastChance = false) => {
  if (itensList.length === 0) return false;
  const bestItem = itensList
    .sort((a, b) => a.level - b.level)
    .sort((a, b) => a.status - b.status)
    .reduce(
      (previous, next) => {
        if (next[status] >= previous[status]) {
          return next;
        }

        return previous;
      },
      { [status]: 0 },
    );

  if (bestItem[status] > 0 || lastChance) return bestItem;

  return false;
};

const skipItemSlot = (characterClass, slot) => {
  if (
    (characterClass === 'Berserker' || characterClass === 'Hunter') &&
    (slot === 'shield' || slot === 'book')
  ) {
    return true;
  }

  if (
    (characterClass === 'Mage' || characterClass === 'Alchemist') &&
    slot === 'shield'
  ) {
    return true;
  }

  if (characterClass === 'Warrior' && slot === 'book') {
    return true;
  }
  return false;
};

const findBestSet = (
  itensList,
  mainStat,
  slot,
  characterClass,
  ignoredItens,
  ignoreSlotElementList,
  element,
  language,
) => {
  if (skipItemSlot(characterClass, slot)) return false;

  const ignoreElement = ignoreSlotElementList.includes(slot);

  const { itensFilteredBySlot, itensFilteredBySlotAndElement } = filterItens(
    itensList,
    slot,
    ignoredItens,
    element,
    ignoreElement,
    language,
  );

  const alternativeStatus = getAlternativeStatus(characterClass, mainStat);

  const bestItem = findBestItem(itensFilteredBySlotAndElement, mainStat);
  if (bestItem) return bestItem;

  const bestItemWithAlternativeStatus = findBestItem(
    itensFilteredBySlotAndElement,
    alternativeStatus,
  );

  if (bestItemWithAlternativeStatus) return bestItemWithAlternativeStatus;

  const bestItemWithAlternativeElement = findBestItem(
    itensFilteredBySlot,
    mainStat,
  );
  if (bestItemWithAlternativeElement) return bestItemWithAlternativeElement;

  const bestItemWithAlternativeStatusAndElement = findBestItem(
    itensFilteredBySlot,
    alternativeStatus,
  );
  if (bestItemWithAlternativeStatusAndElement)
    return bestItemWithAlternativeStatusAndElement;

  const lastChance = true;

  const lastChanceToFindItem = findBestItem(
    itensFilteredBySlot,
    mainStat,
    lastChance,
  );
  if (lastChanceToFindItem) return lastChanceToFindItem;

  return bestItem || false;
};

const filterItensByLevelAndClass = (listaDeItens, level, classe) => {
  const useLevel = Number(level) > 0 ? Number(level) : 1;
  return listaDeItens.filter(
    item =>
      useLevel >= Number(item.level) &&
      (item.vocation === classe || item.vocation === 'All' || classe === 'All'),
  );
};
const elementQuantityInSet = (itensList, element) =>
  itensList.filter(item => item.energy === element).length;

const checkSetElement = (itens, locale) => {
  const elementsQuantity = {
    light: {
      ...elements.light,
      quantity: elementQuantityInSet(itens, 'Light'),
    },
    nature: {
      ...elements.nature,
      quantity: elementQuantityInSet(itens, 'Nature'),
    },
    dark: {
      ...elements.dark,
      quantity: elementQuantityInSet(itens, 'Dark'),
    },
    none: {
      ...elements.none,
      quantity: 0,
    },
  };

  const elementResult = Object.values(elementsQuantity).sort(
    (a, b) => b.quantity - a.quantity,
  )[0];

  const element =
    elementResult.quantity >= 5
      ? elementResult[locale]
      : elementsQuantity.none[locale];

  const { light, nature, dark } = elementsQuantity;

  const text = `${light[locale]}: ${light.quantity}, ${nature[locale]}: ${nature.quantity}, ${dark[locale]}: ${dark.quantity}`;

  return { text, element };
};

const findItemByName = (itemList, item, locale = 'en') => {
  if (!item) return false;
  //Manter sempre a chave em ingles para o compartilhamento de link para o set não bugar
  const useName = item.en || item;

  return itemList.find(i => {
    return (
      removeAccents(i.en.toLowerCase()) ===
        removeAccents(useName.toLowerCase()) ||
      removeAccents(i[locale].toLowerCase()) ===
        removeAccents(useName.toLowerCase())
    );
  });
};

const filterItemsByName = (itemList, itemName, locale) => {
  if (!itemName) return [];

  return itemList
    .filter(item =>
      removeAccents(item[locale].toLowerCase()).includes(
        removeAccents(itemName.toLowerCase()),
      ),
    )
    .map(item => {
      return {
        en: item['en'],
        pt: item['pt'],
      };
    })
    .sort((a, b) => {
      if (a[locale] < b[locale]) {
        return -1;
      }
      if (a[locale] > b[locale]) {
        return 1;
      }
      return 0;
    })
    .slice(0, 15);
};

const findItemsByName = (itemList, itemName) => {
  if (!itemName) return false;
  return itemList.filter(
    item =>
      removeAccents(item['en'].toLowerCase()).includes(
        removeAccents(itemName.toLowerCase()),
      ) ||
      removeAccents(item['pt'].toLowerCase()).includes(
        removeAccents(itemName.toLowerCase()),
      ),
  );
};

const findItemsByRarity = (itemList, itemRarity) => {
  if (!itemRarity) return false;
  return itemList.filter(
    item =>
      itemRarity === 'any' ||
      item.rarity['en'].toLowerCase() === itemRarity.toLowerCase() ||
      item.rarity['pt'].toLowerCase() === itemRarity.toLowerCase(),
  );
};

export {
  urlParamsToObject,
  activateAlert,
  calculateOreQuantityAndPrice,
  calculateUpgradePriceWithOresPrice,
  addDotToKks,
  findBestSet,
  filterItensByLevelAndClass,
  checkSetElement,
  genereateLinkToViewSet,
  findItemByName,
  filterItensBySlot,
  filterItensByElement,
  findItemsByName,
  saveSetInLocalStorage,
  loadSetFromLocalStorage,
  findItemsByRarity,
  filterItemsByName,
  addMissingItens,
  normalizeSet,
  normalizeHandsItems,
  equipmentsArrayToObject,
  loadAndAddMissingItems,
};
