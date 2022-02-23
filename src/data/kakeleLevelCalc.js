// Exp total antes do lvl 200
const calcExpNeededBeforeOf200 = lvl => parseInt(Math.pow(lvl, 3) * 10);

// Exp total depois do level 200
const calcExpNeededAfterOf200 = lvl =>
  parseInt(Math.pow(lvl, 3) * 10 * (lvl / 200));

// Decide qual das funções acima usar
const totalExpToLevel = level => {
  if (level < 200) {
    return calcExpNeededBeforeOf200(level);
  }
  return calcExpNeededAfterOf200(level);
};

const expToLevelUp = (lvl, currentExp = 0) => {
  return totalExpToLevel(lvl) - totalExpToLevel(lvl - 1) - currentExp;
};

const expToLevelUpFromTo = (fromLvl, toLevel) => {
  const totalFrom = totalExpToLevel(fromLvl - 1);
  const totalTo = totalExpToLevel(toLevel - 1);
  return totalTo - totalFrom;
};

// console.log("Exp total para o level X", totalExpToLevel(413));
// console.log("Exp total para o level X", totalExpToLevel(1000));
// console.log("Exp total para o level X", totalExpToLevel(2000));
// console.log("Quanto de exp para upar um level", expToLevelUp(412));
// console.log("Quanto de xp para upar o meu level", expToLevelUp(412, 7199814));
// console.log("Quanto de exp do nivel X para o Y", expToLevelFromTo(412, 413));

export { expToLevelUp, expToLevelUpFromTo, totalExpToLevel };
