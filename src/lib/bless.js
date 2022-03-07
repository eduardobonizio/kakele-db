const RARITY_BLESS_PRICE = {
  Commom: 100000,
  Uncommom: 1000000,
  Rare: 10000000,
};

const RARITY_BONUS = {
  Legendary: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
  },
  Rare: {
    0: 0,
    1: 25,
    2: 37.5,
    3: 43.75,
    4: 46.87,
    5: 48.43,
    6: 49.21,
    7: 49.6,
    8: 49.8,
    9: 49.9,
    10: 50,
  },
  Uncommom: {
    0: 0,
    1: 12.5, //Mage mostrou 6% no vídeo
    2: 18.75,
    3: 21.87,
    4: 23.43,
    5: 24.21,
    6: 24.6,
    7: 24.8,
    8: 24.85,
    9: 24.9,
    10: 25,
  },
  Commom: {
    0: 0,
    1: 5, //Mage mostrou 2% no vídeo
    2: 7.5,
    3: 8.75,
    4: 9.374,
    5: 9.686,
    6: 9.842,
    7: 9.92,
    8: 9.96,
    9: 9.98,
    10: 10,
  },
};

const upgradesOneByOne = [
  [1],
  [1, 1],
  [1, 2, 1],
  [1, 3, 3, 1],
  [1, 4, 6, 4, 1],
  [1, 5, 10, 10, 5, 1],
  [1, 6, 15, 20, 15, 6, 1],
  [1, 7, 21, 35, 35, 21, 7, 1],
  [1, 8, 28, 56, 70, 56, 28, 8, 1],
  [1, 9, 36, 84, 126, 126, 84, 36, 9, 1],
];

const upgradesTotal = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 3, 1, 0, 0, 0, 0, 0, 0, 0],
  [4, 6, 4, 1, 0, 0, 0, 0, 0, 0],
  [5, 10, 10, 5, 1, 0, 0, 0, 0, 0],
  [6, 15, 20, 15, 6, 1, 0, 0, 0, 0],
  [7, 21, 35, 35, 21, 7, 1, 0, 0, 0],
  [8, 28, 56, 70, 56, 28, 8, 1, 0, 0],
  [9, 36, 84, 126, 126, 84, 36, 9, 1, 0],
  [10, 45, 120, 210, 252, 210, 120, 45, 10, 1],
];

const blessItemQuantityPerBless = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16,
  6: 32,
  7: 64,
  8: 128,
  9: 256,
  10: 512,
};

const sacrificeQuantityFromBlessToBless = {
  0: 0,
  1: 1,
  2: 3,
  3: 7,
  4: 15,
  5: 31,
  6: 63,
  7: 127,
  8: 255,
  9: 511,
  10: 1023,
};

const calcBlessPrice = (rarity, initialBless, finalBless) => {
  const price =
    RARITY_BLESS_PRICE[rarity] *
    (sacrificeQuantityFromBlessToBless[finalBless] -
      sacrificeQuantityFromBlessToBless[initialBless]);

  return price;
};

const findItensToSacrificeRecursive = (
  allItens,
  itemReference,
  ignoredItems,
  currentLoopFoundItens = [],
  foundItensName = [],
) => {
  const minLevel = itemReference.level / 2;

  const selectedItems = allItens.filter(item => {
    if (
      item.slot === itemReference.slot &&
      item.level >= minLevel &&
      !ignoredItems.includes(item['en']) &&
      !foundItensName.includes(item['en']) &&
      item.rarity.en === itemReference.rarity.en
    )
      return item;
  });

  const addThisItem = selectedItems.find(i => {
    return i.level >= minLevel;
  });

  if (!addThisItem) return currentLoopFoundItens;

  const newFoundItens = [...currentLoopFoundItens, addThisItem];
  const newFoundItensName = [...foundItensName, addThisItem['en']];

  return findItensToSacrificeRecursive(
    allItens,
    addThisItem,
    ignoredItems,
    newFoundItens,
    newFoundItensName,
  );
};

const addItensQuantity = (itensToSacrifice, necessaryItensQuantity) => {
  const firstPart = necessaryItensQuantity.filter((e, i) => {
    if (i < itensToSacrifice.length) return e;
  });
  const restToLastItem = necessaryItensQuantity
    .filter((e, i) => {
      if (i >= itensToSacrifice.length) return e;
    })
    .reduce((cur, next) => {
      if (next) return cur + next;
      return cur;
    }, 0);

  const lastItem = firstPart.length - 1;

  firstPart[lastItem] = firstPart[lastItem] + restToLastItem;

  const itemsToShow = itensToSacrifice
    .map((item, index) => {
      if (firstPart[index] > 0)
        return {
          ...item,
          quantityToSacrifice: firstPart[index],
        };
    })
    .filter(item => {
      if (item) return item;
    });

  return itemsToShow;
};

const findBestCombination = (
  itensToSacrifice,
  item,
  itensFound = [item],
  exclude = [item.en],
  foundLevel = item.level,
) => {
  const minLevel = item && item.level / 2;

  const foundItem = itensToSacrifice.find(i => {
    if (
      !exclude.includes(i.en) &&
      i.level < foundLevel &&
      i.level >= minLevel &&
      i.level !== item.level
    )
      return i;
  });

  if (!foundItem) {
    if (itensFound.length < 1) return [];
    const bigerArray = itensFound.sort((a, b) => b.length - a.length);
    return bigerArray;
  }

  return findBestCombination(
    itensToSacrifice,
    foundItem,
    [...itensFound, foundItem],
    [...exclude, foundItem.en],
    foundItem.level,
  );
};

const validateItens = (itemToBless, itens) => {
  const isValid = itens
    .sort((a, b) => b.level - a.level)
    .reduce((cur, next) => {
      if (!next || !cur) return false;
      if (next.level >= cur.level / 2) return next;
      return false;
    }, itemToBless);

  return isValid;
};

const findItensToSacrifice = (
  allItens,
  itemToBless,
  currentBless,
  desiredBless,
  ignoredItems,
) => {
  const itensToSacrifice = findItensToSacrificeRecursive(
    allItens,
    itemToBless,
    ignoredItems,
  );

  if (itensToSacrifice.length < 1) return [];

  const foundLevels = [];

  const bestCombination = itensToSacrifice
    .map(i => {
      if (i.level >= itemToBless.level / 2 && !foundLevels.includes(i.level)) {
        foundLevels.push(i.level);
        const result = findBestCombination(itensToSacrifice, i);
        return result;
      }
    })
    .sort((a, b) => a[0].level - b[0].level);

  const necessaryItensQuantity = upgradesTotal[desiredBless].map(
    (curBless, index) => {
      return curBless - upgradesTotal[currentBless][index];
    },
  );

  const itensToSacrificeWithQuantity = addItensQuantity(
    bestCombination[0],
    necessaryItensQuantity,
  );

  const isValidItens = validateItens(itemToBless, itensToSacrificeWithQuantity);
  if (isValidItens) return itensToSacrificeWithQuantity;

  return [];
};

export { findItensToSacrifice, calcBlessPrice, RARITY_BONUS };
