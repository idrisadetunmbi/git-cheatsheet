import reducer from '../../../store/reducers/search';
import * as types from '../../../store/actions/types';

describe('Categories Reducer', () => {
  test('returns the expected state when [SEARCH_RESULTS] is dispatched', () => {
    const newData = [{ id: 1, title: 'Install Git' }];
    const newState = reducer([], {
      type: types.SEARCH_RESULTS,
      data: newData,
    });
    expect(newState.length).toEqual(1);
    expect(newState[0].title).toEqual(newData[0].title);
  });
});
