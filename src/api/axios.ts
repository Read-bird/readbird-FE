import axios from 'axios';

export const authFetch = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_PATH}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

authFetch.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `${localStorage.getItem('rb-access-token')}`;
    config.headers.refreshtoken = `${localStorage.getItem('rb-refresh-token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response.status;
    if (status === 412) {
      const result = await authFetch.post('/api/user/token');
      localStorage.setItem('rb-access-token', result.headers?.authorization);
    }

    return Promise.reject(error);
  }
);
