import React from 'react';
import { connect } from 'react-redux';

import { searchCategory } from '../store/actions/categories';

export const Search = ({ searchCategory: search }) => (
  <div className="row">
    <div className="input-field col offset-s3 s6">
      <i style={{ top: '1rem' }} className="material-icons prefix">search</i>
      <input
        onChange={event => search(event.target.value)}
        style={{ textAlign: 'center' }}
        id="search_cheat"
        type="text"
      />
      <label style={{ textAlign: 'center' }} htmlFor="search_cheat">
        The Awesome Git Cheat Sheet
      </label>
    </div>
  </div>
);

export default connect(null, { searchCategory })(Search);
