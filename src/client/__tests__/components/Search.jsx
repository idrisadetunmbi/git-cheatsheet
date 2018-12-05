import React from 'react';
import { shallow, mount } from 'enzyme';

import { Search } from '../../components/Search';

describe('Categories component', () => {
  test('renders without crashing', () => {
    shallow(<Search />);
  });

  test('renders the expected label', () => {
    const wrapper = mount(<Search />);
    expect(wrapper.find('label').text()).toContain('Git Cheat Sheet');
  });

  test('', () => {
    const props = {
      searchCategory: jest.fn(),
    };
    const wrapper = mount(<Search {...props} />);
    wrapper.find('input').simulate('change');
    expect(props.searchCategory).toHaveBeenCalled();
  });
});
