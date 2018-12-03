import * as types from './types';

// eslint-disable-next-line
export const authAction = (type, data) => async (dispatch, getState, axios) => {
  let response;
  try {
    response = await axios.post(`/api/auth/${type}`, data);
  } catch (error) {
    return dispatch({
      type: types.API_ACTION_ERROR,
      data: error.response.data ? error.response.data.error : error.message,
    });
  }
  localStorage.setItem('USER_AUTH_DATA', JSON.stringify(response.data.data));
  return dispatch({
    type: types.AUTH_ACTION_SUCCESS,
    data: response.data.data,
  });
};

export const signOutUser = () => (dispatch) => {
  localStorage.clear();
  dispatch({
    type: types.CLEAR_AUTH_USER_DATA,
  });
};
