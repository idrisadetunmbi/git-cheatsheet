import { createStore } from '../../../utils/test';
import * as types from '../../../store/actions/types';
import { authAction, signOutUser } from '../../../store/actions/auth';

describe('Auth actions', () => {
  test('[authAction] dispatches the expected actions when dispatched', async () => {
    const axios = {
      post: () => Promise.resolve({
        data: {
          data: {},
        },
      }),
    };
    const expectedActions = [{
      type: types.AUTH_ACTION_SUCCESS,
      data: {},
    }];
    const store = createStore(axios);
    await store.dispatch(authAction());
    expect(store.getActions()).toEqual(expectedActions);
    expect(localStorage.setItem).toHaveBeenLastCalledWith('USER_AUTH_DATA', '{}');
  });

  test('[signOutUser] dispatches the expected actions', async () => {
    const expectedActions = [{
      type: types.CLEAR_AUTH_USER_DATA,
    }];
    const store = createStore();
    await store.dispatch(signOutUser());
    expect(store.getActions()).toEqual(expectedActions);
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
