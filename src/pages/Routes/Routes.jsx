import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from '../../api/PrivateRoute';
import Home from '../Home/Home';
import Kakele from '../Kakele/Kakele.jsx';
import OreCalculator from '../Kakele/OreCalculator';
import SearchItem from '../Kakele/SearchItem';
import SetMaker from '../Kakele/SetMaker';
import ShowSet from '../Kakele/ShowSet';
import GameSetup from '../Quiz/GameSetup';
import StartGame from '../Quiz/StartGame';
import Login from '../UserControll/Login';
import SignUp from '../UserControll/SignUp';

export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/kakele" element={<Kakele />} />
      <Route path="/kakele/set-maker" element={<SetMaker />} />
      <Route path="/kakele/search-item" element={<SearchItem />} />

      <Route path="/kakele/ore-calculator" element={<OreCalculator />} />
      <Route path="/kakele/set/*" element={<ShowSet />} />

      <Route
        path="/quiz"
        element={
          <PrivateRoute>
            <GameSetup />
          </PrivateRoute>
        }
      />

      <Route
        path="/quiz/start"
        element={
          <PrivateRoute>
            <StartGame />
          </PrivateRoute>
        }
      />
      <Route from="*" to="/" />
    </Routes>
  );
}
