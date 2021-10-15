import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosClient from 'axios';

const baseURL = 'http://192.168.26.163:8080';
// const baseURL = 'https://velvety-outcome-322412.el.r.appspot.com';

// https://velvety-outcome-322412.el.r.appspot.com
export const AXIOS = (prefix) =>
  AxiosClient.create({
    baseURL: `${baseURL}/${prefix}`,
    'Content-Type': 'application/json'
  });

export const KEY = () => Math.random().toString(36).slice(2);

export const getAsyncStorage = async (key, callback) => {
  if (!key) return callback({ success: false, result: 'Key to store is required' });
  try {
    await AsyncStorage.getItem(key, (error, result) => {
      if (error) return callback({ success: false, result: error });
      // console.log('result', result);
      return callback({ success: result ? true : false, result: JSON.parse(result) });
    });
  } catch (error) {
    return callback({ success: false, result: error.message });
  }
};

export const setAsyncStorage = async (key, value, callback) => {
  if (!key) return callback({ success: false, result: 'Key to store is required' });
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value), (error) => {
      // console.log('Error', error);
      return callback({ success: !error, result: error ? error : '' });
    });
  } catch (error) {
    return callback({ success: false, result: error.message });
  }
};

export const removeAsyncStorage = async (key, callback) => {
  if (!key) return callback({ success: false, result: 'Key to remove from storage is required' });
  try {
    await AsyncStorage.removeItem(key, (error) =>
      callback({ success: !error, result: error ? error : 'Successfully removed from  storage' })
    );
  } catch (error) {
    return callback({ success: false, result: error.message });
  }
};
