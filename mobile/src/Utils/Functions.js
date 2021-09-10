import AxiosClient from 'axios';

const baseURL = 'http://192.168.86.163:8080';
export const AXIOS = (prefix) =>
  AxiosClient.create({
    baseURL: `${baseURL}/${prefix}`,
    'Content-Type': 'application/json'
  });

export const KEY = () => Math.random().toString(36).slice(2);
