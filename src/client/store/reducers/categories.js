import * as types from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES_SUCCESS:
      return action.data;
    default:
      return state;
  }
};
