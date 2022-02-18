import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import ButtonForKakele from '../../componentes/ButtonForKakele';
import ItemCard from '../../componentes/ItemCard';
import { showItemJsx as textOptions } from '../../data/dataLanguages';
import { genereateLinkToViewSet } from '../../data/kakeleActions';
import { equipments, weapons } from '../../data/kakeleData';
import './ShowItem.css';

export default function ShowItem() {
  const navigate = useNavigate();
  const currentSet = useSelector(state => state.currentSet);
  const { language } = useSelector(state => state.currentKakeleFilters);
  const text = textOptions[language];

  const { name } = useParams(); // Unpacking and retrieve id
  const allItens = [...equipments, ...weapons];
  const item =
    allItens.find(e => e.nameEN === name || e.namePTBR === name) || allItens[0];
  const nextIndex = allItens.indexOf(item) + 1;
  const previowsIndex = allItens.indexOf(item) - 1;

  const redirectToShowSetPage = () => {
    const setToArray = Object.values(currentSet).map(i => i);
    const link = genereateLinkToViewSet(setToArray, false, language);
    if (link) navigate(link);
  };

  const changeItem = itemIndex => {
    const index = itemIndex >= 0 ? itemIndex : allItens.length - 1;
    navigate(`/item/${allItens[index].nameEN}`);
  };

  return (
    <div className="container d-flex flex-column align-items-center show-item-container">
      {item ? (
        <div className="row">
          <ItemCard item={item} />
        </div>
      ) : (
        <div>Item não encontrado</div>
      )}
      <div className="button-container">
        <ButtonForKakele
          text={text.previous}
          onClick={() => changeItem(previowsIndex)}
        />
        <ButtonForKakele text={text.showSet} onClick={redirectToShowSetPage} />
        <ButtonForKakele
          text={text.next}
          onClick={() => changeItem(nextIndex)}
        />
      </div>
    </div>
  );
}
