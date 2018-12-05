import reducer from '../../../store/reducers/auth';
import * as types from '../../../store/actions/types';

describe('Auth Reducer', () => {
  test('returns the expected state when [AUTH_ACTION_SUCCESS] is dispatched', () => {
    const newState = reducer(null, {
      type: types.AUTH_ACTION_SUCCESS,
      data: {},
    });
    expect(newState).toEqual({});
  });

  test('returns the expected state when [CLEAR_USER_DATA] is dispatched', () => {
    const newState = reducer({}, {
      type: types.CLEAR_AUTH_USER_DATA,
    });
    expect(newState).toEqual(null);
  });
});
