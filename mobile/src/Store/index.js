import React from 'react';
import { init } from '@rematch/core';
import { Provider } from 'react-redux';
import loadingPlugin from '@rematch/loading';
import App from '../Navigation';
import * as models from './Models';

// Loading plugin
// const loadingPlugin = Loader
// init store
const store = init({ models, plugins: [ loadingPlugin({ asNumber: false }) ] });

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
