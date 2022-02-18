import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import OreCalculator from '../pages/OreCalculator/OreCalculator';
import SearchItem from '../pages/SearchItem/SearchItem';
import SetMaker from '../pages/SetMaker/SetMaker';
import ShowItem from '../pages/ShowItem/ShowItem';
import ShowSet from '../pages/ShowSet/ShowSet';
// import PrivateRoute from '../../api/PrivateRoute';
// import WikiDataBaseToJson from '../pages/Kakele/WikiDataBaseToJson';
// import Login from '../pages/UserControll/Login';
// import SignUp from '../pages/UserControll/SignUp';

export default function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="set-maker" element={<SetMaker />} />
        <Route path="search-item" element={<SearchItem />} />
        <Route path="ore-calculator" element={<OreCalculator />} />
        <Route path="set/*" element={<ShowSet />} />
        <Route path="item/:name" element={<ShowItem />} />
      </Route>
      <Route path="*" element={<NotFound />} />

      {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} /> */}

      {/* <Route path="/WikiDataBaseToJson" element={<WikiDataBaseToJson />} /> */}

      {/* <Route
        path="/quiz"
        element={
          <PrivateRoute>
            <GameSetup />
          </PrivateRoute>
        }
      /> */}
    </Routes>
  );
}
