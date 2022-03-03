const findItemToSacrifice = (
  allItens,
  itemToBless,
  ignoredItems,
  currentBlessLevel,
) => {
  const minLevel = itemToBless.level / 2;

  const item = allItens
    .filter(
      i =>
        i.slot === itemToBless.slot &&
        i.rarity.en === itemToBless.rarity.en &&
        (i.vocation === itemToBless.vocation ||
          i.vocation.toLowerCase() === 'all') &&
        !ignoredItems.includes(i['en']),
    )
    .sort((a, b) => a.level - b.level)
    .find(i => i.level >= minLevel);

  return item;
};

const findItensToSacrifice = (
  allItens,
  itemToBless,
  blessLvl,
  ignoredItems,
) => {
  const itensToSacrifice = [];
  console.log(blessLvl);
  for (let i = blessLvl; i > 0; i--) {
    const currentBlessLevel = i - 1;
    const itemToSacrifice = findItemToSacrifice(
      allItens,
      itemToBless,
      ignoredItems,
      currentBlessLevel,
    );
    itensToSacrifice.push(itemToSacrifice);
  }

  console.log(itensToSacrifice);
  return itensToSacrifice;
};

export { findItensToSacrifice };
