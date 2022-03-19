import { equipments, weapons } from '../../../data/kakeleData';
import tempWeapons from '../../../data/tempWeapons.json';
import tempEquips from '../../../data/tempEquips.json';
import copy from 'copy-to-clipboard';

const UpdateItems = () => {
  const processarDadosArmas = () => {
    const updatedWeapons = weapons.map(item => {
      return {
        ...item,
        itemBonus: {
          attack: 0,
          armor: 0,
          magic: 0,
          bless: 0,
        },
      };
    });

    if (updatedWeapons.length === weapons.length) {
      copy(JSON.stringify(updatedWeapons));
    } else {
      copy('Quantidade de items diferentes');
    }
  };

  const processarDadosEquipamentos = () => {
    const updatedEquipments = equipments.map(item => {
      return {
        ...item,
        itemBonus: {
          attack: 0,
          armor: 0,
          magic: 0,
          bless: 0,
        },
      };
    });

    if (updatedEquipments.length === equipments.length) {
      copy(JSON.stringify(updatedEquipments));
    } else {
      copy('Quantidade de items diferentes');
    }
  };

  const manageItens = () => {
    // let lastId = 520;
    let lastId = 562;

    const updatedItens = tempWeapons.map(item => {
      const oldItem = weapons.find(i => i.en === item.en);

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

    console.log(lastId);

    const allItensUpdated = [...updatedItens];

    copy(JSON.stringify(allItensUpdated));
  };
  return (
    <>
      <button onClick={() => processarDadosArmas()}>Copiar Armas</button>
      <button onClick={() => processarDadosEquipamentos()}>
        Copiar Equipamentos
      </button>
      <button onClick={() => manageItens()}>Modificar</button>
    </>
  );
};

export default UpdateItems;
