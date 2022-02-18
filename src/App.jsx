/* eslint-disable no-unused-vars */
import React from 'react';

import Footer from './pages/Footer/Footer';
import NavBar from './pages/NavBar/NavBar';
import Routes from './Routes/Routes';
import './App.css';

export default function App() {
  return (
    <>
      <NavBar />
      <div className="body-container">
        <Routes />
      </div>
      <Footer />
    </>
  );
}
