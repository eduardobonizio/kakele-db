import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { updateItensFilter } from '../../store/actions/KakeleFilters.actions';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import ButtonForKakele from './Componentes/ButtonForKakele';

export default function Kakele() {
  const dispatch = useDispatch();
  const { language } = useSelector(state => state.currentKakeleFilters);

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('language') || false;
    dispatch(updateItensFilter('CHANGE_LANGUAGE', selectedLanguage));
  }, []);

  const changeLanguage = newLanguage => {
    localStorage.setItem('language', newLanguage);
    dispatch(updateItensFilter('CHANGE_LANGUAGE', newLanguage));
  };

  if (!language)
    return (
      <div className="body-container container d-flex flex-column align-items-center">
        <ButtonForKakele onClick={() => changeLanguage('EN')} text="English" />
        <ButtonForKakele
          onClick={() => changeLanguage('PTBR')}
          text="Português"
        />
      </div>
    );

  return (
    <div className="body-container">
      <NavBar />
      <div className="container d-flex justify-content-center flex-column">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
