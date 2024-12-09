import React, { useState, useEffect } from 'react';
import CoinDataService from '../service/CoinDataService';
import { useParams, Link } from 'react-router-dom';

interface Coin {
  name: string;
  symbol: string;
  priceUsd: string;
  rank: number;
  image: string;
}

interface Comment {
  _id: string;
  text: string;
  userName: string;
  lastModified: Date;
}

const Coin: React.FC<{ user: any }> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<Coin | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (id) {
      getCoin(id);
      getComments(id);
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

  const getComments = (coinId: string) => {
    CoinDataService.getComments(coinId)
      .then(response => {
        setComments(response.data);
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
          
          <div className="comments-section">
            <h2>Comments</h2>
            {user && (
              <Link to={`/cla34_coins/${id}/comment`} className="add-comment-btn">
                Add Comment
              </Link>
            )}
            
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p className="comment-text">{comment.text}</p>
                  <div className="comment-meta">
                    <span className="comment-author">By: {comment.userName}</span>
                    <span className="comment-date">
                      {new Date(comment.lastModified).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet</p>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Coin;