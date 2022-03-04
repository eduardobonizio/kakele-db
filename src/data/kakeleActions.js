import { elements } from './dataLanguages';
import { UPGRADES_DATA } from './kakeleData';

const FIVE_SECONDS = 5000;

const urlParamsToObject = paramsText => {
  // Ex.: /Item=Sowrd-of-Fire Item2=Shield-of-Darkness
  try {
    const formatedText = `{"${paramsText
      .replace('_', '')
      .replaceAll('_', '","')
      .replaceAll('=', '":"')
      .replaceAll('-', ' ')}"}`;

    return JSON.parse(formatedText);
  } catch {
    return [];
  }
};

const genereateLinkToViewSet = (setList, origin, locale) => {
  if (!setList) return false;
  //Manter sempre a chave em ingles para o compartilhamento de link para o set não bugar
  const name = 'en';
  const link = setList.reduce((anterior, proximo) => {
    if (proximo.level > 0) {
      const adicionarTexto = `${proximo.slot}=${proximo[name]}`.replaceAll(
        ' ',
        '-',
      );
      return `${anterior}_${adicionarTexto}`;
    }
    return anterior;
  }, '');
  if (origin) return `${origin}/${locale}/set-viewer/${link}`;
  return `/set-viewer/${link}`;
};

const saveSetInLocalStorage = newSet => {
  if (!newSet) return;
  const link = genereateLinkToViewSet(newSet, false);
  if (!link) return;

  localStorage.setItem(
    'currentSet',
    JSON.stringify(link.replace('/set-viewer/', '')),
  );
};

const loadSetFromLocalStorage = () => {
  try {
    const currentSet = localStorage
      .getItem('currentSet')
      .replace('"', '')
      .replace('"', '');
    return currentSet;
  } catch (error) {
    return '""';
  }
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

const findItemByName = (itemList, itemName, locale = 'en') => {
  if (!itemName) return false;
  //Manter sempre a chave em ingles para o compartilhamento de link para o set não bugar
  const nameKey = 'en';
  return itemList.find(item => {
    return (
      item[nameKey].toLowerCase() === itemName.toLowerCase() ||
      item[locale].toLowerCase() === itemName.toLowerCase()
    );
  });
};

const filterItemsByName = (itemList, itemName, locale) => {
  if (!itemName) return [];
  return itemList
    .filter(item => item[locale].toLowerCase().includes(itemName.toLowerCase()))
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
    .slice(0, 10);
};

const findItemsByName = (itemList, itemName) => {
  if (!itemName) return false;
  return itemList.filter(
    item =>
      item['en'].toLowerCase().includes(itemName.toLowerCase()) ||
      item['pt'].toLowerCase().includes(itemName.toLowerCase()),
  );
};

const findItemsByRarity = (itemList, itemRarity) => {
  if (!itemRarity) return false;
  return itemList.filter(
    item =>
      itemRarity === 'any' ||
      item.rarity['en'].toLowerCase().includes(itemRarity.toLowerCase()) ||
      item.rarity['pt'].toLowerCase().includes(itemRarity.toLowerCase()),
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
};
