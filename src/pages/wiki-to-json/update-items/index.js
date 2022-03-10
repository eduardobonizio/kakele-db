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
          blessPercentage: 0,
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
          blessPercentage: 0,
        },
      };
    });

    if (updatedEquipments.length === equipments.length) {
      copy(JSON.stringify(updatedEquipments));
    } else {
      copy('Quantidade de items diferentes');
    }
  };

  return (
    <>
      <button onClick={() => processarDadosArmas()}>Copiar Armas</button>
      <button onClick={() => processarDadosEquipamentos()}>
        Copiar Equipamentos
      </button>
    </>
  );
};

export default UpdateItems;
