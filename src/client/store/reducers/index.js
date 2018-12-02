import { combineReducers } from 'redux';
import categories from './categories';
import search from './search';

export default combineReducers({
  categories,
  searchResults: search,
});
