import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['authorization'];
  }
  // if (development)
  axios.defaults.baseURL = 'http://localhost:4000';
};

export { setAuthToken };
