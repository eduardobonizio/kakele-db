import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import HomeContent from './HomeContent';

export default function Home() {
  const location = useLocation();

  return (
    <div className="body-container">
      <NavBar />

      {location.pathname === '/' ? <HomeContent /> : <Outlet />}

      <Footer />
    </div>
  );
}
