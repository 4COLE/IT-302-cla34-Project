import React, { useState, useEffect } from 'react';
import CoinDataService from '../service/CoinDataService';
import { Link } from 'react-router-dom';

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    retrieveCoins();
  }, []);

  const retrieveCoins = () => {
    CoinDataService.getAll()
      .then(response => {
        setCoins(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const findByName = () => {
    CoinDataService.findByName(searchName)
      .then(response => {
        setCoins(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={onChangeSearchName}
        />
        <button onClick={findByName}>Search</button>
      </div>
      <div className="coin-list">
        {coins.map((coin, index) => (
          <div key={index}>
            <Link to={`/cla34_coins/${coin._id}`}>{coin.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinList;