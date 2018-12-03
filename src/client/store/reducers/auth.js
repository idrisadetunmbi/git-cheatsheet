import * as types from '../actions/types';

export default (state = JSON.parse(localStorage.getItem('USER_AUTH_DATA')), action) => {
  switch (action.type) {
    case types.AUTH_ACTION_SUCCESS:
      return action.data;
    case types.CLEAR_AUTH_USER_DATA:
      return null;
    default:
      return state;
  }
};
