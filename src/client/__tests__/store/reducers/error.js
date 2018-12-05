import reducer from '../../../store/reducers/error';
import * as types from '../../../store/actions/types';

describe('Errors Reducer', () => {
  test('returns the expected state when [API_ACTION_ERROR] is dispatched', () => {
    const newState = reducer(null, {
      type: types.API_ACTION_ERROR,
      data: 'error',
    });
    expect(newState).toEqual('error');
  });

  test('returns the expected state when [CLEAR_API_ACTION_ERROR] is dispatched', () => {
    const newState = reducer('error', {
      type: types.CLEAR_API_ACTION_ERROR,
    });
    expect(newState).toEqual(null);
  });
});
