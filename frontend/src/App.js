import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CoinList from './components/CoinList';
import Coin from './components/Coin';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CoinList />} />
        <Route path="/cla34_coins" element={<CoinList />} />
        <Route path="/cla34_coins/:id" element={<Coin />} />
      </Routes>
    </div>
  );
};

export default App;
