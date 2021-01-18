/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// axios.defaults.withCredentials = true;
export const HTTP = axios.create({
  baseURL: 'http://localhost:8080/api/',
});
