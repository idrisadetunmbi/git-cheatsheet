import React from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';

import createStore from '../store';

const store = createStore(axios);

export default () => (
  <Provider store={store}>
    <div>
      Git Cheatsheet
    </div>
  </Provider>
);
