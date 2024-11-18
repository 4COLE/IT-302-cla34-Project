import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api/v1/cla34/coins';

class CoinDataService {
  getAll() {
    return axios.get(API_URL);
  }

  get(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  findByName(name) {
    return axios.get(`${API_URL}?filter=${name}`);
  }
}

export default new CoinDataService();