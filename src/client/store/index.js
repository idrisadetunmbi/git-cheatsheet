import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from './reducers';

export default (extraArg) => {
  const middlewares = [thunk.withExtraArgument(extraArg)];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }
  return createStore(reducers, applyMiddleware(...middlewares));
};
