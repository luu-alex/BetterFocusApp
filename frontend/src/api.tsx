import axios from 'axios';

export default axios.create({
  baseURL: `http://ali-raza.me:3000/api/`
});