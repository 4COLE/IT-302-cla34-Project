import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CoinDataService from '../service/CoinDataService';

const AddComment = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const saveComment = () => {
    if (!user) {
      setError('Please login first');
      return;
    }

    const data = {
      text: comment,
      userName: user.name, 
      userId: user.userId,
      coinId: id
    };

    CoinDataService.createComment(id, data)
      .then(response => {
        setSubmitted(true);
        setError('');
      })
      .catch(e => {
        setError('Error submitting comment');
        console.log(e);
      });
  };

  const newComment = () => {
    setComment('');
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Comment submitted successfully!</h4>
          <button className="btn btn-success" onClick={newComment}>
            Add Another Comment
          </button>
          <button className="btn btn-primary" onClick={() => navigate(`/cla34_coins/${id}`)}>
            Back to Coin
          </button>
        </div>
      ) : (
        <div>
          <h3>Add Comment</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea
              className="form-control"
              id="comment"
              required
              value={comment}
              onChange={handleInputChange}
              name="comment"
            />
          </div>
          <button onClick={saveComment} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddComment;