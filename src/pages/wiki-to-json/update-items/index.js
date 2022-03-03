import { equipments, weapons } from '../../../data/kakeleData';
import tempWeapons from '../../../data/tempWeapons.json';
import tempEquips from '../../../data/tempEquips.json';
import copy from 'copy-to-clipboard';

const UpdateItems = () => {
  const processarDadosArmas = () => {
    const updatedWeapons = weapons.map(item => {
      const itemAtualizado = tempWeapons.find(updatedItem => {
        if (!updatedItem) return;
        return updatedItem.name === item.en;
      });
      return {
        ...item,
        rarity: itemAtualizado.rarity,
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
      const itemAtualizado = tempEquips.find(updatedItem => {
        if (!updatedItem) return;
        return updatedItem.name === item.en;
      });
      return {
        ...item,
        rarity: itemAtualizado.rarity,
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
