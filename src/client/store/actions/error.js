import * as types from './types';

// eslint-disable-next-line
export const clearError = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_API_ACTION_ERROR,
  });
};
