import { combineReducers } from 'redux';
import categories from './categories';
import search from './search';
import error from './error';
import auth from './auth';

export default combineReducers({
  categories,
  searchResults: search,
  error,
  user: auth,
});
