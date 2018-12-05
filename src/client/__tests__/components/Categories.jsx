import React from 'react';
import { shallow } from 'enzyme';

import Categories from '../../components/Categories';
import { createStore } from '../../utils/test';

describe('Categories component', () => {
  test('renders without crashing', () => {
    shallow(<Categories store={createStore()} />);
  });
});
