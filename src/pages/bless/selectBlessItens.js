/*
Tabela de bonus
Item Raro
1x     25%
2x     37,5%. 
3x     43,75%. 
4x     46,87% 
5x     48,43%   
6x     49,21%
7x     49,60%
8x     49,80
9x     49,90
10x    50%


Item Incomum
1x    12,5%
2x    18,75%
3x     21,87%
4x     23,43%
5x     24,21%
6x     24,60%
7x     24,80%
8x     24,85%
9x     24,90%
10x   25%
*/

/*
price:
rare: 10KK
uncommon: 1KK
common: 100k
*/

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

const findItensToSacrificeRecursive = (
  allItens,
  itemReference,
  ignoredItems,
  foundItens = [],
) => {
  const minLevel = itemReference.level / 2;

  const selectedItem = allItens
    .filter(
      item =>
        !ignoredItems.includes(item['en']) &&
        item.slot === itemReference.slot &&
        item.rarity.en === itemReference.rarity.en,
    )
    .find(i => i.level >= minLevel);

  const alreadyIn = foundItens.find(i => i.en === selectedItem.en);
  if (alreadyIn) return foundItens;
  const newFoundItens = [...foundItens, selectedItem];
  return findItensToSacrificeRecursive(
    allItens,
    selectedItem,
    ignoredItems,
    newFoundItens,
  );
};

const addItensQuantity = (itensToSacrifice, necessaryItensQuantity) => {
  console.log('necessaryItensQuantity', necessaryItensQuantity);

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

  const necessaryItensQuantity = upgradesTotal[desiredBless].map(
    (curBless, index) => {
      return curBless - upgradesTotal[currentBless][index];
    },
  );

  const itensToSacrificeWithQuantity = addItensQuantity(
    itensToSacrifice,
    necessaryItensQuantity,
  );

  return itensToSacrificeWithQuantity;
};

export { findItensToSacrifice };
