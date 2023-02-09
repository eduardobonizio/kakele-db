import { equipments, weapons } from '../../../data/kakeleData';
import tempWeapons from '../../../data/tempWeapons.json';
import tempEquips from '../../../data/tempEquips.json';
import newItems from '../../../data/newItems.json';
import copy from 'copy-to-clipboard';

const UpdateItems = () => {
  // const processarDadosArmas = () => {
  //   const updatedWeapons = weapons.map(item => {
  //     return {
  //       ...item,
  //       itemBonus: {
  //         attack: 0,
  //         armor: 0,
  //         magic: 0,
  //         bless: 0,
  //       },
  //     };
  //   });

  //   if (updatedWeapons.length === weapons.length) {
  //     copy(JSON.stringify(updatedWeapons));
  //   } else {
  //     copy('Quantidade de items diferentes');
  //   }
  // };

  // const processarDadosEquipamentos = () => {
  //   const updatedEquipments = equipments.map(item => {
  //     return {
  //       ...item,
  //       itemBonus: {
  //         attack: 0,
  //         armor: 0,
  //         magic: 0,
  //         bless: 0,
  //       },
  //     };
  //   });

  //   if (updatedEquipments.length === equipments.length) {
  //     copy(JSON.stringify(updatedEquipments));
  //   } else {
  //     copy('Quantidade de items diferentes');
  //   }
  // };

  // Pegar o ultimo ID no arquivo KakeleData.js
  // Novo equip começa em 607
  const LAST_ID = 638;

  const manageItens = (tempItems, items) => {
    let lastId = LAST_ID + 1;

    const updatedItens = tempItems.map(item => {
      const oldItem = items.find(i => i.en === item.en);

      if (oldItem) {
        const updatedItem = {
          ...oldItem,
          ...item,
          pt: oldItem.pt,
        };

        return updatedItem;
      }

      const newItem = {
        ...item,
        id: lastId + 1,
        itemBonus: { attack: 0, armor: 0, magic: 0, bless: 0 },
      };

      lastId += 1;

      return newItem;
    });

    const allItensUpdated = [...updatedItens];

    copy(JSON.stringify(allItensUpdated));
  };

  const getAllNewItens = () => {
    const newItens = [...tempEquips, ...tempWeapons].filter(
      item => item.id > LAST_ID,
    );
    copy(JSON.stringify(newItens));
  };

  const addPtFromNewItemsToTempItems = (tempItems, newItems) => {
    const updated = tempItems.map(item => {
      const newItem = newItems.find(i => i.en === item.en);
      if (newItem)
        return {
          ...item,
          ...newItem,
        };

      return item;
    });
    copy(JSON.stringify(updated));
  };

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center">
        {/* <button onClick={() => processarDadosArmas()}>Copiar Armas</button>
      <button onClick={() => processarDadosEquipamentos()}>
        Copiar Equipamentos
      </button> */}
        <button
          className="mb-1"
          onClick={() => manageItens(tempEquips, equipments)}
        >
          Adicionar propriedades aos Temp Equips
        </button>
        <button
          className="mb-1"
          onClick={() => manageItens(tempWeapons, weapons)}
        >
          Adicionar propriedades as Temp Weapons
        </button>
        <button className="mb-1" onClick={() => getAllNewItens()}>
          Copiar novos items
        </button>
        <button
          className="mb-1"
          onClick={() => addPtFromNewItemsToTempItems(tempEquips, newItems)}
        >
          Adcionar PT aos tempEquips
        </button>
        <button
          className="mb-1"
          onClick={() => addPtFromNewItemsToTempItems(tempWeapons, newItems)}
        >
          Adcionar PT as tempWeapons
        </button>
      </div>
    </div>
  );
};

export default UpdateItems;
