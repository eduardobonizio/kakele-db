/* eslint-disable no-unused-vars */
const homeContentJsx = {
  en: {
    selectLanguage: 'Select language / Selecione o idioma',
    underConstruction: 'Home under construction',
  },
  pt: {
    selectLanguage: 'Selecione o idioma / Select language ',
    underConstruction: 'Página inical em construção',
  },
};

const navBarJsx = {
  en: {
    showSet: 'Show Set',
    generateSet: 'Set Generator',
    searchItem: 'Search Item',
    oreCalculator: 'Upgrades',
    expCalculator: 'Exp Calculator',
    seeItem: 'Wiki',
  },
  pt: {
    showSet: 'Ver Set',
    generateSet: 'Gerador de set',
    searchItem: 'Procurar Item',
    oreCalculator: 'Forja',
    expCalculator: 'Calculadora de Exp',
    seeItem: 'Wiki',
  },
};

const itemCardJsx = {
  en: {
    armor: 'Armor',
    magic: 'Magic',
    attack: 'Attack',
    level: 'Level',
    slot: 'Slot',
    sources: 'Source',
    info: 'Info',
    equiped: 'Equipped',
    element: 'Element',
    ignoreItem: 'ignore item',
    ignoreElement: 'Ignore element',
    equipItem: 'Equip',
    showItem: 'Show Item',
    copy: 'Copy',
  },
  pt: {
    armor: 'Armadura',
    magic: 'Magia',
    attack: 'Ataque',
    level: 'Nivel',
    slot: 'Slot',
    sources: 'Fonte',
    info: 'Info',
    equiped: 'Equipado',
    element: 'Elemento',
    ignoreItem: 'Ignorar item',
    ignoreElement: 'Ignora elemento',
    equipItem: 'Equipar',
    showItem: 'Ver Item',
    copy: 'Copiar',
  },
};
const setMakerJsx = {
  en: {
    title: 'Set generator',
    generateSet: 'Generate set',
    equipAll: 'Equip all',
    searchItens: 'Search itens',
  },
  pt: {
    title: 'Gerador de set',
    generateSet: 'Gerar set',
    equipAll: 'Equipar tudo',
    searchItens: 'Procurar itens',
  },
};
const showSetStatusJsx = {
  en: {
    attributes: 'Set attributes',
    armor: 'Armor',
    magic: 'Magic',
    attack: 'Attack',
    element: 'Element',
  },
  pt: {
    attributes: 'Atributos do set',
    armor: 'Armadura',
    magic: 'Magia',
    attack: 'Ataque',
    element: 'Elemento',
  },
};
const searchItemJsx = {
  en: {
    search: 'Search',
    showSet: 'Show set',
    notFound: 'No item found',
  },
  pt: {
    search: 'Procurar',
    showSet: 'Ver set',
    notFound: 'Nem um item encontrado',
  },
};
const kakeleItemsFiltersJsx = {
  en: {
    itemName: 'Item name',
    characterLevel: 'Level',
    characterClass: 'Class',
    alchemist: 'Alchemist',
    hunter: 'Hunter',
    berserker: 'Berserker',
    warrior: 'Warrior',
    mage: 'Mage',
    mainStat: 'Main stat',
    armor: 'Armor',
    magic: 'Magic',
    attack: 'Attack',
    element: 'Element',
    all: 'All',
    light: 'Light',
    dark: 'Dark',
    nature: 'Nature',
    itemSlot: 'Item slot',
    orderBy: 'Order by',
  },
  pt: {
    itemName: 'Nome do item',
    characterLevel: 'Nivel',
    characterClass: 'Classe',
    alchemist: 'Alquemista',
    hunter: 'Caçador',
    berserker: 'Furioso',
    warrior: 'Guerreiro',
    mage: 'Mago',
    mainStat: 'Status principal',
    armor: 'Amadura',
    magic: 'Magia',
    attack: 'Ataque',
    element: 'Elemento',
    all: 'Todos',
    light: 'Luz',
    dark: 'Trevas',
    nature: 'Natureza',
    itemSlot: 'Slot do item',
    orderBy: 'Ordenar por',
  },
};
const oreCalculatorJsx = {
  en: {
    title: 'Upgrade calculator',
    startUpgrade: 'Current forge',
    finishUpgrade: 'Desired forge',
    buyOres: 'Add ore prices',
    calculate: 'Calculate',
    necessaryItens: 'Necessary itens',
    kks: 'Gold (kks)',
    copperOre: 'Copper ore',
    tinOre: 'Tin ore',
    silverOre: 'Silver ore',
    ironOre: 'Iron ore',
    goldOre: 'Gold ore',
    copperPrice: 'Copper ore price',
    tinPrice: 'Tin ore price',
    silverPrice: 'Silver ore price',
    ironPrice: 'Iron ore price',
    goldPrice: 'Gold ore price',
    alert: 'Current upgrade must be greater then desired upgrade',
  },
  pt: {
    title: 'Calculadora de upgrade',
    startUpgrade: 'Forja atual',
    finishUpgrade: 'Forja desejada',
    buyOres: 'Adicionar preço dos minérios',
    calculate: 'Calcular',
    necessaryItens: 'Itens necessários',
    kks: 'Ouro (kks)',
    copperOre: 'Cobre Bruto',
    tinOre: 'Estanho Bruto',
    silverOre: 'Prata Bruta',
    ironOre: 'Ferro Bruto',
    goldOre: 'Ouro Bruto',
    copperPrice: 'Preço Cobre Bruto',
    tinPrice: 'Preço Estanho Bruto',
    silverPrice: 'Preço Prata Bruta',
    ironPrice: 'Preço Ferro Bruto',
    goldPrice: 'Preço Ouro Bruto',
    alert: 'A forja desejada tem que ser maior que a forja atual',
  },
};

const SLOTS_NAMES = {
  en: {
    accessorie: 'Accessory',
    ring: 'Ring',
    weapon: 'Weapon',
    armor: 'Armor',
    leg: 'Pants',
    necklace: 'Necklace',
    helmet: 'Helmet',
    shield: 'Shield',
    book: 'Book',
    shoe: 'Shoes',
  },
  pt: {
    accessorie: 'Acessório',
    ring: 'Anel',
    weapon: 'Arma',
    armor: 'Armadura',
    leg: 'Calças',
    necklace: 'Colar',
    helmet: 'Elmo',
    shield: 'Escudo',
    book: 'Livro',
    shoe: 'Sapatos',
  },
};

const ITEM_FILTERS_NAME = {
  en: {
    attack: 'Attack',
    armor: 'Armor',
    level: 'Level',
    magic: 'Magic',
  },
  pt: {
    attack: 'Ataque',
    armor: 'Armadura',
    level: 'Level',
    magic: 'Magia',
  },
};

const showSetJsx = {
  en: {
    searchItems: 'Search items',
    copy: 'Copy link',
  },
  pt: {
    searchItems: 'Procurar itens',
    copy: 'Copiar link',
  },
};

const showItemJsx = {
  en: {
    previous: 'Previous',
    next: 'Next',
    showSet: 'Show set',
  },
  pt: {
    previous: 'Anterior',
    next: 'Próximo',
    showSet: 'Ver set',
  },
};

const expCalculatorJsx = {
  en: {
    title: 'Kakele experience calculator',
    description: 'Exp calculator for Kakele MMORPG',
    initialLevel: 'Starting Level',
    desiredLevel: 'Target Level',
    totalExp: 'Your total exp',
    calculate: 'calculate',
    result: 'Total exp needed',
  },
  pt: {
    title: 'Kakele calculadora de experiência',
    description: 'Exp calculator for Kakele MMORPG',
    initialLevel: 'Level inicial',
    desiredLevel: 'Level desejado',
    totalExp: 'Sua exp total',
    calculate: 'calcular',
    result: 'Exp total necessária:',
  },
};

const elements = {
  light: {
    en: 'Light',
    pt: 'Luz',
  },
  nature: {
    en: 'Nature',
    pt: 'Natureza',
  },
  dark: {
    en: 'Dark',
    pt: 'Trevas',
  },
  none: {
    en: 'None',
    pt: 'Nenhum',
  },
};

export {
  homeContentJsx,
  navBarJsx,
  itemCardJsx,
  setMakerJsx,
  showSetStatusJsx,
  searchItemJsx,
  kakeleItemsFiltersJsx,
  oreCalculatorJsx,
  showSetJsx,
  showItemJsx,
  SLOTS_NAMES,
  ITEM_FILTERS_NAME,
  expCalculatorJsx,
  elements,
};
