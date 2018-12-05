import reducer from '../../../store/reducers/categories';
import * as types from '../../../store/actions/types';

describe('Categories Reducer', () => {
  test('returns the expected state when [FETCH_CATEGORIES_SUCCESS] is dispatched', () => {
    const newData = [{ id: 1, title: 'Install Git' }];
    const newState = reducer([], {
      type: types.FETCH_CATEGORIES_SUCCESS,
      data: newData,
    });
    expect(newState.length).toEqual(1);
    expect(newState[0].title).toEqual(newData[0].title);
  });
});
