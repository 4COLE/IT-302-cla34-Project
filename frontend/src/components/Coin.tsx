import React, { useState, useEffect } from 'react';
import CoinDataService from '../service/CoinDataService';
import { useParams } from 'react-router-dom';

interface Coin {
  name: string;
  symbol: string;
  priceUsd: string;
  rank: number;
  image: string;
}

const Coin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<Coin | null>(null);

  useEffect(() => {
    if (id) {
      getCoin(id);
    }
  }, [id]);

  const getCoin = (id: string) => {
    CoinDataService.get(id)
      .then(response => {
        setCoin(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {coin ? (
        <div>
          <h1>{coin.name}</h1>
          <p>Symbol: {coin.symbol}</p>
          <p>Price: ${coin.priceUsd}</p>
          <p>Rank: {coin.rank}</p>
          <img src={coin.image} alt={coin.name} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Coin;