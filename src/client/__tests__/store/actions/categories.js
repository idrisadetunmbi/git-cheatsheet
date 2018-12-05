import { createStore } from '../../../utils/test';
import * as types from '../../../store/actions/types';
import { fetchCategories } from '../../../store/actions/categories';

describe('Category actions', () => {
  test('[fetchCategories] dispatches the expected actions', async () => {
    const axios = {
      get: () => Promise.resolve({
        data: { data: [] },
      }),
    };
    const expectedActions = [{
      type: types.FETCH_CATEGORIES_SUCCESS,
      data: [],
    }];
    const store = createStore(axios);
    await store.dispatch(fetchCategories());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
