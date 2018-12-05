import * as types from './types';

export const fetchCategories = () => async (dispatch, getState, axios) => {
  let categories;
  try {
    categories = (await axios.get('/api/categories')).data.data;
  } catch (error) {
    return null;
  }
  return dispatch({
    type: types.FETCH_CATEGORIES_SUCCESS,
    data: categories,
  });
};

export const searchCategory = searchKey => (dispatch, getState) => {
  const results = getState().categories
    .filter(category => category.title.includes(searchKey)
      || category.cheats.map(cheat => cheat.description.toLowerCase())
        .some(description => description.includes(searchKey)));
  dispatch({
    type: types.SEARCH_RESULTS,
    data: results,
  });
};
