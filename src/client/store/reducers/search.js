import * as types from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case types.SEARCH_RESULTS:
      return action.data;
    default:
      return state;
  }
};
