import * as types from '../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case types.API_ACTION_ERROR:
      return action.data;
    case types.CLEAR_API_ACTION_ERROR:
      return null;
    default:
      return state;
  }
};
