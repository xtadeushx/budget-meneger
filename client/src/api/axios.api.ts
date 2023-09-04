import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/helpers';

export const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    Authorization: 'Bearer ' + getTokenFromLocalStorage(),
  },
});
