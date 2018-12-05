import React from 'react';
import { shallow, mount } from 'enzyme';

import Category from '../../components/Category';

describe('Category component', () => {
  test('renders without crashing', () => {
    shallow(<Category {...{ category: { title: 'Category', cheats: [] } }} />);
  });

  test('renders the expected title', () => {
    const props = { category: { title: 'Category', cheats: [] } };
    const wrapper = mount(<Category {...props} />);
    expect(wrapper.find('.category-title').text())
      .toEqual(props.category.title);
  });
});
