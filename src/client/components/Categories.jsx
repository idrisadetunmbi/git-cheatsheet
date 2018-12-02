import React from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';

import Category from './Category';

export default connect(state => ({
  categories: state.categories,
  searchResults: state.searchResults,
}))(({ categories, searchResults }) => {
  const data = searchResults || categories;
  return (
    <Masonry>
      {
        data.map(category => (<Category key={category._id} category={category} />))
      }
    </Masonry>
  );
});
