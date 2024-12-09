import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CoinList from './components/CoinList';
import Coin from './components/Coin';
import Login from './components/Login';
import AddComment from './components/AddComment';
import Navbar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); 
  };

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<CoinList />} />
        <Route path="/cla34_coins" element={<CoinList />} />
        <Route path="/cla34_coins/:id" element={<Coin user={user} />} />
        <Route path="/cla34_login" element={<Login login={login} />} />
        <Route path="/cla34_coins/:id/comment" element={<AddComment user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
