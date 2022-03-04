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

const findItemToSacrifice = (allItens, itemReference, ignoredItems) => {
  const minLevel = itemReference.level / 2;

  const item = allItens
    .filter(
      i =>
        i.rarity.en === itemReference.rarity.en &&
        (i.vocation === itemReference.vocation ||
          i.vocation.toLowerCase() === 'all') &&
        !ignoredItems.includes(i['en']),
    )
    .sort((a, b) => a.level - b.level)
    .find(i => i.level >= minLevel);

  return item || itemReference;
};

const findItensToSacrifice = (
  allItens,
  itemToBless,
  blessLvl,
  ignoredItems,
) => {
  const itensToSacrifice = [];
  let lastItem = {};
  let howManyItensToFind = 1;
  for (let i = 0; i < blessLvl; i++) {
    const currentBlessItens = [];
    const currentBlessLevel = howManyItensToFind;
    lastItem = itemToBless;
    while (currentBlessLevel > 0) {
      const itemToSacrifice = findItemToSacrifice(
        allItens,
        lastItem,
        ignoredItems,
        currentBlessLevel,
      );
      lastItem = itemToSacrifice;
      currentBlessItens.push(itemToSacrifice);
      currentBlessLevel--;
    }
    itensToSacrifice.push(currentBlessItens);
    console.log(
      `Bless de + ${i} para ${i + 1}: ${howManyItensToFind} itens necessários`,
    );
    howManyItensToFind = howManyItensToFind * 2;
  }
  console.log(itensToSacrifice);

  return itensToSacrifice;
};

export { findItensToSacrifice };
