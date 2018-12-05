import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export const createStore = (axios, intialState) => // eslint-disable-line
  configureStore([thunk.withExtraArgument(axios)])(intialState); // eslint-disable-line
