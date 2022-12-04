import axios from 'axios';

const instanceAxios = axios.create({ baseURL: process.env.REACT_APP_API_URL });

const reqAxios = () => {
  instanceAxios.defaults.headers.common = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0,
  };
  instanceAxios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  return instanceAxios;
};

export default reqAxios;
