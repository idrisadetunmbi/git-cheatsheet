import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import { hot } from 'react-hot-loader';

import createStore from '../store';
import { fetchCategories } from '../store/actions/categories';

import Categories from './Categories';
import Search from './Search';
import SideNav from './SideNav';

const store = createStore(axios);

store.dispatch(fetchCategories());

export default hot(module)(() => (
  <Provider store={store}>
    <Fragment>
      <div className="row">
        <SideNav />
        <div className="container">
          <Search />
          <Categories />
        </div>
      </div>
    </Fragment>
  </Provider>
));
