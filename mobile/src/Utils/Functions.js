import AxiosClient from 'axios';

// const baseURL = 'http://192.168.125.163:8080';
const baseURL = 'https://velvety-outcome-322412.el.r.appspot.com';

// https://velvety-outcome-322412.el.r.appspot.com
export const AXIOS = (prefix) =>
  AxiosClient.create({
    baseURL: `${baseURL}/${prefix}`,
    'Content-Type': 'application/json'
  });

export const KEY = () => Math.random().toString(36).slice(2);
