import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/v1/cla34/coins';

class CoinDataService {
  // Existing methods
  getAll() {
    return axios.get(API_URL);
  }

  get(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  findByName(name) {
    return axios.get(`${API_URL}?filter=${name}`);
  }

  // New comment-related methods
  createComment(coinId, data) {
    return axios.post(`${API_URL}/${coinId}/comments`, data);
  }

  updateComment(coinId, commentId, data) {
    return axios.put(`${API_URL}/${coinId}/comments/${commentId}`, data);
  }

  deleteComment(coinId, commentId) {
    return axios.delete(`${API_URL}/${coinId}/comments/${commentId}`);
  }

  getComments(coinId) {
    return axios.get(`${API_URL}/${coinId}/comments`);
  }
}

export default new CoinDataService();